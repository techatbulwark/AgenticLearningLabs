import React from 'react';

import Header from '../components/Header';
import HeaderLogo from '../components/HeaderLogo';
import Footer from '../components/Footer';
import OurCourses from '../components/OurCourses';
import RegisterNow from '../components/RegisterNow';

import callout1 from '../assets/images/callout1.png';
import callout3 from '../assets/images/callout3.png';
import bulwarkLogoA from '../assets/images/bulwark_glossy_white_ALL.png';
import bulwarkLogoL from '../assets/images/bulwark_glossy_white_L.png';
import img1 from '../assets/images/img1.png';
import img2 from '../assets/images/img2.png';
import img3 from '../assets/images/img3.png';
import bg5 from '../assets/images/bg5.png';
import tribal from '../assets/images/tribal2.png';
import bulwark from '../assets/images/bulwark.png';
import canada from '../assets/images/canada.png';
import employmentOnt from '../assets/images/employment_ont.png';
import ontario from '../assets/images/ontario.png';


const Home = () => {
  
  const sectionWrapper = "w-full mx-auto px-6 lg:px-16";

  const partners = [tribal, bulwark, canada, employmentOnt, ontario];

  return (
    <div className="min-h-screen max-w-[1600px] mx-auto relative overflow-hidden flex flex-col">
      <HeaderLogo />
      <Header />

      {/* dotted background*/}
      <div className="absolute inset-0 bg-brand_black bg-[radial-gradient(#2B2B2B_5px,transparent_1px)] [background-size:45px_45px]" />
      <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent" />
      {/* headings */}
      <section className={`${sectionWrapper} relative z-10 flex flex-col lg:flex-row items-center justify-between py-24`}>
        <div className="flex-shrink-0 w-auto text-left z-10">
          <h1 className="[font-family:'Unageo-SemiBold'] text-5xl lg:text-7xl max-w-3/4 lg:max-w-full leading-tight tracking-tight mb-5">
            AGENTIC<br />LEARNING LABS
          </h1>
          <h2 className="[font-family:'Unageo-SemiBold'] text-4xl font-light tracking-wide mb-5">
            Learn AI. Get hired. Get promoted.
          </h2>
          <img src={callout1} loading="lazy" className="w-full lg:w-3xl lg:-ml-5 mb-5" />
          <a
            href="/courses"
            className="w-[300px] h-[50px] flex items-center justify-center mx-auto lg:mx-0 bg-brand_yellow hover:bg-white rounded-full transition-all duration-300 ease-in-out">
            <h3 className="[font-family:'Unageo'] text-xl lg:text-2xl text-black">Learn more</h3>
          </a>
        </div>
        <div className="flex justify-center">
          <img src={bulwarkLogoA} loading="lazy" className="absolute w-[300px] md:w-[350px] lg:w-[550px] top-30 lg:top-20 -right-20 md:right-30 lg:right-50 animate-spin-slow" />
          <img src={bulwarkLogoL} loading="lazy" className="absolute w-[220px] rotate-270 hidden lg:block bottom-30 right-0 animate-spin-reverse" />
          <img src={bulwarkLogoL} loading="lazy" className="absolute w-[220px] rotate-20 hidden lg:block bottom-0 right-70 animate-spin-slow" />
        </div>
      </section>

      {/* partner logos */}
      <section className="relative bg-brand_black">
        <div className="w-full bg-white py-20 lg:py-10">
          <div className="flex flex-wrap justify-between lg:justify-center px-5 gap-5 lg:gap-20">
            {partners.map((img, i) => (
              <img key={i} src={img} loading="lazy" className="w-12 lg:w-28 object-contain" />
            ))}
          </div>
        </div>
        <div className="flex flex-col lg:flex-row w-full h-full lg:h-[800px]">
          <div className="relative w-full lg:w-1/2 h-[800px]">
            <img src={bg5} loading="lazy" className="w-full h-full object-cover" />
            <div className="absolute inset-0 flex flex-col items-start justify-start p-4 space-y-4">
              <img src={img1} loading="lazy" className="absolute w-[380px] top-[-30px] left-[-80px]" />
              <img src={img2} loading="lazy" className="absolute w-[400px] top-[150px] right-[-80px]" />
            </div>
          </div>
          <div className={`${sectionWrapper} relative w-full lg:w-1/2 h-[800px] bg-brand_gray flex flex-col justify-center text-left`}>
            <h2 className="[font-family:'Unageo-SemiBold'] text-4xl lg:text-5xl text-white mb-8">AI is not a fad!</h2>
            <p className="text-xl text-white leading-relaxed mb-8">
              Thanks to funding from Employment Ontario as well as funding from the Government of Ontario and Government of Canada, these courses are free for residents of Ontario.
            </p>
            <p className="text-xl text-white leading-relaxed mb-8">
              Companies need talent who understand how to use AI to help them drive business results.  Agentic Learning Labs teaches you how to use AI to solve real business problems, whether you're launching a product, closing a sale, or analyzing data. Learn how to use it and get ahead of the competition.
            </p>
          </div>
        </div>
        <OurCourses />
      </section>

      <RegisterNow />

      <section className={`${sectionWrapper} relative flex flex-col lg:flex-row justify-center items-center bg-brand_black py-10`}>
        <div className="w-full lg:w-3/5">
          <img src={callout3} loading="lazy" className="w-full object-cover"  />
        </div>
        <div className="w-full lg:w-2/5">
          <img src={img3} loading="lazy" className="w-full object-cover mx-auto" />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
