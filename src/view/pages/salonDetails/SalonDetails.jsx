// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import salonData from "../../utils/SalonData.json";
// import img1 from "../../../assets/images/OffonHairSpa.jpg";
// import { img2, img3, img4, img5 } from "../../../assets/index.js";
// import { FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
// import { HiOutlineMail } from "react-icons/hi";
// import { BookingComponent } from "../../components/index.js";
// import Login from "../auth/Login.jsx";
// import Register from "../auth/register.jsx";
// const SalonDetails = () => {
//   const { id } = useParams();
//   const [salon, setSalon] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [openDialog, setopenDialog] = useState(false);
//   const [registered, setregistered] = useState(false);
//   const token = false;

//   useEffect(() => {
//     const numericId = Number(id);
//     const foundSalon = salonData.find((item) => item.id === numericId);

//     setTimeout(() => {
//       setSalon(foundSalon);
//       setLoading(false);
//     }, 300);
//   }, [id]);

//   const demoPackage = [
//     {
//       name: "Premium Glow Package",
//       price: 1999,
//       tag: "Most Popular",
//       features: [
//         "Full Body Spa",
//         "Haircut & Styling",
//         "Facial & Cleanup",
//         "Manicure & Pedicure",
//         "Hair Wash & Blow Dry",
//       ],
//       excluded: ["Bridal Makeup", "Home Visit Service"],
//     },
//     {
//       name: "Essential Care Package",
//       price: 1499,
//       tag: "Best Value",
//       features: [
//         "Haircut & Styling",
//         "Facial",
//         "Manicure",
//         "Pedicure",
//         "Hair Wash",
//       ],
//       excluded: ["Full Body Spa", "Bridal Makeup"],
//     },
//     {
//       name: "Ultimate Bridal Package",
//       price: 2999,
//       tag: "Top Rated",
//       features: [
//         "Bridal Makeup",
//         "Hair Styling",
//         "Full Body Spa",
//         "Facial & Cleanup",
//         "Home Visit Service",
//       ],
//       excluded: [],
//     },
//   ];
//   const CheckIcon = ({ inactive = false }) => (
//     <svg
//       className={`w-5 h-5 ${inactive ? "text-gray-400" : "text-gray-700"}`}
//       fill="currentColor"
//       viewBox="0 0 20 20"
//     >
//       <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
//     </svg>
//   );

//   const OpenBooking = () => {
//     setopenDialog(true);
//   };
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="bg-white p-8 rounded-xl shadow-lg text-center">
//           <div className="w-16 h-16 border-4 border-t-gray-800 border-gray-200 rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading salon details...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!salon) {
//     return (
//       <div className="min-h-screen bg-gray-50 p-36">
//         <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg text-center">
//           <h2 className="text-2xl font-bold text-gray-800 mb-2">
//             Salon Not Found
//           </h2>
//           <p className="text-gray-600 mb-6">
//             We couldn't find a salon with the ID: {id}
//           </p>
//           <Link
//             to="/"
//             className="inline-block bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
//           >
//             Back to Salon List
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-9xl mx-auto mt-5">
//         <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
//           {/* Main Content with Salon Details */}
//           <div className="bg-white rounded-xl shadow-lg overflow-hidden md:col-span-9 p-4">
//             <div className="bg-gradient-to-r from-gray-800 to-gray-700 p-8 text-white">
//               <div className="flex justify-between items-center">
//                 <div>
//                   <h1 className="text-3xl font-bold">{salon.name}</h1>
//                   <p className="text-gray-200 mt-1 flex items-center">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-4 w-4 mr-1"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
//                       />
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
//                       />
//                     </svg>
//                     {salon.location}
//                   </p>
//                 </div>
//                 <span className="bg-[#D1BB9E] text-gray-800 px-4 py-2 rounded-full font-medium">
//                   {salon.type}
//                 </span>
//               </div>
//             </div>

//             <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
//               {/* Left Content */}
//               <div className="lg:col-span-7 space-y-10">
//                 {/* Services Offered */}
//                 <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mt-8">
//                   <h2 className="text-2xl font-semibold text-gray-800 mb-4">
//                     Services Offered
//                   </h2>
//                   <div className="flex flex-wrap gap-3">
//                     {salon.services.map((service, index) => (
//                       <span
//                         key={index}
//                         className="bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-sm hover:shadow-sm transition"
//                       >
//                         {service}
//                       </span>
//                     ))}
//                   </div>
//                 </section>

