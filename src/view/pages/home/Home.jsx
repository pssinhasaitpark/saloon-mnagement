import React, { useState } from "react";

import {
  Hero,
  AboutSection,
  ContactSection,
  MainSection,
  OffersSection,
  ServicesSection,
} from "../../components/index";

function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <div
      className="w-screen min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('src/assets/images/HomepageBanner.jpg')",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Hero Section  */}
      <div
        className="w-full min-h-screen flex flex-col items-center justify-start bg-opacity-80 bg-white/10"
        id="home"
      >
        <Hero setSelectedCategory={setSelectedCategory} />
      </div>

      {/* About Section  */}
      <div className="w-full" id="about">
        <AboutSection />
      </div>

      {/* services Section  */}
      <div className="w-full" id="services">
        <ServicesSection />
      </div>
      {/* services Section  */}
      <div className="w-full" id="offers">
        <OffersSection />
      </div>
      {/* Find Slons Section  */}
      <div className="w-full" id="find-salons">
        <MainSection selectedCategory={selectedCategory} />
      </div>

      {/* contact Section  */}
      <div className="w-full" id="contact">
        <ContactSection />
      </div>
    </div>
  );
}

export default Home;
