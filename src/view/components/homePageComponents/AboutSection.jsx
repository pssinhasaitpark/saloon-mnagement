import React from "react";
import aboutImage from "../../../assets/images/aboutus.jpg";
import { motion } from "framer-motion";
import { AiFillCheckCircle } from "react-icons/ai";

function AboutSection() {
  return (
    <motion.div
      className="w-full py-16 px-6 bg-gradient-to-br from-blue-50 to-white  shadow-2xl mb-5"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: false, amount: 0.2 }} // Triggers animation when 20% of the section is visible
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Section - Image */}
        <aside
          className="relative overflow-hidden shadow-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false, amount: 0.2 }}
        >
          <img
            loading="lazy"
            src={aboutImage}
            alt="About Us"
            className="w-full h-auto object-cover "
          />
        </aside>

        {/* Right Section - Content */}
        <motion.section
          className="bg-white bg-opacity-90 backdrop-blur-lg p-8 rounded-2xl shadow-md border-l-4 border-gray-200"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false, amount: 0.2 }}
        >
          <h2 className="text-4xl  mb-5 text-gray-800 border-b-4 border-gray-200 inline-block pb-2">
            Who We Are
          </h2>
          <p className="text-gray-600 leading-relaxed text-lg mb-6">
            We make it easy for you to find the best salons near you. Whether
            you need a haircut, a spa treatment, or beauty services, our
            platform helps you discover top-rated salons, compare prices, read
            reviews, and book appointments in just a few clicks.
          </p>

          <h3 className="text-2xl  mb-4 text-gray-800">Why Choose Us?</h3>
          <ul className="space-y-4">
            {[
              {
                title: "Find the Best Salons",
                desc: "Explore trusted salons with real customer reviews.",
              },
              {
                title: "Easy Booking",
                desc: "Schedule appointments quickly and hassle-free.",
              },
              {
                title: "Great Deals",
                desc: "Get discounts and special offers.",
              },
              {
                title: "Simple & Fast",
                desc: "A user-friendly platform for a smooth experience.",
              },
            ].map((item, index) => (
              <motion.li
                key={index}
                className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg shadow-sm transition-all duration-300 hover:bg-gray-100"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: false, amount: 0.2 }}
              >
                <AiFillCheckCircle className="text-gray-500 w-7 h-7 mt-1" />
                <div>
                  <strong className="text-gray-900 text-lg">
                    {item.title}
                  </strong>
                  <p className="text-gray-700 text-md">{item.desc}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </motion.section>
      </div>
    </motion.div>
  );
}

export default AboutSection;
