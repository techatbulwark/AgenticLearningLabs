import React, { useEffect, useState } from "react";

import bulwarkWhite from '../assets/images/bulwark_white.png';
import tribalLogo from "../assets/images/tribal1.png";


const HeaderLogo = () => {
    
    const sectionWrapper = "w-full mx-auto px-6 lg:px-16";

    return (
        <div>
            <div className={`${sectionWrapper} hidden z-10 lg:flex relative top-10 items-center space-x-4`}>
                <img src={bulwarkWhite} className="h-10" alt="Bulwark White" />
                <div className="text-sm text-gray-300">Powered By</div>
                <img src={tribalLogo} className="h-4 mb-1" alt="Tribal Logo" />
            </div>
        </div>
        )
};

export default HeaderLogo;