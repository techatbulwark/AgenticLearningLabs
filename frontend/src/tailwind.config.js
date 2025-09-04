/** @type {import('tailwindcss').Config} */
export const content = [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust paths if needed
    "./public/index.html"
];
export const theme = {
    extend: {
        colors: {
            brand_black: "#161616",
            brand_gray: "#1D1D1D",
            brand_yellow: "#FFC800",
            brand_red: "#E80914",
            brand_beige: "#F8EDE0",
        },
        spacing: {
            outer_sm: "25px",
            outer_lg: "64px",
            inner: "35px",
            line_width: "85px",
        },
        animation: {
            'spin-slow': 'spin 50s linear infinite',
            'spin-reverse': 'spin 40s linear infinite reverse',
        },
        screens: {
        sm: "640px",
        md: "1200px",
        lg: "1060px",
        xl: "1280px",
        },
    },
};
export const plugins = [];