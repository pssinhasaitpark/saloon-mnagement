import React from "react";
import { Link } from "react-router-dom";

function AuthForm({
  title,
  fields,
  onSubmit,
  onClose,
  footerLink,
  setregistered,
}) {
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur-md bg-black/50 px-4 py-8 overflow-y-auto">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 sm:p-8 relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 transition cursor-pointer"
            aria-label="Close modal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} className="space-y-5">
          {fields.map(({ label, name, type, pattern }, index) => (
            <div key={index}>
              <label
                htmlFor={name}
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {label}
              </label>
              <input
                id={name}
                name={name}
                type={type}
                pattern={pattern}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#D1BB9E] transition"
              />
            </div>
          ))}

          <button
            type="submit"
            className="w-full py-3 bg-[#D1BB9E] text-white font-semibold rounded-lg hover:bg-[#b9a78e] transition-colors cursor-pointer"
          >
            {title}
          </button>
        </form>

        {/* Footer Link */}
        {footerLink && (
          <div className="mt-4 text-sm text-center text-gray-600">
            {footerLink.text}
            <span className="ms-1">
              <Link
                to="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (setregistered) {
                    footerLink.linkText === "Register here"
                      ? setregistered(false)
                      : setregistered(true);
                  }
                }}
                className="text-[#D1BB9E] hover:underline"
              >
                {footerLink.linkText}
              </Link>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default AuthForm;
