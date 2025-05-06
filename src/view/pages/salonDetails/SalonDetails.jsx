import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchStoreById } from "../../redux/slices/getStoreSlice.js";
import { FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { BookingComponent } from "../../components/index.js";
import Login from "../auth/Login.jsx";
import Register from "../auth/register.jsx";
import { fetchgallerys } from "../../redux/slices/gallerySlice.js";
const SalonDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedStore, loading, error } = useSelector(
    (state) => state.stores
  );
  const { gallerys } = useSelector((state) => state.gallery);
  const [openDialog, setOpenDialog] = useState(false);
  const [registered, setRegistered] = useState(false);
  const token = localStorage.getItem("token");
  useEffect(() => {
    dispatch(fetchStoreById(id));
    dispatch(fetchgallerys(id));
  }, [dispatch, id]);
  const OpenBooking = () => {
    setOpenDialog(true);
  };
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
          <div className="w-16 h-16 border-4 border-t-gray-800 border-gray-200 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading salon details...</p>
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-36">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link
            to="/"
            className="inline-block bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Back to Salon List
          </Link>
        </div>
      </div>
    );
  }
  if (!selectedStore) {
    return (
      <div className="min-h-screen bg-gray-50 p-36">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Salon Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            We couldn't find a salon with the ID: {id}
          </p>
          <Link
            to="/"
            className="inline-block bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Back to Salon List
          </Link>
        </div>
      </div>
    );
  }
  // CheckIcon component definition
  const CheckIcon = ({ inactive = false }) => (
    <svg
      className={`w-5 h-5 ${inactive ? "text-gray-400" : "text-gray-700"}`}
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
    </svg>
  );
  const salon = selectedStore; // Use the fetched salon data
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-9xl mx-auto mt-5">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Main Content with Salon Details */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden md:col-span-9 p-4">
            <div className="bg-gradient-to-r from-gray-800 to-gray-700 p-8 text-white">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-3xl font-bold">{salon.name}</h1>
                  <p className="text-gray-200 mt-1 flex items-center">
                    <FaMapMarkerAlt className="mr-1" />
                    {salon.city}
                  </p>
                </div>
                <span className="bg-[#D1BB9E] text-gray-800 px-4 py-2 rounded-full font-medium">
                  {salon.type}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
              {/* Left Content */}
              <div className="lg:col-span-7 space-y-10 mt-5">
                {/* Services Offered */}
                <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mt-8">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    Services Offered
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {salon.services.length > 5 ? (
                      <>
                        {salon.services.slice(0, 5).map((service, index) => (
                          <span
                            key={index}
                            className="bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-sm hover:shadow-sm transition"
                          >
                            {service}
                          </span>
                        ))}
                        <span className="bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-sm hover:shadow-sm transition">
                          ...
                        </span>
                      </>
                    ) : (
                      salon.services.map((service, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-sm hover:shadow-sm transition"
                        >
                          {service}
                        </span>
                      ))
                    )}
                  </div>
                </section>
                {/* Packages Section */}
                <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                    Our Packages
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {salon.packages.map((pkg, index) => (
                      <div
                        key={index}
                        className="p-6 rounded-xl shadow-sm border border-gray-100 bg-gray-50"
                      >
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-xl font-semibold text-gray-800">
                            {pkg.packageName}
                          </h3>
                          {pkg.packageType && (
                            <span className="bg-yellow-100 text-yellow-700 text-xs font-medium px-3 py-1 rounded-full text-center">
                              {pkg.packageType}
                            </span>
                          )}
                        </div>
                        <div className="flex items-end mb-6">
                          <span className="text-2xl font-medium text-gray-700">
                            ₹
                          </span>
                          <span className="text-5xl font-extrabold text-gray-800">
                            {pkg.amount}
                          </span>
                          <span className="ml-1 text-lg text-gray-500">
                            /session
                          </span>
                        </div>
                        <ul className="space-y-3 mb-6">
                          {pkg.services.map((item, idx) => (
                            <li
                              key={idx}
                              className="flex items-center text-gray-700"
                            >
                              <CheckIcon />
                              <span className="ml-2">{item.name}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </section>
                {/* Rating and Reviews */}
                <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    Rating & Reviews
                  </h2>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    {/* Overall Rating Display */}
                    <div className="flex items-center mb-4">
                      <div className="flex mr-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg
                            key={star}
                            xmlns="http://www.w3.org/2000/svg"
                            className={`h-6 w-6 ${
                              star <= (salon.rating || 4.5)
                                ? "text-yellow-500"
                                : "text-gray-300"
                            }`}
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 10 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-lg font-bold">
                        {salon.rating || 4.5}
                      </span>
                      <span className="text-gray-500 ml-2">
                        ({salon.reviewCount || 0} reviews)
                      </span>
                    </div>
                    {/* Individual Reviews */}
                    <div className="space-y-4">
                      {salon.reviews &&
                        salon.reviews.map((review, index) => (
                          <div key={index} className="border-b pb-4">
                            <div className="flex justify-between items-center">
                              <span className="font-medium">
                                {review.author}
                              </span>
                              <div className="flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <svg
                                    key={star}
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={`h-4 w-4 ${
                                      star <= review.rating
                                        ? "text-yellow-500"
                                        : "text-gray-300"
                                    }`}
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                ))}
                              </div>
                            </div>
                            <p className="text-gray-600 mt-1">
                              {review.comment}
                            </p>
                          </div>
                        ))}
                    </div>
                  </div>
                </section>
              </div>
              {/* Right Sidebar: Image Grid */}
              <div className="lg:col-span-3 space-y-4 mt-8">
                <div className="grid grid-cols-2 gap-2 mt-5">
                  {gallerys.length > 0 &&
                    gallerys.map((gallery, galleryIndex) =>
                      gallery.images.map((image, imgIndex) => (
                        <img
                          key={`${galleryIndex}-${imgIndex}`}
                          src={`${import.meta.env.VITE_IMAGE_BASE_URL}${image}`}
                          alt={`Gallery ${galleryIndex + 1}-${imgIndex + 1}`}
                          className="w-full h-40 object-cover rounded-lg"
                        />
                      ))
                    )}

                  {gallerys.length > 4 && (
                    <div className="relative h-40 col-span-2">
                      <img
                        src={`${import.meta.env.VITE_IMAGE_BASE_URL}${
                          gallerys[4].images[0]
                        }`}
                        alt="Overlay"
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 backdrop-blur-sm flex items-center justify-center rounded-lg cursor-pointer">
                        <span className="text-white text-lg font-semibold">
                          +{gallerys.length - 4} More
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="relative bg-gray-100 rounded-lg h-40 col-span-2 cursor-pointer hover:bg-gray-200 flex items-center justify-center">
                    <div className="text-center">
                      <span className="text-gray-700 text-sm font-medium">
                        More Photos
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar with Contact Information and Business Hours */}

          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 w-full md:col-span-3">
            {/* Contact Information */}

            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Contact Information
            </h2>

            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <div className="space-y-5">
                <div className="flex items-start">
                  <FaPhoneAlt className="text-gray-600 mt-1 w-5 h-5" />

                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-700">Phone</p>

                    <p className="text-gray-900">
                      {salon.contact || "(555) 123-4567"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <HiOutlineMail className="text-gray-600 mt-1 w-5 h-5" />

                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-700">Email</p>

                    <p className="text-gray-900">{`info@${salon.name

                      .toLowerCase()

                      .replace(/\s+/g, "")}.com`}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FaMapMarkerAlt className="text-gray-600 mt-1 w-5 h-5" />

                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-700">Address</p>

                    <p className="text-gray-900">
                      {salon.city || "Unknown Location"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Business Hours */}

            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Business Hours
            </h2>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="divide-y divide-gray-200 text-sm">
                {salon.workingHours.map((hour, index) => (
                  <div key={index} className="flex justify-between py-2">
                    <span className="capitalize font-medium text-gray-700">
                      {hour.day}
                    </span>

                    <span className="text-gray-600">
                      {hour.isClosed
                        ? "Closed"
                        : `${hour.openTime} - ${hour.closeTime}`}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Book Appointment Button */}

            <div className="mt-8 text-center">
              <button
                onClick={OpenBooking}
                className="bg-[#D1BB9E] hover:bg-gray-800 hover:text-white transition-colors text-gray-800 font-bold py-3 px-8 rounded-full text-lg cursor-pointer mt-5"
              >
                Book an Appointment
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Component  */}

      <div className="relative">
        {token ? (
          openDialog ? (
            <BookingComponent
              id={id}
              openDialog={openDialog}
              setopenDialog={setOpenDialog}
            />
          ) : null
        ) : openDialog ? (
          registered ? (
            <Login
              openDialog={openDialog}
              setopenDialog={setOpenDialog}
              setregistered={setRegistered}
            />
          ) : (
            <Register
              openDialog={openDialog}
              setopenDialog={setOpenDialog}
              setregistered={setRegistered}
            />
          )
        ) : null}
      </div>
    </div>
  );
};

export default SalonDetails;
