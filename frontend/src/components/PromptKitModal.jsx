import React, { useState } from 'react';
import axios from 'axios';
import { usePromptKitModal } from '../context/PromptKitModalContext.jsx';

const API_BASE_URL = import.meta.env.MODE === 'production'
  ? import.meta.env.VITE_PROD_API : import.meta.env.VITE_DEV_API;

const PromptKitModal = () => {
  const { isModalOpen, closeModal } = usePromptKitModal();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleClose = () => {
    localStorage.setItem('promptKitDismissed', 'true');
    closeModal();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await axios.post(`${API_BASE_URL}/send_inquiry`, {
        'first_name': firstName,
        'last_name': lastName,
        'email': email,
        'message': `[AI Prompt Kit Request] ${message}`,
      });
      setIsSubmitted(true);
      localStorage.setItem('promptKitDismissed', 'true');
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50">
      <div className="relative w-[90vw] max-w-lg max-h-[90vh] overflow-y-auto bg-brand_black rounded-2xl p-8 lg:p-12 border border-gray-700">
        {/* Close button */}
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-700 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6 text-white"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {isSubmitted ? (
          <div className="flex flex-col items-center gap-6 text-white text-center py-8">
            <h2 className="[font-family:'Unageo-SemiBold'] text-2xl">Thank you!</h2>
            <p className="[font-family:'Unageo'] text-lg">
              Your AI Prompt Playbook is ready to download.
            </p>
            <a
              href="/AI_Prompt_Playbook_2026.pdf"
              download
              className="py-3 px-12 bg-brand_yellow hover:bg-white text-black rounded-full transition-colors text-center font-semibold"
            >
              Download Prompt Playbook
            </a>
            <button
              onClick={handleClose}
              className="py-2 px-12 border border-white hover:bg-gray-700 text-white rounded-full transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-6 text-white">
            <h2 className="[font-family:'Unageo-SemiBold'] text-2xl lg:text-3xl text-center">
              Would you like a free AI prompt kit?
            </h2>
            <p className="[font-family:'Unageo'] text-base text-center text-gray-300">
              Get our curated collection of AI prompts to boost your productivity. Enter your details below and we'll send it right over.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First Name"
                  required
                  className="flex-1 p-3 rounded-md text-white bg-black border border-white"
                />
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last Name"
                  required
                  className="flex-1 p-3 rounded-md text-white bg-black border border-white"
                />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                className="w-full p-3 rounded-md text-white bg-black border border-white"
              />
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Message (optional)"
                rows="3"
                className="w-full p-3 rounded-md text-white bg-black border border-white"
              />
              <button
                type="submit"
                className={`py-3 px-12 mx-auto rounded-full transition-colors
                  ${isLoading ? "bg-gray-200 text-brand_gray" : "bg-brand_yellow hover:bg-white text-black"}`}
              >
                {isLoading ? "Sending..." : "Get My Free Prompt Kit"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default PromptKitModal;
