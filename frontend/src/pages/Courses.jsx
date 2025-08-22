import React, { useState } from 'react';

import Header from '../components/Header';
import HeaderLogo from '../components/HeaderLogo';
import Footer from '../components/Footer';

import bulwarkLogoA from '../assets/images/bulwark_glossy_white_ALL.png';
import bulwarkLogoL from '../assets/images/bulwark_glossy_white_L.png';
import course_header1 from '../assets/images/course_header1.jpg';
import course_header2 from '../assets/images/course_header2.png';
import course_header3 from '../assets/images/course_header3.jpg';

const Courses = () => {
    
    const sectionWrapper = "w-full mx-auto px-outer_sm lg:px-outer_lg";
    
    const [openIndex, setOpenIndex] = useState(null);

    const courseData = [
    {
        title: "AI for Sales, Marketing & Business Development",
        subtitle: "Drive sales and reach new customers with an AI-powered business strategy.",
        body: "Learn how to use AI to directly improve sales, marketing, and business development. Develop go-to-market plans, personalized marketing campaigns, and customer segmentation. Great for sales reps, marketers, public relations pros, and business builders.",
        link: "/sales-marketing",
    },
    {
        title: "AI for Customer Experience and Product Innovation",
        subtitle: "Use AI to better design products, services and experiences.",
        body: "Learn how to use AI to brainstorm, test and pitch products and service ideas that meet real customer needs, improve the customer experience and drive product innovation.  Great for creative thinkers, innovators and product developers.",
        link: "/customer-experience",
    },
    {
        title: "AI for Data Analytics for Decision Making",
        subtitle: "Use AI to turn data into knowledge and knowledge into action.",
        body: "In business, data is power. Learn the practical skills on how to apply AI to analytical data and use it for real time decision making, such as market trend analysis, demand forecasting, supplier management, and streamlining of logistics and distribution. Great for logistics, admin and analyst roles.",
        link: "/data-analytics",
    },
    ];

    const toggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    
    return (
        <div className="min-h-screen max-w-[1600px] mx-auto relative overflow-hidden flex flex-col">
            <HeaderLogo />
            <Header />
            
            <div className="absolute inset-0 bg-brand_black bg-[radial-gradient(#2B2B2B_5px,transparent_1px)] [background-size:45px_45px]" />
            <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent" />

            <section className={`${sectionWrapper} relative pb-10 flex flex-col mt-30`}>
                <div className="grid grid-cols-1 lg:grid-cols-3 text-left text-white">
                    <div className="relative flex flex-col gap-10">
                        <h2 className="[font-family:'Unageo-SemiBold'] text-6xl lg:text-7xl leading-tight tracking-tight mb-10">OUR<br />COURSES</h2>
                        <div className="hidden lg:block relative w-full">
                            <img src={course_header1} loading="lazy" className="relative w-[300px] h-[200px] -right-25" />
                            <div className="absolute -top-8 z-10">
                                <h2 className="[font-family:'Unageo-SemiBold'] text-4xl leading-12 z-10">AI for Data Analytics for<br />Decision Making</h2>
                            </div>
                        </div>
                    </div>
                    <div className="hidden lg:flex justify-center relative w-full">
                        <img src={course_header2} loading="lazy" className="relative w-[200px] h-[250px] top-70" />
                        <div className="absolute z-10 top-90">
                            <h2 className="[font-family:'Unageo-SemiBold'] text-4xl leading-12 z-10">AI for Customer Experience<br />& Product Innovation </h2>
                        </div>
                    </div>
                    <div className="hidden lg:block relative w-full">
                        <img src={course_header3} loading="lazy" className="relative w-[300px] h-[200px] top-30 left-30" />
                        <div className="absolute z-10">
                            <h2 className="[font-family:'Unageo-SemiBold'] text-4xl leading-12 z-10">AI for Sales, Marketing<br />& Business Development </h2>
                        </div>
                    </div>
                    <div>
                        <img src={bulwarkLogoA} loading="lazy" className="absolute w-[250px] lg:hidden top-10 -right-20" />
                        <img src={bulwarkLogoA} loading="lazy" className="absolute w-[240px] hidden lg:block -top-20 right-0" />
                        <img src={bulwarkLogoL} loading="lazy" className="absolute w-[150px] rotate-20 hidden lg:block top-100 -left-10" />
                        <img src={bulwarkLogoL} loading="lazy" className="absolute w-[150px] rotate-270 hidden lg:block top-0 left-220" />
                    </div>

                </div>
                <div className="w-line_width h-2 bg-brand_yellow rounded-full mt-0 lg:mt-35"></div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-10 items-start my-15">
                    {/* heading */}
                    <p className="text-left text-xl">
                        From day one, learners go beyond theory exploring real datasets, crafting smart AI prompts, and testing outputs in tools like ChatGPT and Google Sheets. The first three weeks include self-paced weekly video lessons and hands-on AI assignments, plus live online workshops for real-time practice.
                    </p>
                    <p className="text-left text-xl">
                        Throughout the four weeks, learners will come together for weekly in-person workshops held at the TribalScale office where teams will build and launch a working AI-powered tool. Expect hands-on coaching, peer feedback and a final demo you will be proud to post on LinkedIn. This is where experimentation meets execution and where your portfolio starts taking shape.
                    </p>
                </div>
            </section>

            <section className={`${sectionWrapper} relative bg-white py-30 space-y-10`}>
                {courseData.map((course, index) => (
                    <div key={index} className="border-b border-black text-black pb-4 lg:px-inner transition-all duration-300 ease-in-out">
                        <button
                            onClick={() => toggle(index)}
                            className="w-full flex text-left group">
                            <h3 className="[font-family:'Unageo-SemiBold'] text-4xl">
                                {course.title}
                            </h3>
                            <span className="w-12 h-12 bg-brand_black rounded-full inline-flex justify-center items-center ml-auto p-5">
                                <button
                                    className={`text-white text-3xl transform transition-transform duration-300 ${
                                        openIndex === index ? "rotate-90" : ""
                                    }`}>
                                    →
                                </button>
                            </span>
                        </button>
                        {openIndex === index && (
                            <div className="my-5 space-y-4 text-left">
                                <p className="[font-family:'Unageo-SemiBold'] text-3xl">{course.subtitle}</p>
                                <p className="text-lg">{course.body}</p>
                                <a
                                    href={course.link}
                                    className="shrink-0 text-black bg-brand_yellow hover:text-white hover:bg-brand_black lg:text-white lg:bg-brand_black lg:hover:text-black lg:hover:bg-brand_yellow w-56 h-10 px-6 flex items-center justify-center rounded-full transition mx-auto lg:mr-0">
                                    Learn more
                                </a>
                            </div>
                        )}
                    </div>
                ))}
            </section>
            <Footer />
        </div>
    );
};

export default Courses;