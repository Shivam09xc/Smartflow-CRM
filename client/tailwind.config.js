/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: "#1337ec",
                "background-light": "#f6f6f8",
                "background-dark": "#101322",
                "border-light": "#e7e9f3"
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                display: ['Inter', 'sans-serif']
            }
        },
    },
    plugins: [],
}
