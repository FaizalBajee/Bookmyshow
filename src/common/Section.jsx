import React from "react";

const Section = ({ id, style = {}, children }) => {
  const sectionStyle = {
    width: "100%",
    // padding: "5px 0", // equivalent to py-20
    ...style, // merge inline styles passed from parent
  };

  const containerStyle = {
    // maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 20px",
    animation: "fadeInUp 0.8s ease-in-out",
  };

  return (
    <section id={id} style={sectionStyle}>
      <div style={containerStyle}>{children}</div>
    </section>
  );
};

export default Section;
