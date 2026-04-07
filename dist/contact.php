<?php
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

$subject  = 'Berk Bilek - Contact Form: Message from ' . $name;
$body     = "New message from berk-bilek.com contact form\n\n"
          . "Name: {$name}\nEmail: {$email}\n\nMessage:\n{$message}\n\n---\nberk-bilek.com";
$headers  = "From: noreply@berk-bilek.com\r\n"
          . "Reply-To: {$email}\r\n"
          . "X-Mailer: PHP/" . phpversion() . "\r\n"
          . "MIME-Version: 1.0\r\n"
          . "Content-Type: text/plain; charset=UTF-8\r\n";

// Send to Gmail first (most reliable with PHP mail())
$sent1 = mail('berkbilek2020@gmail.com', $subject, $body, $headers);

// Also attempt info@berk-bilek.com (may or may not arrive depending on server SPF)
mail('info@berk-bilek.com', $subject, $body, $headers);

if ($sent1) {
    http_response_code(200);
    echo json_encode(['success' => true, 'message' => 'Your message has been sent successfully.']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Failed to send. Please contact us directly at info@berk-bilek.com']);
}
?>
