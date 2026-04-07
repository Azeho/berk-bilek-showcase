<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit();
}

$input = file_get_contents('php://input');
$data  = json_decode($input, true);

// Verify reCAPTCHA
$recaptchaSecret = '6LfpDqEsAAAAAG65bji1WfM7Wk_lZ8v5GdDT9Elq';
if (empty($data['captchaToken'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'reCAPTCHA verification required']);
    exit();
}

$recaptchaOptions = [
    'http' => [
        'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
        'method'  => 'POST',
        'content' => http_build_query([
            'secret'   => $recaptchaSecret,
            'response' => $data['captchaToken'],
            'remoteip' => $_SERVER['REMOTE_ADDR']
        ])
    ]
];
$recaptchaResult = file_get_contents(
    'https://www.google.com/recaptcha/api/siteverify',
    false,
    stream_context_create($recaptchaOptions)
);
$recaptchaJson = json_decode($recaptchaResult);
if (!$recaptchaJson || !$recaptchaJson->success) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'reCAPTCHA verification failed.']);
    exit();
}

// Validate fields
if (empty($data['name']) || empty($data['email']) || empty($data['message'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Missing required fields']);
    exit();
}

$name    = htmlspecialchars(strip_tags($data['name']));
$email   = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
$message = htmlspecialchars(strip_tags($data['message']));

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid email address']);
    exit();
}

// SMTP config (mail.ru)
$smtpHost = 'smtp.mail.ru';
$smtpPort = 465;
$smtpUser = 'noreply@berk-bilek.com';
$smtpPass = 'r2itt%RaOIO3';
$fromAddr = 'noreply@berk-bilek.com';
$fromName = 'Berk Bilek Contact';
$toAddr   = 'info@berk-bilek.com';
$ccAddr   = 'berkbilek2020@gmail.com';

$subject  = 'Berk Bilek - Contact Form: Message from ' . $name;
$body     = "You have received a new message from the contact form on berk-bilek.com\r\n\r\n"
          . "Name: {$name}\r\n"
          . "Email: {$email}\r\n\r\n"
          . "Message:\r\n{$message}\r\n\r\n"
          . "---\r\nSent from berk-bilek.com contact form";

// Send via SMTP
function smtp_send($host, $port, $user, $pass, $fromAddr, $fromName, $toAddr, $ccAddr, $subject, $body) {
    $socket = @stream_socket_client(
        "ssl://{$host}:{$port}", $errno, $errstr, 30,
        STREAM_CLIENT_CONNECT,
        stream_context_create(['ssl' => ['verify_peer' => false, 'verify_peer_name' => false]])
    );
    if (!$socket) return "Connection failed ({$errno}): {$errstr}";

    stream_set_timeout($socket, 15);

    $r = function() use ($socket) { return fgets($socket, 515); };
    $w = function($cmd) use ($socket) { fwrite($socket, $cmd . "\r\n"); };

    $r(); // 220 banner

    $w("EHLO berk-bilek.com");
    do { $line = $r(); } while ($line && $line[3] !== ' '); // drain multi-line EHLO

    $w("AUTH LOGIN");
    $r(); // 334 username prompt
    $w(base64_encode($user));
    $r(); // 334 password prompt
    $w(base64_encode($pass));
    $authResp = $r(); // 235 or error
    if ((int)substr($authResp, 0, 3) !== 235) return "Auth failed: " . trim($authResp);

    $w("MAIL FROM:<{$fromAddr}>");
    $r();
    $w("RCPT TO:<{$toAddr}>");
    $r();
    $w("RCPT TO:<{$ccAddr}>");
    $r();
    $w("DATA");
    $r(); // 354

    $date    = date('r');
    $msgId   = '<' . time() . '.' . rand() . '@berk-bilek.com>';
    $headers = "Date: {$date}\r\n"
             . "Message-ID: {$msgId}\r\n"
             . "From: {$fromName} <{$fromAddr}>\r\n"
             . "Reply-To: {$fromAddr}\r\n"
             . "To: {$toAddr}\r\n"
             . "Cc: {$ccAddr}\r\n"
             . "Subject: {$subject}\r\n"
             . "MIME-Version: 1.0\r\n"
             . "Content-Type: text/plain; charset=UTF-8\r\n"
             . "Content-Transfer-Encoding: 8bit\r\n";

    fwrite($socket, $headers . "\r\n" . $body . "\r\n.\r\n");
    $sendResp = $r(); // 250 or error
    $w("QUIT");
    fclose($socket);

    return (int)substr($sendResp, 0, 3) === 250 ? true : "Send failed: " . trim($sendResp);
}

$result = smtp_send($smtpHost, $smtpPort, $smtpUser, $smtpPass, $fromAddr, $fromName, $toAddr, $ccAddr, $subject, $body);

if ($result === true) {
    http_response_code(200);
    echo json_encode(['success' => true, 'message' => 'Your message has been sent successfully.']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Failed to send email. Please try again later.', 'debug' => $result]);
}
?>
