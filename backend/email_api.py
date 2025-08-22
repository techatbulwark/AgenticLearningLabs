from fastapi import APIRouter, HTTPException
from email.message import EmailMessage
import aiosmtplib
import ssl

from models import InquiryBody, Email
from config import settings

email_router = APIRouter()

@email_router.post("/send_inquiry")
async def send_email(inq: InquiryBody):
    msg = EmailMessage()
    msg["From"] = settings.smtp_user
    msg["To"] = settings.recipient_email
    msg["Subject"] = f"AGENTIC LEARNING LABS: New inquiry from {inq.first_name} {inq.last_name}"
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
            hostname=settings.smtp_host,
            port=settings.smtp_port,
            start_tls=True,
            username=settings.smtp_user,
            password=settings.smtp_password,
            tls_context=ssl_context,
        )
        return {"status": "Email sent successfully"}

    except aiosmtplib.errors.SMTPException as e:
        raise HTTPException(status_code=500, detail=f"SMTP error: {str(e)}")
    except ssl.SSLError as e:
        raise HTTPException(status_code=500, detail=f"SSL error: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}")

@email_router.post("/course_updates")
async def course_updates(email: Email):
    msg = EmailMessage()
    msg["From"] = settings.smtp_user
    msg["To"] = settings.recipient_email
    msg["Subject"] = f"AGENTIC LEARNING LABS: Course update subscription from {email.email}"
    msg.set_content( f"Participant subscribed to receive updates on Agentics Learning Labs courses and training via {email.email}" )
    try:
        # Create a secure SSL context
        ssl_context = ssl.create_default_context()
        await aiosmtplib.send(
            msg,
            hostname=settings.smtp_host,
            port=settings.smtp_port,
            start_tls=True,
            username=settings.smtp_user,
            password=settings.smtp_password,
            tls_context=ssl_context,
        )
        return {"status": "Email sent successfully"}

    except aiosmtplib.errors.SMTPException as e:
        raise HTTPException(status_code=500, detail=f"SMTP error: {str(e)}")
    except ssl.SSLError as e:
        raise HTTPException(status_code=500, detail=f"SSL error: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}")

@email_router.post("/participant_accomodation")
async def participant_accomodation(email: Email):
    msg = EmailMessage()
    msg["From"] = settings.smtp_user
    msg["To"] = settings.recipient_email
    msg["Subject"] = f"AGENTIC LEARNING LABS: Course accomodation request from {email.email}"
    msg.set_content( f"Participant has answered no to one or more of the prerequisite requirements and requested to receive accomodation via {email.email}" )
    try:
        # Create a secure SSL context
        ssl_context = ssl.create_default_context()
        await aiosmtplib.send(
            msg,
            hostname=settings.smtp_host,
            port=settings.smtp_port,
            start_tls=True,
            username=settings.smtp_user,
            password=settings.smtp_password,
            tls_context=ssl_context,
        )
        return {"status": "Email sent successfully"}

    except aiosmtplib.errors.SMTPException as e:
        raise HTTPException(status_code=500, detail=f"SMTP error: {str(e)}")
    except ssl.SSLError as e:
        raise HTTPException(status_code=500, detail=f"SSL error: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}")

