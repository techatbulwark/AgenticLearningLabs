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
          { value: "other", label: "Another gender identity", hasInput: true },
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
        type: "text",
        gridClass: "lg:col-span-1"
      },
      {
        id: "prefLanguage",
        label: "Preferred language",
        type: "radio",
        gridClass: "col-span-full",
        options: [
          { value: "english", label: "Yes" },
          { value: "french", label: "No" },
        ]
      },
      {
        id: "prefCommunication",
        label: "Preferred communication",
        type: "radio",
        gridClass: "col-span-full",
        options: [
          { value: "phone", label: "Yes" },
          { value: "email", label: "No" },
          { value: "hardCopy", label: "No" },
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
        label: "Primary phone number",
        type: "radio",
        gridClass: "col-span-full",
        options: [
          { value: "home", label: "Yes" },
          { value: "mobile", label: "No" },
          { value: "other", label: "No" },
        ]
      },
      {
        id: "email",
        label: "Email",
        type: "text",
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
          { value: "employed", label: "Employed" },
          { value: "employed", label: "Employed" },
          { value: "employed", label: "Employed" },
          { value: "employed", label: "Employed" },
          { value: "employed", label: "Employed" },
          { value: "employed", label: "Employed" },
          { value: "employed", label: "Employed" },
          { value: "employed", label: "Employed" },
          { value: "employed", label: "Employed" },
          { value: "employed", label: "Employed" },
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
          { value: "other", label: "Another gender identity", hasInput: true },
        ]
      },
      {
        id: "sinNum",
        label: "Social insurance number",
        type: "number",
        maxLength: 1,
        gridClass: "lg:col-span-1"
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
        label: "Indicate your Hhghest level of education/qualification",
        type: "radio",
        gridClass: "col-span-full ",
        options: [
          { value: "", label: "Select education level" },
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
          { value: "paid", label: "Yes" },
          { value: "selfEmployed", label: "No" },
          { value: "unpaid", label: "Questioning" },
          { value: "volunteer", label: "Prefer not to answer" }
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
        type: "text",
        gridClass: "col-span-2",
      },
      {
        id: "empEndDate",
        label: "Employment end date", 
        type: "text",
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
          { value: "hourly", label: "Yes" },
          { value: "weekly", label: "No" },
          { value: "biweekly", label: "Questioning" },
          { value: "monthly", label: "Prefer not to answer" }
        ]
      },
      {
        id: "wageAmount",
        label: "Wage amount",
        type: "number",
        gridClass: "col-span-full",
        required: true,
      },
      {
        id: "hourlyWage",
        label: "Hourly wage (including tips and commissions) ($)",
        type: "number",
        gridClass: "col-span-full",
        required: true,
      },
      {
        id: "paidHoursWeek",
        label: "Average paid hours per week (excluding overtime)",
        type: "number",
        gridClass: "col-span-full",
        required: true,
      },
      {
        id: "reasonLeaving",
        label: "Reason for leaving",
        type: "text",
        gridClass: "md:col-span-full"
      }
    ]
  },
  signatures: {
    title: "Signatures",
    fields: [
      {
        id: "ackServiceProvider",
        label: "I/we acknowledge that my Service Provider has explained its use and disclosure of my personal information for its purpose",
        type: "checkbox", 
        gridClass: "lg:col-span-full"
      },
      {
        id: "participantName",
        label: "Participant's name", 
        type: "text",
        required: true,
        gridClass: "lg:col-span-4"
      },
      {
        id: "dateParticipantName",
        label: "Date",
        type: "date",
        gridClass: "lg:col-span-1"
      },
      {
        id: "guardianName",
        label: "Parent's/guardian's name (if participant is under 18) ", 
        type: "text",
        required: true,
        gridClass: "lg:col-span-4"
      },
      {
        id: "dateGuardianName",
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
    const integerFields = ['unitNum', 'streetNum', 'wageAmount', 'hourlyWage', 'paidHoursWeek'];
    
    Object.values(FORM_CONFIG).forEach(section => {
      section.fields.forEach(field => {
        if (integerFields.includes(field.id)) {
          initialData[field.id] = null;
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
                        className="border border-input rounded-md text-foreground px-2 py-2"
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
                          className="border border-input rounded-md text-foreground px-2"
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
              <input type="checkbox" id="terms" required />
              <label htmlFor="terms">{field.title}</label>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  // Helper function to convert camelCase to snake_case
  const toSnakeCase = (str) => {
    return str.replace(/([A-Z])/g, '_$1').toLowerCase();
  };

  // Helper function to ensure correct data types for API
  const transformFormDataForAPI = (data) => {
    const transformed = {};
    
    Object.entries(data).forEach(([key, value]) => {
      const snakeKey = toSnakeCase(key);
      
      // Handle integer fields that should be numbers, not strings
      const integerFields = ['unit_num', 'street_num', 'wage_amount', 'hourly_wage', 'paid_hours_week'];
      
      if (integerFields.includes(snakeKey)) {
        // Convert to integer, default to 0 if empty or invalid
        transformed[snakeKey] = value === '' || value === null ? 0 : parseInt(value, 10) || 0;
      } else {
        // For string fields, ensure we send empty string instead of null
        transformed[snakeKey] = value === null || value === undefined ? '' : String(value);
      }
    });
    
    return transformed;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
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
      
      // Optionally reset form or show success message
      // setFormData(initializeFormData());
      
    } catch (error) {
      console.error('Registration failed:', error);
      
      // Handle specific error cases
      if (error.response) {
        // Server responded with error status
        console.error('Server error:', error.response.data);
        // Show user-friendly error message
      } else if (error.request) {
        // Request was made but no response received
        console.error('Network error:', error.request);
      } else {
        // Something else happened
        console.error('Error:', error.message);
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