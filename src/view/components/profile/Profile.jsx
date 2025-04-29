import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser } from "../../redux/slices/adminauthslice";
import { FaUserCircle } from "react-icons/fa";

function Profile() {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.admin);

  useEffect(() => {
    if (!user) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch, user]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f7f3ed] to-[#e8dfd0] flex items-center justify-center px-4 py-10">
      <div className="max-w-xl w-full bg-white rounded-3xl shadow-2xl p-10">
        <div className="flex flex-col items-center mb-8">
          <FaUserCircle size={80} className="text-[#c2a188]" />
          <h1 className="text-3xl font-bold text-[#5A3E2B] mt-4">
            {user?.fullName || "User"}
          </h1>
          <p className="text-sm text-gray-500">{user?.role} Profile</p>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : user ? (
          <div className="space-y-6">
            <div className="border-b pb-4">
              <p className="text-sm text-gray-500">Full Name</p>
              <p className="text-lg font-medium text-[#333]">{user.fullName}</p>
            </div>
            <div className="border-b pb-4">
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-lg font-medium text-[#333]">{user.email}</p>
            </div>
            <div className="border-b pb-4">
              <p className="text-sm text-gray-500">Phone</p>
              <p className="text-lg font-medium text-[#333]">{user.mobile}</p>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-4">
            No user information available.
          </p>
        )}
      </div>
    </div>
  );
}

export default Profile;
