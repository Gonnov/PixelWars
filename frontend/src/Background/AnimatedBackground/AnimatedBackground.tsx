import React, { useEffect } from "react";
import "./AnimatedBackground.css"; // Import your CSS file

const AnimatedBackground: React.FC = () => {
    // Function to create a colorful star element
    const createColorfulStar = () => {
        const star = document.createElement("div");
        star.className = "star";
        star.style.left = `${Math.random() * 100}vw`;
        star.style.backgroundColor = getRandomColor();
        document.body.appendChild(star);

        // Remove the star after the animation completes
        star.addEventListener("animationiteration", () => {
            star.remove();
        });
    };

    // Function to generate a random color
    const getRandomColor = () => {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    // Generate colorful stars at intervals
    useEffect(() => {
        const intervalId = setInterval(createColorfulStar, 300);

        // Clean up the interval when the component unmounts
        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return <div className="animated-bg"></div>;
};

export default AnimatedBackground;
