from fastapi import APIRouter

from models import Registration, PrereqResponse
from database import get_client
from config import settings

REGISTRATION_TABLE = 'sdf_registrations'
PREREQ_TABLE = 'prereq_responses'

router = APIRouter()

@router.post('/register')
def register(registration: Registration):
    try:
        supabase = get_client()
        response = (
            supabase.table(REGISTRATION_TABLE)
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
                'alt_unit_num': registration.alt_unit_num,
                'alt_street_num': registration.alt_street_num,
                'alt_street_name': registration.alt_street_name,
                'alt_city': registration.alt_city,
                'alt_province': registration.alt_province,
                'alt_postal_code': registration.alt_postal_code,
                'alt_po_box': registration.alt_po_box,
                'primary_phone': registration.primary_phone,
                'phone_num': registration.phone_num,
                'alt_phone': registration.alt_phone,
                'alt_phone_num': registration.alt_phone_num,
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
                'emp_currently_employed': registration.emp_currently_employed,
                'emp_country': registration.emp_country,
                'pref_wage_method': registration.pref_wage_method,
                'wage_amount': registration.wage_amount,
                'hourly_wage': registration.hourly_wage,
                'paid_hours_week': registration.paid_hours_week,
                'reason_leaving': registration.reason_leaving,
                'additional_emp_type': registration.additional_emp_type,
                'additional_emp_name': registration.additional_emp_name,
                'additional_job_title': registration.additional_job_title,
                'additional_emp_start_date': registration.additional_emp_start_date,
                'additional_emp_end_date': registration.additional_emp_end_date,
                'additional_currently_employed': registration.additional_currently_employed,
                'additional_emp_country': registration.additional_emp_country,
                'additional_pref_wage_method': registration.additional_pref_wage_method,
                'additional_wage_amount': registration.additional_wage_amount,
                'additional_hourly_wage': registration.additional_hourly_wage,
                'additional_paid_hours_week': registration.additional_paid_hours_week,
                'additional_reason_leaving': registration.additional_reason_leaving,
                'noc': registration.noc,
                'naics': registration.naics,
                'service_acknowledge': registration.service_acknowledge,
                'service_participant_name': registration.service_participant_name,
                'service_participant_date': registration.service_participant_date,
                'service_guardian_name': registration.service_guardian_name,
                'service_guardian_date': registration.service_guardian_date,
                'ministry_acknowledge': registration.ministry_acknowledge,
                'ministry_participant_name': registration.ministry_participant_name,
                'ministry_participant_date': registration.ministry_participant_date,
                'ministry_guardian_name': registration.ministry_guardian_name,
                'ministry_guardian_date': registration.ministry_guardian_date,
                'course_selection': registration.course_selection,
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


