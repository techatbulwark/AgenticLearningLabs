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
            q: "What is Agentic Learning Labs?",
            a: "Agentic Learning Labs teaches you how to use AI to do your job better and stand out in a competitive job market.",
        },
        {
            q: "What topics or skills will I learn?",
            a: "You'll learn how to use AI tools to do your job better. We currently offer courses for data analytics, product innovation, or sales & marketing.  The specific learning outcomes are detailed in each course overview.",
        },
        {
            q: "Are the courses beginner-friendly?",
            a: "The courses are designed for people who have education or experience in a specific job field (ex. marketing or data analytics) but no experience with AI.",
        },
        {
            q: "What kind of AI tools will we use?",
            a: "You'll explore tools like ChatGPT, Google AI Studio, Lovable, and more. The skills you use with these tools will be applicable to most AI software.",
        },
        {
            q: "How do I know which program is right for me?",
            a: "Select the course based on your job function: data analytics, product innovation, or sales & marketing.",
        },
    ]
    const format = [
        {
            q: "How long is the course?",
            a: "This four-week course blends flexible online learning with hands-on, in-person practice. For the first three weeks, you'll complete 6–10 hours of online learning each week plus participate in at least one in-person workshop to apply your skills. In the final week, you'll join the final in-person workshop to showcase your learning.",
        },
        {
            q: "How many hours per week should I expect to spend?",
            a: "The online learning should take about 6-10 hours per week, depending on your pace and schedule.",
        },
        {
            q: "What if I can't attend every in-person session? Will I still receive my certificate?",
            a: "We understand that life happens! While participation at the multiple in-person sessions is strongly encouraged to get the most out of the program, we recognize that some absences may be unavoidable. In most cases, you can still receive your certificate if you:",
            b: [
                "Communicate any planned absences with the program coordinator in advance",
                "Make up missed content through designated catch-up activities or assignments",
                "Attend at least three in-person workshops",
            ]
            ,
        },
    ]
    const cost = [
        {
            q: "Is this really free? What's the catch?",
            a: "Yes, these courses are complimentary thanks to support from the Employment Ontario program, the Ontario Government and Government of Canada.",
        },
    ]
    const outcomes = [
        {
            q: "Will I get a certificate or credential at the end?",
            a: "Yes, you'll receive a micro-credential certificate from TribalScale and a product you can include in your portfolio.",
        },
    ]
    const process = [
        {
            q: "Why is the registration form so long?",
            a: "This program is offered for free thanks to support from Employment Ontario, who require the registration form.  This information helps us better understand your needs and build a program that supports your goals. Your information is collected in accordance with provincial privacy laws and will only be used for program planning and service delivery.",
        },
        {
            q: "Can I apply for more than one program?",
            a: "You can only take one course at a time, but you're welcome to register for another course in the future.",
        },
    ]

    return (
        <div className="min-h-screen max-w-[1600px] mx-auto relative overflow-hidden flex flex-col">
            <HeaderLogo />
            <Header />
            <div className="absolute inset-0 bg-brand_black bg-[radial-gradient(#2B2B2B_5px,transparent_1px)] [background-size:45px_45px]" />
            <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent" />

            <section className={`${sectionWrapper} relative w-full`}>
                <div className="lg:px-inner py-[100px]">
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
                                    {content.b && (
                                        <ul className="list-disc list-inside mt-3 space-y-1 ml-5">
                                            {content.b.map((bullet, bulletIndex) => (
                                                <li key={bulletIndex} className="text-base">{bullet}</li>
                                            ))}
                                        </ul>
                                    )} 
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
                            {outcomes.map((content, index) => (
                                <div>
                                    <h3 className="[font-family:'Unageo-SemiBold'] text-3xl mb-5">{content.q}</h3>
                                    <p className="text-base">{content.a}</p>
                                </div>
                            ))}
                            <div className="w-line_width h-2 bg-brand_yellow rounded-full my-15"></div>
                            {process.map((content, index) => (
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


