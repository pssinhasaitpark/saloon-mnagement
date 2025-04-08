import React, { useState } from "react";
import { AuthForm } from "../../components/index.js";

function Register({ openDialog, setopenDialog, setregistered }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const data = Object.fromEntries(form.entries());
    setFormData(data);

    console.log("Register Data Submitted:", data);
    alert("Registered Successfully!");
    setopenDialog(false);
  };

  if (!openDialog) return null;

  return (
    <AuthForm
      title="Register"
      fields={[
        { label: "Name", name: "name", type: "text" },
        { label: "Email", name: "email", type: "email" },
        { label: "Phone", name: "phone", type: "tel", pattern: "[0-9]{10}" },
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
