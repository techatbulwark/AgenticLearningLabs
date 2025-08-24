import { lazy, useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.MODE === 'production' 
  ? import.meta.env.VITE_PROD_API : import.meta.env.VITE_DEV_API;

const FORM_CONFIG = {
  personalInfo: {
    title: "Personal Information",
    fields: [
      {
        id: "lastName",
        label: "Last name", 
        type: "text",
        required: true,
        gridClass: "lg:col-span-2"
      },
      {
        id: "firstName",
        label: "First name",
        type: "text",
        required: true,
        gridClass: "lg:col-span-2"
      },
      {
        id: "middleInitial",
        label: "Middle initial",
        type: "text",
        maxLength: 1,
        gridClass: "lg:col-span-1"
      },
      {
        id: "prefName",
        label: "Preferred name",
        type: "text",
        gridClass: "lg:col-span-2"
      },
      {
        id: "dob",
        label: "Date of birth",
        type: "date",
        required: true,
        gridClass: "lg:col-span-1"
      },
      {
        id: "gender",
        label: "I identify as:",
        type: "radio",
        required: true,
        gridClass: "col-span-full",
        options: [
          { value: "Man", label: "Man" },
          { value: "Woman", label: "Woman" },
          { value: "Gender non-binary", label: "Gender non-binary" },
          { value: "two_spirit", label: "Two-spirit" },
          { value: "other", label: "Another gender identity (specify)", hasInput: true },
          { value: "prefer_not_to_answer", label: "Prefer not to answer" },
        ],
      },
      {
        id: "transgender_definition",
        label: "Transgender is an umbrella term that refers to people whose gender identity, expression or behaviour is different from those typically associated with their assigned sex at birth. Identities considered to fall under this umbrella can include trans, transsexual, non-binary, gender fluid, and genderqueer - as well as many more.",
        type: "paragraph",
        style: "italic",
        gridClass: "col-span-full",

      },
      {
        id: "transgender",
        label: "Do you identify as transgender? (optional)",
        type: "radio",
        gridClass: "col-span-full",
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
          { value: "questioning", label: "Questioning" },
          { value: "prefer_not_to_answer", label: "Prefer not to answer" }
        ],
      },
      {
        id: "statusCanada",
        label: "Status in Canada:",
        type: "radio",
        required: true,
        gridClass: "col-span-full",
        options: [
          { value: "canadian_citizen", label: "Canadian citizen" },
          { value: "permanent_resident", label: "Permanent resident" },
          { value: "naturalized_canadian_citizen", label: "Naturalized Canadian citizen" },
          { value: "protected_persons", label: "Protected Persons" },
          { value: "prefer_not_to_say", label: "Prefer not to say" },
          { value: "other", label: "Other", hasInput: true },
        ]
      },
      {
        id: "immigratedToCanada",
        label: "If you have immigrated to Canada, please indicate:",
        type: "paragraph",
        gridClass: "col-span-full",

      },
      {
        id: "countryOrigin",
        label: "Country of origin",
        type: "text",
        gridClass: "lg:col-span-3"
      },
      {
        id: "dateEntryCanada",
        label: "Date of entry into Canada",
        type: "date",
        gridClass: "lg:col-span-2"
      },
      {
        id: "prefLanguage",
        label: "Preferred language:",
        type: "radio",
        required: true,
        gridClass: "col-span-full",
        options: [
          { value: "english", label: "English" },
          { value: "french", label: "French" },
        ]
      },
      {
        id: "prefCommunication",
        label: "Preferred communication:",
        type: "radio",
        required: true,
        gridClass: "col-span-full",
        options: [
          { value: "phone", label: "Phone" },
          { value: "email", label: "Email" },
          { value: "hardCopy", label: "Hard copy" },
        ]
      },
      {
        id: "maritalStatus",
        label: "Marital status:",
        type: "radio",
        required: true,
        gridClass: "col-span-full",
        options: [
          { value: "married", label: "Married" },
          { value: "common_law", label: "Common law" },
          { value: "separated", label: "Separated" },
          { value: "divorced", label: "Divorced" },
          { value: "widowed", label: "Widowed" },
          { value: "single", label: "Single" },
          { value: "prefer_not_to_say", label: "Prefer not to say" },
        ]
      },
    ]
  },  
  addresscontactInfo: {
    title: "Participant Address and Contact Information",
    fields: [
      {
        id: "primary_mailing_address",
        label: "Primary Mailing Address",
        type: "paragraph",
        style: "bold",
        gridClass: "col-span-full",
      },
      {
        id: "unitNum",
        label: "Unit number",
        type: "number",
        gridClass: "lg:col-span-1"
      },
      {
        id: "streetNum", 
        label: "Street number",
        type: "number",
        required: true,
        gridClass: "lg:col-span-1"
      },
      {
        id: "streetName",
        label: "Street name", 
        type: "text",
        required: true,
        gridClass: "lg:col-span-2"
      },
      {
        id: "poBox",
        label: "P.O. box",
        type: "text",
        gridClass: "lg:col-span-1"
      },
      {
        id: "city",
        label: "City",
        type: "text",
        required: true,
        gridClass: "lg:col-span-2"
      },
      {
        id: "province",
        label: "Province",
        type: "text",
        required: true,
        gridClass: "lg:col-span-2"
      },
      {
        id: "postalCode",
        label: "Postal code",
        type: "text",
        required: true,
        gridClass: "lg:col-span-1"
      },
      {
        id: "altMailingAddress",
        label: "Alternate Mailing Address",
        type: "paragraph",
        style: "bold",
        gridClass: "col-span-full",
      },
      {
        id: "altUnitNum",
        label: "Unit number",
        type: "number",
        gridClass: "lg:col-span-1"
      },
      {
        id: "altStreetNum", 
        label: "Street number",
        type: "number",
        gridClass: "lg:col-span-1"
      },
      {
        id: "altStreetName",
        label: "Street name", 
        type: "text",
        gridClass: "lg:col-span-2"
      },
      {
        id: "altPoBox",
        label: "P.O. box",
        type: "text",
        gridClass: "lg:col-span-1"
      },
      {
        id: "altCity",
        label: "City",
        type: "text",
        gridClass: "lg:col-span-2"
      },
      {
        id: "altProvince",
        label: "Province",
        type: "text",
        gridClass: "lg:col-span-1"
      },
      {
        id: "altPostalCode",
        label: "Postal code",
        type: "text",
        gridClass: "lg:col-span-1"
      },
      {
        id: "primaryPhone",
        label: "Primary phone number",
        type: "radio",
        required: true,
        gridClass: "col-span-3",
        options: [
          { value: "home", label: "Home" },
          { value: "mobile", label: "Mobile" },
          { value: "other", label: "Other" },
        ]
      },
      {
        id: "phoneNum",
        label: "Telephone number",
        type: "text",
        required: true,
        maxLength: 11,
        gridClass: "lg:col-span-2"
      },
      {
        id: "altPhone",
        label: "Alternate phone number",
        type: "radio",
        gridClass: "col-span-3",
        options: [
          { value: "home", label: "Home" },
          { value: "mobile", label: "Mobile" },
          { value: "other", label: "Other" },
        ]
      },
      {
        id: "altPhoneNum",
        label: "Telephone number",
        type: "text",
        maxLength: 15,
        gridClass: "lg:col-span-2"
      },
      {
        id: "email",
        label: "Email",
        type: "email",
        gridClass: "lg:col-span-full"
      },
    ]
  },
  profileInfo: {
    title: "Profile Information",
    fields: [
      {
        id: "labourForce",
        label: "Labour force attachment",
        type: "radio",
        required: true,
        gridClass: "col-span-full ",
        options: [
          { value: "employed", label: "Employed" },
          { value: "self_employed", label: "Self-employed" },
          { value: "employed_on_leave", label: "Employed, but currently on a leave" },
          { value: "unemployed", label: "Unemployed" },
          { value: "not_employed_looking", label: "Not employed and looking for work" },
          { value: "not_employed_offer", label: "Not employed with an employment offer" },
          { value: "not_employed_not_looking", label: "Not employed and not looking for work" },
          { value: "not_employed_unable", label: "Not employed and unable to work" },
          { value: "attending_school_elementary_highschool", label: "Attending a school (elementary, high school or equivalent)" },
          { value: "attending_university", label: "Attending a university" },
          { value: "attending_college", label: "Attending a college" },
          { value: "registered_apprenticeship_program", label: "Registered in an apprenticeship program" },
          { value: "training_skills_development_program", label: "In other training or skills development program" },
          { value: "not_sure", label: "Not sure" },
          { value: "prefer_not_to_say", label: "Prefer not to say" },
        ]
      },
      {
        id: "sourceIncome",
        label: "Source of income",
        type: "radio",
        required: true,
        gridClass: "col-span-full ",
        options: [
          { value: "employment_insurance", label: "Employment Insurance (EI) *" },
          { value: "ontario_works", label: "Ontario Works (OW)" },
          { value: "crown_ward_extended_care_maintenance", label: "Crown Ward Extended Care and Maintenance" },
          { value: "dependent_ow_odsp", label: "Dependent of OW/ODSP" },
          { value: "no_income", label: "No income" },
          { value: "employed_with_employer", label: "Employed with employer" },
          { value: "self_employed", label: "Self-Employed" },
          { value: "non_ei", label: "Non-EI (other)", },
          { value: "other", label: "Other", hasInput: true },
        ]
      },
      {
        id: "selected_ei",
        label: "*Note for individuals who selected EI: Your Social Insurance Number will be used by Canada to help monitor and assess the EI program and the Service Provider to request approval to continue to receive regular EI benefits in order to take part in training programs and other employment activities.",
        type: "paragraph",
        style: "italic",
        gridClass: "col-span-full",
      },
      {
        id: "sinNum",
        label: "Social insurance number",
        type: "text",
        required: true,
        maxLength: 9,
        gridClass: "lg:col-span-2"
      },
      {
        id: "desgGroup",
        label: "Please complete if you wish to self-identify as a member of a designated group(s). Your response to this question is entirely voluntary and will not affect your eligibility. This information will be used by the Governments of Ontario and Canada for policy analysis and statistical purposes related to employment programs and services. (You may select more than one option):",
        type: "radio",
        gridClass: "col-span-full ",
        options: [
          { value: "women", label: "Women" },
          { value: "indigenous", label: "Indigenous Peoples" },
          { value: "persons-with-disabilities", label: "Persons with Disabilities" },
          { value: "visible-minorities", label: "Visible Minorities" },
          { value: "newcomers", label: "Newcomers to Canada" },
          { value: "youth", label: "Youth" },
          { value: "older-workers", label: "Older Workers" },
          { value: "none", label: "None" }
        ]
      },
    ]
  },
  education: {
    title: "Education",
    fields: [
      {
        id: "education",
        label: "Indicate your highest level of education/qualification:",
        type: "radio",
        required: true,
        gridClass: "col-span-full ",
        options: [
          { value: "0_8", label: "Grade 0 - 8" },
          { value: "9", label: "Grade 9" },
          { value: "10", label: "Grade 10" },
          { value: "11", label: "Grade 11" },
          { value: "12", label: "Grade 12 (or equivalent)" },
          { value: "oac", label: "OAC" },
          { value: "certificate_apprenticeship", label: "Certificate of Apprenticeship" },
          { value: "journeyperson", label: "Journeyperson" },
          { value: "certificate_diploma", label: "Certificate/Diploma" },
          { value: "bachelors_degree", label: "Bachelor's Degree" },
          { value: "post_graduate", label: "Post Graduate" },
          { value: "other", label: "Other" },
        ]
      },
    ]
  },
  employment: {
    title: "Employment",
    fields: [
      {
        id: "selectedEI",
        label: "List your work experience, including volunteer work. Start with the most recent job/volunteer activity",
        type: "paragraph",
        gridClass: "col-span-full",
      },
      {
        id: "workExperience",
        label: "Work experience 1",
        type: "paragraph",
        style: "bold",
        gridClass: "col-span-full",
      },
      {
        id: "empType",
        label: "Employment type",
        type: "radio",
        gridClass: "col-span-full",
        options: [
          { value: "paid", label: "Paid" },
          { value: "self_employed", label: "Self-Employed" },
          { value: "unpaid", label: "Unpaid" },
          { value: "volunteer", label: "Volunteer" },
        ]
      },
      {
        id: "empName",
        label: "Name of employer",
        type: "text",
        gridClass: "col-span-full",
      },
      {
        id: "jobTitle",
        label: "Job Title/Duties",
        type: "text",
        gridClass: "col-span-full",
      },
      {
        id: "empStartDate",
        label: "Employment start date",
        type: "date",
        gridClass: "col-span-2",
      },
      {
        id: "empEndDate",
        label: "Employment end date", 
        type: "date",
        hideWhen: "empCurrentlyEmployed",
        gridClass: "col-span-2",
      },
      {
        id: "empCurrentlyEmployed",
        label: "Currently employed",
        type: "checkbox",
        gridClass: "col-span-1"
      },
      {
        id: "empCountry",
        label: "Country of employment",
        type: "text",
        gridClass: "col-span-full",
      },
      {
        id: "prefWageMethod",
        label: "Preferred method of reporting wage:",
        type: "radio",
        gridClass: "col-span-full",
        options: [
          { value: "hourly", label: "Hourly" },
          { value: "weekly", label: "Weekly" },
          { value: "biweekly", label: "Bi-weekly" },
          { value: "monthly", label: "Monthly" }
        ]
      },
      {
        id: "wageAmount",
        label: "Wage amount ($)",
        type: "number",
        required: true,
        gridClass: "col-span-3",
        step: "0.01"
      },
      {
        id: "hourlyWage",
        label: "Hourly wage (including tips and commissions) ($)",
        type: "number",
        required: true,
        gridClass: "col-span-3",
        step: "0.01"
      },
      {
        id: "paidHoursWeek",
        label: "Average paid hours per week (excluding overtime)",
        type: "number",
        required: true,
        gridClass: "col-span-3",
        step: "0.1"
      },
      {
        id: "reasonLeaving",
        label: "Reason for leaving",
        type: "text",
        gridClass: "md:col-span-full"
      },      
      {
        id: "additionalWorkExperience",
        label: "Additional work experience (if applicable)",
        type: "paragraph",
        style: "bold",
        gridClass: "col-span-full",
      },
      {
        id: "additionalEmpType",
        label: "Employment type",
        type: "radio",
        gridClass: "col-span-full",
        options: [
          { value: "paid", label: "Paid Employment" },
          { value: "selfEmployed", label: "Self-employed" },
          { value: "unpaid", label: "Unpaid Work" },
          { value: "volunteer", label: "Volunteer Work" }
        ]
      },
      
      {
        id: "additionalEmpName",
        label: "Name of employer",
        type: "text",
        gridClass: "col-span-full",
      },
      {
        id: "additionalJobTitle",
        label: "Job Title",
        type: "text",
        gridClass: "col-span-full",
      },
      {
        id: "additionalEmpStartDate",
        label: "Employment start date",
        type: "date",
        gridClass: "col-span-2",
      },
      {
        id: "additionalEmpEndDate",
        label: "Employment end date", 
        type: "date",
        hideWhen: "additionalCurrentlyEmployed",
        gridClass: "col-span-2",
      },
      {
        id: "additionalCurrentlyEmployed",
        label: "Currently employed",
        type: "checkbox",
        gridClass: "col-span-1"
      },
      {
        id: "additionalEmpCountry",
        label: "Country of employment",
        type: "text",
        gridClass: "col-span-full",
      },
      {
        id: "additionalPrefWageMethod",
        label: "Preferred method of reporting wage:",
        type: "radio",
        gridClass: "col-span-full",
        options: [
          { value: "hourly", label: "Hourly" },
          { value: "weekly", label: "Weekly" },
          { value: "biweekly", label: "Bi-weekly" },
          { value: "monthly", label: "Monthly" }
        ]
      },
      {
        id: "additionalWageAmount",
        label: "Wage amount ($)",
        type: "number",
        gridClass: "col-span-3",
        step: "0.01"
      },
      {
        id: "additionalHourlyWage",
        label: "Hourly wage (including tips and commissions) ($)",
        type: "number",
        gridClass: "col-span-3",
        step: "0.01"
      },
      {
        id: "additionalPaidHoursWeek",
        label: "Average paid hours per week (excluding overtime)",
        type: "number",
        gridClass: "col-span-3",
        step: "0.1"
      },
      {
        id: "additionalReasonLeaving",
        label: "Reason for leaving",
        type: "text",
        gridClass: "lg:col-span-full"
      },      
      {
        id: "noc",
        label: "NOC",
        type: "text",
        gridClass: "md:col-span-1"
      },      
      {
        id: "naics",
        label: "NAICS",
        type: "text",
        gridClass: "md:col-span-1"
      },      
    ]
  },
  signatures: {
    title: "Signatures",
    fields: [
      {
        id: "serviceAcknowledge",
        label: "I/we acknowledge that my Service Provider has explained its use and disclosure of my personal information for its purpose.",
        type: "checkbox", 
        required: true,
        gridClass: "lg:col-span-full"
      },
      {
        id: "serviceParticipantName",
        label: "Participant's name", 
        type: "text",
        required: true,
        gridClass: "lg:col-span-4"
      },
      {
        id: "serviceParticipantDate",
        label: "Date",
        type: "date",
        required: true,
        gridClass: "lg:col-span-1"
      },
      {
        id: "serviceGuardianName",
        label: "Parent's/guardian's name (if participant is under 18) ", 
        type: "text",
        gridClass: "lg:col-span-4"
      },
      {
        id: "serviceGuardianDate",
        label: "Date",
        type: "date", 
        gridClass: "lg:col-span-1"
      },
      {
        id: "ministryAcknowledge",
        label: "I/we give consent to the Ministry to indirectly collect, use and disclose my personal information for the purposes set out above.",
        type: "checkbox", 
        required: true,
        gridClass: "lg:col-span-full"
      },
      {
        id: "ministryParticipantName",
        label: "Participant's name", 
        type: "text",
        required: true,
        gridClass: "lg:col-span-4"
      },
      {
        id: "ministryParticipantDate",
        label: "Date",
        type: "date",
        required: true,
        gridClass: "lg:col-span-1"
      },
      {
        id: "ministryGuardianName",
        label: "Parent's/guardian's name (if participant is under 18) ", 
        type: "text",
        gridClass: "lg:col-span-4"
      },
      {
        id: "ministryGuardianDate",
        label: "Date",
        type: "date", 
        gridClass: "lg:col-span-1"
      },
    ]
  },
};

