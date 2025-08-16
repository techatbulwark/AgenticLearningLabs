'''from fastapi import APIRouter

email_router = APIRouter()

import aiosmtplib
from email.message import EmailMessage
from models import InquiryBody

@email_router.post("/send_inquiry")
async def send_email(inq: InquiryBody):
    msg = EmailMessage()
    msg["From"] = "inquiry@agenticlearninglabs.com"
    msg["To"] = "jennifer@bulwarkimpact.org"
    msg["Subject"] = f"{inq.first_name} {inq.last_name} submitted an inquiry"
    msg.set_content(f"Name: {inq.first_name} {inq.last_name}\nEmail: {inq.email}\nMessage: {inq.message}")

    print(msg)

    await aiosmtplib.send(
        msg,
        hostname="smtp.office365.com",
        port=587,
        start_tls=True,
        username="jennifer@bulwarkimpact.org",
        password="Votmdnjem!2",
    )

    return {"status": "Email sent successfully"}
'''
from fastapi import APIRouter, HTTPException
import aiosmtplib
import ssl
from email.message import EmailMessage
from models import InquiryBody
import os

email_router = APIRouter()

# Load credentials from environment variables
SMTP_USERNAME = 'agenticlearinglabs@gmail.com'  # your Hotmail/Outlook email
SMTP_PASSWORD = 'rljz kkyq vers upnx'  # your app password or account password
SMTP_HOST = "smtp.gmail.com"
SMTP_PORT = 587


@email_router.post("/send_inquiry")
async def send_email(inq: InquiryBody):
    msg = EmailMessage()
    msg["From"] = SMTP_USERNAME
    msg["To"] = "jennifer@bulwarkimpact.org"
    msg["Subject"] = f"{inq.first_name} {inq.last_name} submitted an inquiry"
    msg.set_content(
        f"Name: {inq.first_name} {inq.last_name}\n"
        f"Email: {inq.email}\n"
        f"Message: {inq.message}"
    )

    try:
        # Create a secure SSL context
        ssl_context = ssl.create_default_context()

        await aiosmtplib.send(
            msg,
            hostname=SMTP_HOST,
            port=SMTP_PORT,
            start_tls=True,
            username=SMTP_USERNAME,
            password=SMTP_PASSWORD,
            tls_context=ssl_context,
        )

        return {"status": "Email sent successfully"}

    except aiosmtplib.errors.SMTPException as e:
        raise HTTPException(status_code=500, detail=f"SMTP error: {str(e)}")
    except ssl.SSLError as e:
        raise HTTPException(status_code=500, detail=f"SSL error: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}")
