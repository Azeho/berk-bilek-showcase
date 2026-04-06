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
$data = json_decode($input, true);

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
$recaptchaContext = stream_context_create($recaptchaOptions);
$recaptchaResult  = file_get_contents('https://www.google.com/recaptcha/api/siteverify', false, $recaptchaContext);
$recaptchaJson    = json_decode($recaptchaResult);

if (!$recaptchaJson->success) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'reCAPTCHA verification failed. Please try again.']);
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

// Send email
$to      = 'info@berk-bilek.com';
$subject = 'Berk Bilek - Contact Form: Message from ' . $name;

$emailBody  = "You have received a new message from the contact form on berk-bilek.com\n\n";
$emailBody .= "Name: "    . $name    . "\n";
$emailBody .= "Email: "   . $email   . "\n\n";
$emailBody .= "Message:\n" . $message . "\n\n";
$emailBody .= "---\n";
$emailBody .= "This email was sent from the contact form at berk-bilek.com";

$headers  = "From: Berk Bilek Contact <info@berk-bilek.com>\r\n";
$headers .= "Reply-To: " . $email . "\r\n";
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

$mailSent = mail($to, $subject, $emailBody, $headers);

// Also CC berkbilek2020@gmail.com
if ($mailSent) {
    $ccHeaders  = "From: Berk Bilek Contact <info@berk-bilek.com>\r\n";
    $ccHeaders .= "Reply-To: " . $email . "\r\n";
    $ccHeaders .= "X-Mailer: PHP/" . phpversion() . "\r\n";
    $ccHeaders .= "MIME-Version: 1.0\r\n";
    $ccHeaders .= "Content-Type: text/plain; charset=UTF-8\r\n";
    mail('berkbilek2020@gmail.com', $subject, $emailBody, $ccHeaders);

    http_response_code(200);
    echo json_encode(['success' => true, 'message' => 'Your message has been sent successfully.']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Failed to send email. Please try again later or contact us directly at info@berk-bilek.com']);
}
?>
