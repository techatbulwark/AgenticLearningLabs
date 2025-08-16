import React, { useState } from 'react';

import { useModal } from '../context/PrereqModalContext.jsx'

import course1 from '../assets/images/course1.png';
import course2 from '../assets/images/course2.png';
import course3 from '../assets/images/course3.png';
import course4 from '../assets/images/course4.png';
import course5 from '../assets/images/course5.png';

const courseImages = [course1, course2, course3, course4, course5];

const OurCourses = () => {

  const sectionWrapper = "w-full mx-auto px-6 lg:px-16";

  const { openModal } = useModal();

  const [activeTab, setActiveTab] = useState(0);
  
  const tabs = [
    { 
      title: 'Our courses', 
      content: 'Learn the basics of artificial intelligence, machine learning concepts, and how AI is transforming industries.',
    },
    { 
      title: 'AI for Data Analytics and Decision Making', 
      content: 'Use AI to turn data into knowledge and knowledge into action.  This course turns spreadsheet users into confident data analysts. Learn how to use AI to visualize data for reporting and support real-time decision-making including market trend analysis, demand forecasting, and supplier management. Great for people in logistics, admin and analyst roles.',
    },
    { 
      title: 'AI for Customer Experience and Product Innovation', 
      content: 'Use AI to better design products, services and experiences. Learn how to use AI to brainstorm, test and pitch product and service ideas that meet real customer needs, improve the customer experience and drive product innovation.  Great for creative thinkers, innovators and product developers.',
   },
    { 
      title: 'AI for Sales, Marketing & Business Development', 
      content: 'Drive sales and reach new customers with an AI-powered business strategy. Learn how to use AI to directly improve sales, marketing, and business development. Develop go-to-market plans, personalized marketing campaigns, and customer segmentation. Great for sales reps, marketers, public relations pros, and business builders.',
    },
    { 
      title: 'Career Catalyst ', 
      content: 'Participate in the Career Catalyst program which provides career planning, including resume best practices, interview coaching, networking tips and in-person workshops to ensure you land your dream job or promotion. ',
    },
  ];

  const toggleTab = (index) => {
    setActiveTab(index);
  };

  return (
    <div>
        <div className="w-full h-25 bg-brand_gray relative">
          <div className="absolute bottom-0 left-0 w-full h-25 bg-brand_black rounded-t-4xl lg:rounded-none border-t-2"></div>
        </div>
        <div className={`${sectionWrapper} mb-30`}>
          <div className="h-auto flex flex-row items-center">
            <div className="flex-2 flex flex-col lg:flex-row">
              {tabs.map((tab, index) => {
                const isActive = activeTab === index;
                const width = activeTab === null ? 'flex-1' : isActive ? 'flex-5' : 'flex-1';
                
                return (
                  <div key={index} className={`${width} transition-all duration-300 ease-in-out`}>
                    <div className={`relative ${isActive ? "h-[500px]" : "h-[115px]"} lg:h-[500px] overflow-hidden transition-all duration-300 ease-in-out`}>
                      <button
                        onClick={() => toggleTab(index)}
                        className={`absolute z-10 bg-white hover:bg-gray-300 ${isActive ? "" : "rotate-45"} 
                          w-12 h-12 text-black text-3xl rounded-full flex items-center justify-center 
                          top-8 lg:top-7 ${isActive ? "left-15" : "left-15 lg:left-1/2"} transform -translate-x-1/2 transition-all duration-300 ease-in-out`}
                      >
                        →
                      </button>
                      <div className="bg-card p-4 h-full opacity-100">
                        <div className="h-full flex items-center justify-center">
                          <img
                            src={courseImages[index]}
                            loading="lazy"
                            className={`w-full h-full object-cover ${isActive ? "rounded-4xl" : "rounded-full"} ${isActive ? "" : "grayscale-100"}`}
                          />
                        </div>
                      </div>
                    </div>
                    <div className={`${isActive ? "block" : "hidden"} lg:hidden flex-1 bg-muted rounded-lg text-left ml-4 p-6`}>
                      <h3 className="[font-family:'Unageo-SemiBold'] text-4xl text-white font-semibold text-foreground mb-4">
                        {activeTab >= 0 ? tabs[activeTab].title : null }
                      </h3>
                      <p className="[font-family:'Unageo'] text-lg text-white text-muted-foreground mb-10">
                        {activeTab >= 0 ? tabs[activeTab].content : null }
                      </p>
                      <a onClick={openModal} class="z-10 w-[226px] h-[40px] flex items-center justify-center text-black bg-white hover:bg-brand_yellow rounded-3xl mx-auto lg:mx-0 transition-all duration-200 ease-in-out">
                        <h3 class="[font-family:'Unageo'] text-lg">Register Now</h3>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>

            
            {/* content */}
            <div className="hidden lg:block flex-1 space-y-7 bg-muted rounded-lg text-left ml-4 p-6">
              <h3 className="[font-family:'Unageo-SemiBold'] text-4xl text-white font-semibold text-foreground">
                {activeTab >= 0 ? tabs[activeTab].title : null }
              </h3>
              <p className="[font-family:'Unageo'] text-lg text-white text-muted-foreground">
                {activeTab >= 0 ? tabs[activeTab].content : null }
              </p>
              <a onClick={openModal} class="w-[226px] h-[40px] flex items-center justify-center text-black bg-white hover:bg-brand_yellow rounded-3xl mx-auto lg:mx-0 transition-all duration-200 ease-in-out">
                <h3 class="[font-family:'Unageo'] text-lg">Register now</h3>
              </a>
            </div>
          </div>
        </div>
      </div>
  );
};

export default OurCourses;



