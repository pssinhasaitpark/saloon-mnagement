import { Link } from "react-router-dom";

const Footer = ({ onRegisterClick }) => {
  return (
    <footer className="bg-gray-900 text-white py-6 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-sm text-gray-400 text-center sm:text-left">
          &copy; {new Date().getFullYear()}{" "}
          <span className="font-semibold text-white">SalonHunt</span>. All
          rights reserved.
        </p>

        <div className="flex space-x-4 text-sm">
          <span
            className="text-gray-400 hover:text-white transition duration-200 cursor-pointer"
            onClick={onRegisterClick}
          >
            Register Your salon
          </span>
          <span className="text-gray-400 hover:text-white transition duration-200 cursor-pointer">
            Privacy Policy
          </span>
          <span className="text-gray-400 hover:text-white transition duration-200 cursor-pointer">
            Terms of Service
          </span>
          <Link
            to="#"
            className="text-gray-400 hover:text-white transition duration-200"
          >
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
