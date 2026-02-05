// src/features/auth/pages/AuthPage.tsx
import React, { useState } from "react";
import LoginForm from "./Login";
import SignupForm from "./Signup";
import ForgotPasswordForm from "./ForgotPassword";

export default function AuthPage() {
  const [activeForm, setActiveForm] = useState<"login" | "signup" | "forgot">(
    "login"
  );

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        {activeForm === "login" && (
          <LoginForm
            onSwitchToSignup={() => setActiveForm("signup")}
            onForgotPassword={() => setActiveForm("forgot")}
          />
        )}
        {activeForm === "signup" && (
          <SignupForm onSwitchToLogin={() => setActiveForm("login")} />
        )}
        {activeForm === "forgot" && (
          <ForgotPasswordForm onBackToLogin={() => setActiveForm("login")} />
        )}
      </div>
    </div>
  );
}
