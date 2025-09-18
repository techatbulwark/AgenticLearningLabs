import { lazy, useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client if credentials are available
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey)
  : null;

// Fallback to Railway API if no Supabase credentials
const API_BASE_URL = import.meta.env.MODE === 'production' 
  ? import.meta.env.VITE_PROD_API 
  : import.meta.env.VITE_DEV_API;

const FORM_CONFIG = {
  courseSelection: {
    title: "",
    fields: [
      {
        id: "courseSelection",
        label: "Choose the course you are registering for:",
        type: "radio",
        required: true,
        gridClass: "col-span-full",
        options: [
          { value: "dataAnalytics", label: "AI for Data Analytics for Decision Making (September 22)" },
          { value: "customerExperience", label: "AI for Customer Experience and Product Innovation (September 22)" },
          { value: "salesMarketing", label: "AI for Sales, Marketing and Business Development (November 3)" },
        ],
      },
      {
        id: "commMessage",
        label: "These courses are complimentary thanks to support from the Employment Ontario program, which is funded in part by the Government of Canada and the Government of Ontario. Communications and course information will come from Agentic Learning Labs and ",
        type: "paragraph",
        gridClass: "col-span-full",
        links: [
          {
            text: "programs@agenticlearninglabs.com",
            href: "mailto:programs@agenticlearninglabs.com",
            italic: true
          }
        ],
        linkSuffix: "."
      },
    ]
  },
  personalInfo: {
    title: "Personal Information",
    fields: [
      {
        id: "lastName",
        label: "Last name", 
        type: "text",
        required: true,
        gridClass: "lg:col-span-3"
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
        gridClass: "lg:col-span-1"
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
        id: "sourceIncome",
        label: "Are you currently:",
        type: "radio",
        required: true,
        gridClass: "col-span-full ",
        options: [
          { value: "employment_insurance", label: "Unemployed on EI" },
          { value: "employed_with_employer", label: "Employed with employer" },
          { value: "self_employed", label: "Self-Employed" },
          { value: "other", label: "Other", hasInput: true },
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
        id: "referralQuestion",
        label: "How did you hear about us?",
        type: "radio",
        gridClass: "col-span-full ",
        options: [
          { value: "linkedin", label: "LinkedIn" },
          { value: "instagram", label: "Instagram" },
          { value: "web_search", label: "Web search" },
          { value: "friend", label: "Friend" },
          { value: "other", label: "Other", hasInput: true },
        ]
      },
      {
        id: "signatureName",
        label: "Participant's name", 
        type: "text",
        required: true,
        gridClass: "lg:col-span-4"
      },
      {
        id: "signatureDate",
        label: "Date",
        type: "date",
        required: true,
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
          initialData[field.id] = false;
        } else {
          initialData[field.id] = '';
        }
        
        if (field.type === 'radio' && field.options?.some(opt => opt.hasInput)) {
          initialData[`${field.id}_other_text`] = '';
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

  const handleOtherInputChange = (fieldId, value) => {
    setFormData(prev => ({
      ...prev,
      [`${fieldId}_other_text`]: value,
      [fieldId]: 'other'
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
        updateData[dep[0]] = '';
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
                            onFocus={() => handleInputChange(field.id, 'other')}
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

      case 'paragraph':
        return (
          <div className="space-y-2">
            <div className="flex flex-row items-center space-x-2">
              <p
                className={`text-black text-md text-foreground text-left
                ${field.style === "bold" ? "[font-family:'Unageo-Bold']": ""}
                ${field.style === "italic" ? "[font-family:'Unageo-Italic']": ""}`}>
                  {field.label}
                  {field.links && field.links.map((link, index) => (
                    <a 
                      key={index}
                      href={link.href}
                      className={`text-blue-600 hover:text-blue-800 underline`}
                    >
                      {link.text}
                    </a>
                  ))}
                  {field.linkSuffix}
              </p>
            </div>
          </div>
        );
    }
  };

  const toSnakeCase = (str) => {
    return str.replace(/([A-Z])/g, '_$1').toLowerCase();
  };

  const transformFormDataForAPI = (data) => {
    const transformed = {};

    Object.entries(data).forEach(([key, value]) => {
      if (key.endsWith('_other_text')) {
        const baseKey = key.replace('_other_text', '');
        const snakeBaseKey = toSnakeCase(baseKey);
        
        if (data[baseKey] === 'other' && value && value.trim() !== '') {
          transformed[snakeBaseKey] = String(value).trim();
        }
        return;
      }
      
      const snakeKey = toSnakeCase(key);
      
      if (value === 'other') {
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

    // Add missing field that exists in database
    transformed.middle_initial = '';

    return transformed;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    
    try {
      const registrationData = transformFormDataForAPI(formData);
      console.log('Submitting registration data:', registrationData);
      
      if (supabase) {
        // Use direct Supabase connection
        console.log('Using direct Supabase connection...');
        
        const { data, error } = await supabase
          .from('course_registrations')
          .insert([registrationData])
          .select();
        
        if (error) {
          throw error;
        }
        
        console.log('Success via Supabase:', data);
        alert('Registration submitted successfully!');
        setFormData(initializeFormData());
        
      } else if (API_BASE_URL) {
        // Fallback to Railway API if configured
        console.log('Attempting Railway API at:', `${API_BASE_URL}/register_course`);
        
        const response = await fetch(`${API_BASE_URL}/register_course`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(registrationData)
        });
        
        if (!response.ok) {
          throw new Error(`API request failed: ${response.status}`);
        }
        
        const result = await response.json();
        console.log('Success via API:', result);
        alert('Registration submitted successfully!');
        setFormData(initializeFormData());
        
      } else {
        throw new Error('No backend configured. Please add Supabase credentials or API URL.');
      }
      
    } catch (error) {
      console.error('Registration failed:', error);
      
      // Provide helpful error messages
      if (error.code === '23505') {
        alert('This email is already registered.');
      } else if (error.message.includes('fetch')) {
        alert('Network error. The backend server may be down. Please try again later.');
      } else {
        alert(`Registration failed: ${error.message}`);
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
          <div>API: {API_BASE_URL || 'Not set'}</div>
        </div>
      )}
      
      <div className="max-w-6xl mx-auto my-20 px-10 bg-card">
        <h1 className="[font-family:'Unageo-SemiBold'] text-3xl text-black text-foreground text-center mb-8">
          Agentic Learning Labs Registration Form
        </h1>
        <form onSubmit={handleSubmit} className="space-y-8 text-black">
          {Object.entries(FORM_CONFIG).map(([sectionKey, section]) => (
            <div key={sectionKey}>
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-7 mb-15">
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
                          className="block text-md text-left text-foreground">
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

