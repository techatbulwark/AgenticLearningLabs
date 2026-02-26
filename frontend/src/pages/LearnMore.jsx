import React, { useState } from 'react';
import axios from 'axios';
import supabase from '../lib/supabase';

import Header from '../components/Header';
import HeaderLogo from '../components/HeaderLogo';
import Footer from '../components/Footer';

import contactus from '../assets/images/contactus.png';

const API_BASE_URL = import.meta.env.MODE === 'production'
  ? import.meta.env.VITE_PROD_API : import.meta.env.VITE_DEV_API;

const LearnMore = () => {

    const sectionWrapper = "w-full mx-auto px-6 lg:px-16";

    const [name, setName] = useState("");
    const [title, setTitle] = useState("");
    const [company, setCompany] = useState("");
    const [email, setEmail] = useState("");
    const [consent, setConsent] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

    const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    const isFormValid = name.trim() !== "" && email.trim() !== "" && isValidEmail(email) && consent;

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!isFormValid) return;

        setIsLoading(true);
        setSubmitStatus(null);

        try {
            // Save to Supabase
            const { error: dbError } = await supabase
                .from('learn_more_inquiries')
                .insert([{
                    name: name.trim(),
                    title: title.trim() || null,
                    company: company.trim() || null,
                    email: email.trim(),
                    consent_communications: consent,
                }]);

            if (dbError) {
                console.error('Supabase insert error:', dbError);
                setSubmitStatus('error');
                setIsLoading(false);
                return;
            }

            // Send email notification (same as ContactUs)
            try {
                await axios.post(`${API_BASE_URL}/send_inquiry`, {
                    first_name: name.trim(),
                    last_name: '',
                    email: email.trim(),
                    message: `Learn More inquiry\nTitle: ${title.trim() || 'N/A'}\nCompany: ${company.trim() || 'N/A'}\nConsent to communications: Yes`,
                });
            } catch (emailError) {
                // Email notification is best-effort; data is already saved
                console.error('Email notification error:', emailError);
            }

            // Clear form on success
            setName("");
            setTitle("");
            setCompany("");
            setEmail("");
            setConsent(false);
            setSubmitStatus('success');
        } catch (error) {
            console.error('Submission error:', error);
            setSubmitStatus('error');
        }

        setIsLoading(false);
    };

    return (
        <div className="min-h-screen max-w-[1600px] mx-auto relative overflow-hidden flex flex-col">
            <HeaderLogo />
            <Header />

            {/* dotted background */}
            <div className="absolute inset-0 bg-brand_black bg-[radial-gradient(#2B2B2B_5px,transparent_1px)] [background-size:45px_45px]" />
            <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent" />

            <div className={`${sectionWrapper} relative z-10 flex flex-col lg:flex-row justify-center items-start py-24`}>
                <div className="flex flex-col z-10 w-full lg:w-1/2 my-10 items-start text-white">
                    <h2 className="[font-family:'Unageo-SemiBold'] text-5xl text-left leading-15 mb-4">Want to learn more?</h2>
                    <p className="text-xl text-gray-300 mb-10">Fill out the form below and our team will be in touch.</p>

                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col space-y-6 min-w-full"
                    >
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Name *"
                            className="w-full p-3 rounded-md text-white bg-black border-1 border-white"
                        />
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Title"
                            className="w-full p-3 rounded-md text-white bg-black border-1 border-white"
                        />
                        <input
                            type="text"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            placeholder="Company"
                            className="w-full p-3 rounded-md text-white bg-black border-1 border-white"
                        />
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email *"
                            className="w-full p-3 rounded-md text-white bg-black border-1 border-white"
                        />

                        {/* CASL-compliant consent checkbox — unchecked by default */}
                        <label className="flex items-start gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={consent}
                                onChange={(e) => setConsent(e.target.checked)}
                                className="mt-1 w-5 h-5 shrink-0 accent-brand_yellow"
                            />
                            <span className="text-sm text-gray-300 leading-snug">
                                I consent to receive electronic communications from Agentic Learning Labs about courses, events, and updates. You may withdraw your consent at any time.
                            </span>
                        </label>

                        <button
                            type="submit"
                            disabled={!isFormValid || isLoading}
                            className={`py-2 px-24 mx-auto lg:mr-0 lg:ml-auto rounded-full transition-colors
                            ${(!isFormValid || isLoading) ? "bg-gray-500 text-gray-300 cursor-not-allowed" : "bg-brand_yellow hover:bg-white text-black"}`}
                        >
                            {isLoading ? "Sending..." : "Submit"}
                        </button>
                    </form>

                    {/* Inline status messages */}
                    {submitStatus === 'success' && (
                        <p className="mt-6 text-brand_yellow text-lg">
                            Request sent. We'll be in touch soon.
                        </p>
                    )}
                    {submitStatus === 'error' && (
                        <p className="mt-6 text-brand_red text-lg">
                            Sorry, something went wrong. Please <a href="/" className="underline hover:text-white">contact us</a>.
                        </p>
                    )}
                </div>

                {/* Right Column — image */}
                <div className="hidden lg:block w-2/5 m-auto z-10">
                    <img src={contactus} loading="lazy" alt="Learn more" />
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default LearnMore;
