import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePrereqModal } from '../context/PrereqModalContext.jsx';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey)
  : null;

const PrereqModal = () => {
  const requirements = [
    {
      label: "1. Able to attend the in-person weekly workshops",
      answer: "",
    },
    {
      label: "2. Able to complete online learning modules prior to weekly workshops",
      answer: "",
    },
  ];

  const [answers, setAnswers] = useState(requirements);
  const [email, setEmail] = useState("");
  const [updatePref, setUpdatePref] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSecondarySubmitted, setIsSecondarySubmitted] = useState(false);
  const { isModalOpen, closeModal } = usePrereqModal();
  const navigate = useNavigate();

  const handleAnswerChange = (index, value) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index].answer = value;
    setAnswers(updatedAnswers);
  };

  const resetForm = () => {
    setAnswers(requirements);
    setIsSubmitted(false);
    setIsSecondarySubmitted(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    
    try {
      if (!supabase) {
        throw new Error('Database connection not configured');
      }
      
      // Submit prereq responses to the only existing table
      const { error } = await supabase
        .from('prereq_responses')
        .insert([{
          in_person_availability: answers[0].answer,
          complete_online_programs: answers[1].answer,
          email: email
        }]);
      
      if (error) throw error;
      
      // Note: Email notifications would need to be handled separately
      // since Railway backend is not being used
      
    } catch (error) {
      console.error('Submission error:', error);
    }
    
    setIsLoading(false);
    
    if (answers.every((ans) => ans.answer === "yes")) {
      closeModal();
      resetForm();
      navigate('/select-course');
    } else {
      setIsSubmitted(true);
    }
  };

  const handleUpdateSubmit = async(event) => {
    event.preventDefault();
    setIsLoading(true);
    
    try {
      if (!supabase) {
        throw new Error('Database connection not configured');
      }
      
      // Store accommodation requests in prereq_responses with special values
      const { error } = await supabase
        .from('prereq_responses')
        .insert([{
          in_person_availability: 'accommodation_requested',
          complete_online_programs: 'accommodation_requested',
          email: email
        }]);
      
      if (error) throw error;
      setIsSecondarySubmitted(true);
      
    } catch (error) {
      console.error(error);
      alert('There was an error submitting your email. Please try again.');
    }
    
    setIsLoading(false);
  }
  
  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50">
      {isSecondarySubmitted ? (
        <div className="relative max-w-3xl lg:max-w-xl max-h-[90vh] bg-white rounded-2xl p-15">
          <div className="flex flex-col gap-y-10 items-center">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <svg 
                className="w-8 h-8 text-green-600" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24">
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M5 13l4 4L19 7"/>
              </svg>
            </div>
            <button
              type="button"
              onClick={() => {
                resetForm();
                closeModal();
              }}
              aria-label="Close modal"
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-gray-200 transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6 text-black">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 className="[font-family:'Unageo-SemiBold'] text-3xl text-black">We received your email!</h2>
            <p className="text-lg text-black">Please watch for an email from <b className="[font-family:'Unageo-Bold']">info@agenticlearninglabs.com.</b></p>
          </div>
        </div>
      ) : isSubmitted ? (
        <form
          onSubmit={handleUpdateSubmit}
          className="relative max-w-3xl lg:max-w-xl max-h-[90vh] bg-white rounded-2xl p-15">
          <div className="flex flex-col gap-y-10">
            <h2 className="[font-family:'Unageo-SemiBold'] text-3xl text-black">Thanks for your interest in Agentic Learning Labs.</h2>
            <p className="text-lg text-black text-left">You have answered no to one or more of the requirements. If you are still interested in our training please provide your email and we will get in touch to help you find an accommodation to participate if possible.</p>
            <button
              type="button"
              onClick={() => {
                resetForm();
                closeModal();
              }}
              aria-label="Close modal"
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-gray-200 transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6 text-black">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="flex flex-col lg:flex-row space-y-10 lg:space-y-0 space-x-5 items-center text-left w-full">
              <input
                type="email"
                id="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                required
                className="px-4 py-2 text-black rounded-md border border-gray-400 w-full"
                placeholder="Email"
              />
              <button
                type="submit"
                className={`text-lg rounded-3xl w-[226px] py-2 transition duration-200
                ${isLoading ? "bg-gray-200" : "text-black bg-brand_yellow hover:text-white hover:bg-brand_black"}`}>
                {isLoading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        </form>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="relative max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl p-15">
          <div className="flex justify-between w-full mb-7">
            <h2 className="[font-family:'Unageo-SemiBold'] text-4xl text-black">
              What you need to register
            </h2>
            <button
              type="button"
              onClick={() => {
                resetForm();
                closeModal();
              }}
              aria-label="Close modal"
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-gray-200 transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6 text-black">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex flex-col space-y-5 w-full mb-10 text-black">
            <p className="text-lg text-foreground text-left">Please confirm you are:</p>
            {requirements.map((req, index) => (
              <div key={index} className="flex flex-col space-y-3">
                <label className="text-lg text-foreground text-left">{req.label}</label>
                <div className="grid grid-cols-2 w-full lg:w-3/4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id={`yes-${index}`}
                      name={`question-${index}`}
                      value="yes"
                      required
                      onChange={(e) => handleAnswerChange(index, e.target.value)}
                      className="accent-black w-5 h-5"
                    />
                    <label htmlFor={`yes-${index}`} className="text-lg text-foreground">
                      Yes
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id={`no-${index}`}
                      name={`question-${index}`}
                      value="no"
                      required
                      onChange={(e) => handleAnswerChange(index, e.target.value)}
                      className="accent-black w-5 h-5"
                    />
                    <label htmlFor={`no-${index}`} className="text-lg text-foreground">
                      No
                    </label>
                  </div>
                </div>
              </div>
            ))}
            <div className="flex flex-col space-y-5 items-start text-left w-full mt-5">
              <input
                type="email"
                id="email"
                name="email"
                required={updatePref}
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 py-2 text-black rounded-md border border-gray-400 w-full"
                placeholder="Email"
              />
              <div className="flex flex-row">
                <input
                  type="checkbox" 
                  id="updatePref"
                  className="mt-2 mr-3 scale-200 lg:scale-100"
                  onChange={() => setUpdatePref(!updatePref)}/>
                <label className="text-lg">I want to register and would like updates on Agentics Learning Labs courses and training</label>
              </div>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end space-x-4 w-full">
            <button
              type="submit"
              className={`text-lg rounded-3xl w-[226px] py-2 transition duration-200
              ${isLoading ? "bg-gray-200 text-brand_gray" : "text-black bg-brand_yellow hover:text-white hover:bg-brand_black"}`}>
              {isLoading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default PrereqModal;