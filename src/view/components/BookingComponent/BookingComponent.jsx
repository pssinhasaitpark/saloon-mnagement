// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchSpecialistsByStoreId } from "../../redux/slices/specialistSlice";
// import { createBooking } from "../../redux/slices/bookingSlice";

// function BookingComponent({ openDialog, setopenDialog, id }) {
//   const dispatch = useDispatch();
//   const storeId = id;

//   const { selectedStore, loading: storeLoading } = useSelector(
//     (state) => state.stores
//   );
//   const { loading: bookingLoading } = useSelector((state) => state.booking);
//   const { specialists, loading: specialistsLoading } = useSelector(
//     (state) => state.Staff
//   );

//   const [formData, setFormData] = useState({
//     package: "",
//     specialist: "",
//     date: new Date().toISOString().split("T")[0],
//     timeSlot: "",
//     store: storeId || "",
//     services: [],
//   });

//   const [isPackageSelected, setIsPackageSelected] = useState(false);

//   useEffect(() => {
//     if (openDialog && storeId) {
//       dispatch(fetchSpecialistsByStoreId(storeId));
//     }
//   }, [openDialog, storeId, dispatch]);

//   const generateTimeSlots = () => {
//     if (!selectedStore || !selectedStore.workingHours) return [];
//     const today = new Date().getDay();
//     const isWeekend = today === 0 || today === 6;
//     const hoursType = isWeekend ? "weekend" : "weekday";
//     const workingHours = selectedStore.workingHours.find(
//       (h) => h.day === hoursType
//     );
//     if (!workingHours || workingHours.isClosed) return [];

//     const slots = [];
//     let start = parseInt(workingHours.openTime.split(":")[0]);
//     const end = parseInt(workingHours.closeTime.split(":")[0]);

//     for (let hour = start; hour < end; hour++) {
//       const nextHour = hour + 1;
//       slots.push(`${hour}.00-${nextHour}.00`);
//     }

//     return slots;
//   };

//   const timeSlots = generateTimeSlots();

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     if (type === "checkbox") {
//       setFormData((prev) => {
//         const updatedServices = checked
//           ? [...prev.services, value]
//           : prev.services.filter((service) => service !== value);
//         return { ...prev, services: updatedServices };
//       });
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }));
//       if (name === "package") setIsPackageSelected(true);
//       else if (name === "services") setIsPackageSelected(false);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (isPackageSelected && formData.services.length > 0) {
//       alert("You can select either a package or services, not both.");
//       return;
//     }

//     const bookingPayload = {
//       package: formData.package,
//       specialist: formData.specialist,
//       date: formData.date,
//       timeSlot: formData.timeSlot,
//       store: formData.store,
//       services: formData.services,
//     };

//     dispatch(createBooking(bookingPayload))
//       .then(() => {
//         alert("Booking Submitted Successfully!");
//         setopenDialog(false);
//       })
//       .catch((error) => {
//         console.error("Booking failed:", error);
//         alert("Booking Failed. Please try again.");
//       });
//   };

//   if (!openDialog) return null;

//   if (storeLoading || specialistsLoading) {
//     return (
//       <div className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur-md bg-black/50">
//         <div className="bg-white p-6 rounded-xl shadow-lg">
//           <p className="text-lg">Loading information...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur-md bg-black/50 px-2 sm:px-4 overflow-y-auto">
//       <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg my-8 sm:my-10">
//         <div className="flex justify-between items-center px-4 sm:px-6 py-3 sm:py-4 bg-gray-100 border-b">
//           <h2 className="text-lg sm:text-xl font-semibold mt-10 md:mt-0">
//             Book Appointment at {selectedStore?.name || ""}
//           </h2>
//           <button
//             onClick={() => setopenDialog(false)}
//             className="text-gray-600 hover:text-red-500 transition mt-10 md:mt-0"
//             aria-label="Close modal"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="20"
//               height="20"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             >
//               <line x1="18" y1="6" x2="6" y2="18" />
//               <line x1="6" y1="6" x2="18" y2="18" />
//             </svg>
//           </button>
//         </div>

