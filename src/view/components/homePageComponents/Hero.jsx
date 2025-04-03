import React from "react";

const Hero = ({ setSelectedCategory }) => {
  // Scroll to MainSection on category selection
  const handleCategoryClick = (type) => {
    setSelectedCategory(type);
    setTimeout(() => {
      document
        .getElementById("main-section")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 200);
  };

  return (
    <div className="w-full max-w-7xl text-center text-gray-500 py-32 px-6">
      {/* Title & Subtitle */}
      <h1 className="text-4xl md:text-5xl font-extrabold drop-shadow-lg leading-snug">
        Find the Best Salons <br className="hidden sm:block" /> Near You
      </h1>
      <p className="mt-4 text-center md:text-lg drop-shadow-md max-w-2xl mx-auto">
        Discover top-rated salons in your area.
      </p>

      {/* Selection Options with Icons */}
      <div className="mt-8 flex flex-wrap justify-center gap-4 sm:gap-6">
        {[
          {
            label: "Male Salon",
            icon: "src/assets/icons/male.png",
            type: "Male",
          },
          {
            label: "Women Salon",
            icon: "src/assets/icons/female.png",
            type: "Female",
          },
          {
            label: "Unisex Salon",
            icon: "src/assets/icons/unisex.png",
            type: "Unisex",
          },
        ].map(({ label, icon, type }) => (
          <button
            key={type}
            className="flex items-center gap-3 px-5 py-3 sm:px-6 sm:py-3 bg-gray-200 bg-opacity-30 backdrop-blur-md text-gray-700 rounded-full text-sm sm:text-lg font-semibold shadow-md transition-all duration-300 hover:bg-opacity-40 hover:scale-105 cursor-pointer"
            onClick={() => handleCategoryClick(type)}
          >
            <img
              loading="lazy"
              src={icon}
              alt={label}
              className="w-5 sm:w-6 h-5 sm:h-6 rounded"
            />
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Hero;