const FIELD_DEPENDENCIES = {
  empEndDate: "empCurrentlyEmployed",
  additionalEmpEndDate: "additionalCurrentlyEmployed",
}

const RegistrationForm = () => {
  const sectionWrapper = "w-full mx-auto px-outer_sm lg:px-outer_lg";

  const [content, setContent] = useState("");
  useEffect(() => {
    fetch("/sdf_notice.txt")
      .then((res) => res.text())
      .then(setContent);
  }, []);

  const initializeFormData = () => {
    const initialData = {};
    
    Object.values(FORM_CONFIG).forEach(section => {
      section.fields.forEach(field => {
        if (field.type === 'number') {
          initialData[field.id] = '';
        } else if (field.type === 'checkbox') {
          initialData[field.id] = false;
        } else {
          initialData[field.id] = '';
        }
      });
    });
    return initialData;
  };

  const [formData, setFormData] = useState(initializeFormData);

  const handleInputChange = (fieldId, value) => {
    setFormData(prev => ({
      ...prev,
      [fieldId]: value
    }));
  };

  const handleCheckboxChange = (fieldId, checked) => {
    setFormData(prev => {
      const updateData = {
        ...prev,
        [fieldId]: checked
      };
      const dep = Object.entries(FIELD_DEPENDENCIES).find(
        ([k, v]) => v === fieldId
      );
      if (dep && checked) {
        updateData[dep[0] ]= '';
      }      
      return updateData;
    });
  };

  const hideField = (checkedField) => {
    return formData[checkedField];
  }

  const renderField = (field) => {
    const commonClasses = "w-full px-4 py-1 border border-input bg-background rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent";
    
    if (field.id in FIELD_DEPENDENCIES && hideField(FIELD_DEPENDENCIES[field.id])) {
      return null;
    }

    switch (field.type) {
      case 'text':
      case 'email':
      case 'tel':
      case 'date':
      case 'number':
        return (
          <input
            id={field.id}
            type={field.type}
            value={formData[field.id]}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            placeholder={field.placeholder}
            maxLength={field.maxLength}
            step={field.step}
            className={commonClasses}
            required={field.required}
          />
        );        
      case 'radio':
        return (
          <div className="space-y-5">
            {Array.from({ length: Math.ceil(field.options.length / 4) }, (_, rowIndex) => (
              <div key={rowIndex} className="grid grid-cols-1 lg:grid-cols-4 gap-y-5">
                {field.options
                  .slice(rowIndex * 4, (rowIndex + 1) * 4)
                  .map(option => (
                    <div key={option.value} className={`${option.hasInput ? "col-span-2" : "col-span-1"} flex items-center text-left space-x-2`}>
                      <input
                        type="radio"
                        id={`${field.id}-${option.value}`}
                        name={field.id}
                        value={option.value}
                        checked={formData[field.id] === option.value}
                        onChange={(e) => handleInputChange(field.id, e.target.value)}
                        className="accent-primary"
                      />
                      <label htmlFor={`${field.id}-${option.value}`} className="text-md text-foreground">
                        {option.label}
                        {option.hasInput && (
                          <input
                            type="text"
                            className="ml-5 border border-input rounded-md text-foreground px-2 py-1"
                          />
                        )}
                      </label>
                    </div>
                  ))}
              </div>
            ))}

          </div>
        );
      case 'checkbox':
        return (
          <div className="space-y-2">
            <div className="flex flex-row items-center space-x-2 mt-9">
              <input 
                type="checkbox" 
                id={field.id}
                checked={formData[field.id]}
                onChange={(e) => handleCheckboxChange(field.id, e.target.checked)}
              />
              <label htmlFor={field.id}>{field.label}</label>
            </div>
          </div>
        );

      case 'paragraph':
        return (
          <div className="space-y-2">
            <div className="flex flex-row items-center space-x-2">
              <p
                className={`text-black text-md text-foreground text-left
                ${field.style === "bold" ? "[font-family:'Unageo-Bold']": ""}
                ${field.style === "italic" ? "[font-family:'Unageo-Italic']": ""}`}>
                  {field.label}
              </p>
              </div>
            </div>
        )
      }
  };

  const toSnakeCase = (str) => {
    return str.replace(/([A-Z])/g, '_$1').toLowerCase();
  };

  const transformFormDataForAPI = (data) => {
    const transformed = {};
    
    Object.entries(data).forEach(([key, value]) => {
      const snakeKey = toSnakeCase(key);
      
      if (['unit_num', 'street_num'].includes(snakeKey)) {
        transformed[snakeKey] = value === '' || value === null ? 0 : parseInt(value, 10) || 0;
      }
      else if (['wage_amount', 'hourly_wage', 'paid_hours_week'].includes(snakeKey)) {
        transformed[snakeKey] = value === '' || value === null ? '' : String(value);
      }
      else if (typeof value === 'boolean') {
        transformed[snakeKey] = String(value);
      }
      else {
        transformed[snakeKey] = value === null || value === undefined ? '' : String(value);
      }
    });
    
    return transformed;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const registrationData = transformFormDataForAPI(formData);
      const response = await axios.post(
        `${API_BASE_URL}/register`,
        registrationData,
        { 
          headers: { 
            "Content-Type": "application/json" 
          } 
        }
      );
      console.log('Registration successful:', response.data);
      alert('Registration submitted successfully!');
      
    } catch (error) {
      console.error('Registration failed:', error);
      if (error.response) {
        console.error('Server error:', error.response.data);
        alert('Registration failed. Please check the console for details.');
      } else if (error.request) {
        console.error('Network error:', error.request);
        alert('Network error. Please check your connection.');
      } else {
        console.error('Error:', error.message);
        alert('An error occurred during registration.');
      }
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col bg-white">
      <div className="max-w-6xl mx-auto my-20 px-10 bg-card">
        <h1 className="[font-family:'Unageo-SemiBold'] text-3xl text-black text-foreground text-center mb-8">
          Skills Development Fund Training Stream (SDF-TS) Participant Registration
        </h1>
        <p className="text-black text-lg text-left mb-5">
          Thank you for your interest in the Agentic Learning Labs' AI courses. These courses are offered at no cost to Ontario residents thanks to support from the Ontario Government and Government of Canada.
          As part of our commitment to deliver fully accessible and no cost programs, learners need to complete the attached form for Employment Ontario. Your information is kept <b className="[font-family:'Unageo-Bold']">secure and confidential</b>, and is only used to monitor the program's success which helps us continue to offer it for free.
        </p>
        <p className="[font-family:'Unageo-Bold'] text-black text-lg text-left mb-10">
          Please take a few minutes to complete this form.
        </p>
        <form onSubmit={handleSubmit} className="space-y-8 text-black">
          {Object.entries(FORM_CONFIG).map(([sectionKey, section]) => (
            <div key={sectionKey} className="space-y-2">
              <h3 className="[font-family:'Unageo-SemiBold'] text-2xl text-left text-foreground mb-5">
                {section.title}
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-7 mb-20">
                {section.fields.map(field => {
                  const fieldComponent = renderField(field);
                  if (fieldComponent === null) return null;
                  return (
                  <div 
                      key={field.id} 
                      className={`space-y-2 ${field.gridClass || ''}`}>
                      {field.type !== 'paragraph' && field.type !== 'checkbox'?
                      <label 
                        htmlFor={field.id} 
                        className="block text-md text-left text-foreground">
                        {field.label}
                        {field.required && <span className="text-red-500 ml-1">*</span>}
                      </label>
                      : null
                      }
                      {renderField(field)}
                    </div>)
                })}
              </div>
            </div>
          ))}
          <pre className="[font-family:'Unageo'] text-sm text-black text-left text-foreground whitespace-pre-wrap break-words">
            {content}
          </pre>
          <div className="flex flex-col items-center lg:items-end">
            <button
              type="submit"
              className="w-[250px] bg-black text-white text-lg py-3 px-6 rounded-2xl hover:opacity-85 transition-colors">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;