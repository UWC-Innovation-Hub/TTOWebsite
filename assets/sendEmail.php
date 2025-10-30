<?php
// Set content type to JSON as the response will be in JSON format
header('Content-Type: application/json');

// Email addresses
$to = 'tto@uwc.ac.za';
// $ccEmail = '';
// $bccEmail = '';

// Function to generate the current site URL
function url() {
    return sprintf(
        "%s://%s",
        isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' ? 'https' : 'http',
        $_SERVER['SERVER_NAME'] ?? 'localhost'
    );
}

// Process the form submission only if it's a POST request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Sanitize form inputs
    $name = htmlspecialchars(trim($_POST['contact_name']));
    $surname = htmlspecialchars(trim($_POST['contact_surname']));
    $phone = htmlspecialchars(trim($_POST['contact_number']));
    $email = filter_var(trim($_POST['contact_email']), FILTER_SANITIZE_EMAIL);
    $contact_message = htmlspecialchars(trim($_POST['contact_message']));

    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(["status" => "error", "message" => "Invalid email address."]);
        exit;
    }

    // Prepare the email to tto@uwc.ac.za
    $subject = "Contact Form Submission";
    $message = "
        <p>You have received a new message from your contact form:</p>
        <p><strong>Name:</strong> $name $surname</p>
        <p><strong>Phone:</strong> $phone</p>
        <p><strong>Email:</strong> $email</p>
        <p><strong>Message:</strong><br>" . nl2br($contact_message) . "</p>
        <br>
        <small>This email was sent from your site: " . url() . "</small>
    ";

    // Email headers for sending HTML email
    $headers = "From: no-reply-tto@uwc.ac.za\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Cc: $ccEmail\r\n";
    $headers .= "Bcc: $bccEmail\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";

    // Attempt to send the email
    $email_sent = mail($to, $subject, $message, $headers);

    // Send acknowledgment to user
    if ($email_sent) {
        $ack_subject = "Thank You for Your Submission";
        $ack_message = "
            <p>Dear $name $surname,</p>
            <p>Thank you for contacting us. We have received your message and will get back to you soon. If you do not get a reply within 24 hours, you can call us.</p>
            <p><strong>Here is a copy of your message:</strong></p>
            <p><strong>Name:</strong> $name $surname</p>
            <p><strong>Phone:</strong> $phone</p>
            <p><strong>Email:</strong> $email</p>
            <p><strong>Message:</strong><br>" . nl2br($contact_message) . "</p>
            <br>
            <small>This is an automated message, please do not reply.</small>
        ";

        $ack_headers = "From: no-reply-uih@uwc.ac.za\r\n";
        $ack_headers .= "Content-Type: text/html; charset=UTF-8\r\n";

        mail($email, $ack_subject, $ack_message, $ack_headers);

        echo json_encode(["status" => "success", "message" => "Your message has been sent successfully. Please check your email for confirmation."]);
    } else {
        echo json_encode(["status" => "error", "message" => "Something went wrong. Please try again."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method."]);
}
?>