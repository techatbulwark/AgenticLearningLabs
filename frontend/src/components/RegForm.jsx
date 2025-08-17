import { useState } from "react";
import axios from "axios";

// Form configuration - all your fields, validation, and options in one place
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
        required: true,
        gridClass: "lg:col-span-2"
      },
      {
        id: "dob",
        label: "Date of birth",
        type: "date",
        gridClass: "lg:col-span-2"
      },
      {
        id: "gender",
        label: "I identify as:",
        type: "radio",
        gridClass: "col-span-full",
        options: [
          { value: "man", label: "Man" },
          { value: "woman", label: "Woman" },
          { value: "gender-non-binary", label: "Gender non-binary" },
          { value: "two-spirit", label: "Two-spirit" },
          { value: "other", label: "Another gender identity", hasInput: true },
          { value: "prefer-not-to-answer", label: "Prefer not to answer" },
        ],
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
          { value: "prefer-not-to-answer", label: "Prefer not to answer" }
        ]
      },
      {
        id: "statusCanada",
        label: "Status in Canada",
        type: "radio",
        gridClass: "col-span-full",
        options: [
          { value: "citizen", label: "Canadian Citizen" },
          { value: "permanent-resident", label: "Permanent Resident" },
          { value: "temporary-resident", label: "Naturalized Canadian Citizen" },
          { value: "refugee", label: "Protected Persons" },
          { value: "prefer-not-to-answer", label: "Prefer not to answer" },
          { value: "other", label: "Other", hasInput: true },
        ]
      },
      {
        id: "countryOrigin",
        label: "Country of origin",
        type: "text",
        gridClass: "lg:col-span-2"
      },
      {
        id: "dateEntryCanada",
        label: "Date of Entry to Canada",
        type: "date",
        gridClass: "lg:col-span-1"
      },
      {
        id: "prefLanguage",
        label: "Preferred language",
        type: "radio",
        gridClass: "col-span-full",
        options: [
          { value: "english", label: "English" },
          { value: "french", label: "French" },
        ]
      },
      {
        id: "prefCommunication",
        label: "Preferred communication",
        type: "radio",
        gridClass: "col-span-full",
        options: [
          { value: "phone", label: "Phone" },
          { value: "email", label: "Email" },
          { value: "hardCopy", label: "Hard Copy" },
        ]
      },
      {
        id: "maritalStatus",
        label: "Marital status",
        type: "radio",
        gridClass: "col-span-full",
        options: [
          { value: "single", label: "Single" },
          { value: "married", label: "Married" },
          { value: "divorced", label: "Divorced" },
          { value: "widowed", label: "Widowed" },
          { value: "separated", label: "Separated" },
          { value: "common-law", label: "Common-law" }
        ]
      },
    ]
  },  
  addresscontactInfo: {
    title: "Participant Address and Contact Information",
    fields: [
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
        gridClass: "md:col-span-1"
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
        gridClass: "lg:col-span-1"
      },
      {
        id: "postalCode",
        label: "Postal code",
        type: "text",
        required: true,
        gridClass: "lg:col-span-1"
      },
      {
        id: "primaryPhone",
        label: "Primary phone type",
        type: "radio",
        gridClass: "col-span-full",
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
        maxLength: 15,
        gridClass: "lg:col-span-2"
      },
      {
        id: "email",
        label: "Email",
        type: "email",
        gridClass: "lg:col-span-2"
      },
    ]
  },
  profileInfo: {
    title: "Profile Information",
    fields: [
      {
        id: "labourForce",
        label: "Labour force attachment*",
        type: "radio",
        gridClass: "col-span-full ",
        options: [
          { value: "employed-full-time", label: "Employed Full-time" },
          { value: "employed-part-time", label: "Employed Part-time" },
          { value: "unemployed", label: "Unemployed" },
          { value: "underemployed", label: "Underemployed" },
          { value: "not-in-labour-force", label: "Not in Labour Force" },
          { value: "student", label: "Student" },
          { value: "retired", label: "Retired" },
          { value: "self-employed", label: "Self-employed" },
        ]
      },
      {
        id: "sourceIncome",
        label: "Source of income",
        type: "radio",
        gridClass: "col-span-full ",
        options: [
          { value: "employment", label: "Employment" },
          { value: "self-employment", label: "Self-employment" },
          { value: "ei", label: "Employment Insurance" },
          { value: "social-assistance", label: "Social Assistance" },
          { value: "pension", label: "Pension" },
          { value: "investment", label: "Investment" },
          { value: "other", label: "Other", hasInput: true },
        ]
      },
      {
        id: "sinNum",
        label: "Social insurance number",
        type: "text",
        maxLength: 11,
        gridClass: "lg:col-span-2"
      },
      {
        id: "desgGroup",
        label: "Designated group",
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
        label: "Indicate your highest level of education/qualification",
        type: "radio",
        gridClass: "col-span-full ",
        options: [
          { value: "no-formal", label: "No formal education" },
          { value: "elementary", label: "Elementary school" },
          { value: "high-school", label: "High school" },
          { value: "some-post-secondary", label: "Some post-secondary" },
          { value: "certificate-diploma", label: "Certificate/Diploma" },
          { value: "bachelors", label: "Bachelor's degree" },
          { value: "masters", label: "Master's degree" },
          { value: "doctoral", label: "Doctoral degree" },
          { value: "professional", label: "Professional degree" }
        ]
      },
    ]
  },
  employment: {
    title: "Employment",
    fields: [
      {
        id: "empType",
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
        id: "empName",
        label: "Name of employer",
        type: "text",
        gridClass: "col-span-2",
      },
      {
        id: "jobTitle",
        label: "Job Title",
        type: "text",
        gridClass: "col-span-2",
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
        gridClass: "col-span-2",
      },
      {
        id: "empCountry",
        label: "Country of employment",
        type: "text",
        gridClass: "col-span-2",
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
        gridClass: "col-span-full",
        step: "0.01"
      },
      {
        id: "hourlyWage",
        label: "Hourly wage (including tips and commissions) ($)",
        type: "number",
        gridClass: "col-span-full",
        step: "0.01"
      },
      {
        id: "paidHoursWeek",
        label: "Average paid hours per week (excluding overtime)",
        type: "number",
        gridClass: "col-span-full",
        step: "0.1"
      },
      {
        id: "reasonLeaving",
        label: "Reason for leaving",
        type: "text",
        gridClass: "md:col-span-full"
      },      
      {
        id: "noc",
        label: "NOC",
        type: "text",
        gridClass: "md:col-span-full"
      },      
      {
        id: "naics",
        label: "NAICS",
        type: "text",
        gridClass: "md:col-span-full"
      },      
    ]
  },
  signatures: {
    title: "Signatures",
    fields: [
      {
        id: "serviceAcknowledge",
        label: "I/we acknowledge that my Service Provider has explained its use and disclosure of my personal information for its purpose",
        type: "checkbox", 
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
        label: "I/we acknowledge that my Service Provider has explained its use and disclosure of my personal information for its purpose",
        type: "checkbox", 
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

const RegForm = () => {
  const sectionWrapper = "w-full mx-auto px-outer_sm lg:px-outer_lg";

  // Initialize form data from config with proper data types
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
    setFormData(prev => ({
      ...prev,
      [fieldId]: checked
    }));
  };

  // Reusable field renderer
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
        return (
          <div className="space-y-2">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-2">
              {field.options.slice(0, 4).map(option => (
                <div key={option.value} className="flex items-center space-x-2">
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
                        className="ml-2 border border-input rounded-md text-foreground px-2 py-1"
                        placeholder="Please specify"
                      />
                    )}
                  </label>
                </div>
              ))}
            </div>
            {field.options.length > 4 && (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-2">
                {field.options.slice(4).map(option => (
                  <div key={option.value} className="flex items-center space-x-2">
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
                          className="ml-2 border border-input rounded-md text-foreground px-2 py-1"
                          placeholder="Please specify"
                        />
                      )}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      case 'checkbox':
        return (
          <div className="space-y-2">
            <div className="flex flex-row items-center space-x-2">
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
        
      default:
        return null;
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

  const validateForm = () => {
    const errors = [];
    
    const requiredFields = [
      'lastName', 'firstName', 'prefName', 'streetNum', 'streetName', 
      'city', 'province', 'postalCode', 'serviceParticipantName', 
      'ministryParticipantName'
    ];
    
    requiredFields.forEach(field => {
      if (!formData[field] || formData[field].trim() === '') {
        errors.push(`${field} is required`);
      }
    });
    
    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Validate form
    const errors = validateForm();
    if (errors.length > 0) {
      alert('Please fill in all required fields:\n' + errors.join('\n'));
      return;
    }

    try {
      console.log(`Registering ${formData.firstName} ${formData.lastName}`);
      
      const registrationData = transformFormDataForAPI(formData);
      
      console.log('Sending registration data:', registrationData);
      
      const response = await axios.post(
        "http://localhost:8000/register",
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
    <div className="min-h-screen max-w-[1600px] mx-auto relative overflow-hidden flex flex-col bg-white">
      <div className={`${sectionWrapper} bg-card my-20`}>
        <h1 className="[font-family:'Unageo-SemiBold'] text-3xl text-black text-foreground text-center mb-8">
          Skills Development Fund Training Stream (SDF-TS) Participant Registration
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-8 text-black">
          {Object.entries(FORM_CONFIG).map(([sectionKey, section]) => (
            <div key={sectionKey} className="space-y-2">
              <h3 className="[font-family:'Unageo-SemiBold'] text-2xl text-left text-foreground">
                {section.title}
              </h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-20">
                {section.fields.map(field => (
                  <div 
                    key={field.id} 
                    className={`space-y-2 ${field.gridClass || ''}`}>
                    <label 
                      htmlFor={field.id} 
                      className="block text-md text-left text-foreground">
                      {field.label}
                      {field.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    {renderField(field)}
                  </div>
                ))}
              </div>
            </div>
          ))}
          
          <div className="flex flex-col">
            <button
              type="submit"
              className="w-[250px] bg-black text-white text-lg py-3 px-6 rounded-2xl hover:opacity-85 transition-colors ml-auto">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegForm;