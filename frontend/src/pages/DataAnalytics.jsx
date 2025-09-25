import React, { useState } from 'react';
import { usePrereqModal } from '../context/PrereqModalContext.jsx'

import Header from '../components/Header';
import Footer from '../components/Footer';

import course_header1 from '../assets/images/course_header1.jpg';
import data from '../assets/images/data.png';
// import dataMobile from '../assets/images/data_mobile.png';
import dataMobile from '../assets/images/DADM.jpg';

import HeaderLogo from '../components/HeaderLogo';
import CourseUpdate from '../components/CourseUpdate.jsx';

const DataAnalytics = () => {
    
    const sectionWrapper = "w-full mx-auto px-outer_sm lg:px-outer_lg";

    const { openModal } = usePrereqModal();
    
    return (
        <div className="min-h-screen max-w-[1600px] mx-auto relative overflow-hidden flex flex-col">
            <HeaderLogo />
            <Header />
            <div className="absolute inset-0 bg-brand_black bg-[radial-gradient(#2B2B2B_5px,transparent_1px)] [background-size:45px_45px]" />
            <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent" />

            <section className={`${sectionWrapper} relative flex flex-col mt-30 pb-20`}>
                <div className="grid grid-cols-1 lg:grid-cols-3 text-left">
                    <div className="col-span-1 hidden lg:block">
                        <img src={course_header1} loading="lazy" className="relative w-[350px] h-[250px]" />
                    </div>
                    <div className="col-span-2 flex flex-col gap-8 z-10">
                        <h2 className="[font-family:'Unageo-SemiBold'] text-5xl lg:text-7xl text-left leading-tight tracking-tight lg:-ml-40">AI for Data Analytics for<br/>Decision Making</h2>
                        <div className="w-line_width h-2 bg-yellow-500 rounded-full"></div>
                        <h3 className="[font-family:'Unageo-SemiBold'] text-3xl">Use AI to turn data into knowledge<br/>and knowledge into action.</h3>
                        <p className="text-xl">This course will teach you practical skills to apply AI to analytical data and how to use it for real time decision making. Think easier access to market trend analysis, demand forecasting, supplier management and streamlining of logistics and distribution to better handle logistical constraints and to maximize production capacity. In business, data is power. Leveraging your new AI skills, you will bring new tools and perspectives to deliver efficiency and optimization for your employer.</p>
                        <a
                            onClick={openModal}
                            className="shrink-0 bg-brand_yellow hover:bg-white lg:bg-white lg:hover:bg-brand_yellow text-black text-xl w-56 h-10 px-6 flex items-center justify-center rounded-full transition self-center lg:self-end">
                            Register now
                        </a>
                    </div>
                </div>
            </section>
            <section className={`${sectionWrapper} relative bg-white`}>
                <div className="flex flex-col gap-15 items-start my-20 lg:px-inner text-black text-left">
                    <div className="flex flex-col gap-5">
                        <h2 className="[font-family:'Unageo-SemiBold'] text-4xl">Learn how to:</h2>
                        <ul className="list-disc pl-7 text-xl text-left">
                            <li>Create AI prompts and solve for business questions</li>
                            <li>Build dashboards and visualize data for reporting</li>
                            <li>Analyze market trends and forecast demand </li>
                            <li>Streamline supply chain logistics and distribution</li>
                            <li>Create AI-generated reports to support real-time decision-making</li>
                            <li>Automate manual data tasks to save time and improve accuracy</li>
                        </ul>
                    </div>
                    <div className="flex flex-col gap-5">
                        <h2 className="[font-family:'Unageo-SemiBold'] text-4xl">Weekly learnings</h2>
                        <ul className="text-xl text-left">
                            <li>Week 1: AI-assisted data narratives and reports</li>
                            <li>Week 2: AI-augmented analytics</li>
                            <li>Week 3: Structured data input, data clearing and data visualization</li>
                            <li>Week 4: Career Catalyst</li>
                        </ul>
                    </div>
                    <div className="flex flex-col gap-5">
                        <h2 className="[font-family:'Unageo-SemiBold'] text-4xl">Format</h2>
                        <div className="flex flex-col gap-5">
                            <p className="text-xl">This is a four week hybrid course that goes beyond theory to provide you with practical hands-on experience.</p>
                            <p className="[font-family:'Unageo-Bold'] text-xl">Weeks one to three: online + in-person learning</p>
                            <p className="text-xl">Each week, you'll complete 6-10 hours (depending on your learning style) of self-paced learning online that includes:</p>
                            <ul className="list-disc pl-7 text-xl text-left">
                                <li>Interactive readings and video lessons packed with case studies and hands-on practice assignments</li>
                                <li>90-minute live, online session to apply concepts in real-time with your instructor and peers</li>
                                <li>Quizzes following each module to check your learning</li>
                                <li>Plus, two optional “office hours” with your instructor where you can ask questions or explore topics more deeply to ensure you never feel stuck.</li>
                            </ul>
                            <p className="text-xl">Plus, each week, you will join your class peers for a day-long, in-person workshop to practice new skills and apply what you are learning in a collaborative and supportive setting.</p>
                            <p className="[font-family:'Unageo-Bold'] text-xl">Week four: Final in-person workshop + Career Catalyst (one day)</p>
                            <p className="text-xl">In the last week, attend your final in-person workshop where you'll showcase your skills and present your own AI-powered product. Plus, participate in Career Catalyst where you will learn job hunting best practices and how to use AI to land your dream or promotion including:</p>
                            <ul className="list-disc pl-7 text-xl text-left">
                                <li>Updating your resume and cover letter</li>
                                <li>Acing the interview</li>
                                <li>Building a great LinkedIn profile</li>
                                <li>Networking and personal branding best practices</li>
                                <li>Succeeding in your first 30, 60 and 90 days</li>
                            </ul>
                        </div>
                    </div>
                    <div className="flex flex-col gap-5">
                        <h2 className="[font-family:'Unageo-SemiBold'] text-4xl">Prerequisites</h2>
                        <ul className="list-disc pl-7 text-xl text-left">
                            <li>Basic understanding of data analytics and spreadsheets</li>
                            <li>Strong understanding of the English language (written and spoken)</li>
                            <li>Laptop with a web camera and microphone</li>
                            <li>Available for an in-person workshop in Toronto</li>
                            <li>You don't need AI experience, just curiosity and commitment.</li>
                        </ul>
                    </div>
                </div>
            </section>
            <section className="relative bg-white lg:px-outer_lg">
                <div className="relative flex flex-col lg:flex-row justify-between items-center gap-y-10 bg-brand_gray rounded-t-3xl px-inner py-15">
                    <div className="text-center lg:text-left">
                        <h2 className="[font-family:'Unageo-SemiBold'] text-5xl mb-5">Register now!</h2>
                        <p className="text-xl text-gray-200 max-w-xl">
                            AI is now a tool of the job. Learn how to use it and get ahead of the competition.
                        </p>
                    </div>
                    <a
                        onClick={ openModal }
                        className="shrink-0 bg-white hover:bg-brand_yellow text-black text-xl w-56 h-10 px-6 flex items-center justify-center rounded-full transition">
                        Register now
                    </a>
                </div>
                {/* calendar */}
                <div className="bg-gray-100 text-black flex items-center justify-center mt-6">
                    <img src={data} className="hidden lg:block object-cover" />
                    <img src={dataMobile} className="lg:hidden object-cover" />
                </div>
            </section>
            <CourseUpdate />
            <Footer />
        </div>
    );
};

export default DataAnalytics;