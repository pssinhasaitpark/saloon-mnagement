import React from "react";
import services from "../../utils/Services.json";
import { motion } from "framer-motion";

function ServicesSection() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1.0],
      },
    },
  };

  return (
    <section
      className="bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-6 overflow-hidden mb-5"
      id="services"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.2 }}
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Our Services
          </h2>
          <div className="w-16 h-1 bg-gray-500 mx-auto mb-6"></div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
            Explore top-rated salons offering premium beauty and wellness
            services.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 cursor-pointer"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden group"
              variants={itemVariants}
              whileHover={{
                y: -8,
                transition: { duration: 0.3, ease: "easeOut" },
              }}
            >
              <div className="relative overflow-hidden">
                <img
                  loading="lazy"
                  src={service.image}
                  alt={service.title}
                  className="w-full h-56 object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                  {service.title}
                </h3>
                <div className="w-12 h-0.5 bg-gray-500 mb-4 transform origin-left scale-0 group-hover:scale-100 transition-transform duration-300 ease-out"></div>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
                <div className="mt-6 overflow-hidden">
                  {/* <span className="inline-flex items-center text-gray-600 font-medium group-hover:text-gray-800 transition-colors">
                    <span>Learn more</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 ml-1 transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span> */}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default ServicesSection;
