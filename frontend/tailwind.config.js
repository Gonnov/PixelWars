/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            width: {
                "1/8": "12.5%",
            },
            inset: {
                "1/8": "0%",
                "2/8": "12.5%",
                "3/8": "25%",
                "4/8": "37.5%",
                "5/8": "50%",
                "6/8": "62.5%",
                "7/8": "75%",
                "8/8": "87.5%",
            },
        },
    },
    safelist: [
        "hover:bg-black",
        "hover:bg-white",
        "hover:bg-blue-500",
        "hover:bg-red-500",
        "hover:bg-yellow-400",
        "hover:bg-green-500",
        "hover:bg-amber-800",
        "hover:bg-pink-500",
    ],
    plugins: [],
};
