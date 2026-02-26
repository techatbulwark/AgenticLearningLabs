import React from 'react';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

import customer_experience from '../assets/images/customer_experience.png';
import HeaderLogo from '../components/HeaderLogo.jsx';
import CourseUpdate from '../components/CourseUpdate.jsx';


const CustomerExperience = () => {
    
    const sectionWrapper = "w-full mx-auto px-outer_sm lg:px-outer_lg";

    
    return (
        <div className="min-h-screen max-w-[1600px] mx-auto relative overflow-hidden flex flex-col">
            <HeaderLogo />
            <Header />
            <div className="absolute inset-0 bg-brand_black bg-[radial-gradient(#2B2B2B_5px,transparent_1px)] [background-size:45px_45px]" />
            <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent" />

            <section className={`${sectionWrapper} relative flex flex-col mt-30 pb-20`}>
                <div className="grid grid-cols-1 lg:grid-cols-3 text-left">
                    <div className="col-span-1 hidden lg:block">
                        <img src={customer_experience} loading="lazy" className="relative w-[350px] h-[250px]" />
                    </div>
                    <div className="col-span-2 flex flex-col gap-8 z-10">
                        <h2 className="[font-family:'Unageo-SemiBold'] text-5xl lg:text-7xl text-left leading-tight tracking-tight lg:-ml-40">AI for Customer Experience<br/>& Product Innovation</h2>
                        <div className="w-line_width h-2 bg-yellow-500 rounded-full" />
                        <h3 className="[font-family:'Unageo-SemiBold'] text-3xl">Use AI to better design products, services and<br/>experiences.</h3>
                        <p className="text-xl">In this course, learn how to use AI to brainstorm, test and pitch product and service ideas that meet real customer needs, improve the customer experience and drive product innovation.</p>
                        <p className="[font-family:'Unageo-SemiBold'] text-2xl lg:text-3xl text-brand_yellow">New Courses Coming April 2026</p>
                    </div>
                </div>
            </section>
            <section className={`${sectionWrapper} relative bg-white`}>
                <div className="flex flex-col gap-15 items-start my-20 lg:px-inner text-black text-left">
                    <div className="flex flex-col gap-5">
                        <h2 className="[font-family:'Unageo-SemiBold'] text-4xl">Learn how to:</h2>
                        <ul className="list-disc pl-7 text-xl text-left">
 


                            <li>Use AI to brainstorm customized product ideas and minimum viable products (MVPs)</li>
                            <li>Product development planning</li>
                            <li>Data first research for product evaluation and validation</li>
                            <li>Create customer personas and value propositions</li>
                            <li>Build brand visuals, promotional content with AI tools</li>
                            <li>Design pitch decks for your new product</li>

                            
                        </ul>
                    </div>
                    <div className="flex flex-col gap-5">
                        <h2 className="[font-family:'Unageo-SemiBold'] text-4xl">Weekly learnings</h2>
                        <ul className="text-xl text-left">
                            <li>Week 1: Customized solutions/Product design</li>
                            <li>Week 2: Data first research for product evaluation</li>
                            <li>Week 3: Product development planning and MVP creation</li>
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
                            <li>Basic understanding of customer experience</li>
                            <li>Strong understanding of the English language (written and spoken)</li>
                            <li>Laptop with a web camera and microphone</li>
                            <li>Available for an in-person workshop in Toronto</li>
                            <li>You don't need AI experience, just curiosity and commitment.</li>
                        </ul>
                    </div>
                </div>
            </section>
            <CourseUpdate />
            <Footer />
        </div>
    );
};

export default CustomerExperience;
