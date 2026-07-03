import smtplib

from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

from dotenv import load_dotenv

import os

load_dotenv()

EMAIL_ADDRESS = os.getenv(
    "EMAIL_ADDRESS"
)

EMAIL_PASSWORD = os.getenv(
    "EMAIL_PASSWORD"
)


def send_contact_email(
    name,
    email,
    phone,
    message
): 

    msg = MIMEMultipart()

    msg["From"] = EMAIL_ADDRESS

    msg["To"] = EMAIL_ADDRESS

    msg["Subject"] = "New Contact Form"

    body = f"""
Name: {name}

Email: {email}

Phone: {phone}

Message:

{message}
"""

    msg.attach(
        MIMEText(body, "plain")
    )

    server = smtplib.SMTP(
        "smtp.gmail.com",
        587
    )

    server.starttls()

    server.login(
        EMAIL_ADDRESS,
        EMAIL_PASSWORD
    )

    server.send_message(msg)

    server.quit()