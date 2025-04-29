import React from "react";
import { AuthForm } from "../../components/index.js";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/slices/userauthSlice.js";

function Login({ openDialog, setopenDialog, setregistered }) {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);
  // console.log("User:", user);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const data = Object.fromEntries(form.entries());

    dispatch(loginUser(data))
      .unwrap()
      .then(() => {
        alert("Loggin Successfully!");
        setopenDialog(false);
        setregistered(true);
      })
      .catch((err) => {
        console.error("Loggin failed:", err);
        alert("Loggin failed. Please try again.");
      });
  };

  if (!openDialog) return null;

  return (
    <AuthForm
      title="Loggin"
      fields={[
        { label: "Email", name: "emailOrMobile", type: "email" },

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
