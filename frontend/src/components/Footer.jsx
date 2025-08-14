import React, { useEffect, useState } from "react";

import agentics from '../assets/images/agentics.png';
import instagram from '../assets/images/instagram.png';
import linkedin from '../assets/images/linkedin.png';

const Footer = () => {

  const pageLinks = [
    {
      name: "About",
      link: "/",
    },
    {
      name: "Courses",
      link: "/courses",
    },
    {
      name: "Meet the team",
      link: "/team",
    },
    {
      name: "FAQ",
      link: "/faqs",
    },
  ]
  const extLinks = [
    {
      name: "Contact us",
      link: "/",
    },
    {
      name: "1-866-852-1603",
      link: "/",
    },
    {
      name: "Register now",
      link: "/",
    },

  ]
  
  return (
    <footer className="bg-brand_black z-20 text-white border-t border-white w-full p-12">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10 text-center md:text-left">

        <div className="hidden lg:flex flex-col space-y-2 text-lg">
            {pageLinks.map((item, index) => {
                return (
                    <a href={item.link} className="hover:opacity-80">{item.name}</a>
                )
            })}
        </div>

        <div className="hidden lg:flex flex-col items-center gap-10">
            <img src={agentics} loading="lazy" className="w-28 h-auto" />
            <div className="flex gap-5">
            <a href="#" aria-label="Instagram" className="hover:text-gray-400">
                <img src={instagram} className="w-5 h-5" />
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-gray-400">
                <img src={linkedin} className="w-5 h-5" />
            </a>
            </div>
        </div>


        <div className="hidden lg:flex flex-col space-y-2 text-lg text-right">
            {extLinks .map((item, index) => {
                return (
                    <a href={item.link} className="hover:opacity-80">{item.name}</a>
                )
            })}
        </div>

        {/* small screen layout */}
        <div className="flex flex-row lg:hidden items-center justify-between w-full">
            <div className="flex flex-col space-y-2 text-lg">
                {pageLinks.map((item, index) => {
                    return (
                        <a href={item.link} className="hover:opacity-80">{item.name}</a>
                    )
                })}
            </div>

            <div className="hidden lg:flex flex-col items-center">
                {/* logo */}
                <img src={agentics} loading="lazy" className="w-28 h-auto" />
                {/* socials */}
                <div className="flex gap-10">
                    <a href="#" aria-label="Instagram" className="hover:text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="20" height="20" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="3.5" />
                        </svg>
                    </a>
                    <a href="#" aria-label="LinkedIn" className="hover:text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="20" height="20" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="3.5" />
                        </svg>
                    </a>
                </div>
            </div>
            {/* Right Column (always visible) */}
            <div className="flex flex-col space-y-2 text-lg">
                {extLinks.map((item, index) => {
                    return (
                        <a href={item.link} className="hover:opacity-80">{item.name}</a>
                    )
                })}
            </div>

        </div>
        <div className="flex flex-col items-center gap-10 lg:hidden w-full">
            <div className="flex gap-4">
                <a href="#" aria-label="Instagram" className="hover:text-gray-400">
                    <img src={instagram} className="w-5 h-5" />
                </a>
                <a href="#" aria-label="LinkedIn" className="hover:text-gray-400">
                    <img src={linkedin} className="w-5 h-5" />
                </a>
            </div>
            <img src={agentics} loading="lazy" className="w-28 h-auto" />
        </div>

        </div>
    </footer>
    )
}

export default Footer;