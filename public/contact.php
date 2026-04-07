<?php
ob_start();
error_reporting(0);
ini_set('display_errors', 0);

// Always output JSON, even on crash
register_shutdown_function(function() {
    $e = error_get_last();
    if ($e) {
        ob_clean();
        if (!headers_sent()) {
            header("Access-Control-Allow-Origin: *");
            header("Content-Type: application/json");
            http_response_code(500);
        }
        echo json_encode(['success' => false, 'debug' => 'Fatal: ' . $e['message']]);
    }
});

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(200); exit(); }
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']); exit();
}

$input = file_get_contents('php://input');
$data  = json_decode($input, true);

// reCAPTCHA
$recaptchaSecret = '6LfpDqEsAAAAAG65bji1WfM7Wk_lZ8v5GdDT9Elq';
if (empty($data['captchaToken'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'reCAPTCHA required']); exit();
}
$rcCtx = stream_context_create(['http' => [
    'method'  => 'POST',
    'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
    'content' => http_build_query(['secret' => $recaptchaSecret, 'response' => $data['captchaToken']])
]]);
$rcResult = @file_get_contents('https://www.google.com/recaptcha/api/siteverify', false, $rcCtx);
$rcJson   = $rcResult ? json_decode($rcResult) : null;
if (!$rcJson || !$rcJson->success) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'reCAPTCHA failed']); exit();
}

// Validate
if (empty($data['name']) || empty($data['email']) || empty($data['message'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Missing fields']); exit();
}
$name    = htmlspecialchars(strip_tags($data['name']));
$email   = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
$message = htmlspecialchars(strip_tags($data['message']));
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid email']); exit();
}

$subject = 'Berk Bilek - Contact Form: Message from ' . $name;
$body    = "New message from berk-bilek.com contact form\r\n\r\n"
         . "Name: {$name}\r\nEmail: {$email}\r\n\r\nMessage:\r\n{$message}\r\n\r\n---\r\nberk-bilek.com";

// --- SMTP send ---
function smtp_connect_ssl($host, $port) {
    $ctx = stream_context_create(['ssl' => [
        'verify_peer'      => false,
        'verify_peer_name' => false,
        'allow_self_signed'=> true,
    ]]);
    return @stream_socket_client("ssl://{$host}:{$port}", $en, $es, 15, STREAM_CLIENT_CONNECT, $ctx);
}

function smtp_connect_tls($host, $port) {
    $sock = @fsockopen($host, $port, $en, $es, 15);
    if (!$sock) return false;
    stream_set_timeout($sock, 15);
    fgets($sock, 515); // banner
    fwrite($sock, "EHLO berk-bilek.com\r\n");
    do { $l = fgets($sock, 515); } while ($l && $l[3] !== ' ');
    fwrite($sock, "STARTTLS\r\n");
    $r = fgets($sock, 515);
    if ((int)substr($r,0,3) !== 220) { fclose($sock); return false; }
    $ctx = stream_context_create(['ssl'=>['verify_peer'=>false,'verify_peer_name'=>false]]);
    if (!stream_socket_enable_crypto($sock, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) { fclose($sock); return false; }
    return $sock;
}

function smtp_auth_and_send($sock, $user, $pass, $from, $to, $cc, $subject, $body) {
    stream_set_timeout($sock, 15);
    $r = function() use ($sock) { return fgets($sock, 515); };
    $w = function($c) use ($sock) { fwrite($sock, $c . "\r\n"); };

    $r(); // might be banner or already read
    $w("EHLO berk-bilek.com");
    do { $l = $r(); } while ($l && strlen($l) > 3 && $l[3] !== ' ');

    $w("AUTH LOGIN");
    $r();
    $w(base64_encode($user));
    $r();
    $w(base64_encode($pass));
    $ar = $r();
    if ((int)substr($ar,0,3) !== 235) return "Auth failed: " . trim($ar);

    $w("MAIL FROM:<{$from}>");  $r();
    $w("RCPT TO:<{$to}>");      $r();
    $w("RCPT TO:<{$cc}>");      $r();
    $w("DATA");                 $r();

    $msg = "Date: " . date('r') . "\r\n"
         . "From: Berk Bilek <{$from}>\r\n"
         . "Reply-To: {$from}\r\n"
         . "To: {$to}\r\n"
         . "Cc: {$cc}\r\n"
         . "Subject: {$subject}\r\n"
         . "MIME-Version: 1.0\r\nContent-Type: text/plain; charset=UTF-8\r\n\r\n"
         . $body . "\r\n.";
    fwrite($sock, $msg . "\r\n");
    $sr = $r();
    $w("QUIT"); fclose($sock);
    return (int)substr($sr,0,3) === 250 ? true : "Send failed: " . trim($sr);
}

$smtpUser = 'noreply@berk-bilek.com';
$smtpPass = 'r2itt%RaOIO3';
$smtpFrom = 'noreply@berk-bilek.com';
$toAddr   = 'info@berk-bilek.com';
$ccAddr   = 'berkbilek2020@gmail.com';
$debugLog = [];

// Try SSL port 465
$sock = smtp_connect_ssl('smtp.mail.ru', 465);
if ($sock) {
    $debugLog[] = 'Connected ssl:465';
    $result = smtp_auth_and_send($sock, $smtpUser, $smtpPass, $smtpFrom, $toAddr, $ccAddr, $subject, $body);
} else {
    $debugLog[] = 'ssl:465 failed, trying tls:587';
    // Try STARTTLS port 587
    $sock = smtp_connect_tls('smtp.mail.ru', 587);
    if ($sock) {
        $debugLog[] = 'Connected tls:587';
        // Re-send EHLO after TLS upgrade
        fwrite($sock, "EHLO berk-bilek.com\r\n");
        do { $l = fgets($sock, 515); } while ($l && $l[3] !== ' ');
        $result = smtp_auth_and_send($sock, $smtpUser, $smtpPass, $smtpFrom, $toAddr, $ccAddr, $subject, $body);
    } else {
        $debugLog[] = 'tls:587 also failed';
        $result = 'SMTP unavailable';
    }
}

ob_end_clean();
if ($result === true) {
    echo json_encode(['success' => true, 'message' => 'Your message has been sent successfully.']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Failed to send. Please email us directly at info@berk-bilek.com', 'debug' => array_merge($debugLog, [$result])]);
}
?>