//                 {/* Premium Package Card */}
//                 <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
//                   <h2 className="text-2xl font-semibold text-gray-800 mb-6">
//                     Our Packages
//                   </h2>

//                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {/* Package Card */}
//                     {demoPackage.map((pkg, index) => (
//                       <div
//                         key={index}
//                         className="p-6 rounded-xl shadow-sm border border-gray-100 bg-gray-50"
//                       >
//                         <div className="flex justify-between items-center mb-4">
//                           <h3 className="text-xl font-semibold text-gray-800">
//                             {pkg.name}
//                           </h3>
//                           {pkg.tag && (
//                             <span className="bg-yellow-100 text-yellow-700 text-xs font-medium px-3 py-1 rounded-full text-center">
//                               {pkg.tag}
//                             </span>
//                           )}
//                         </div>

//                         <div className="flex items-end mb-6">
//                           <span className="text-2xl font-medium text-gray-700">
//                             ₹
//                           </span>
//                           <span className="text-5xl font-extrabold text-gray-800">
//                             {pkg.price}
//                           </span>
//                           <span className="ml-1 text-lg text-gray-500">
//                             /session
//                           </span>
//                         </div>

//                         <ul className="space-y-3 mb-6">
//                           {pkg.features.map((item, idx) => (
//                             <li
//                               key={idx}
//                               className="flex items-center text-gray-700"
//                             >
//                               <CheckIcon />
//                               <span className="ml-2">{item}</span>
//                             </li>
//                           ))}

//                           {pkg.excluded.map((item, idx) => (
//                             <li
//                               key={idx}
//                               className="flex items-center opacity-50 line-through text-gray-500"
//                             >
//                               <CheckIcon inactive />
//                               <span className="ml-2">{item}</span>
//                             </li>
//                           ))}
//                         </ul>
//                       </div>
//                     ))}
//                   </div>
//                 </section>

//                 {/* Rating and Reviews */}
//                 <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
//                   <h2 className="text-2xl font-semibold text-gray-800 mb-4">
//                     Rating & Reviews
//                   </h2>

//                   <div className="bg-gray-50 p-6 rounded-lg">
//                     {/* Overall Rating Display */}
//                     <div className="flex items-center mb-4">
//                       <div className="flex mr-2">
//                         {[1, 2, 3, 4, 5].map((star) => (
//                           <svg
//                             key={star}
//                             xmlns="http://www.w3.org/2000/svg"
//                             className={`h-6 w-6 ${
//                               star <= (salon.rating || 4.5)
//                                 ? "text-yellow-500"
//                                 : "text-gray-300"
//                             }`}
//                             viewBox="0 0 20 20"
//                             fill="currentColor"
//                           >
//                             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                           </svg>
//                         ))}
//                       </div>
//                       <span className="text-lg font-bold">
//                         {salon.rating || 4.5}
//                       </span>
//                       <span className="text-gray-500 ml-2">
//                         ({salon.reviewCount || 187} reviews)
//                       </span>
//                     </div>

//                     {/* Individual Reviews */}
//                     <div className="space-y-4">
//                       {salon.reviews.map((review, index) => (
//                         <div key={index} className="border-b pb-4">
//                           <div className="flex justify-between items-center">
//                             <span className="font-medium">{review.author}</span>
//                             <div className="flex">
//                               {[1, 2, 3, 4, 5].map((star) => (
//                                 <svg
//                                   key={star}
//                                   xmlns="http://www.w3.org/2000/svg"
//                                   className={`h-4 w-4 ${
//                                     star <= review.rating
//                                       ? "text-yellow-500"
//                                       : "text-gray-300"
//                                   }`}
//                                   viewBox="0 0 20 20"
//                                   fill="currentColor"
//                                 >
//                                   <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                                 </svg>
//                               ))}
//                             </div>
//                           </div>
//                           <p className="text-gray-600 mt-1">{review.comment}</p>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </section>
//               </div>