//         <form
//           onSubmit={handleSubmit}
//           className="p-4 sm:p-6 grid gap-4 grid-cols-1 sm:grid-cols-2"
//         >
//           <div className="w-full">
//             <label
//               htmlFor="package"
//               className="block text-sm font-medium text-gray-700 mb-1"
//             >
//               Package:
//             </label>
//             <select
//               id="package"
//               name="package"
//               value={formData.package}
//               onChange={handleChange}
//               disabled={formData.services.length > 0}
//               required={!isPackageSelected && formData.services.length === 0}
//               className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#D1BB9E]"
//             >
//               <option value="">Select Package</option>
//               {selectedStore?.packages?.map((pkg) => (
//                 <option key={pkg._id} value={pkg._id}>
//                   {pkg.packageName} - ₹{pkg.amount}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="w-full">
//             <label
//               htmlFor="specialist"
//               className="block text-sm font-medium text-gray-700 mb-1"
//             >
//               Specialist:
//             </label>
//             <select
//               id="specialist"
//               name="specialist"
//               value={formData.specialist}
//               onChange={handleChange}
//               required
//               className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#D1BB9E]"
//             >
//               <option value="">Select Specialist</option>
//               {specialists && specialists.length > 0 ? (
//                 specialists.map((specialist) => (
//                   <option key={specialist._id} value={specialist._id}>
//                     {specialist.name}
//                   </option>
//                 ))
//               ) : (
//                 <option value="" disabled>
//                   No specialists available for this store
//                 </option>
//               )}
//             </select>
//           </div>

//           <div className="w-full">
//             <label
//               htmlFor="date"
//               className="block text-sm font-medium text-gray-700 mb-1"
//             >
//               Date:
//             </label>
//             <input
//               id="date"
//               name="date"
//               type="date"
//               value={formData.date}
//               onChange={handleChange}
//               min={new Date().toISOString().split("T")[0]}
//               required
//               className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#D1BB9E]"
//             />
//           </div>

//           <div className="w-full">
//             <label
//               htmlFor="timeSlot"
//               className="block text-sm font-medium text-gray-700 mb-1"
//             >
//               Time Slot:
//             </label>
//             <select
//               id="timeSlot"
//               name="timeSlot"
//               value={formData.timeSlot}
//               onChange={handleChange}
//               required
//               className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#D1BB9E]"
//             >
//               <option value="">Select Time Slot</option>
//               {timeSlots.length > 0 ? (
//                 timeSlots.map((slot) => (
//                   <option key={slot} value={slot}>
//                     {slot}
//                   </option>
//                 ))
//               ) : (
//                 <option value="" disabled>
//                   No time slots available
//                 </option>
//               )}
//             </select>
//           </div>

//           <div className="w-full">
//             <label
//               htmlFor="services"
//               className="block text-sm font-medium text-gray-700 mb-1"
//             >
//               Services:
//             </label>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
//               {selectedStore?.services?.map((service) => (
//                 <div key={service._id} className="flex items-center">
//                   <input
//                     type="checkbox"
//                     id={`service-${service._id}`}
//                     name="services"
//                     value={service._id}
//                     onChange={handleChange}
//                     disabled={formData.package}
//                     className="mr-2"
//                   />
//                   <label
//                     htmlFor={`service-${service._id}`}
//                     className="text-sm text-gray-700"
//                   >
//                     {service.name}
//                   </label>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="col-span-full">
//             <button
//               type="submit"
//               disabled={bookingLoading}
//               className="w-full py-3 px-4 text-white font-semibold bg-[#D1BB9E] hover:bg-gray-800 transition-colors rounded cursor-pointer disabled:bg-gray-400"
//             >
//               {bookingLoading ? "Processing..." : "Confirm Booking"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default BookingComponent;
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStaff } from "../../redux/slices/staffSlice";
import { createBooking } from "../../redux/slices/bookingSlice";
import { fetchServicesByStoreId } from "../../redux/slices/serviceslice";

