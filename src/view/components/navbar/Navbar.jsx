import React, { useState } from "react";
import {
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineSearch,
  AiOutlineUser,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { logoutUser } from "../../redux/slices/userauthSlice.js";

const Navbar = ({ setShowSearchPopup }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const location = useSelector((state) => state.search.location);
  const user = localStorage.getItem("userrole");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentLocation = useLocation();

  const handleNavClick = (sectionId) => {
    setIsOpen(false);
    if (currentLocation.pathname !== "/") {
      navigate("/", { state: { scrollTo: sectionId } });
    } else {
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  const navItems = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Services", id: "services" },
    { name: "Offers", id: "offers" },
    { name: "Find Salons", id: "find-salons" },
    { name: "Contact", id: "contact" },
  ];

  return (
    <nav className="fixed top-0 w-full backdrop-blur-md h-16 flex items-center px-6 z-50">
      <div className="container mx-auto max-w-7xl flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-[#5A3E2B]">
          SalonHunt
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex flex-1 justify-center items-center space-x-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="text-[#5A3E2B] hover:text-[#7D5D43] transition duration-300 font-medium cursor-pointer"
            >
              {item.name}
            </button>
          ))}
        </div>

        {/* Search + Profile */}
        <div className="hidden md:flex items-center space-x-4">
          <button
            onClick={() => setShowSearchPopup(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-[#7D5D43]/10 hover:bg-[#7D5D43]/20 text-[#5A3E2B] rounded-full transition cursor-pointer"
          >
            <AiOutlineSearch size={20} />
            <span className="font-medium">
              {location ? location : "Search area..."}
            </span>
          </button>

          {user && (
            <div className="relative ">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="p-2 rounded-full hover:bg-[#7D5D43]/20 transition cursor-pointer"
              >
                <AiOutlineUser size={24} className="text-[#5A3E2B]" />
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded shadow-lg z-50">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-[#5A3E2B] hover:bg-[#EEE6DA] "
                    onClick={() => setShowDropdown(false)}
                  >
                    View Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-[#5A3E2B] hover:bg-[#EEE6DA] cursor-pointer"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
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

      {/* Mobile Menu */}
      <div
        className={`absolute top-16 left-0 w-full bg-[#D1BB9E]/90 backdrop-blur-lg shadow-md transition-transform duration-300 ${
          isOpen ? "block" : "hidden"
        } md:hidden`}
      >
        <div className="p-5 flex flex-col items-center space-y-4">
          <nav className="flex flex-col text-center space-y-3 w-full">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="text-[#5A3E2B] hover:text-[#7D5D43] transition duration-300 font-medium"
              >
                {item.name}
              </button>
            ))}
          </nav>
          {user && (
            <div className="w-full text-center mt-4 border-t pt-4 ">
              <Link
                to="/profile"
                className="block text-[#5A3E2B] hover:text-[#7D5D43] font-medium"
                onClick={() => setIsOpen(false)}
              >
                View Profile
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="block text-[#5A3E2B] hover:text-[#7D5D43] font-medium mt-2"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