//               {/* Right Sidebar: Image Grid */}
//               <div className="lg:col-span-3 space-y-4 mt-8">
//                 <div className="grid grid-cols-2 gap-2">
//                   <img
//                     src={img1}
//                     alt="Main"
//                     className="col-span-2 h-64 object-cover w-full rounded-lg"
//                   />
//                   <img
//                     src={img2}
//                     alt="Small"
//                     className="h-28 w-full object-cover rounded-lg"
//                   />
//                   <img
//                     src={img3}
//                     alt="Small"
//                     className="h-28 w-full object-cover rounded-lg"
//                   />
//                   {/* Overlay Block */}
//                   <div className="relative h-28">
//                     <img
//                       src={img4}
//                       alt="Overlay"
//                       className="w-full h-full object-cover rounded-lg"
//                     />
//                     <div className="absolute inset-0  backdrop-blur-sm flex items-center justify-center rounded-lg cursor-pointer">
//                       <span className="text-white text-lg font-semibold">
//                         +23 More
//                       </span>
//                     </div>
//                   </div>
//                   <div className="relative bg-gray-100 rounded-lg h-28 cursor-pointer hover:bg-gray-200 flex items-center justify-center">
//                     <div className="text-center">
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="mx-auto h-6 w-6 text-gray-600 mb-1"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M12 4v16m8-8H4"
//                         />
//                       </svg>
//                       <span className="text-gray-700 text-sm font-medium">
//                         Add More Photo
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Sidebar with Contact Information and Business Hours */}
//           <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 w-full md:col-span-3">
//             {/* Contact Information */}
//             <h2 className="text-2xl font-bold text-gray-800 mb-4">
//               Contact Information
//             </h2>
//             <div className="bg-gray-50 p-6 rounded-lg mb-6">
//               <div className="space-y-5">
//                 <div className="flex items-start">
//                   <FaPhoneAlt className="text-gray-600 mt-1 w-5 h-5" />
//                   <div className="ml-3">
//                     <p className="text-sm font-medium text-gray-700">Phone</p>
//                     <p className="text-gray-900">
//                       {salon.phone || "(555) 123-4567"}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex items-start">
//                   <HiOutlineMail className="text-gray-600 mt-1 w-5 h-5" />
//                   <div className="ml-3">
//                     <p className="text-sm font-medium text-gray-700">Email</p>
//                     <p className="text-gray-900">
//                       {salon.email ||
//                         `info@${salon.name
//                           ?.toLowerCase()
//                           .replace(/\s+/g, "")}.com`}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex items-start">
//                   <FaMapMarkerAlt className="text-gray-600 mt-1 w-5 h-5" />
//                   <div className="ml-3">
//                     <p className="text-sm font-medium text-gray-700">Address</p>
//                     <p className="text-gray-900">
//                       {salon.address || `${salon.location}, Downtown Area`}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Business Hours */}
//             <h2 className="text-2xl font-bold text-gray-800 mb-4">
//               Business Hours
//             </h2>
//             <div className="bg-gray-50 p-6 rounded-lg">
//               <div className="divide-y divide-gray-200 text-sm">
//                 {Object.entries(salon.businessHours || {}).map(
//                   ([day, hours]) => (
//                     <div key={day} className="flex justify-between py-2">
//                       <span className="capitalize font-medium text-gray-700">
//                         {day.replace("_", " ")}
//                       </span>
//                       <span className="text-gray-600">{hours}</span>
//                     </div>
//                   )
//                 )}
//               </div>
//             </div>

//             {/* Book Appointment Button */}
//             <div className="mt-8 text-center">
//               <button
//                 onClick={OpenBooking}
//                 className="bg-[#D1BB9E] hover:bg-gray-800 hover:text-white transition-colors text-gray-800 font-bold py-3 px-8 rounded-full text-lg cursor-pointer"
//               >
//                 Book an Appointment
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Booking Component  */}
//       <div className="relative">
//         {token ? (
//           openDialog ? (
//             <BookingComponent
//               openDialog={openDialog}
//               setopenDialog={setopenDialog}
//             />
//           ) : null
//         ) : openDialog ? (
//           registered ? (
//             <Login
//               openDialog={openDialog}
//               setopenDialog={setopenDialog}
//               setregistered={setregistered}
//             />
//           ) : (
//             <Register
//               openDialog={openDialog}
//               setopenDialog={setopenDialog}
//               setregistered={setregistered}
//             />
//           )
//         ) : null}
//       </div>
//     </div>
//   );
// };

