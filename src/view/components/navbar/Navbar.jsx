import React, { useState } from "react";
import { AiOutlineMenu, AiOutlineClose, AiOutlineSearch } from "react-icons/ai";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = ({ setShowSearchPopup }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useSelector((state) => state.search.location);
  // Close menu on mobile when clicking a link
  const handleCloseMenu = () => setIsOpen(false);

  return (
    <nav className="fixed top-0 w-full backdrop-blur-md h-16 flex items-center px-6 z-50">
      <div className="container mx-auto max-w-7xl flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-[#5A3E2B]">
          SalonHunt
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex flex-1 justify-center items-center space-x-8">
          {[
            { name: "Home", id: "home" },
            { name: "About", id: "about" },
            { name: "Services", id: "services" },
            { name: "Offers", id: "offers" },
            { name: "Find Salons", id: "find-salons" },
            { name: "Contact", id: "contact" },
          ].map((item, index) => (
            <Link
              key={index}
              to={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(item.id)?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }}
              className="text-[#5A3E2B] hover:text-[#7D5D43] transition duration-300 font-medium cursor-pointer"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Search Button */}
        <button
          onClick={() => setShowSearchPopup(true)}
          className="hidden md:flex items-center space-x-2 px-4 py-2 bg-[#7D5D43]/10 hover:bg-[#7D5D43]/20 text-[#5A3E2B] rounded-full transition"
        >
          <AiOutlineSearch size={20} />
          <span className="font-medium">
            {location ? location : "Search area..."}
          </span>
        </button>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-4">
          <button
            onClick={() => setShowSearchPopup(true)}
            className="text-[#5A3E2B]"
          >
            <AiOutlineSearch size={24} />
          </button>
          <button className="text-[#5A3E2B]" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <AiOutlineClose size={24} />
            ) : (
              <AiOutlineMenu size={24} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`absolute top-16 left-0 w-full bg-[#D1BB9E]/90 backdrop-blur-lg shadow-md 
        transition-transform duration-300 ${
          isOpen ? "block" : "hidden"
        } md:hidden`}
      >
        <div className="p-5 flex flex-col items-center space-y-4">
          <nav className="flex flex-col text-center space-y-3 w-full">
            {[
              { name: "Home", id: "home" },
              { name: "About", id: "about" },
              { name: "Services", id: "services" },
              { name: "Offers", id: "offers" },
              { name: "Find Salons", id: "find-salons" },
              { name: "Contact", id: "contact" },
            ].map((item, index) => (
              <a
                key={index}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(item.id)?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                  handleCloseMenu();
                }}
                className="text-[#5A3E2B] hover:text-[#7D5D43] transition duration-300 font-medium cursor-pointer"
              >
                {item.name}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
