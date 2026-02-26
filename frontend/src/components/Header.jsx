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
  ]

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && navOpen) {
        setNavOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
  }, [navOpen, setNavOpen])

  return (
    <header className={`fixed z-30 transition-colors duration-500 ${navOpen ? "w-full h-full" : "top-10 right-10"}`}>
      <div
        className={`flex ${navOpen ? "justify-start text-left px-10 py-30 h-full bg-brand_black" : "justify-center items-center bg-[#231F20]/55 border rounded-xl lg:rounded-full px-5 lg:px-30 py-3"}`}>
        <nav className={`${navOpen ? "flex flex-col space-y-15 text-3xl": "hidden lg:flex flex-row space-x-15 text-lg"}`}>
          {links.map((item, index) => {
              return (
                <a href={item.link} className="[font-family:'Unageo'] hover:opacity-80">{item.name}</a>
              )
            
          })}
        </nav>
        <button
          onClick={() => setNavOpen(!navOpen)}
          className={`${navOpen ? "absolute top-5 right-10 p-2 rounded-full transition": "lg:hidden"}`}>
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
              d={navOpen ? "M6 18L18 6M6 6l12 12":"M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>

      </div>
    </header>
  );
};

export default Header;
