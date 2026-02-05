// src/features/auth/components/SignupForm.tsx
import React from "react";
import { Formik, Form, Field, FormikHelpers, FormikProps } from "formik";
import * as Yup from "yup";
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
}

const SignupForm: React.FC<Props> = ({ onSwitchToLogin }) => {
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

  const handleSubmit = (
    values: SignupFormValues,
    { setSubmitting }: FormikHelpers<SignupFormValues>
  ) => {
    console.log("Signup values:", values);
    setSubmitting(false);
    // TODO: call signup API
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
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
            />
            {errors.fullName && touched.fullName && (
              <div className="text-red-500 text-sm">{errors.fullName}</div>
            )}

            <Field
              type="email"
              name="email"
              placeholder="Email"
              className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && touched.email && (
              <div className="text-red-500 text-sm">{errors.email}</div>
            )}

            <Field
              type="text"
              name="phone"
              placeholder="Phone Number"
              className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.phone && touched.phone && (
              <div className="text-red-500 text-sm">{errors.phone}</div>
            )}

            <Field
              type="password"
              name="password"
              placeholder="Password"
              className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && touched.password && (
              <div className="text-red-500 text-sm">{errors.password}</div>
            )}

            <Field
              type="password"
              name="confirmPassword"
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
                className="text-blue-500 underline"
                onClick={onSwitchToLogin}
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
