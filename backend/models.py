from pydantic import BaseModel

class Registration(BaseModel):
    last_name: str
    first_name: str
    pref_name: str
    dob: str
    pref_language: str
    pref_communication: str
    unit_num: str
    street_num: str
    street_name: str
    city: str
    province: str
    postal_code: str
    po_box: str
    primary_phone: str
    phone_num: str
    email: str
    source_income: str
    education: str
    signature_name: str
    signature_date: str
    course_selection: str
    referral_question: str
    

class PrereqResponse(BaseModel):
    in_person: str
    online_programs: str
    email: str

class InquiryBody(BaseModel):
    first_name: str
    last_name: str
    email: str
    message: str

class Email(BaseModel):
    email: str