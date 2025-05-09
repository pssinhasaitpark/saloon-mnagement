import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchstore } from "../../redux/slices/getStoreSlice";

const services = [
  "All",
  "Haircut",
  "Hair Color",
  "Facial",
  "Manicure",
  "Pedicure",
];

// Helper function to map service objects to service names
const mapServiceToName = (service) => {
  // Common service types based on your list
  const serviceMap = {
    "6813529088dd80186dacf44b": "Haircut",
    "6813529088dd80186dacf44d": "Hair Color",
    "6813529088dd80186dacf44f": "Facial",
    "6813529088dd80186dacf451": "Manicure",
    "6813529088dd80186dacf453": "Pedicure",
    // You can add more mappings as needed
  };

  return serviceMap[service.service] || "Other Service";
};

function MainSection({ selectedCategory }) {
  const dispatch = useDispatch();
  const { stores, loading, error } = useSelector((state) => state.stores);

  useEffect(() => {
    dispatch(fetchstore());
  }, [dispatch]);

  const [selectedService, setSelectedService] = useState("All");
  const [visibleCount, setVisibleCount] = useState(6);
  const navigate = useNavigate();
  const location = useSelector((state) => state.search.location);

  const handleServiceClick = (service) => {
    setSelectedService(service);
    setVisibleCount(6);
  };

  const handleSalonClick = (salonId) => {
    navigate(`/salon/${salonId}`);
  };

  // Process the stores to add service names
  const processedStores = stores.map((store) => {
    const mappedServices = store.services.map((service) => ({
      ...service,
      name: mapServiceToName(service),
    }));

    return {
      ...store,
      services: mappedServices,
    };
  });

  const filteredSalons = processedStores.filter((salon) => {
    const matchesCategory =
      selectedCategory === "All" || salon.type === selectedCategory;
    const matchesService =
      selectedService === "All" ||
      salon.services.some((service) => service.name === selectedService);
    const matchesLocation =
      !location || salon.address.toLowerCase().includes(location.toLowerCase());

    return matchesCategory && matchesService && matchesLocation;
  });

  return (
    <div
      id="main-section"
      className="w-full py-10 px-6 md:px-8 flex flex-col md:flex-row gap-8 backdrop-blur-lg shadow-xl bg-gradient-to-br from-white to-gray-100 bg-opacity-90"
    >
      {/* Left Sidebar - Services */}
      <aside className="w-full md:w-1/4 bg-white p-6 rounded-xl shadow-lg min-h-[450px] border border-gray-100">
        <h2 className="text-xl font-bold mb-6 text-gray-800 border-b pb-3 flex items-center">
          Our Services
        </h2>
        <ul className="space-y-4">
          {services.map((service, index) => (
            <li
              key={index}
              onClick={() => handleServiceClick(service)}
              className={`cursor-pointer text-center p-4 rounded-lg shadow-md transition-all duration-300 hover:scale-105 ${
                selectedService === service
                  ? "bg-gradient-to-r from-gray-700 to-gray-800 text-white font-medium"
                  : "bg-gradient-to-r from-[#D1BB9E] to-[#E5D3BC] text-gray-800 hover:from-gray-500 hover:to-gray-600 hover:text-white"
              }`}
            >
              {service}
            </li>
          ))}
        </ul>
      </aside>

      {/* Right Section - Salon List */}
      <section className="w-full md:w-3/4 bg-white p-6 rounded-xl shadow-lg border border-gray-100">
        <h2 className="text-xl font-bold mb-6 text-gray-800 border-b pb-3 flex items-center justify-between">
          <div>
            <span className="inline-block bg-[#D1BB9E] text-gray-800 px-3 py-1 rounded-md mr-2">
              {selectedCategory}
            </span>
            <span>Salons Offering</span>
            <span className="inline-block bg-gray-800 text-white px-3 py-1 rounded-md ml-2">
              {selectedService}
            </span>
            {location && (
              <span className="inline-block bg-blue-600 text-white px-3 py-1 rounded-md ml-2">
                {location}
              </span>
            )}
          </div>
          <span className="text-sm bg-gray-100 px-3 py-1 text-center rounded-full">
            {filteredSalons.length} results
          </span>
        </h2>

        {filteredSalons.length > 0 ? (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSalons.slice(0, visibleCount).map((salon) => (
                <div
                  key={salon._id}
                  onClick={() => handleSalonClick(salon._id)}
                  className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-102 border border-gray-100 flex flex-col cursor-pointer group"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-bold text-gray-800 group-hover:text-gray-900">
                      {salon.storename}
                    </h3>
                    <span className="bg-[#D1BB9E] text-xs text-gray-800 px-2 py-1 rounded-full">
                      {salon.type}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    {salon.address}, {salon.city}
                  </p>
                  <div className="mt-4 pt-3 border-t border-gray-100">
                    <p className="text-gray-500 text-xs font-medium">
                      Services
                    </p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {salon.services.slice(0, 5).map((service, index) => (
                        <span
                          key={service._id}
                          className={`text-xs px-2 py-1 rounded-full ${
                            service.name === selectedService &&
                            selectedService !== "All"
                              ? "bg-gray-800 text-white"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {service.name}
                        </span>
                      ))}
                      {salon.services.length > 5 && (
                        <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                          +{salon.services.length - 5} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* "View More" Button */}
            {visibleCount < filteredSalons.length && (
              <div className="mt-6 text-center">
                <button
                  onClick={() => setVisibleCount((prev) => prev + 6)}
                  className="px-6 py-3 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition-all duration-300 cursor-pointer"
                >
                  View More
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-16 bg-gray-50 rounded-lg">
            <p className="text-gray-700 font-medium text-lg">
              No salons available matching your criteria.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

export default MainSection;
