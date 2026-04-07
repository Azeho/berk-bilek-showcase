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
$rcCh = curl_init('https://www.google.com/recaptcha/api/siteverify');
curl_setopt_array($rcCh, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST           => true,
    CURLOPT_POSTFIELDS     => http_build_query(['secret' => $recaptchaSecret, 'response' => $data['captchaToken']]),
    CURLOPT_TIMEOUT        => 10,
]);
$rcResult = curl_exec($rcCh);
curl_close($rcCh);
$rcJson = $rcResult ? json_decode($rcResult) : null;
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

// ---------------------------------------------------------------
// Send via Web3Forms (https://web3forms.com — free, no SMTP)
// Replace WEB3FORMS_ACCESS_KEY with your key from web3forms.com
// ---------------------------------------------------------------
$web3formsKey = 'a5b73472-c9a7-4738-bf96-08eebcf834a8';

$payload = json_encode([
    'access_key' => $web3formsKey,
    'subject'    => 'Berk Bilek - Contact Form: Message from ' . $name,
    'from_name'  => 'Berk Bilek Website',
    'name'       => $name,
    'email'      => $email,
    'message'    => $message,
    'replyto'    => $email,
]);

$ch = curl_init('https://api.web3forms.com/submit');
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST           => true,
    CURLOPT_POSTFIELDS     => $payload,
    CURLOPT_HTTPHEADER     => ['Content-Type: application/json', 'Accept: application/json'],
    CURLOPT_TIMEOUT        => 15,
]);
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

$result = $response ? json_decode($response, true) : null;

if ($httpCode === 200 && isset($result['success']) && $result['success']) {
    http_response_code(200);
    echo json_encode(['success' => true, 'message' => 'Your message has been sent successfully.']);
} else {
    // Fallback to PHP mail() if Web3Forms fails
    $headers  = "From: noreply@berk-bilek.com\r\n"
              . "Reply-To: {$email}\r\n"
              . "X-Mailer: PHP/" . phpversion() . "\r\n"
              . "MIME-Version: 1.0\r\n"
              . "Content-Type: text/plain; charset=UTF-8\r\n";
    $body = "Name: {$name}\nEmail: {$email}\n\nMessage:\n{$message}";
    $subject = 'Berk Bilek - Contact Form: Message from ' . $name;
    $sent = mail('berkbilek2020@gmail.com', $subject, $body, $headers);
    mail('info@berk-bilek.com', $subject, $body, $headers);
    if ($sent) {
        http_response_code(200);
        echo json_encode(['success' => true, 'message' => 'Your message has been sent successfully.']);
    } else {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Failed to send. Please contact us directly at info@berk-bilek.com']);
    }
}
?>
