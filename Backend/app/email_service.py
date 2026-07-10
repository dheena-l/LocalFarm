import os
import resend
from dotenv import load_dotenv

load_dotenv()

RESEND_API_KEY = os.getenv("RESEND_API_KEY")
EMAIL_ADDRESS = (
    os.getenv("EMAIL_ADDRESS")
    or os.getenv("TO_EMAIL")
    or os.getenv("RESEND_TO_EMAIL")
    or "dheenadhayalan201@gmail.com"
)
FROM_EMAIL = (
    os.getenv("FROM_EMAIL")
    or os.getenv("RESEND_FROM_EMAIL")
    or "noreply@resend.dev"
)
FROM_NAME = os.getenv("FROM_NAME", "Local Farm")

# Set Resend API key
resend.api_key = RESEND_API_KEY


def send_contact_email(name, email, phone, message):
    if not RESEND_API_KEY:
        raise RuntimeError("RESEND_API_KEY is not configured")

    html_content = f"""
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> {name}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Phone:</strong> {phone}</p>
        <hr />
        <h3>Message:</h3>
        <p>{message.replace(chr(10), '<br>')}</p>
    </div>
    """

    try:
        params = {
            "from": f"{FROM_NAME} <{FROM_EMAIL}>",
            "to": [EMAIL_ADDRESS],
            "subject": f"New Contact Form Submission from {name}",
            "html": html_content,
        }
        
        email_response = resend.Emails.send(params)
        return email_response
    except Exception as exc:
        raise RuntimeError(f"Failed to send email: {exc}") from exc