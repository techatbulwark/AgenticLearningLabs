import React, { useState } from 'react';

import { useModal } from '../context/PrereqModalContext.jsx'

import callout2 from '../assets/images/callout2.png';

const RegisterNow = () => {

    const sectionWrapper = "w-full mx-auto px-6 lg:px-16";

    const { openModal } = useModal();
    
    return (
      <div className={`${sectionWrapper} relative bg-brand_beige py-30`}>
        <div className="flex flex-col lg:flex-row items-center justify-center gap-24">
          <div className="w-full lg:w-1/2 flex flex-col">
            <img
              src={callout2}
              loading="lazy"
              className="w-full"
              alt="Callout 2"
            />
          </div>
          <div className="w-full lg:w-1/2 flex flex-col lg:text-left">
            <h2 className="[font-family:'Unageo-SemiBold'] text-4xl lg:text-5xl text-black mb-8">Register now!</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Choose from one of three free courses to up skill in AI today. Learn more & register today!
            </p>
            <a onClick={openModal} class="w-[226px] h-[40px] flex items-center justify-center text-white hover:text-black bg-brand_black hover:bg-brand_yellow rounded-3xl mx-auto lg:mx-0 transition-all duration-200 ease-in-out">
              <h3 class="[font-family:'Unageo'] text-lg">Register now</h3>
            </a>
          </div>
        </div>
      </div>
    )
}

export default RegisterNow;