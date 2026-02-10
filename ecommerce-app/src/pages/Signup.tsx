// src/features/auth/components/SignupForm.tsx
import React, { useState } from "react";
import { Formik, Form, Field, FormikHelpers, FormikProps } from "formik";
import * as Yup from "yup";
import { authService } from "services/authService";
import Button from "ui/Button";

interface SignupFormValues {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

interface Props {
  onSwitchToLogin: () => void;
  onSignupSuccess: (payload: { message: string; userId?: number; email?: string }) => void;
}

const SignupForm: React.FC<Props> = ({ onSwitchToLogin, onSignupSuccess }) => {
  const [apiError, setApiError] = useState<string | null>(null);

  const initialValues: SignupFormValues = {
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    fullName: Yup.string().required("Full name is required"),
    email: Yup.string()
      .email("Invalid email")
      .matches(
        /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
        "Please enter a valid email without spaces"
      )
      .required("Email is required"),
    phone: Yup.string()
      .matches(/^\+?\d{10,15}$/, "Phone number must be valid")
      .required("Phone number is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),
  });

  const handleSubmit = async (
    values: SignupFormValues,
    { setSubmitting, resetForm }: FormikHelpers<SignupFormValues>
  ) => {
    try {
      setApiError(null);

      // Call the register API
      const reg = await authService.register(
        values.email.split("@")[0], // Use email prefix as username
        values.email,
        values.password,
        values.fullName
      );

      // Try to ensure a verification email is sent (backend may already do this)
      try {
        if (reg?.id) {
          await authService.resendVerification(null, reg.id);
        }
      } catch (err) {
        // Non-fatal: backend might already have sent email or endpoint may not exist
        console.warn("resendVerification failed after register:", err);
      }

      // Clear form
      resetForm();

      // Show success message and provide userId/email for resend actions
      onSignupSuccess({
        message: "Account created. Verification email sent — please check your inbox.",
        userId: reg?.id,
        email: reg?.email,
      });
    } catch (error) {
      console.error("Signup error:", error);
      const msg = error instanceof Error ? error.message : String(error);
      setApiError(msg || "Failed to create account. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
      {apiError && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-600 text-sm">
          {apiError}
        </div>
      )}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched }: FormikProps<SignupFormValues>) => (
          <Form className="flex flex-col gap-4">
            <Field
              type="text"
              name="fullName"
              placeholder="Full Name"
              className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isSubmitting}
            />
            {errors.fullName && touched.fullName && (
              <div className="text-red-500 text-sm">{errors.fullName}</div>
            )}

            <Field
              type="email"
              name="email"
              placeholder="Email"
              disabled={isSubmitting}
              className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && touched.email && (
              <div className="text-red-500 text-sm">{errors.email}</div>
            )}

            <Field
              type="text"
              name="phone"
              disabled={isSubmitting}
              placeholder="Phone Number"
              className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.phone && touched.phone && (
              <div className="text-red-500 text-sm">{errors.phone}</div>
            )}

            <Field
              type="password"
              name="password"
              disabled={isSubmitting}
              placeholder="Password"
              className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && touched.password && (
              <div className="text-red-500 text-sm">{errors.password}</div>
            )}

            <Field
              type="password"
              name="confirmPassword"
              disabled={isSubmitting}
              placeholder="Confirm Password"
              className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.confirmPassword && touched.confirmPassword && (
              <div className="text-red-500 text-sm">{errors.confirmPassword}</div>
            )}

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating Account..." : "Sign Up"}
            </Button>

            <div className="text-center mt-4 text-gray-600 text-sm">
              Already have an account?{" "}
              <button
                type="button"
                className="text-blue-500 underline hover:text-blue-600 disabled:opacity-50"
                onClick={onSwitchToLogin}
                disabled={isSubmitting}
              >
                Login
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default SignupForm;
