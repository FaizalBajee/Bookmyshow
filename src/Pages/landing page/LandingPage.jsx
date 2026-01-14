import React, { useState, useEffect } from "react";
import { Background } from "../landingPageBackground/Background";
import "./LandingPage.css";
import Section from "../../common/Section";
import Home from "../home/Home";

export default function LandingPage() {
  const [heroCount, setHeroCount] = useState(0);

  // Auto-change background every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setHeroCount((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Handle manual dot click
  const handleDotClick = (index) => {
    setHeroCount(index);
  };

  return (
    <Section id="home">
      <div className="landing-page">
        <Background heroCount={heroCount} />

        {/* Dots Navigation */}
        <div className="dots-container">
          {[0, 1, 2].map((index) => (
            <span
              key={index}
              className={`dot ${heroCount === index ? "active" : ""}`}
              onClick={() => handleDotClick(index)}
            ></span>
          ))}
        </div>
      </div>

      <Home />
    </Section>
  );
}
