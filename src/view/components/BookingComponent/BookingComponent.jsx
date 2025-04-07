import React, { useState } from "react";

function BookingComponent({ openDialog, setopenDialog }) {
  const [formData, setFormData] = useState({
    package: "",
    service: "",
    timeSlot: "",
    specialist: "",
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    alert("Booking Submitted!");
    setopenDialog(false);
  };

  if (!openDialog) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur-md px-2 sm:px-4 overflow-y-auto">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg my-8 sm:my-10 ">
        {/* Header */}

        <div className="flex justify-between items-center px-4 sm:px-6 py-3 sm:py-4 bg-gray-100 border-b">
          <h2 className="text-lg sm:text-xl font-semibold mt-10 md:mt-0">
            Book Appointment
          </h2>
          <button
            onClick={() => setopenDialog(false)}
            className="text-gray-600 hover:text-red-500 transition mt-10 md:mt-0"
            aria-label="Close modal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
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
        <form
          onSubmit={handleSubmit}
          className="p-4 sm:p-6 grid gap-4 grid-cols-1 sm:grid-cols-2"
        >
          {/* Dropdown fields */}
          {[
            {
              label: "Package",
              name: "package",
              options: [
                "Premium Glow Package",
                "Essential Care Package",
                "Ultimate Bridal Package",
              ],
            },
            {
              label: "Service",
              name: "service",
              options: ["Haircut", "Facial", "Massage"],
            },
            {
              label: "Time Slot",
              name: "timeSlot",
              options: ["10:00 AM", "12:00 PM", "3:00 PM", "6:00 PM"],
            },
            {
              label: "Specialist",
              name: "specialist",
              options: ["Ravi", "Sita", "Anjali"],
            },
          ].map((field) => (
            <div key={field.name} className="w-full">
              <label
                htmlFor={field.name}
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {field.label}:
              </label>
              <select
                id={field.name}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#D1BB9E]"
              >
                <option value="">Select {field.label}</option>
                {field.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          ))}

          {/* Contact fields */}
          {[
            { label: "Name", name: "name", type: "text" },
            { label: "Email", name: "email", type: "email" },
            {
              label: "Phone",
              name: "phone",
              type: "tel",
              pattern: "[0-9]{10}",
            },
          ].map(({ label, name, type, pattern }) => (
            <div key={name} className="w-full">
              <label
                htmlFor={name}
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {label}:
              </label>
              <input
                id={name}
                name={name}
                type={type}
                pattern={pattern}
                value={formData[name]}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#D1BB9E]"
              />
            </div>
          ))}

          {/* Submit Button */}
          <div className="col-span-full">
            <button
              type="submit"
              className="w-full py-3 px-4 text-white font-semibold bg-[#D1BB9E] hover:bg-gray-800 transition-colors rounded"
            >
              Confirm Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BookingComponent;
