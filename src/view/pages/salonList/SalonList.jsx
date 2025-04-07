// src/view/pages/salonList/SalonList.js
import React from "react";
import { Link } from "react-router-dom";
import salonData from "../../utils/SalonData.json";

const SalonList = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Salon List</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {salonData.map((salon) => (
            <div
              key={salon.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <Link to={`/salon/${salon.id}`} className="block">
                <h3 className="text-lg font-bold text-gray-800">
                  {salon.name}
                </h3>
                <p className="text-gray-600">{salon.location}</p>
                <span className="bg-[#D1BB9E] text-gray-800 px-2 py-1 rounded-full text-sm">
                  {salon.type}
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SalonList;
