// src/features/auth/components/LoginForm.tsx
import React, { useState } from "react";
import { Formik, Form, Field, FormikHelpers, FormikProps } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useAuth } from "context/AuthContext";
import { authService } from "services/authService";
import Button from "ui/Button";

interface LoginFormValues {
  username: string;
  password: string;
}

interface Props {
  onSwitchToSignup: () => void;
  onForgotPassword: () => void;
}

const LoginForm: React.FC<Props> = ({ onSwitchToSignup, onForgotPassword }) => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [apiError, setApiError] = useState<string | null>(null);
  const [unverified, setUnverified] = useState<{
    user: { id: number; username: string; email: string; name: string };
    token: string;
  } | null>(null);
  const [resendMessage, setResendMessage] = useState<string | null>(null);

  const initialValues: LoginFormValues = { username: "", password: "" };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (
    values: LoginFormValues,
    { setSubmitting }: FormikHelpers<LoginFormValues>
  ) => {
    try {
      setApiError(null);
      const response = await authService.login(values.username, values.password);

      // After successful token obtain, check user's email verification status
      try {
        const profile = await authService.getUserProfile(response.access, response.user.id);
        const verified =
          profile?.is_verified ?? profile?.email_verified ?? profile?.verified ?? profile?.is_active ?? false;

        if (!verified) {
          // Keep the returned token and user so we can resend verification or re-check status
          setUnverified({ user: response.user, token: response.access });
          setApiError("Please verify your email address before logging in. Check your inbox for the verification link.");
          setSubmitting(false);
          return;
        }
      } catch (err) {
        console.error("Failed to fetch user profile after login:", err);
        setApiError("Unable to confirm account verification status. Please try again later.");
        setSubmitting(false);
        return;
      }

      // Store auth data and redirect
      login(response.access, response.user);

      const referredFrom = localStorage.getItem("referredFrom");
      if (referredFrom === "checkout") {
        localStorage.removeItem("referredFrom");
        navigate("/checkout");
      } else {
        navigate("/");
      }
    } catch (error) {
      setApiError("Invalid username or password");
      console.error("Login error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleResendVerification = async () => {
    if (!unverified) return;
    setResendMessage(null);
    try {
      await authService.resendVerification(unverified.token, unverified.user.id);
      setResendMessage("Verification email resent. Please check your inbox.");
    } catch (err) {
      console.error("Resend verification failed:", err);
      setResendMessage("Failed to resend verification email. Try again later.");
    }
  };

  const handleCheckVerified = async () => {
    if (!unverified) return;
    try {
      const profile = await authService.getUserProfile(unverified.token, unverified.user.id);
      const verified = profile?.is_verified ?? profile?.email_verified ?? profile?.verified ?? profile?.is_active ?? false;
      if (verified) {
        // Persist login and redirect
        login(unverified.token, unverified.user);
        const referredFrom = localStorage.getItem("referredFrom");
        if (referredFrom === "checkout") {
          localStorage.removeItem("referredFrom");
          navigate("/checkout");
        } else {
          navigate("/");
        }
      } else {
        setResendMessage("Email still not verified. Check your inbox or resend the email.");
      }
    } catch (err) {
      console.error("Check verification failed:", err);
      setResendMessage("Unable to confirm verification status. Try again later.");
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      {apiError && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-600 text-sm">
          {apiError}
        </div>
      )}
      {unverified && (
        <div className="mb-4 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <button
              onClick={handleResendVerification}
              className="px-3 py-2 bg-blue-500 text-white rounded text-sm"
            >
              Resend verification email
            </button>
            <button
              onClick={handleCheckVerified}
              className="px-3 py-2 bg-green-500 text-white rounded text-sm"
            >
              I verified — check status
            </button>
          </div>
          {resendMessage && (
            <div className="text-sm text-gray-700">{resendMessage}</div>
          )}
        </div>
      )}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched }: FormikProps<LoginFormValues>) => (
          <Form className="flex flex-col gap-4">
            <Field
              type="text"
              name="username"
              placeholder="Username or Email"
              className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isSubmitting}
            />
            {errors.username && touched.username && (
              <div className="text-red-500 text-sm">{errors.username}</div>
            )}

            <Field
              type="password"
              name="password"
              placeholder="Password"
              className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isSubmitting}
            />
            {errors.password && touched.password && (
              <div className="text-red-500 text-sm">{errors.password}</div>
            )}

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Logging in..." : "Login"}
            </Button>

            <div className="text-right mt-2">
              <button
                type="button"
                className="text-blue-500 underline text-sm hover:text-blue-600 disabled:opacity-50"
                onClick={onForgotPassword}
                disabled={isSubmitting}
              >
                Forgot Password?
              </button>
            </div>

            <div className="text-center mt-4 text-gray-600 text-sm">
              Don’t have an account?{" "}
              <button
                type="button"
                className="text-blue-500 underline hover:text-blue-600 disabled:opacity-50"
                onClick={onSwitchToSignup}
                disabled={isSubmitting}
              >
                Sign up
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default LoginForm;
