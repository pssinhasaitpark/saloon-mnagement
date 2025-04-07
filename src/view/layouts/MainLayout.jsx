import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  openSearchPopup,
  closeSearchPopup,
  setLocation,
  setSearchRadius,
} from "../redux/slices/searchSlice";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";

const MainLayout = () => {
  const dispatch = useDispatch();
  const isPopupOpen = useSelector((state) => state.search.isPopupOpen);
  const location = useSelector((state) => state.search.location);
  const searchRadius = useSelector((state) => state.search.searchRadius);
  // console.log("location:", location);

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/* Navbar */}
      <Navbar setShowSearchPopup={() => dispatch(openSearchPopup())} />

      {/* Main Content */}
      <main className="flex-1 w-full">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />

      {/* Search Popup */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity duration-300">
          <div className="search-popup bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all duration-300 scale-100">
            {/* Header */}
            <div className="p-5 bg-gradient-to-r from-[#D1BB9E]/70 to-[#D1BB9E]/40 border-b border-[#D1BB9E]/30 flex justify-between items-center">
              <h3 className="text-xl font-semibold text-[#5A3E2B]">
                Find Salons Near You
              </h3>
              <button
                onClick={() => dispatch(closeSearchPopup())}
                className="text-[#5A3E2B] hover:text-[#7D5D43] bg-white/40 hover:bg-white/60 rounded-full p-1.5 transition-colors duration-200"
                aria-label="Close"
              >
                ✖
              </button>
            </div>

            {/* Location Input */}
            <div className="p-6 space-y-5">
              <label className="block text-sm font-medium text-[#5A3E2B]">
                Your Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => dispatch(setLocation(e.target.value))}
                placeholder="Enter area or postal code"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7D5D43] focus:border-transparent shadow-sm"
              />

              {/* Search Radius */}
              <label className="block text-sm font-medium text-[#5A3E2B]">
                Search Radius
              </label>
              <input
                type="range"
                min="1"
                max="50"
                value={searchRadius}
                onChange={(e) =>
                  dispatch(setSearchRadius(Number(e.target.value)))
                }
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#7D5D43]"
              />
              <p className="text-sm text-[#5A3E2B]">
                Radius: {searchRadius} km
              </p>

              {/* Search Button */}
              <button
                className="w-full bg-gradient-to-r from-[#7D5D43] to-[#5A3E2B] hover:from-[#5A3E2B] hover:to-[#7D5D43] text-white font-medium py-3 px-4 rounded-lg transition-colors duration-300"
                onClick={() => dispatch(closeSearchPopup())}
              >
                Search Salons
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainLayout;
