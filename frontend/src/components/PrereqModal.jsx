import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useModal } from '../context/PrereqModalContext.jsx';
import axios from 'axios';

const PrereqModal = () => {
  const questions = [
    "Do you have AI experience / Are you curious about AI and have good internet searching experience?",
    "Are you able to attend the in-person sessions?",
    "Are you committed to completing the online programs prior to the in-persons sessions?",
    "Are you willing to commit the required hours for this program?",
    "Do you enjoy solving problems and challenges?"
  ];

  const initialAnswers = Array(questions.length + 1).fill(null); // 5 questions + email
  const [answers, setAnswers] = useState(initialAnswers);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { isModalOpen, closeModal } = useModal();
  const navigate = useNavigate();

  const handleAnswerChange = (index, value) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = value;
    setAnswers(updatedAnswers);
  };

  const resetForm = () => {
    setAnswers(initialAnswers);
    setIsSubmitted(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const allAnswered = answers.every((ans) => ans !== null && ans !== "");
    const allYes = answers.slice(0, questions.length).every((ans) => ans === "yes");
    const emailProvided = answers[questions.length] && answers[questions.length].trim() !== "";

    if (!allAnswered || !emailProvided) {
      alert("Please complete all questions and provide your email.");
      return;
    }

    try {
      await axios.post("http://localhost:8000/prereq", {
        ai_experience: answers[0],
        in_person: answers[1],
        online_programs: answers[2],
        computer_req: answers[3],
        business_owner: answers[4],
        email: answers[5],
      });
    } catch (error) {
      console.error(error);
    }

    if (allYes) {
      closeModal();
      resetForm();
      navigate('/register');
    } else {
      setIsSubmitted(true);
    }
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50">
      {isSubmitted ? (
        <div className="relative flex flex-col items-start bg-white rounded-2xl py-20 px-30">
          <div className="flex flex-col gap-y-10">
            <h2 className="[font-family:'Unageo-SemiBold'] text-3xl text-black">Title</h2>
            <p className="text-lg text-black">Comm message</p>
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
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="relative flex flex-col max-h-[90vh] overflow-y-auto items-start bg-white rounded-2xl p-15">
          <div className="flex justify-between w-full">
            <h2 className="[font-family:'Unageo-SemiBold'] text-4xl text-black mb-5">
              Get ready to register
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
            </button>          </div>

          <div className="flex flex-col space-y-3 w-full text-black">
            {questions.map((q, index) => (
              <div key={index} className="flex flex-col space-y-3">
                <label className="text-lg text-foreground text-left">{q}</label>
                <div className="grid grid-cols-2 gap-x-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id={`yes-${index}`}
                      name={`question-${index}`}
                      value="yes"
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
          </div>

          <div className="flex w-full lg:w-3/4 mt-5">
            <input
              type="email"
              id="email"
              name="email"
              onChange={(e) => handleAnswerChange(questions.length, e.target.value)}
              required
              className="px-4 py-2 text-black rounded-md border border-gray-400 w-full"
              placeholder="Email"
            />
          </div>

          <div className="flex justify-center lg:justify-end space-x-4 mt-10 w-full">
            <button
              type="submit"
              className="text-lg text-black bg-brand_yellow hover:text-white hover:bg-brand_black rounded-3xl w-[226px] py-2 transition duration-200"
            >
              Submit
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default PrereqModal;
