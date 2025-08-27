from fastapi import APIRouter, HTTPException
from email.message import EmailMessage
import aiosmtplib
import ssl
import resend

from models import InquiryBody, Email
from config import settings

email_router = APIRouter()

@email_router.post("/send_inquiry")
async def send_email(inq: InquiryBody):
    try:
        resend.api_key = settings.resend_key
        r = resend.Emails.send({
        "from": settings.resend_sender,
        "to": settings.resend_recipients_list,
        "subject": f"AGENTIC LEARNING LABS: New inquiry from {inq.email}",
        "html": f"""<p>Name: {inq.first_name} {inq.last_name}<br />Email: {inq.email}<br />Message:{inq.message}</p>"""
        })        
        return {"status": "Email sent successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}")

@email_router.post("/course_updates")
async def course_updates(email: Email):
    
    try:
        resend.api_key = settings.resend_key
        r = resend.Emails.send({
        "from": settings.resend_sender,
        "to": settings.resend_recipients_list,
        "subject": f"AGENTIC LEARNING LABS: Course update subscription from {email.email}",
        "html": f"""<p>Participant subscribed to receive updates on Agentics Learning Labs courses and training via {email.email}</p>"""
        })        
        return {"status": "Email sent successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}")

@email_router.post("/participant_accomodation")
async def participant_accomodation(email: Email):
    try:
        resend.api_key = settings.resend_key
        r = resend.Emails.send({
        "from": settings.resend_sender,
        "to": settings.resend_recipients_list,
        "subject": f"AGENTIC LEARNING LABS: Course accomodation request from {email.email}",
        "html": f"""<p>Participant has answered no to one or more of the prerequisite requirements and requested to receive accomodation via {email.email}</p>"""
        })        
        return {"status": "Email sent successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}")
