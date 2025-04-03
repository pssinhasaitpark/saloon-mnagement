import React from "react";
import { motion } from "framer-motion";
import offers from "../../utils/Offers.json";

function OffersSection() {
  return (
    <section className="bg-gray-50 py-12 px-6 mb-5" id="offers">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-4">
          Special Offers
        </h2>
        <div className="w-16 h-1 bg-gray-500 mx-auto mb-6"></div>
        <p className="text-gray-600 text-center mb-8">
          Grab exclusive salon deals and discounts before they expire!
        </p>

        <motion.div
          className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6"
          initial="hidden"
          whileInView="visible"
          transition={{ staggerChildren: 0.2 }}
          viewport={{ once: false, amount: 0.2 }}
        >
          {offers.map((offer, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden transform cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: false, amount: 0.2 }}
            >
              <img
                loading="lazy"
                src={offer.image}
                alt={offer.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800">
                  {offer.title}
                </h3>
                <p className="text-gray-600 mt-2">{offer.description}</p>
                <p className="text-lg font-semibold text-red-500 mt-4">
                  {offer.discount} OFF
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default OffersSection;
