import React from "react";
import { AuthForm } from "../../components/index.js";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/slices/userauthSlice.js";

function Register({ openDialog, setopenDialog, setregistered }) {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);
  // console.log("User:", user);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const data = Object.fromEntries(form.entries());

    dispatch(registerUser(data))
      .unwrap()
      .then(() => {
        alert("Registered Successfully!");
        setopenDialog(false);
        setregistered(true);
      })
      .catch((err) => {
        console.error("Registration failed:", err);
        alert("Registration failed. Please try again.");
      });
  };

  if (!openDialog) return null;

  return (
    <AuthForm
      title="Register"
      fields={[
        { label: "Full Name", name: "fullName", type: "text" },
        { label: "Email", name: "email", type: "email" },
        {
          label: "Mobile No.",
          name: "mobile",
          type: "tel",
          pattern: "[0-9]{10}",
        },
        { label: "Password", name: "password", type: "password" },
      ]}
      onSubmit={handleSubmit}
      onClose={() => setopenDialog(false)}
      footerLink={{
        text: "Already have an account?",
        linkText: "Login here",
      }}
      setregistered={setregistered}
    />
  );
}

export default Register;