function BookingComponent({ openDialog, setopenDialog, id }) {
  const dispatch = useDispatch();
  const storeId = id;

  const { selectedStore, loading: storeLoading } = useSelector(
    (state) => state.stores
  );
  const { loading: bookingLoading } = useSelector((state) => state.booking);
  const { staff: specialists, loading: specialistsLoading } = useSelector(
    (state) => state.Staff
  );
  const { storeServices, loading: servicesLoading } = useSelector(
    (state) => state.services
  );

  const [formData, setFormData] = useState({
    package: "",
    specialist: "",
    date: new Date().toISOString().split("T")[0],
    timeSlot: "",
    store: storeId || "",
    services: [],
  });

  const [isPackageSelected, setIsPackageSelected] = useState(false);

  useEffect(() => {
    if (openDialog && storeId) {
      // Fetch staff and services for the selected store
      dispatch(fetchStaff({ id: storeId, type: "store" }));
      dispatch(fetchServicesByStoreId(storeId));
    }
  }, [openDialog, storeId, dispatch]);

  const generateTimeSlots = () => {
    if (!selectedStore || !selectedStore.workingHours) return [];
    const today = new Date().getDay();
    const isWeekend = today === 0 || today === 6;
    const hoursType = isWeekend ? "weekend" : "weekday";
    const workingHours = selectedStore.workingHours.find(
      (h) => h.day === hoursType
    );
    if (!workingHours || workingHours.isClosed) return [];

    const slots = [];
    let start = parseInt(workingHours.openTime.split(":")[0]);
    const end = parseInt(workingHours.closeTime.split(":")[0]);

    for (let hour = start; hour < end; hour++) {
      const nextHour = hour + 1;
      slots.push(`${hour}.00-${nextHour}.00`);
    }

    return slots;
  };

  const timeSlots = generateTimeSlots();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => {
        const updatedServices = checked
          ? [...prev.services, value]
          : prev.services.filter((service) => service !== value);
        return { ...prev, services: updatedServices };
      });
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
      if (name === "package") setIsPackageSelected(true);
      else if (name === "services") setIsPackageSelected(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isPackageSelected && formData.services.length > 0) {
      alert("You can select either a package or services, not both.");
      return;
    }

    const bookingPayload = {
      package: formData.package,
      specialist: formData.specialist,
      date: formData.date,
      timeSlot: formData.timeSlot,
      store: formData.store,
      services: formData.services,
    };

    dispatch(createBooking(bookingPayload))
      .then(() => {
        alert("Booking Submitted Successfully!");
        setopenDialog(false);
      })
      .catch((error) => {
        console.error("Booking failed:", error);
        alert("Booking Failed. Please try again.");
      });
  };

  if (!openDialog) return null;

  if (storeLoading || specialistsLoading || servicesLoading) {
    return (
      <div className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur-md bg-black/50">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <p className="text-lg">Loading information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur-md bg-black/50 px-2 sm:px-4 overflow-y-auto">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg my-8 sm:my-10">
        <div className="flex justify-between items-center px-4 sm:px-6 py-3 sm:py-4 bg-gray-100 border-b">
          <h2 className="text-lg sm:text-xl font-semibold mt-10 md:mt-0">
            Book Appointment at {selectedStore?.name || ""}
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

        <form
          onSubmit={handleSubmit}
          className="p-4 sm:p-6 grid gap-4 grid-cols-1 sm:grid-cols-2"
        >
          <div className="w-full">
            <label
              htmlFor="package"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Package:
            </label>
            <select
              id="package"
              name="package"
              value={formData.package}
              onChange={handleChange}
              disabled={formData.services.length > 0}
              required={!isPackageSelected && formData.services.length === 0}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#D1BB9E]"
            >
              <option value="">Select Package</option>
              {selectedStore?.packages?.map((pkg) => (
                <option key={pkg._id} value={pkg._id}>
                  {pkg.packageName} - ₹{pkg.amount}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full">
            <label
              htmlFor="specialist"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Specialist:
            </label>
            <select
              id="specialist"
              name="specialist"
              value={formData.specialist}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#D1BB9E]"
            >
              <option value="">Select Specialist</option>
              {specialists && specialists.length > 0 ? (
                specialists.map((specialist) => (
                  <option key={specialist._id} value={specialist._id}>
                    {specialist.fullName}
                  </option>
                ))
              ) : (
                <option value="" disabled>
                  No specialists available for this store
                </option>
              )}
            </select>
          </div>

          <div className="w-full">
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Date:
            </label>
            <input
              id="date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              min={new Date().toISOString().split("T")[0]}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#D1BB9E]"
            />
          </div>

          <div className="w-full">
            <label
              htmlFor="timeSlot"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Time Slot:
            </label>
            <select
              id="timeSlot"
              name="timeSlot"
              value={formData.timeSlot}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#D1BB9E]"
            >
              <option value="">Select Time Slot</option>
              {timeSlots.length > 0 ? (
                timeSlots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))
              ) : (
                <option value="" disabled>
                  No time slots available
                </option>
              )}
            </select>
          </div>

          <div className="col-span-1 sm:col-span-2">
            <label
              htmlFor="services"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Services:
            </label>
            <div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2"
              style={{ maxHeight: "200px", overflowY: "auto" }} // Add fixed height and scroll
            >
              {storeServices && storeServices.length > 0 ? (
                storeServices.map((service) => (
                  <div key={service._id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`service-${service._id}`}
                      name="services"
                      value={service._id}
                      onChange={handleChange}
                      disabled={formData.package !== ""}
                      checked={formData.services.includes(service._id)}
                      className="mr-2"
                    />
                    <label
                      htmlFor={`service-${service._id}`}
                      className="text-sm text-gray-700"
                    >
                      {service.serviceName} - ₹{service.price}
                    </label>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500 col-span-full">
                  No services available for this store
                </p>
              )}
            </div>
          </div>

          <div className="col-span-full mt-4">
            <button
              type="submit"
              disabled={bookingLoading}
              className="w-full py-3 px-4 text-white font-semibold bg-[#D1BB9E] hover:bg-gray-800 transition-colors rounded cursor-pointer disabled:bg-gray-400"
            >
              {bookingLoading ? "Processing..." : "Confirm Booking"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BookingComponent;
