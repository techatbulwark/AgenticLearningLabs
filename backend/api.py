from fastapi import APIRouter

from database import get_client
from models import Registration, PrereqResponse, Test

REGISTRATION_TABLE = 'sdf_registrations'
PREREQ_TABLE = 'prereq_responses'
SDF_TABLE = 'sdf_test'
TEST_TABLE = 'test_table'

router = APIRouter()

@router.post('/register')
def register(registration: Registration):
    try:
        supabase = get_client()
        response = (
            supabase.table(SDF_TABLE)
            .insert({
                'last_name': registration.last_name,
                'first_name': registration.first_name,
                'middle_initial': registration.middle_initial,
                'pref_name': registration.pref_name,
                'dob': registration.dob,
                'gender': registration.gender,
                'transgender': registration.transgender,
                'status_canada': registration.status_canada,
                'country_origin': registration.country_origin,
                'date_entry_canada': registration.date_entry_canada,
                'pref_language': registration.pref_language,
                'pref_communication': registration.pref_communication,
                'marital_status': registration.marital_status,
                'unit_num': registration.unit_num,
                'street_num': registration.street_num,
                'street_name': registration.street_name,
                'city': registration.city,
                'province': registration.province,
                'postal_code': registration.postal_code,
                'po_box': registration.po_box,
                'primary_phone': registration.primary_phone,
                'phone_num': registration.phone_num,
                'email': registration.email,
                'labour_force': registration.labour_force,
                'source_income': registration.source_income,
                'sin_num': registration.sin_num,
                'desg_group': registration.desg_group,
                'education': registration.education,
                'emp_type': registration.emp_type,
                'emp_name': registration.emp_name,
                'job_title': registration.job_title,
                'emp_start_date': registration.emp_start_date,
                'emp_end_date': registration.emp_end_date,
                'emp_country': registration.emp_country,
                'pref_wage_method': registration.pref_wage_method,
                'wage_amount': registration.wage_amount,
                'hourly_wage': registration.hourly_wage,
                'paid_hours_week': registration.paid_hours_week,
                'reason_leaving': registration.reason_leaving,
                'date_registration': registration.date_registration,
                'noc': registration.noc,
                'naics': registration.naics,
            }).execute()
        )
        return response
    except:
        print('Error occurred during POST operation to database')

@router.post('/prereq')
def submitPrereq(response: PrereqResponse):
    try:
        supabase = get_client()
        response = (
            supabase.table(PREREQ_TABLE)
            .insert({
                'has_ai_experience': response.ai_experence,
                'in_person_availability': response.in_person,
                'complete_online_programs': response.online_programs,
                'meets_computer_requirements': response.computer_req,
                'is_business_owner': response.business_owner,
                'email': response.email,
            }).execute()
        )
        return response
    except Exception as e:
        print(e)



@router.post('/test')
def test(test: Test):
    try:
        supabase = get_client()
        response = (
            supabase.table(TEST_TABLE)
            .insert({
                'first_name': test.first_name,
                'last_name': test.last_name,
            }).execute()
        )
        return response
    except Exception as e:
        print(e)

