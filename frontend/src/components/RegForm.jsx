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
        validationMessage: "Please select a course to continue",
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
        gridClass: "lg:col-span-3",
        validationMessage: "Last name is required"
      },
      {
        id: "firstName",
        label: "First name",
        type: "text",
        required: true,
        gridClass: "lg:col-span-2",
        validationMessage: "First name is required"
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
        gridClass: "lg:col-span-1",
        validationMessage: "Date of birth is required"
      },
      {
        id: "prefLanguage",
        label: "Preferred language:",
        type: "radio",
        required: true,
        gridClass: "col-span-full",
        validationMessage: "Please select your preferred language",
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
        validationMessage: "Please select your preferred communication method",
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
        gridClass: "lg:col-span-1",
        validationMessage: "Street number is required"
      },
      {
        id: "streetName",
        label: "Street name", 
        type: "text",
        required: true,
        gridClass: "lg:col-span-2",
        validationMessage: "Street name is required"
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
        gridClass: "lg:col-span-2",
        validationMessage: "City is required"
      },
      {
        id: "province",
        label: "Province",
        type: "text",
        required: true,
        gridClass: "lg:col-span-2",
        validationMessage: "Province is required"
      },
      {
        id: "postalCode",
        label: "Postal code",
        type: "text",
        required: true,
        gridClass: "lg:col-span-1",
        validationMessage: "Postal code is required"
      },
      {
        id: "primaryPhone",
        label: "Primary phone number",
        type: "radio",
        required: true,
        gridClass: "col-span-3",
        validationMessage: "Please select phone type",
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
        gridClass: "lg:col-span-2",
        validationMessage: "Phone number is required"
      },
      {
        id: "email",
        label: "Email",
        type: "email",
        required: true,
        gridClass: "lg:col-span-full",
        validationMessage: "Email is required"
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
        gridClass: "col-span-full",
        validationMessage: "Please select your current status",
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
        gridClass: "col-span-full",
        validationMessage: "Please select your education level",
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
        gridClass: "col-span-full",
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
        gridClass: "lg:col-span-4",
        validationMessage: "Please enter your full name as signature"
      },
      {
        id: "signatureDate",
        label: "Date",
        type: "date",
        required: true,
        gridClass: "lg:col-span-1",
        validationMessage: "Please enter today's date"
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
  
  // Enhanced state for validation tracking
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  
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

  useEffect(() => {
    setFormData(initializeFormData());
  }, []);

  /**
   * Validate individual field
   */
  const validateField = (fieldId, value, fieldConfig) => {
    let error = null;

    // Required field validation
    if (fieldConfig.required && (!value || value === '')) {
      error = fieldConfig.validationMessage || `${fieldConfig.label} is required`;
      return error;
    }

    // Special validation for radio "other" option
    if (fieldConfig.type === 'radio' && value === 'other') {
      const otherText = formData[`${fieldId}_other_text`];
      if (fieldConfig.required && (!otherText || otherText.trim() === '')) {
        error = `Please specify details for "${fieldConfig.label}" (Other option)`;
      }
    }

    return error;
  };

  /**
   * Handle field blur for real-time validation
   */
  const handleFieldBlur = (fieldId) => {
    setTouched(prev => ({ ...prev, [fieldId]: true }));
    
    // Find field config
    let fieldConfig = null;
    Object.values(FORM_CONFIG).forEach(section => {
      const field = section.fields.find(f => f.id === fieldId);
      if (field) fieldConfig = field;
    });
    
    if (fieldConfig && fieldConfig.type === 'radio') {
      const value = formData[fieldId];
      const error = validateField(fieldId, value, fieldConfig);
      
      setErrors(prev => ({
        ...prev,
        [fieldId]: error
      }));
    }
  };

  const handleInputChange = (fieldId, value, fieldConfig) => {
    setFormData(prev => ({
      ...prev,
      [fieldId]: value
    }));

    // Clear error on change if field was touched or submit was attempted
    if ((touched[fieldId] || submitAttempted) && fieldConfig) {
      const error = validateField(fieldId, value, fieldConfig);
      setErrors(prev => ({
        ...prev,
        [fieldId]: error
      }));
    }
  };

  const handleOtherInputChange = (fieldId, value) => {
    setFormData(prev => ({
      ...prev,
      [`${fieldId}_other_text`]: value,
      [fieldId]: 'other'
    }));
    
    // Validate other text if touched
    if (touched[fieldId] || submitAttempted) {
      let fieldConfig = null;
      Object.values(FORM_CONFIG).forEach(section => {
        const field = section.fields.find(f => f.id === fieldId);
        if (field) fieldConfig = field;
      });
      
      if (fieldConfig) {
        const error = validateField(fieldId, 'other', fieldConfig);
        setErrors(prev => ({
          ...prev,
          [fieldId]: error
        }));
      }
    }
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
    const hasError = (errors[field.id] && (touched[field.id] || submitAttempted));
    const errorId = `${field.id}-error`;
    
    const commonClasses = `w-full px-4 py-1 border ${
      hasError 
        ? 'border-red-500 focus:ring-red-500' 
        : 'border-input focus:ring-ring'
    } bg-background rounded-md text-foreground focus:outline-none focus:ring-2 focus:border-transparent`;
    
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
          <div>
            <input
              id={field.id}
              type={field.type}
              value={formData[field.id] || ''}
              onChange={(e) => handleInputChange(field.id, e.target.value, field)}
              placeholder={field.placeholder}
              maxLength={field.maxLength}
              step={field.step}
              className={commonClasses}
              required={field.required}
              aria-required={field.required}
              aria-invalid={hasError}
              aria-describedby={hasError ? errorId : undefined}
            />
            {hasError && (
              <p id={errorId} className="mt-1 text-sm text-red-600" role="alert">
                {errors[field.id]}
              </p>
            )}
          </div>
        );
        
      case 'radio':
        const cols = (field.id === "courseSelection") ? 1 : 4; 
        const gridClass = (field.id === "courseSelection") ? "lg:grid-cols-1" : "lg:grid-cols-4"; 
        return (
          <div>
            <div className="space-y-5" role="radiogroup" aria-required={field.required} aria-invalid={hasError}>
              {Array.from({ length: Math.ceil(field.options.length / cols) }, (_, rowIndex) => (
                <div key={rowIndex} className={`grid grid-cols-1 gap-y-5 ${gridClass}`}>
                  {field.options
                    .slice(rowIndex * cols, (rowIndex + 1) * cols)
                    .map((option, optionIndex) => (
                      <div key={option.value} className={`${option.hasInput ? "col-span-2" : "col-span-1"} flex items-center text-left space-x-2`}>
                        <input
                          type="radio"
                          id={`${field.id}-${option.value}`}
                          name={field.id}
                          value={option.value}
                          checked={formData[field.id] === option.value}
                          onChange={(e) => {
                            handleInputChange(field.id, e.target.value, field);
                            if (option.value !== 'other') {
                              handleFieldBlur(field.id);
                            }
                          }}
                          className="accent-primary"
                          // Add required attribute to first radio button in required groups
                          required={field.required && rowIndex === 0 && optionIndex === 0}
                          aria-required={field.required && rowIndex === 0 && optionIndex === 0}
                        />
                        <label htmlFor={`${field.id}-${option.value}`} className="text-md text-foreground">
                          {option.label}
                          {option.hasInput && (
                            <input
                              type="text"
                              value={formData[`${field.id}_other_text`] || ''}
                              onChange={(e) => handleOtherInputChange(field.id, e.target.value)}
                              onBlur={() => handleFieldBlur(field.id)}
                              onFocus={() => handleInputChange(field.id, 'other', field)}
                              className={`ml-5 border ${
                                hasError && formData[field.id] === 'other' 
                                  ? 'border-red-500' 
                                  : 'border-input'
                              } rounded-md text-foreground px-2 py-1`}
                              placeholder="Please specify"
                              aria-label={`Specify ${option.label}`}
                              required={field.required && formData[field.id] === 'other'}
                            />
                          )}
                        </label>
                      </div>
                    ))}
                </div>
              ))}
            </div>
            {hasError && (
              <p id={errorId} className="mt-2 text-sm text-red-600" role="alert">
                {errors[field.id]}
              </p>
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
                checked={formData[field.id] || false}
                onChange={(e) => handleCheckboxChange(field.id, e.target.checked)}
                aria-describedby={hasError ? errorId : undefined}
              />
              <label htmlFor={field.id}>{field.label}</label>
            </div>
            {hasError && (
              <p id={errorId} className="text-sm text-red-600" role="alert">
                {errors[field.id]}
              </p>
            )}
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
      // Skip display-only fields
      if (key === 'commMessage' || key === 'primary_mailing_address') {
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

  /**
   * Validate entire form including radio buttons
   */
  const validateForm = () => {
    const newErrors = {};
    
    Object.values(FORM_CONFIG).forEach(section => {
      section.fields.forEach(field => {
        if (field.type !== 'paragraph') {
          const value = formData[field.id];
          const error = validateField(field.id, value, field);
          
          if (error) {
            newErrors[field.id] = error;
          }
        }
      });
    });
    
    return newErrors;
  };

  /**
   * Focus first error field
   */
  const focusFirstError = (errors) => {
    for (const section of Object.values(FORM_CONFIG)) {
      for (const field of section.fields) {
        if (errors[field.id]) {
          const element = document.getElementById(field.id) || 
                        document.getElementById(`${field.id}-${field.options?.[0]?.value}`);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            element.focus();
            return;
          }
        }
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitAttempted(true);
    
    // Validate entire form
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setTouched(Object.keys(validationErrors).reduce((acc, key) => ({
        ...acc,
        [key]: true
      }), {}));
      
      // Focus first error field
      focusFirstError(validationErrors);
      
      // Alert with specific error count
      const errorCount = Object.keys(validationErrors).length;
      alert(`Please correct ${errorCount} error${errorCount !== 1 ? 's' : ''} in the form before submitting.`);
      
      return;
    }
    
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
        
        // Reset form
        setFormData(initializeFormData());
        setErrors({});
        setTouched({});
        setSubmitAttempted(false);
        
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
        
        // Reset form
        setFormData(initializeFormData());
        setErrors({});
        setTouched({});
        setSubmitAttempted(false);
        
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
          <div>Errors: {Object.keys(errors).length}</div>
        </div>
      )}
      
      <div className="max-w-6xl mx-auto my-20 px-10 bg-card">
        <h1 className="[font-family:'Unageo-SemiBold'] text-3xl text-black text-foreground text-center mb-8">
          Agentic Learning Labs Registration Form
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-8 text-black" noValidate>
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
          
          {/* Form error summary */}
          {submitAttempted && Object.keys(errors).length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4" role="alert">
              <p className="text-red-800 text-sm font-semibold">
                Please correct the errors above before submitting.
              </p>
              <ul className="text-red-600 text-xs mt-2">
                {Object.values(errors).map((error, index) => (
                  <li key={index}>• {error}</li>
                ))}
              </ul>
            </div>
          )}
          
          <div className="flex flex-col items-center lg:items-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-[250px] ${isSubmitting ? 'bg-gray-500' : 'bg-black hover:opacity-85'} text-white text-lg py-3 px-6 rounded-2xl transition-colors`}>
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
        
        {/* Required fields notice */}
        <p className="text-sm text-gray-600 mt-6 text-center">
          <span className="text-red-500">*</span> indicates required fields
        </p>
      </div>
    </div>
  );
};

export default RegistrationForm;