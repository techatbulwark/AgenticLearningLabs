import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useModal } from '../context/PrereqModalContext.jsx';
import axios from 'axios';

const PrereqModal = () => {
  const requirements = [
    {
      label: "1. Able to attend at least three of the in-person weekly workshops",
      answer: "",
    },
    {
      label: "2. Committed to completing the online learning programs prior to your weekly workshops",
      answer: "",
    },
  ];

  const [answers, setAnswers] = useState(requirements);
  const [email, setEmail] = useState("");
  const [updatePref, setUpdatePref] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { isModalOpen, closeModal } = useModal();
  const navigate = useNavigate();

  const handleAnswerChange = (index, value) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index].answer = value;
    setAnswers(updatedAnswers);
  };

  const resetForm = () => {
    setAnswers(requirements);
    setIsSubmitted(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();


    try {
      await axios.post("http://localhost:8000/prereq", {
        in_person: answers[0].answer,
        online_programs: answers[1].answer,
        email: email,
      });
    } catch (error) {
      console.error(error);
    }

    // course update preferences -> info@agentics
    if (updatePref && email !== "") {
      
    }

    console.log(answers);
    if (answers.every((ans) => ans.answer === "yes")) {
      closeModal();
      resetForm();
      navigate('/register');
    } else {
      setIsSubmitted(true);
    }
  };

  const handleUpdateSubmit = async(event) => {
    event.preventDefault();
    // accomodation email -> info@agentics
  }

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50">
      {isSubmitted ? (
        <form
          onSubmit={handleUpdateSubmit}
          className="relative flex flex-col items-start max-w-3xl max-h-[90vh] bg-white rounded-2xl p-15">
          <div className="flex flex-col gap-y-10">
            <h2 className="[font-family:'Unageo-SemiBold'] text-3xl text-black">Thanks for your interest in Agentic Learning Labs.</h2>
            <p className="text-lg text-black text-left">You have answered no to one or more of the requirements.  If you are still interested in our training please provide your email and we will get in touch to help you find an accommodation to participate if possible.  Please watch for an email from <b className="[font-family:'Unageo-Bold']">info@agenticlearninglabs.com.</b></p>
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
                className="text-lg text-black bg-brand_yellow hover:text-white hover:bg-brand_black rounded-3xl w-[226px] py-2 transition duration-200">
                Submit
              </button>
            </div>
          </div>
        </form>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="relative flex flex-col max-w-3xl max-h-[90vh] overflow-y-auto items-start bg-white rounded-2xl p-15">
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
                  className="mt-2 mr-2 scale-200 lg:scale-100"
                  onChange={() => setUpdatePref(!updatePref)}/>
                <label className="text-lg">I want to register and would like updates on Agentics Learning Labs courses and training</label>
              </div>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end space-x-4 w-full">
            <button
              type="submit"
              className="text-lg text-black bg-brand_yellow hover:text-white hover:bg-brand_black rounded-3xl w-[226px] py-2 transition duration-200">
              Submit
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default PrereqModal;