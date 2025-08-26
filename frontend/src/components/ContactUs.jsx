import React, { useState } from 'react';
import axios from 'axios';
import { useInquiryModal } from '../context/InquiryModalContext.jsx'

import img3 from '../assets/images/img3.png';
import contactus from '../assets/images/contactus.png';

const API_BASE_URL = import.meta.env.MODE === 'production' 
  ? import.meta.env.VITE_PROD_API : import.meta.env.VITE_DEV_API;

const ContactUs = () => {

    const sectionWrapper = "w-full mx-auto px-6 lg:px-16";

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { openModal } = useInquiryModal();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        try {
        const response = await axios.post(
            `${API_BASE_URL}/send_inquiry`,
            {
            'first_name': firstName,
            'last_name': lastName,
            'email': email,
            'message': message,
            }
        );
        } catch (error) {
        console.error(error);
        }
        setIsLoading(false);
        openModal();
    }
    return (
        <div id="contactus" className={`${sectionWrapper} relative z-10 flex flex-col lg:flex-row justify-center items-send bg-brand_black bg-[radial-gradient(#2B2B2B_5px,transparent_1px)] [background-size:45px_45px] py-16 border-t-2 border-white`}>
            <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent" />
            <div className="flex flex-col z-10 w-full lg:w-1/2 my-10 items-start text-white">
                <h2 className="[font-family:'Unageo-SemiBold'] text-5xl text-left leading-15 mb-10">Questions?<br />Reach out to us!</h2>
                <form 
                    onSubmit={handleSubmit}
                    className="flex flex-col space-y-6 min-w-full">
                    <div className="flex flex-col md:flex-row gap-4">
                        <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="First Name"
                            className="flex-1 p-3 rounded-md text-white bg-black border-1 border-white"
                        />
                        <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="Last Name"
                            className="flex-1 p-3 rounded-md text-white bg-black border-1 border-white"
                        />
                    </div>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="w-full p-3 rounded-md text-white bg-black border-1 border-white"
                    />
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Message"
                        rows="4"
                        className="w-full p-3 rounded-md text-white bg-black border-1 border-white"
                    />
                    <button
                        type="submit"
                        className={`py-2 px-24 mx-auto lg:mr-0 lg:ml-auto rounded-full transition-colors
                        ${isLoading ? "bg-gray-200 text-brand_gray" : "bg-brand_yellow hover:bg-white text-black"}`}>
                        {isLoading ? "Sending..." : "Send"}
                    </button>
                </form>
            </div>

            {/* Right Column - Dotted Background */}
            <div className="hidden lg:block w-2/5 m-auto z-10">
                <img src={contactus} loading="lazy" className="" alt="Background 3" />
            </div>
        </div>

    )
}

export default ContactUs;