// export default SalonDetails;

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import salonData from "../../utils/SalonData.json";
import img1 from "../../../assets/images/OffonHairSpa.jpg";
import { img2, img3, img4, img5 } from "../../../assets/index.js";
import {
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaPencilAlt,
  FaPlus,
  FaSave,
  FaTimes,
} from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { BookingComponent } from "../../components/index.js";
import Login from "../auth/Login.jsx";
import Register from "../auth/register.jsx";
import PackageCards from "../../components/packageCards/PackageCards.jsx";
// import demoPackage from "../../utils/DemoPackage.json";
const SalonDetails = () => {
  const { id } = useParams();
  const [salon, setSalon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [registered, setRegistered] = useState(false);
  const token = false;

  // User role state - change this to control edit permissions
  const [userRole, setUserRole] = useState("user"); // "user" or "admin"

  // Edit mode state
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedSalon, setEditedSalon] = useState(null);
  const [editedPackages, setEditedPackages] = useState([]);

  useEffect(() => {
    const numericId = Number(id);
    const foundSalon = salonData.find((item) => item.id === numericId);

    setTimeout(() => {
      setSalon(foundSalon);
      setEditedSalon(foundSalon ? { ...foundSalon } : null);
      setLoading(false);
    }, 300);
  }, [id]);

  // Initialize packages
  useEffect(() => {
    if (salon) {
      setEditedPackages([...demoPackage]);
    }
  }, [salon]);

  const demoPackage = [
    {
      name: "Premium Glow Package",
      price: 1999,
      tag: "Most Popular",
      features: [
        "Full Body Spa",
        "Haircut & Styling",
        "Facial & Cleanup",
        "Manicure & Pedicure",
        "Hair Wash & Blow Dry",
      ],
      excluded: ["Bridal Makeup", "Home Visit Service"],
    },
    {
      name: "Essential Care Package",
      price: 1499,
      tag: "Best Value",
      features: [
        "Haircut & Styling",
        "Facial",
        "Manicure",
        "Pedicure",
        "Hair Wash",
      ],
      excluded: ["Full Body Spa", "Bridal Makeup"],
    },
    {
      name: "Ultimate Bridal Package",
      price: 2999,
      tag: "Top Rated",
      features: [
        "Bridal Makeup",
        "Hair Styling",
        "Full Body Spa",
        "Facial & Cleanup",
        "Home Visit Service",
      ],
      excluded: [],
    },
  ];

  const OpenBooking = () => {
    setOpenDialog(true);
  };

  const toggleEditMode = () => {
    if (isEditMode) {
      // Save changes
      setSalon({ ...editedSalon });
    }
    setIsEditMode(!isEditMode);
  };

  const handleSalonChange = (field, value) => {
    setEditedSalon({ ...editedSalon, [field]: value });
  };

  const handleAddService = () => {
    const newServices = [...editedSalon.services, "New Service"];
    setEditedSalon({ ...editedSalon, services: newServices });
  };

  const handleServiceChange = (index, value) => {
    const newServices = [...editedSalon.services];
    newServices[index] = value;
    setEditedSalon({ ...editedSalon, services: newServices });
  };

  const handleRemoveService = (index) => {
    const newServices = [...editedSalon.services];
    newServices.splice(index, 1);
    setEditedSalon({ ...editedSalon, services: newServices });
  };

  // Package editing functions
  const handlePackageChange = (index, field, value) => {
    const updatedPackages = [...editedPackages];
    updatedPackages[index] = {
      ...updatedPackages[index],
      [field]: value,
    };
    setEditedPackages(updatedPackages);
  };

  const handlePackageFeatureChange = (packageIndex, featureIndex, value) => {
    const updatedPackages = [...editedPackages];
    updatedPackages[packageIndex].features[featureIndex] = value;
    setEditedPackages(updatedPackages);
  };

  const handlePackageExcludedChange = (packageIndex, excludedIndex, value) => {
    const updatedPackages = [...editedPackages];
    updatedPackages[packageIndex].excluded[excludedIndex] = value;
    setEditedPackages(updatedPackages);
  };

  const handleAddFeature = (packageIndex) => {
    const updatedPackages = [...editedPackages];
    updatedPackages[packageIndex].features.push("New Feature");
    setEditedPackages(updatedPackages);
  };

  const handleAddExcluded = (packageIndex) => {
    const updatedPackages = [...editedPackages];
    updatedPackages[packageIndex].excluded.push("New Excluded Item");
    setEditedPackages(updatedPackages);
  };

  const handleAddPackage = () => {
    const newPackage = {
      name: "New Package",
      price: 999,
      tag: "New",
      features: ["Feature 1", "Feature 2"],
      excluded: ["Excluded Item"],
    };
    setEditedPackages([...editedPackages, newPackage]);
  };

  // Business hours editing functions
  const handleBusinessHoursChange = (day, value) => {
    const updatedBusinessHours = {
      ...editedSalon.businessHours,
      [day]: value,
    };
    setEditedSalon({ ...editedSalon, businessHours: updatedBusinessHours });
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

  if (!salon) {
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

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Admin Controls */}
      {userRole === "admin" && (
        <div className="max-w-9xl mx-auto mb-4 flex justify-end mt-5">
          <div className="bg-white rounded-lg shadow p-3 flex items-center">
            <span className="mr-3 text-gray-600">Role: Admin</span>
            <button
              onClick={toggleEditMode}
              className={`${
                isEditMode ? "bg-green-600" : "bg-blue-600"
              } text-white px-4 py-2 rounded-lg flex items-center`}
            >
              {isEditMode ? (
                <>
                  <FaSave className="mr-2" /> Save Changes
                </>
              ) : (
                <>
                  <FaPencilAlt className="mr-2" /> Edit Mode
                </>
              )}
            </button>
            {isEditMode && (
              <button
                onClick={() => {
                  setEditedSalon({ ...salon });
                  setEditedPackages([...demoPackage]);
                  setIsEditMode(false);
                }}
                className="ml-2 bg-gray-500 text-white px-4 py-2 rounded-lg flex items-center"
              >
                <FaTimes className="mr-2" /> Cancel
              </button>
            )}
          </div>
        </div>
      )}

      <div className="max-w-9xl mx-auto mt-5">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Main Content with Salon Details */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden md:col-span-9 p-4">
            <div className="bg-gradient-to-r from-gray-800 to-gray-700 p-8 text-white">
              <div className="flex justify-between items-center">
                <div>
                  {isEditMode ? (
                    <input
                      type="text"
                      value={editedSalon.name}
                      onChange={(e) =>
                        handleSalonChange("name", e.target.value)
                      }
                      className="text-3xl font-bold bg-transparent border-b border-white w-full focus:outline-none"
                    />
                  ) : (
                    <h1 className="text-3xl font-bold">{editedSalon.name}</h1>
                  )}
                  <p className="text-gray-200 mt-1 flex items-center">
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
                    {isEditMode ? (
                      <input
                        type="text"
                        value={editedSalon.location}
                        onChange={(e) =>
                          handleSalonChange("location", e.target.value)
                        }
                        className="bg-transparent border-b border-white w-full focus:outline-none"
                      />
                    ) : (
                      editedSalon.location
                    )}
                  </p>
                </div>
                {isEditMode ? (
                  <input
                    type="text"
                    value={editedSalon.type}
                    onChange={(e) => handleSalonChange("type", e.target.value)}
                    className="bg-[#D1BB9E] text-gray-800 px-4 py-2 rounded-full font-medium"
                  />
                ) : (
                  <span className="bg-[#D1BB9E] text-gray-800 px-4 py-2 rounded-full font-medium">
                    {editedSalon.type}
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
              {/* Left Content */}
              <div className="lg:col-span-7 space-y-10">
                {/* Services Offered */}
                <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mt-8">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold text-gray-800">
                      Services Offered
                    </h2>
                    {isEditMode && (
                      <button
                        onClick={handleAddService}
                        className="text-blue-600 hover:text-blue-800 flex items-center"
                      >
                        <FaPlus className="mr-1" /> Add Service
                      </button>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {editedSalon.services.map((service, index) => (
                      <div
                        key={index}
                        className="bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-sm hover:shadow-sm transition flex items-center"
                      >
                        {isEditMode ? (
                          <>
                            <input
                              type="text"
                              value={service}
                              onChange={(e) =>
                                handleServiceChange(index, e.target.value)
                              }
                              className="bg-transparent w-full focus:outline-none"
                            />
                            <button
                              onClick={() => handleRemoveService(index)}
                              className="ml-2 text-red-500 hover:text-red-700"
                            >
                              <FaTimes />
                            </button>
                          </>
                        ) : (
                          service
                        )}
                      </div>
                    ))}
                  </div>
                </section>

                {/* Premium Package Card */}
                <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800">
                      Our Packages
                    </h2>
                    {isEditMode && (
                      <button
                        onClick={handleAddPackage}
                        className="text-blue-600 hover:text-blue-800 flex items-center"
                      >
                        <FaPlus className="mr-1" /> Add Package
                      </button>
                    )}
                  </div>
                  {/* Packages  */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <PackageCards
                      isEditMode={isEditMode}
                      editedPackages={editedPackages}
                      handlePackageChange={handlePackageChange}
                      handlePackageFeatureChange={handlePackageFeatureChange}
                      setEditedPackages={setEditedPackages}
                    />
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
                              star <= (editedSalon.rating || 4.5)
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
                      {isEditMode ? (
                        <input
                          type="number"
                          step="0.1"
                          min="0"
                          max="5"
                          value={editedSalon.rating || 4.5}
                          onChange={(e) =>
                            handleSalonChange(
                              "rating",
                              parseFloat(e.target.value)
                            )
                          }
                          className="text-lg font-bold w-16 bg-transparent border-b border-gray-300 focus:outline-none"
                        />
                      ) : (
                        <span className="text-lg font-bold">
                          {editedSalon.rating || 4.5}
                        </span>
                      )}
                      <span className="text-gray-500 ml-2">
                        ({editedSalon.reviewCount || 187} reviews)
                      </span>
                    </div>

                    {/* Individual Reviews */}
                    <div className="space-y-4">
                      {editedSalon.reviews.map((review, index) => (
                        <div key={index} className="border-b pb-4">
                          <div className="flex justify-between items-center">
                            {isEditMode ? (
                              <input
                                type="text"
                                value={review.author}
                                onChange={(e) => {
                                  const updatedReviews = [
                                    ...editedSalon.reviews,
                                  ];
                                  updatedReviews[index] = {
                                    ...updatedReviews[index],
                                    author: e.target.value,
                                  };
                                  handleSalonChange("reviews", updatedReviews);
                                }}
                                className="font-medium bg-transparent border-b border-gray-300 focus:outline-none"
                              />
                            ) : (
                              <span className="font-medium">
                                {review.author}
                              </span>
                            )}
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <svg
                                  key={star}
                                  xmlns="http://www.w3.org/2000/svg"
                                  className={`h-4 w-4 ${
                                    star <= review.rating
                                      ? "text-yellow-500"
                                      : "text-gray-300"
                                  } ${isEditMode ? "cursor-pointer" : ""}`}
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  onClick={() => {
                                    if (isEditMode) {
                                      const updatedReviews = [
                                        ...editedSalon.reviews,
                                      ];
                                      updatedReviews[index] = {
                                        ...updatedReviews[index],
                                        rating: star,
                                      };
                                      handleSalonChange(
                                        "reviews",
                                        updatedReviews
                                      );
                                    }
                                  }}
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                          </div>
                          {isEditMode ? (
                            <textarea
                              value={review.comment}
                              onChange={(e) => {
                                const updatedReviews = [...editedSalon.reviews];
                                updatedReviews[index] = {
                                  ...updatedReviews[index],
                                  comment: e.target.value,
                                };
                                handleSalonChange("reviews", updatedReviews);
                              }}
                              className="text-gray-600 mt-1 w-full bg-transparent border border-gray-300 rounded p-2 focus:outline-none"
                              rows="2"
                            />
                          ) : (
                            <p className="text-gray-600 mt-1">
                              {review.comment}
                            </p>
                          )}
                        </div>
                      ))}
                      {isEditMode && (
                        <button
                          onClick={() => {
                            const newReviews = [
                              ...editedSalon.reviews,
                              {
                                author: "New Reviewer",
                                rating: 5,
                                comment: "Add your review here...",
                              },
                            ];
                            handleSalonChange("reviews", newReviews);
                          }}
                          className="text-blue-600 hover:text-blue-800 flex items-center text-sm"
                        >
                          <FaPlus className="mr-1" /> Add Review
                        </button>
                      )}
                    </div>
                  </div>
                </section>
              </div>

              {/* Right Sidebar: Image Grid */}
              <div className="lg:col-span-3 space-y-4 mt-8">
                <div className="grid grid-cols-2 gap-2">
                  <img
                    src={img1}
                    alt="Main"
                    className="col-span-2 h-64 object-cover w-full rounded-lg"
                  />
                  <img
                    src={img2}
                    alt="Small"
                    className="h-28 w-full object-cover rounded-lg"
                  />
                  <img
                    src={img3}
                    alt="Small"
                    className="h-28 w-full object-cover rounded-lg"
                  />
                  {/* Overlay Block */}
                  <div className="relative h-28">
                    <img
                      src={img4}
                      alt="Overlay"
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <div className="absolute inset-0  backdrop-blur-sm flex items-center justify-center rounded-lg cursor-pointer">
                      <span className="text-white text-lg font-semibold">
                        +23 More
                      </span>
                    </div>
                  </div>
                  <div className="relative bg-gray-100 rounded-lg h-28 cursor-pointer hover:bg-gray-200 flex items-center justify-center">
                    <div className="text-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="mx-auto h-6 w-6 text-gray-600 mb-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                      <span className="text-gray-700 text-sm font-medium">
                        Add More Photo
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
                    {isEditMode ? (
                      <input
                        type="text"
                        value={editedSalon.phone || "(555) 123-4567"}
                        onChange={(e) =>
                          handleSalonChange("phone", e.target.value)
                        }
                        className="text-gray-900 bg-transparent border-b border-gray-300 focus:outline-none w-full"
                      />
                    ) : (
                      <p className="text-gray-900">
                        {editedSalon.phone || "(555) 123-4567"}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-start">
                  <HiOutlineMail className="text-gray-600 mt-1 w-5 h-5" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-700">Email</p>
                    {isEditMode ? (
                      <input
                        type="text"
                        value={
                          editedSalon.email ||
                          `info@${editedSalon.name
                            ?.toLowerCase()
                            .replace(/\s+/g, "")}.com`
                        }
                        onChange={(e) =>
                          handleSalonChange("email", e.target.value)
                        }
                        className="text-gray-900 bg-transparent border-b border-gray-300 focus:outline-none w-full"
                      />
                    ) : (
                      <p className="text-gray-900">
                        {editedSalon.email ||
                          `info@${editedSalon.name
                            ?.toLowerCase()
                            .replace(/\s+/g, "")}.com`}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-start">
                  <FaMapMarkerAlt className="text-gray-600 mt-1 w-5 h-5" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-700">Address</p>
                    {isEditMode ? (
                      <input
                        type="text"
                        value={
                          editedSalon.address ||
                          `${editedSalon.location}, Downtown Area`
                        }
                        onChange={(e) =>
                          handleSalonChange("address", e.target.value)
                        }
                        className="text-gray-900 bg-transparent border-b border-gray-300 focus:outline-none w-full"
                      />
                    ) : (
                      <p className="text-gray-900">
                        {editedSalon.address ||
                          `${editedSalon.location}, Downtown Area`}
                      </p>
                    )}
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
                {Object.entries(editedSalon.businessHours || {}).map(
                  ([day, hours]) => (
                    <div key={day} className="flex justify-between py-2">
                      <span className="capitalize font-medium text-gray-700">
                        {day.replace("_", " ")}
                      </span>
                      {isEditMode ? (
                        <input
                          type="text"
                          value={hours}
                          onChange={(e) =>
                            handleBusinessHoursChange(day, e.target.value)
                          }
                          className="text-gray-600 bg-transparent border-b border-gray-300 focus:outline-none text-right"
                        />
                      ) : (
                        <span className="text-gray-600">{hours}</span>
                      )}
                    </div>
                  )
                )}
                {isEditMode && (
                  <button
                    onClick={() => {
                      const newDay = prompt(
                        "Enter day (e.g., 'special_holiday'):"
                      );
                      if (newDay) {
                        handleBusinessHoursChange(newDay, "10:00 AM - 2:00 PM");
                      }
                    }}
                    className="text-blue-600 hover:text-blue-800 flex items-center text-sm mt-2"
                  >
                    <FaPlus className="mr-1" /> Add Business Hour
                  </button>
                )}
              </div>
            </div>

            {/* Book Appointment Button */}
            <div className="mt-8 text-center">
              <button
                onClick={OpenBooking}
                className="bg-[#D1BB9E] hover:bg-gray-800 hover:text-white transition-colors text-gray-800 font-bold py-3 px-8 rounded-full text-lg cursor-pointer"
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
