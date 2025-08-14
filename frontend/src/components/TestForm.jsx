import { useState } from "react";
import axios from "axios";

// Form configuration - all your fields, validation, and options in one place
const FORM_CONFIG = {
  personalInfo: {
    title: "Personal Information",
    fields: [
      {
        id: "firstName",
        label: "First Name",
        type: "text",
        required: true,
        gridClass: "lg:col-span-2"
      },
      {
        id: "lastName",
        label: "Last Name", 
        type: "text",
        required: true,
        gridClass: "lg:col-span-2"
      },
      {
        id: "middleInitial",
        label: "Middle Initial",
        type: "text",
        maxLength: 1,
        gridClass: "lg:col-span-1"
      },
      {
        id: "prefName",
        label: "Preferred Name",
        type: "text",
        gridClass: "lg:col-span-1"
      },
      {
        id: "dob",
        label: "Date of Birth",
        type: "date",
        gridClass: "lg:col-span-1"
      },
      {
        id: "gender",
        label: "I identify as:",
        type: "radio",
        options: [
          { value: "male", label: "Male" },
          { value: "female", label: "Female" },
          { value: "non-binary", label: "Non-binary" },
          { value: "two-spirit", label: "Two-spirit" },
          { value: "other", label: "Other", hasInput: true },
          { value: "prefer-not-to-say", label: "Prefer not to say" }
        ],
        gridClass: "col-span-full"
      },
      {
        id: "transgender",
        label: "Transgender",
        type: "select",
        options: [
          { value: "", label: "Select option" },
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
          { value: "prefer-not-to-say", label: "Prefer not to say" }
        ]
      },
      {
        id: "maritalStatus",
        label: "Marital Status",
        type: "select",
        options: [
          { value: "", label: "Select marital status" },
          { value: "single", label: "Single" },
          { value: "married", label: "Married" },
          { value: "divorced", label: "Divorced" },
          { value: "widowed", label: "Widowed" },
          { value: "separated", label: "Separated" },
          { value: "common-law", label: "Common-law" }
        ]
      }
    ]
  },
  
  immigrationLanguage: {
    title: "Immigration & Language",
    fields: [
      {
        id: "statusCanada",
        label: "Status in Canada",
        type: "select",
        options: [
          { value: "", label: "Select status" },
          { value: "citizen", label: "Canadian Citizen" },
          { value: "permanent-resident", label: "Permanent Resident" },
          { value: "temporary-resident", label: "Temporary Resident" },
          { value: "refugee", label: "Refugee" },
          { value: "work-permit", label: "Work Permit Holder" },
          { value: "student-permit", label: "Student Permit Holder" },
          { value: "other", label: "Other" }
        ]
      },
      {
        id: "countryOrigin",
        label: "Country of Origin",
        type: "text",
        placeholder: "Country of origin"
      },
      {
        id: "dateEntryCanada",
        label: "Date of Entry to Canada",
        type: "date"
      },
      {
        id: "prefLanguage",
        label: "Preferred Language",
        type: "select",
        options: [
          { value: "", label: "Select language" },
          { value: "english", label: "English" },
          { value: "french", label: "French" },
          { value: "spanish", label: "Spanish" },
          { value: "mandarin", label: "Mandarin" },
          { value: "arabic", label: "Arabic" },
          { value: "hindi", label: "Hindi" },
          { value: "punjabi", label: "Punjabi" },
          { value: "other", label: "Other" }
        ]
      },
      {
        id: "prefCommunication",
        label: "Preferred Communication Method",
        type: "text",
        placeholder: "Email, Phone, Text, etc."
      }
    ]
  },
  
  addressInfo: {
    title: "Address Information",
    fields: [
      {
        id: "unitNum",
        label: "Unit Number",
        type: "number",
        placeholder: "Unit #"
      },
      {
        id: "streetNum", 
        label: "Street Number",
        type: "number",
        placeholder: "Street number"
      },
      {
        id: "streetName",
        label: "Street Name", 
        type: "text",
        placeholder: "Street name"
      },
      {
        id: "city",
        label: "City",
        type: "text", 
        placeholder: "City"
      },
      {
        id: "province",
        label: "Province",
        type: "text",
        placeholder: "Province"
      },
      {
        id: "postalCode",
        label: "Postal Code",
        type: "text",
        placeholder: "A1A 1A1"
      },
      {
        id: "poBox",
        label: "P.O. Box",
        type: "text",
        placeholder: "P.O. Box (if applicable)",
        gridClass: "md:col-span-2 lg:col-span-3"
      }
    ]
  },
  
  contactInfo: {
    title: "Contact Information", 
    fields: [
      {
        id: "primaryPhone",
        label: "Primary Phone",
        type: "tel",
        placeholder: "(123) 456-7890"
      },
      {
        id: "phoneNum",
        label: "Secondary Phone", 
        type: "tel",
        placeholder: "(123) 456-7890"
      },
      {
        id: "email",
        label: "Email Address",
        type: "email",
        placeholder: "your.email@example.com",
        gridClass: "md:col-span-2"
      }
    ]
  },
  
  employmentFinancial: {
    title: "Employment & Financial Information",
    fields: [
      {
        id: "labourForce",
        label: "Labour Force Status",
        type: "select",
        options: [
          { value: "", label: "Select status" },
          { value: "employed", label: "Employed" },
          { value: "unemployed", label: "Unemployed" },
          { value: "self-employed", label: "Self-employed" },
          { value: "student", label: "Student" },
          { value: "retired", label: "Retired" },
          { value: "not-in-labour-force", label: "Not in labour force" }
        ]
      },
      {
        id: "sourceIncome",
        label: "Source of Income",
        type: "select", 
        options: [
          { value: "", label: "Select source" },
          { value: "employment", label: "Employment" },
          { value: "self-employment", label: "Self-employment" },
          { value: "ei", label: "Employment Insurance" },
          { value: "social-assistance", label: "Social Assistance" },
          { value: "pension", label: "Pension" },
          { value: "investment", label: "Investment" },
          { value: "other", label: "Other" },
          { value: "none", label: "None" }
        ]
      },
      {
        id: "sinNum",
        label: "Social Insurance Number",
        type: "text",
        placeholder: "123-456-789"
      },
      {
        id: "desgGroup",
        label: "Designated Group",
        type: "select",
        options: [
          { value: "", label: "Select group" },
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
      {
        id: "education",
        label: "Education Level",
        type: "select",
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
      {
        id: "empType",
        label: "Employment Type",
        type: "text",
        placeholder: "Full-time, Part-time, Contract, etc."
      },
      {
        id: "empName",
        label: "Employer Name",
        type: "text",
        placeholder: "Company name"
      },
      {
        id: "jobTitle",
        label: "Job Title",
        type: "text",
        placeholder: "Job title"
      },
      {
        id: "empStartDate",
        label: "Employment Start Date",
        type: "date"
      },
      {
        id: "empEndDate",
        label: "Employment End Date", 
        type: "date"
      },
      {
        id: "empCountry",
        label: "Employment Country",
        type: "text",
        placeholder: "Country of employment"
      },
      {
        id: "prefWageMethod",
        label: "Preferred Wage Method",
        type: "text",
        placeholder: "Hourly, Salary, Commission, etc."
      },
      {
        id: "wageAmount",
        label: "Wage Amount",
        type: "number",
        placeholder: "Annual salary or wage"
      },
      {
        id: "hourlyWage",
        label: "Hourly Wage",
        type: "number",
        step: "0.01",
        placeholder: "Hourly rate"
      },
      {
        id: "paidHoursWeek",
        label: "Paid Hours per Week",
        type: "number",
        placeholder: "Hours per week"
      },
      {
        id: "reasonLeaving",
        label: "Reason for Leaving",
        type: "text",
        placeholder: "Reason for leaving previous employment",
        gridClass: "md:col-span-2"
      }
    ]
  },
  
  registrationClassification: {
    title: "Registration & Classification",
    fields: [
      {
        id: "dateRegistration",
        label: "Date of Registration",
        type: "date"
      },
      {
        id: "noc",
        label: "NOC Code",
        type: "text",
        placeholder: "National Occupational Classification"
      },
      {
        id: "naics",
        label: "NAICS Code", 
        type: "text",
        placeholder: "North American Industry Classification System",
        gridClass: "md:col-span-2"
      }
    ]
  }
};

const Index = () => {
  const sectionWrapper = "w-full mx-auto px-outer_sm lg:px-outer_lg";

  // Initialize form data from config
  const initializeFormData = () => {
    const initialData = {};
    Object.values(FORM_CONFIG).forEach(section => {
      section.fields.forEach(field => {
        initialData[field.id] = field.type === 'number' ? 0 : '';
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
    const commonClasses = "w-full px-4 py-3 border border-input bg-background rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent";
    
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
            required={field.required}
            maxLength={field.maxLength}
            step={field.step}
            className={commonClasses}
          />
        );
        
      case 'select':
        return (
          <select
            id={field.id}
            value={formData[field.id]}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            className={commonClasses}
          >
            {field.options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
        
      case 'radio':
        return (
          <div className="space-y-2">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-2">
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
                        className="border border-input rounded-md text-foreground px-2 ml-5"
                      />
                    )}
                  </label>
                </div>
              ))}
            </div>
            {field.options.length > 4 && (
              <div className="grid grid-cols-2 lg:grid-cols-2 gap-x-4 gap-y-2">
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
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
        
      default:
        return null;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(`Registering ${formData.firstName} ${formData.lastName}`);
      
      // Convert camelCase to snake_case for API
      const apiData = {};
      Object.keys(formData).forEach(key => {
        const snakeKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();
        apiData[snakeKey] = formData[key];
      });
      
      const response = await axios.post(
        "http://localhost:8000/register",
        apiData,
        { headers: { "Content-Type": "application/json" } }
      );
      console.log('Registration successful:', response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen max-w-[1600px] mx-auto relative overflow-hidden flex flex-col bg-white">
      <div className={`${sectionWrapper} bg-card my-20`}>
        <h1 className="[font-family:'Unageo-Semi Bold'] text-3xl text-black text-foreground text-center mb-8">
          Skills Development Fund Training Stream (SDF-TS) Participant Registration
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-8 text-black">
          {Object.entries(FORM_CONFIG).map(([sectionKey, section]) => (
            <div key={sectionKey} className="space-y-4">
              <h3 className="[font-family:'Unageo-SemiBold'] text-2xl text-left text-foreground">
                {section.title}
              </h3>
              <div className="h-px bg-border"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {section.fields.map(field => (
                  <div 
                    key={field.id} 
                    className={`space-y-2 ${field.gridClass || ''}`}
                  >
                    <label 
                      htmlFor={field.id} 
                      className="block text-md text-left text-foreground"
                    >
                      {field.label}
                    </label>
                    {renderField(field)}
                  </div>
                ))}
              </div>
            </div>
          ))}
          
          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground py-3 px-6 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            Submit Registration
          </button>
        </form>
      </div>
    </div>
  );
};

export default Index;