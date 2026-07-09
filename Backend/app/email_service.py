import json
import os
from urllib import error, request

from dotenv import load_dotenv

load_dotenv()

RESEND_API_KEY = os.getenv("RESEND_API_KEY")
EMAIL_ADDRESS = os.getenv("EMAIL_ADDRESS", "dheenadhayalan201@gmail.com")
FROM_EMAIL = os.getenv("FROM_EMAIL", "onboarding@resend.dev")
FROM_NAME = os.getenv("FROM_NAME", "Local Farm")


def send_contact_email(name, email, phone, message):
    if not RESEND_API_KEY:
        raise RuntimeError("RESEND_API_KEY is not configured")

    payload = {
        "from": f"{FROM_NAME} <{FROM_EMAIL}>",
        "to": [EMAIL_ADDRESS],
        "subject": "New Contact Form",
        "text": f"""
Name: {name}

Email: {email}

Phone: {phone}

Message:
{message}
""",
    }

    req = request.Request(
        "https://api.resend.com/emails",
        data=json.dumps(payload).encode("utf-8"),
        headers={
            "Authorization": f"Bearer {RESEND_API_KEY}",
            "Content-Type": "application/json",
        },
        method="POST",
    )

    try:
        with request.urlopen(req, timeout=20) as response:
            response.read()
    except error.HTTPError as exc:
        body = exc.read().decode("utf-8", errors="ignore")
        raise RuntimeError(f"Resend API rejected the request: {body}") from exc
    except Exception as exc:
        raise RuntimeError(f"Failed to send email: {exc}") from exc