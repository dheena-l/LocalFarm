import os
from html import escape

import resend

from app.config import load_backend_env

load_backend_env()

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

    safe_name = escape(name)
    safe_email = escape(email)
    safe_phone = escape(phone)
    safe_message = escape(message).replace("\n", "<br>")
    subject_name = " ".join(name.split())

    html_content = f"""
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> {safe_name}</p>
        <p><strong>Email:</strong> {safe_email}</p>
        <p><strong>Phone:</strong> {safe_phone}</p>
        <hr />
        <h3>Message:</h3>
        <p>{safe_message}</p>
    </div>
    """

    try:
        params = {
            "from": f"{FROM_NAME} <{FROM_EMAIL}>",
            "to": [EMAIL_ADDRESS],
            "subject": f"New Contact Form Submission from {subject_name}",
            "html": html_content,
            "reply_to": email,
        }
        
        email_response = resend.Emails.send(params)
        return email_response
    except Exception as exc:
        raise RuntimeError(f"Failed to send email: {exc}") from exc
