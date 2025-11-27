import React, { useState } from 'react';

import Header from '../components/Header';
import HeaderLogo from '../components/HeaderLogo';
import Footer from '../components/Footer';
import ContactUs from '../components/ContactUs';
import RegisterNow from '../components/RegisterNow';

import bulwarkLogoA from '../assets/images/bulwark_glossy_white_ALL.png';
import bulwarkLogoL from '../assets/images/bulwark_glossy_white_L.png';
import bg5 from '../assets/images/bg5.png';
import course_header1 from '../assets/images/course_header1.jpg';
import team1 from '../assets/images/team1.png';
import team2 from '../assets/images/team2.png';

import headshot_br from '../assets/images/headshot_br.jpg';
import headshot_hp from '../assets/images/headshot_hp.jpg';
import headshot_sj from '../assets/images/headshot_sj.png';
// import headshot_kr from '../assets/images/headshot_kr.jpg';
import headshot_kr from '../assets/images/Karim_pic.png';

const Team = () => {
    
    const sectionWrapper = "w-full mx-auto px-outer_sm lg:px-outer_lg";

    const [selected, setSelected] = useState(0);
    
    const instructors = [
        {
            name: "Brad Ross",
            title: "AI Expert Program Lead",
            intro: "For more than 20 years, Brad has built intelligent products and taught AI at the graduate level. He helps teams go from prototype to production, fast. He is also the director of the Agentics Foundation which is dedicated to AI education and innovation.",
            link: "https://www.linkedin.com/in/bradaross/",
            img: headshot_br,
        },
        {
            name: "Heather Page",
            title: "Tech-enabled People Leader",
            intro: "Heather is the Chief of Staff at TribalScale, a global digital innovation firm. She is an expert at leading people and building successful teams working in technology. She will help ensure you are job or promotion ready when you finish.",
            link: "https://www.linkedin.com/in/heatherkpage/",
            img: headshot_hp,
        },
        {
            name: "Sheetal Jaitly",
            title: "Advisor",
            intro: "Sheetal is an entrepreneur and seasoned tech veteran with a passion for innovation and digital transformation. He is the CEO of TribalScale and an avid investor who brings a unique perspective to support and guide companies through their digital evolution.",
            link: "https://www.linkedin.com/in/sheetaljaitly/",
            img: headshot_sj,
        },
        {
            name: "Karim Rahemtulla",
            title: "Advisor",
            intro: "A global business strategist known for creating innovative technology solutions to drive business impact. As Principal at Bulwark Impact, Karim helps businesses build practical skills to harness new technologies, including AI, to achieve their objectives and adapt in a rapidly changing world.",
            link: "https://www.linkedin.com/in/karimrahemtulla/",
            img: headshot_kr,
},
    ];

    const toggle = (index) => {
        setSelected(selected === index ? -1 : index);
    };

    return (
        <div className="min-h-screen max-w-[1600px] mx-auto relative overflow-hidden flex flex-col">
            <HeaderLogo />
            <Header />
            <div className="absolute inset-0 bg-brand_black bg-[radial-gradient(#2B2B2B_5px,transparent_1px)] [background-size:45px_45px]" />
            <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent" />

            <section className="relative flex flex-col mt-30 mb-15 lg:mb-0">
                <div className="grid grid-cols-1 lg:grid-cols-3 text-left">
                    <img src={course_header1} loading="lazy" className="absolute w-[360px] h-[250px] top-10 lg:top-0 lg:left-20 right-0" />
                    <div className="flex flex-col col-span-2 px-6 lg:px-16 gap-y-10 lg:mt-30 lg:ml-30 z-10">
                        <h2 className="[font-family:'Unageo-SemiBold'] text-6xl lg:text-7xl text-left text-white leading-tight tracking-tight max-w-3/4 lg:max-w-full z-10">THE TEAM BEHIND AGENTIC LEARNING LABS</h2>
                        <div className="w-line_width h-2 bg-brand_red rounded-full"></div>
                        <p className="text-xl">
                            Agentic Learning Labs is powered by TribalScale and Bulwark Impact. Their teams comprise committed experts who help people and businesses adapt and thrive in the digital era.
                        </p>
                        <div className="hidden lg:flex flex-col justify-end col-span-1">
                            <div className="relative w-full flex items-end justify-end">
                                <img src={team1} loading="lazy" className="w-[320px] h-[100px] object-cover" />
                            </div>
                        </div>
                    </div>
                    <div className="hidden lg:flex items-center">
                        <img src={team2} loading="lazy" className="w-[510px] h-[280px] object-cover lg:top-0" />
                    </div>
                    <div className="">
                        <img src={bulwarkLogoA} loading="lazy" className="absolute w-[250px] rotate-0 lg:hidden top-50 -right-20" />
                        <img src={bulwarkLogoA} loading="lazy" className="absolute w-[200px] rotate-0 hidden md:hidden lg:block top-0 right-70" />
                        <img src={bulwarkLogoL} loading="lazy" className="absolute w-[150px] h-[150px] rotate-20 hidden lg:block top-100 -left-10" />
                        <img src={bulwarkLogoL} loading="lazy" className="absolute w-[150px] h-[150px] rotate-270 hidden lg:block bottom-20 right-100" />
                    </div>
                </div>
            </section>
            <section className={`${sectionWrapper} relative bg-brand_gray border-t-2`}>
                <div className="flex flex-col gap-20 items-center lg:items-start my-20 text-white lg:px-inner">
                    <h2 className="[font-family:'Unageo-SemiBold'] text-5xl text-left leading-20">Our Team</h2>
                    <div className="w-full flex flex-col lg:flex-row justify-between">
                        {instructors.map((instructor, index) => (
                        <span
                            onClick={() => toggle(index)}
                            className="relative flex flex-col items-center">
                            <img src={instructor.img} loading="lazy" className={`${index == selected ? "w-75 h-75" : "w-60 h-60"} mb-10 lg:mb-0 rounded-full transition-all duration-300`} />
                            <span className="absolute top-5 -right-6 w-20 h-20 bg-brand_yellow rounded-full border-6 border-brand_gray hidden lg:inline-flex justify-center items-center ml-auto p-5">
                                <div
                                    className={`absolute top-2 right-3 text-black text-6xl rounded-2xl transform transition-transform duration-300 ${selected === index ? "rotate-90" : "rotate-135"}`}>
                                    →
                                </div>
                            </span>
                            <div className="lg:hidden flex flex-col items-center">
                                <h3 className="[font-family:'Unageo-SemiBold'] text-4xl text-foreground mb-5">
                                    {instructor.name}
                                </h3>   
                                <h3 className="[font-family:'Unageo-SemiBold'] text-2xl text-foreground mb-5">
                                    {instructor.title}
                                </h3>   
                                <p className="mb-5 text-xl text-left">{instructor.intro}</p>
                                <div className="mr-auto mb-20">
                                    <a
                                        href={instructor.link}
                                        className="[font-family:'Unageo-SemiBold'] text-white text-lg underline flex items-center justify-center rounded-full transition">
                                        Learn more
                                    </a>
                                </div>
                            </div>
                        </span>
                        ))}
                    </div>

                    <div className="hidden lg:flex flex-col lg:flex-row space-y-4 text-left">
                        <div className="flex flex-col gap-y-5 w-1/2">
                            <h3 className="[font-family:'Unageo-SemiBold'] text-4xl text-foreground">
                                {selected >= 0 ? instructors[selected].name : null}
                            </h3>   
                            <h4 className="[font-family:'Unageo-SemiBold'] text-3xl text-foreground">
                                {selected >= 0 ? instructors[selected].title : null}
                            </h4>   
                            <p className="text-xl">{selected >= 0 ? instructors[selected].intro : null}</p>
                        </div>
                        {selected >= 0 ? <div className="flex ml-auto items-end">
                            <a
                                href={instructors[selected].link}
                                className="shrink-0 bg-white hover:bg-brand_yellow text-black text-xl w-56 h-10 px-6 flex items-center justify-center rounded-full transition">
                                Learn more
                            </a>
                        </div> : null}
                    </div>
                </div>
            </section>
                
            <RegisterNow />
            <ContactUs />
            <Footer />
        </div>
    );
};

export default Team;
