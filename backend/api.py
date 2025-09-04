from fastapi import APIRouter

from models import Registration, PrereqResponse
from database import get_client
from config import settings

REGISTRATION_TABLE = 'sdf_registrations'
PREREQ_TABLE = 'prereq_responses'
TEST_TABLE = 'sdf_test'

router = APIRouter()

@router.post('/register')
def register(registration: Registration):
    try:
        supabase = get_client()
        response = (
            supabase.table(TEST_TABLE)
            .insert({
                'last_name': registration.last_name,
                'first_name': registration.first_name,
                'pref_name': registration.pref_name,
                'dob': registration.dob,
                'pref_language': registration.pref_language,
                'pref_communication': registration.pref_communication,
                'unit_num': registration.unit_num,
                'street_num': registration.street_num,
                'street_name': registration.street_name,
                'city': registration.city,
                'province': registration.province,
                'postal_code': registration.postal_code,
                'po_box': registration.po_box,
                'primary_phone': registration.primary_phone,
                'phone_num': registration.phone_num,
                'phone_num': registration.phone_num,
                'email': registration.email,
                'source_income': registration.source_income,
                'education': registration.education,
                'signature_name': registration.signature_name,
                'signature_date': registration.signature_date,
                'course_selection': registration.course_selection,
                'referral_question': registration.referral_question,
            }).execute()
        )
        return response
    except Exception as e:
        print(f'Error occurred during POST operation to database: {e}')

@router.post('/prereq')
def submitPrereq(response: PrereqResponse):
    try:
        supabase = get_client()
        response = (
            supabase.table(PREREQ_TABLE)
            .insert({
                'in_person_availability': response.in_person,
                'complete_online_programs': response.online_programs,
                'email': response.email,
            }).execute()
        )
        return response
    except Exception as e:
        print(e)


