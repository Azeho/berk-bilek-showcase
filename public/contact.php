<?php
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);

$name    = trim(strip_tags($input['name']    ?? ''));
$email   = trim(strip_tags($input['email']   ?? ''));
$message = trim(strip_tags($input['message'] ?? ''));
$token   = trim($input['captchaToken']        ?? '');

if (!$name || !$email || !$message || !$token) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Missing fields']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid email']);
    exit;
}

// Verify reCAPTCHA v2
$secret   = '6LfpDqEsAAAAAG65bji1WfM7Wk_lZ8v5GdDT9Elq';
$postData = http_build_query(['secret' => $secret, 'response' => $token]);
$ctx      = stream_context_create(['http' => [
    'method'  => 'POST',
    'header'  => 'Content-Type: application/x-www-form-urlencoded',
    'content' => $postData,
]]);
$verify = @file_get_contents('https://www.google.com/recaptcha/api/siteverify', false, $ctx);
$captcha = $verify ? json_decode($verify, true) : null;

if (!$captcha || !$captcha['success']) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'reCAPTCHA failed']);
    exit;
}

// Send email
$to      = 'info@berk-bilek.com';
$subject = '=?UTF-8?B?' . base64_encode('Berk Bilek - Täze hat: ' . $name) . '?=';
$body    = "Ady: {$name}\nE-poçta: {$email}\n\nHaty:\n{$message}";

$headers  = "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "From: noreply@berk-bilek.com\r\n";
$headers .= "Reply-To: {$email}\r\n";
$headers .= "Cc: berkbilek2020@gmail.com\r\n";

if (mail($to, $subject, $body, $headers)) {
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Mail send failed']);
}
