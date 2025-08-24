import React, { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = import.meta.env.MODE === 'production' 
  ? import.meta.env.VITE_PROD_API : import.meta.env.VITE_DEV_API;

const CourseUpdate = () => {

    const sectionWrapper = "w-full mx-auto px-6 lg:px-16";

    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    
    const handleUpdateSubmit = async(event) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            await axios.post(`${API_BASE_URL}/course_updates`, {
            email: email,
            });
        } catch (error) {
            console.error(error);
        }
        setIsLoading(false);
        setIsSubmitted(true);
    }
    
    return (
        <div className="w-full lg:px-outer_lg py-20 relative bg-brand_gray border-t border-white">
            <form
            onSubmit={handleUpdateSubmit}
            className="flex flex-col justify-between items-start px-inner">
                <div className="w-full lg:w-1/2 text-left">
                    <h2 className="[font-family:'Unageo-SemiBold'] text-4xl mb-5">Please notify me of new course dates when they are available</h2>
                </div>
                <div className="flex flex-row items-center w-full lg:w-4/5 gap-5">
                    <input
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-grow h-10 bg-white rounded-md text-black p-3"
                    placeholder="Email"></input>
                    <button
                        type="submit"
                        className={`flex bg-brand_yellow text-black rounded-full w-12 h-12 text-3xl items-center justify-center transition-all duration-300 ease-in-out`}
                        >
                        {isLoading ?
                            (<svg
                            className={`animate-spin h-8 w-8 ${isSubmitted ? "text-green-500" : "text-black"}`}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24">
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z">
                                </path>
                            </svg>) : <span className={`${isSubmitted ? "text-xl" : "text-3xl"}`}>{isSubmitted ? "✔" : "→"}</span>}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CourseUpdate;