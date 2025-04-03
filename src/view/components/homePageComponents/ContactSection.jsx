import React from "react";

function ContactSection() {
  return (
    <section className="bg-gray-100 py-12 mt-5" id="contact">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-4">
          Contact Us
        </h2>
        <div className="w-16 h-1 bg-gray-500 mx-auto mb-6"></div>
        <p className="text-gray-600 text-center mb-8">
          Have questions? Fill out the form below!
        </p>
        <form className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium">Name</label>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Message</label>
            <textarea
              rows="4"
              placeholder="Your Message"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-gray-600 text-white py-3 rounded-md hover:bg-gray-700 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}

export default ContactSection;
