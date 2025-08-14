import React, { useState } from 'react';

import Header from '../components/Header';
import HeaderLogo from '../components/HeaderLogo';
import Footer from '../components/Footer';
import ContactUs from '../components/ContactUs';
import RegisterNow from '../components/RegisterNow';


const FAQ = () => {

    const sectionWrapper = "w-full mx-auto px-outer_sm lg:px-outer_lg";
    
    const program = [
        {
            q: "What is Agentic Learning Lab?",
            a: "Agentic Learning Labs teaches you how to use AI to do your job better and stand out in a competitive job market.",
        },
        {
            q: "What topics or skills will I learn?",
            a: "You'll learn how to use AI tools to do your job better. We currently offer courses for data analytics, product innovation, or sales & marketing. The specific learning outcomes are detailed in each course overview.",
        },
        {
            q: "Are the courses beginner-friendly?",
            a: "The courses are designed for people who have education or experience in a specific job field (ex. marketing or data analytics) but no experience with AI.",
        },
    ]
    const format = [
        {
            q: "How long is the course?",
            a: "Select the course based on your job function: data analytics, product innovation, or sales & marketing.",
        },
        {
            q: "How many hours per week should I expect to spend?",
            a: "The online learning should take about 6-10 hours per week, depending on your pace and schedule. ",
        },
    ]

    const cost = [
        {
            q: "Is this really free? What's the catch?",
            a: "Yes, these courses are complimentary thanks to support from the Employment Ontario program, the Ontario Government and Government of Canada.",
        },
        {
            q: "Will I get a certificate or credential at the end?",
            a: "Yes, you'll receive a micro-credential certificate and a project you can include in your portfolio.",
        },
    ]

    return (
        <div className="min-h-screen max-w-[1600px] mx-auto relative overflow-hidden flex flex-col">
            <HeaderLogo />
            <Header />
            <div className="absolute inset-0 bg-brand_black bg-[radial-gradient(#2B2B2B_5px,transparent_1px)] [background-size:45px_45px]" />
            <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent" />

            <section className={`${sectionWrapper} relative w-full`}>
                <div className="px-inner py-[100px]">
                    {/* heading */}
                    <div className="lg:col-span-1">
                        <h2 className="[font-family:'Unageo-SemiBold'] text-6xl text-left font-bold text-white leading-20">FAQ's</h2>
                        <div className="w-line_width h-2 bg-brand_yellow rounded-full my-10"></div>
                    </div>
                    <div className="">
                        <div className="space-y-10 text-white text-left">
                            {program.map((content, index) => (
                                <div className="">
                                    <h3 className="[font-family:'Unageo-SemiBold'] text-3xl mb-5">{content.q}</h3>
                                    <p className="text-base">{content.a}</p>
                                </div>
                            ))}
                            <div className="w-line_width h-2 bg-brand_yellow rounded-full my-15"></div>
                            {format.map((content, index) => (
                                <div>
                                    <h3 className="[font-family:'Unageo-SemiBold'] text-3xl mb-5">{content.q}</h3>
                                    <p className="text-base">{content.a}</p>
                                </div>
                            ))}
                            <div className="w-line_width h-2 bg-brand_yellow rounded-full my-15"></div>
                            {cost.map((content, index) => (
                                <div>
                                    <h3 className="[font-family:'Unageo-SemiBold'] text-3xl mb-5">{content.q}</h3>
                                    <p className="text-base">{content.a}</p>
                                </div>
                            ))}
                            <div className="w-line_width h-2 bg-brand_yellow rounded-full my-15"></div>
                        </div>

                    </div>
                </div>
            </section>
            <RegisterNow />
            <ContactUs />
        <Footer />
        </div>
    );
};

export default FAQ;