<?php
error_reporting(0);
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit;
}

$input   = json_decode(file_get_contents('php://input'), true);
$name    = trim(strip_tags($input['name']    ?? ''));
$email   = trim(strip_tags($input['email']   ?? ''));
$message = trim(strip_tags($input['message'] ?? ''));
$token   = trim($input['captchaToken']        ?? '');

if (!$name || !$email || !$message) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Missing fields']);
    exit;
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid email']);
    exit;
}

// reCAPTCHA check (skip if cURL unavailable — don't block mail)
if ($token && function_exists('curl_init')) {
    $ch = curl_init('https://www.google.com/recaptcha/api/siteverify');
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST           => true,
        CURLOPT_POSTFIELDS     => 'secret=6LfpDqEsAAAAAG65bji1WfM7Wk_lZ8v5GdDT9Elq&response=' . urlencode($token),
        CURLOPT_TIMEOUT        => 10,
        CURLOPT_SSL_VERIFYPEER => false,
    ]);
    $res = curl_exec($ch);
    curl_close($ch);
    $cap = $res ? json_decode($res, true) : null;
    if ($cap && isset($cap['success']) && $cap['success'] === false) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'reCAPTCHA failed']);
        exit;
    }
}

// --- Send via SMTP (cPanel localhost) ---
$smtpHost = '127.0.0.1';
$smtpPort = 25;
$from     = 'info@berk-bilek.com';
$to       = 'info@berk-bilek.com';
$cc       = 'berkbilek2020@gmail.com';
$subject  = 'Berk Bilek - Taze hat: ' . $name;
$body     = "Ady: {$name}\r\nE-pocta: {$email}\r\n\r\nHaty:\r\n{$message}";

$boundary = md5(time());
$raw  = "Date: " . date('r') . "\r\n";
$raw .= "From: Berk Bilek <{$from}>\r\n";
$raw .= "Reply-To: {$email}\r\n";
$raw .= "To: {$to}\r\n";
$raw .= "Cc: {$cc}\r\n";
$raw .= "Subject: {$subject}\r\n";
$raw .= "MIME-Version: 1.0\r\n";
$raw .= "Content-Type: text/plain; charset=UTF-8\r\n";
$raw .= "Content-Transfer-Encoding: 8bit\r\n";
$raw .= "\r\n" . $body;

$log = [];
$ok  = false;

$sock = @fsockopen($smtpHost, $smtpPort, $errno, $errstr, 10);
if ($sock) {
    $log[] = 'connected';
    $read  = function() use ($sock) { return fgets($sock, 512); };
    $write = function($cmd) use ($sock, &$log) {
        fwrite($sock, $cmd . "\r\n");
        $log[] = '> ' . trim($cmd);
        $r = fgets($sock, 512);
        $log[] = '< ' . trim($r);
        return (int)substr($r, 0, 3);
    };

    $read(); // banner
    $code = $write('EHLO berk-bilek.com');
    // drain multi-line EHLO
    while ($code === 250) {
        $line = fgets($sock, 512);
        $log[] = '< ' . trim($line);
        if ($line[3] === ' ') break;
    }
    $write("MAIL FROM:<{$from}>");
    $write("RCPT TO:<{$to}>");
    $write("RCPT TO:<{$cc}>");
    $write('DATA');
    fwrite($sock, $raw . "\r\n.\r\n");
    $log[] = '> [message body]';
    $resp = fgets($sock, 512);
    $log[] = '< ' . trim($resp);
    $ok = ((int)substr($resp, 0, 3) === 250);
    $write('QUIT');
    fclose($sock);
} else {
    $log[] = "fsockopen failed: $errno $errstr";
    // Fallback to PHP mail()
    $headers  = "From: {$from}\r\nReply-To: {$email}\r\nCc: {$cc}\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $ok = mail($to, $subject, $body, $headers);
    $log[] = 'mail() fallback: ' . ($ok ? 'ok' : 'failed');
}

if ($ok) {
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Could not send email', 'debug' => $log]);
}
