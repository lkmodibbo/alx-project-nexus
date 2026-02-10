// src/features/auth/pages/AuthPage.tsx
import React, { useState } from "react";
import LoginForm from "./Login";
import SignupForm from "./Signup";
import ForgotPasswordForm from "./ForgotPassword";
import { authService } from "services/authService";

type SignupSuccessPayload = {
  message: string;
  userId?: number;
  email?: string;
};

export default function AuthPage() {
  const [activeForm, setActiveForm] = useState<"login" | "signup" | "forgot">("login");
  const [signupSuccess, setSignupSuccess] = useState<SignupSuccessPayload | null>(null);
  const [resendMessage, setResendMessage] = useState<string | null>(null);
  const [resending, setResending] = useState(false);

  const handleSignupSuccess = (payload: SignupSuccessPayload) => {
    setSignupSuccess(payload);
    // stay on success panel so user can resend or proceed to login
    setActiveForm("login");
  };

  const handleResend = async () => {
    if (!signupSuccess?.userId) return;
    setResending(true);
    setResendMessage(null);
    try {
      // If backend requires no auth for resend, call with null token
      await authService.resendVerification(null, signupSuccess.userId);
      setResendMessage("Verification email resent. Check your inbox.");
    } catch (err) {
      console.error("Resend failed:", err);
      setResendMessage("Failed to resend verification email. Try again later.");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        {signupSuccess && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded text-green-700 text-center">
            <div>✓ {signupSuccess.message}</div>
            {signupSuccess.email && (
              <div className="text-sm text-gray-700 mt-2">Verification sent to {signupSuccess.email}</div>
            )}
            <div className="mt-3 flex items-center justify-center gap-2">
              <button
                onClick={handleResend}
                disabled={resending}
                className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
              >
                {resending ? "Resending..." : "Resend verification"}
              </button>
              <button
                onClick={() => {
                  setSignupSuccess(null);
                  setResendMessage(null);
                }}
                className="px-3 py-1 bg-gray-100 text-gray-800 rounded text-sm"
              >
                Go to Login
              </button>
            </div>
            {resendMessage && <div className="text-sm text-gray-700 mt-2">{resendMessage}</div>}
          </div>
        )}

        {activeForm === "login" && (
          <LoginForm onSwitchToSignup={() => setActiveForm("signup")} onForgotPassword={() => setActiveForm("forgot")} />
        )}

        {activeForm === "signup" && (
          <SignupForm onSwitchToLogin={() => setActiveForm("login")} onSignupSuccess={handleSignupSuccess} />
        )}

        {activeForm === "forgot" && <ForgotPasswordForm onBackToLogin={() => setActiveForm("login")} />}
      </div>
    </div>
  );
}
