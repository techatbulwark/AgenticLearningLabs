import { lazy, useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey)
  : null;

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
        gridClass: "lg:col-span-2"
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
        id: "ontario_residency_note",
        label: "All participants of this program must reside in the Province of Ontario",
        type: "paragraph",
        style: "italic",
        gridClass: "col-span-full",
      },
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
        required: true,
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
        labelBold: true,
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
        labelBold: true,
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
        id: "desgGroup",
        label: "Please complete if you wish to self-identify as a member of a designated group(s). Your response to this question is entirely voluntary and will not affect your eligibility. This information will be used by the Governments of Ontario and Canada for policy analysis and statistical purposes related to employment programs and services. (You may select more than one option):",
        type: "checkbox",
        gridClass: "col-span-full ",
        options: [
          { value: "women", label: "Women" },
          { value: "indigenous", label: "Indigenous Peoples" },
          { value: "persons-with-disabilities", label: "Persons with Disabilities" },
          { value: "visible-minorities", label: "Visible Minorities" },
          { value: "newcomers", label: "Newcomers to Canada" },
          { value: "youth", label: "Youth" },
          { value: "older-workers", label: "Older Workers" },
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

const RegistrationForm = () => {
  const sectionWrapper = "w-full mx-auto px-outer_sm lg:px-outer_lg";

  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    fetch("/sdf_notice.txt")
      .then((res) => res.text())
      .then(setContent)
      .catch(console.error);
  }, []);

  const initializeFormData = () => {
    const initialData = {};
      
    Object.values(FORM_CONFIG).forEach(section => {
      section.fields.forEach(field => {
        if (field.type === 'number') {
          initialData[field.id] = '';
        } else if (field.type === 'checkbox') {
          // For checkbox groups, initialize as object to track multiple selections
          if (field.options) {
            initialData[field.id] = {};
            field.options.forEach(opt => {
              initialData[field.id][opt.value] = false;
            });
          } else {
            // Single checkbox
            initialData[field.id] = false;
          }
        } else {
          initialData[field.id] = '';
        }
        
        if (field.type === 'radio' && field.options?.some(opt => opt.hasInput)) {
          initialData[`${field.id}_other_text`] = '';
        }
      });
    });
    
    // Set default values
    initialData.prefLanguage = 'english'; // Default to English
    
    // Initialize fields that are not in form but exist in database
    initialData.courseSelection = '';
    initialData.referralQuestion = '';
    initialData.signatureName = '';
    initialData.signatureDate = '';
    
    // Initialize employment fields with empty strings (they still exist in DB)
    initialData.middle_initial = '';
    initialData.emp_type = '';
    initialData.emp_name = '';
    initialData.job_title = '';
    initialData.emp_start_date = '';
    initialData.emp_end_date = '';
    initialData.emp_country = '';
    initialData.pref_wage_method = '';
    initialData.wage_amount = '';
    initialData.hourly_wage = '';
    initialData.paid_hours_week = '';
    initialData.reason_leaving = '';
    initialData.noc = '';
    initialData.naics = '';
    initialData.additional_emp_type = '';
    initialData.additional_emp_name = '';
    initialData.additional_job_title = '';
    initialData.additional_emp_start_date = '';
    initialData.additional_emp_end_date = '';
    initialData.additional_emp_country = '';
    initialData.additional_pref_wage_method = '';
    initialData.additional_wage_amount = '';
    initialData.additional_hourly_wage = '';
    initialData.additional_paid_hours_week = '';
    initialData.additional_reason_leaving = '';
    initialData.emp_currently_employed = '';
    initialData.additional_currently_employed = '';
    
    return initialData;  
  };

  const [formData, setFormData] = useState(initializeFormData);

  const handleInputChange = (fieldId, value) => {
    setFormData(prev => ({
      ...prev,
      [fieldId]: value
    }));
  };

  const handleOtherInputChange = (fieldId, value) => {
    setFormData(prev => ({
      ...prev,
      [`${fieldId}_other_text`]: value,
      [fieldId]: 'other'
    }));
  };

  const handleCheckboxChange = (fieldId, checked) => {
    setFormData(prev => ({
      ...prev,
      [fieldId]: checked
    }));
  };

  const renderField = (field) => {
    const commonClasses = "w-full px-4 py-1 border border-input bg-background rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent";

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
        const cols = (field.id === "courseSelection") ? 1 : 4; 
        const gridClass = (field.id === "courseSelection") ? "lg:grid-cols-1" : "lg:grid-cols-4"; 
        return (
          <div className="space-y-5">
            {Array.from({ length: Math.ceil(field.options.length / cols) }, (_, rowIndex) => (
              <div key={rowIndex} className={`grid grid-cols-1 gap-y-5 ${gridClass}`}>
                {field.options
                  .slice(rowIndex * cols, (rowIndex + 1) * cols)
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
                            value={formData[`${field.id}_other_text`] || ''}
                            onChange={(e) => handleOtherInputChange(field.id, e.target.value)}
                            onFocus={() => handleInputChange(field.id, 'other')} // Auto-select "other" when typing
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
        // Handle checkbox group (multiple selections) vs single checkbox
        if (field.options) {
          // Checkbox group for desgGroup
          return (
            <div className="space-y-3">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {field.options.map(option => (
                  <div key={option.value} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`${field.id}-${option.value}`}
                      checked={formData[field.id]?.[option.value] || false}
                      onChange={(e) => {
                        setFormData(prev => ({
                          ...prev,
                          [field.id]: {
                            ...prev[field.id],
                            [option.value]: e.target.checked
                          }
                        }));
                      }}
                      className="accent-primary"
                    />
                    <label htmlFor={`${field.id}-${option.value}`} className="text-md text-foreground">
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          );
        } else {
          // Single checkbox
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
        }

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
        );
      default:
        return null;
    }
  };

  const toSnakeCase = (str) => {
    return str.replace(/([A-Z])/g, '_$1').toLowerCase();
  };

  const transformFormDataForAPI = (data) => {
    const transformed = {};

    // Skip display-only paragraph fields
    const skipFields = ['transgender_definition', 'immigratedToCanada', 'selected_ei', 
                       'selectedEI', 'workExperience', 'additionalWorkExperience',
                       'primary_mailing_address', 'altMailingAddress', 'ontario_residency_note'];

    Object.entries(data).forEach(([key, value]) => {
      // Skip display-only fields
      if (skipFields.includes(key)) {
        return;
      }
      
      if (key.endsWith('_other_text')) {
        const baseKey = key.replace('_other_text', '');
        const snakeBaseKey = toSnakeCase(baseKey);
        
        if (data[baseKey] === 'other' && value && value.trim() !== '') {
          transformed[snakeBaseKey] = String(value).trim();
        }
        return;
      }
      
      const snakeKey = toSnakeCase(key);
      
      // Handle desgGroup checkbox group - convert to comma-separated string
      if (key === 'desgGroup' && typeof value === 'object') {
        const selectedGroups = Object.entries(value)
          .filter(([k, v]) => v === true)
          .map(([k, v]) => k);
        transformed[snakeKey] = selectedGroups.join(',');
      }
      // Handle single checkbox fields - convert boolean to string
      else if (key === 'serviceAcknowledge' || key === 'ministryAcknowledge' || 
          key === 'empCurrentlyEmployed' || key === 'additionalCurrentlyEmployed') {
        transformed[snakeKey] = value ? 'true' : 'false';
      } else if (value === 'other') {
        const otherTextValue = data[`${key}_other_text`];
        if (otherTextValue && otherTextValue.trim() !== '') {
          transformed[snakeKey] = String(otherTextValue).trim();
        } else {
          transformed[snakeKey] = 'other';
        }
      } else {
        transformed[snakeKey] = value === null || value === undefined ? '' : String(value);
      }
    });

    return transformed;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Check if Supabase is configured
      if (!supabase) {
        throw new Error('Database connection not configured. Please contact support.');
      }
      
      const registrationData = transformFormDataForAPI(formData);
      console.log('Submitting registration data:', registrationData);
      
      // Use direct Supabase connection
      console.log('Using Supabase connection...');
      
      const { data, error } = await supabase
        .from('sdf_registrations')
        .insert([registrationData])
        .select();
      
      if (error) {
        throw error;
      }
      
      console.log('Success via Supabase:', data);
      alert('Registration submitted successfully!');
      
      // Reset form
      setFormData(initializeFormData());
      
    } catch (error) {
  console.error('Registration failed:', error);
  console.error('Error details:', {
    message: error.message,
    code: error.code,
    details: error.details,
    hint: error.hint,
    status: error.status
  });
  
  // Handle specific error cases
  if (error.status === 401) {
    alert('Authentication error. This may be due to:\n' +
          '1. Anonymous sign-ins not enabled in Supabase\n' +
          '2. Incorrect API key in environment variables\n' +
          '3. RLS policy not configured correctly\n\n' +
          'Please contact the administrator.');
  } else if (error.code === '23505') {
    alert('This registration already exists. Please check if you have already submitted.');
  } else if (error.code === '23502') {
    alert('A required field is missing. Please check all required fields and try again.');
  } else if (error.code === 'PGRST301') {
    alert('Database permissions error. The anonymous user may not have permission to insert records.');
  } else if (error.message.includes('Database connection not configured')) {
    alert('The registration system is not properly configured. Please contact the administrator.');
  } else if (error.message.includes('fetch')) {
    alert('Network error. Please check your internet connection and try again.');
  } else {
    alert(`Registration failed: ${error.message || 'Unknown error occurred'}`);
  }
} finally {
  setIsSubmitting(false);
}
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col bg-white">
      {/* Debug info - remove in production */}
      {import.meta.env.MODE === 'development' && (
        <div className="fixed bottom-2 right-2 bg-black text-white p-2 rounded text-xs z-50">
          <div>Mode: {import.meta.env.MODE}</div>
          <div>Supabase: {supabase ? '✅' : '❌'}</div>
          {!supabase && <div className="text-red-400">Missing Supabase config!</div>}
        </div>
      )}
      
      <div className="max-w-6xl mx-auto my-20 px-10 bg-card">
        <h1 className="[font-family:'Unageo-SemiBold'] text-3xl text-black text-foreground text-center mb-8">
          Skills Development Fund Training Stream (SDF-TS) Participant Registration
        </h1>
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
                      className={`space-y-3 ${field.gridClass || ''}`}>
                      {field.type !== 'paragraph' && field.type !== 'checkbox' ?
                        <label 
                          htmlFor={field.id} 
                          className={`block text-md text-left text-foreground ${field.labelBold ? "[font-family:'Unageo-Bold']" : ""}`}>
                          {field.label}
                          {field.required && <span className="text-red-500 ml-1">*</span>}
                        </label>
                        : null
                      }
                      {renderField(field)}
                    </div>
                  );
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
              disabled={isSubmitting}
              className={`w-[250px] ${isSubmitting ? 'bg-gray-500' : 'bg-black hover:opacity-85'} text-white text-lg py-3 px-6 rounded-2xl transition-colors`}>
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;