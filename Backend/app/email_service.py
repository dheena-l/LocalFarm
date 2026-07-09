import os
import resend

resend.api_key = os.getenv("RESEND_API_KEY")

EMAIL_ADDRESS = os.getenv("EMAIL_ADDRESS", "dheenadhayalan201@gmail.com")
FROM_EMAIL = os.getenv("FROM_EMAIL", "onboarding@resend.dev")
FROM_NAME = os.getenv("FROM_NAME", "Local Farm")


def send_contact_email(name, email, phone, message):
    if not resend.api_key:
        raise RuntimeError("RESEND_API_KEY is not configured")

    resend.Emails.send({
        "from": f"{FROM_NAME} <{FROM_EMAIL}>",
        "to": [EMAIL_ADDRESS],
        "subject": "New Contact Form",
        "text": f"""
Name: {name}

Email: {email}

Phone: {phone}

Message:
{message}
"""
    })