import os
import resend

resend.api_key = os.getenv("RESEND_API_KEY")

EMAIL_ADDRESS = os.getenv("EMAIL_ADDRESS")


def send_contact_email(name, email, phone, message):

    resend.Emails.send({
        "from": "Local Farm <onboarding@resend.dev>",
        "to": "dheenadhayalan201@gmail.com",
        "subject": "New Contact Form",
        "text": f"""
Name: {name}

Email: {email}

Phone: {phone}

Message:
{message}
"""
    })