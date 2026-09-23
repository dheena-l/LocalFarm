import os
from html import escape

import resend

from app.config import load_backend_env

load_backend_env()

RESEND_API_KEY = os.getenv("RESEND_API_KEY")
TO_EMAIL = (
    os.getenv("EMAIL_ADDRESS")
    or os.getenv("TO_EMAIL")
    or os.getenv("RESEND_TO_EMAIL")
    or "dheenadhayalan201@gmail.com"
)
FROM_EMAIL = (
    os.getenv("FROM_EMAIL")
    or os.getenv("RESEND_FROM_EMAIL")
    or "onboarding@resend.dev"
)
FROM_NAME = os.getenv("FROM_NAME", "Local Farm")

resend.api_key = RESEND_API_KEY


def _require_resend_config():
    if not RESEND_API_KEY:
        raise RuntimeError("RESEND_API_KEY is not configured")

    if not TO_EMAIL:
        raise RuntimeError("TO_EMAIL/EMAIL_ADDRESS is not configured")

    if not FROM_EMAIL:
        raise RuntimeError("FROM_EMAIL is not configured")


def _html_line_breaks(value):
    return escape(value).replace("\n", "<br>")


def _send_email(subject, html, reply_to=None):
    _require_resend_config()

    params: resend.Emails.SendParams = {
        "from": f"{FROM_NAME} <{FROM_EMAIL}>",
        "to": [TO_EMAIL],
        "subject": subject,
        "html": html,
    }

    if reply_to:
        params["reply_to"] = reply_to

    try:
        email = resend.Emails.send(params)
        print(email)
        return email
    except Exception as exc:
        raise RuntimeError(f"Failed to send email: {exc}") from exc


def send_contact_email(name, email, phone, message):
    subject_name = " ".join(name.split())

    html_content = f"""
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #222;">
      <h2>New Contact Us Message</h2>
      <p><strong>Name:</strong> {escape(name)}</p>
      <p><strong>Email:</strong> {escape(email)}</p>
      <p><strong>Phone:</strong> {escape(phone)}</p>
      <hr />
      <p><strong>Message:</strong></p>
      <p>{_html_line_breaks(message)}</p>
    </div>
    """

    return _send_email(
        subject=f"New Contact Us Message from {subject_name}",
        html=html_content,
        reply_to=email,
    )


def send_enquiry_email(product_id, name, email, phone, message):
    subject_name = " ".join(name.split())

    html_content = f"""
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #222;">
      <h2>New Product Enquiry</h2>
      <p><strong>Product ID:</strong> {escape(str(product_id))}</p>
      <p><strong>Name:</strong> {escape(name)}</p>
      <p><strong>Email:</strong> {escape(email)}</p>
      <p><strong>Phone:</strong> {escape(phone)}</p>
      <hr />
      <p><strong>Message:</strong></p>
      <p>{_html_line_breaks(message)}</p>
    </div>
    """

    return _send_email(
        subject=f"New Product Enquiry from {subject_name}",
        html=html_content,
        reply_to=email,
    )
