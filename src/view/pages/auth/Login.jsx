import React, { useState } from "react";
import { AuthForm } from "../../components/index.js";

function Login({ openDialog, setopenDialog, setregistered }) {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const data = Object.fromEntries(form.entries());
    setFormData(data);

    console.log("Login Data Submitted:", data);
    alert("Logged in Successfully!");
    setopenDialog(false);
  };

  if (!openDialog) return null;

  return (
    <AuthForm
      title="Login"
      fields={[
        { label: "Email", name: "email", type: "email" },
        { label: "Phone", name: "phone", type: "tel", pattern: "[0-9]{10}" },
        { label: "Password", name: "password", type: "password" },
      ]}
      onSubmit={handleSubmit}
      onClose={() => setopenDialog(false)}
      footerLink={{
        text: "Not registered yet?",
        linkText: "Register here",
      }}
      setregistered={setregistered}
    />
  );
}

export default Login;
