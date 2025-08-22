import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInquiryModal } from '../context/InquiryModalContext.jsx';

const InquiryModal = () => {
    const { isModalOpen, closeModal } = useInquiryModal();
    if (!isModalOpen) return null;
    return (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50">
            <div className="relative max-w-lg max-h-[90vh] bg-white rounded-2xl py-25 px-15">
                <div className="flex flex-col gap-y-10 items-center">
                    <button
                    type="button"
                    onClick={() => {
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
                    <h2 className="[font-family:'Unageo-Semibold'] text-2xl text-black">We received your message!<br /></h2>
                    <p className="[font-family:'Unageo'] text-xl text-black text-center lg:text-left">We will reach out to you shortly. Please watch for an email from <b className="[font-family:'Unageo-Bold']">info@agenticlearninglabs.com.</b></p>
                </div>
            </div>
        </div>
    )
}

export default InquiryModal;