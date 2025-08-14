import React, { useEffect, useState } from "react";

const Header = () => {

  const [navOpen, setNavOpen] = useState(false);
  
  const links = [
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

  return (
    <header className={`fixed max-w-3xl top-10 z-20 transition-colors duration-500 ${navOpen ? "w-full px-5 lg:right-10" : "right-10"}`}>
      <div
        className={`flex justify-center items-center px-5 lg:px-30 py-3 mx-auto ${navOpen ? "bg-[#231F20]/85" : "bg-[#231F20]/55"} rounded-xl lg:rounded-full border`}>
        <nav className="hidden lg:flex items-center space-x-15 text-lg">
          {links.map((item, index) => {
              return (
                <a href={item.link} className="[font-family:'Unageo-SemiBold'] hover:opacity-80">{item.name}</a>
              )
            
          })}
        </nav>
        <button
          className={`${navOpen ? "hidden": ""} lg:hidden text-white hover:opacity-80`}
          onClick={() => setNavOpen(!navOpen)}>
          <svg
            className="w-8 h-8"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <div
          className={`${navOpen ? "" : "hidden"} lg:hidden text-white py-4 px-6 rounded-md`}>
          <nav className="flex flex-col items-center space-y-10">
            <button
              type="button"
              onClick={() => {
                resetForm();
                closeModal();
              }}
              aria-label="Close modal"
              className={`absolute top-5 right-10 p-2 rounded-full transition ${navOpen ? "": "hidden"} lg:hidden`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6 text-white hover:text-gray-300">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            {links.map((item, index) => {
              return (
                <a href={item.link} className="[font-family:'Unageo-SemiBold'] text-2xl hover:opacity-80" onClick={() => setNavOpen(false)}>{item.name}</a>
              )
            })}
          </nav>
        </div>

      </div>
    </header>
  );
};

export default Header;
