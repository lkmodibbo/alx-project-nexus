// src/features/auth/components/ForgotPasswordForm.tsx
import React from "react";
import { Formik, Form, Field, FormikHelpers, FormikProps } from "formik";
import * as Yup from "yup";
import Button from "ui/Button";

interface ForgotPasswordValues {
  email: string;
}

interface Props {
  onBackToLogin: () => void;
}

const ForgotPasswordForm: React.FC<Props> = ({ onBackToLogin }) => {
  const initialValues: ForgotPasswordValues = { email: "" };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  const handleSubmit = (
    values: ForgotPasswordValues,
    { setSubmitting }: FormikHelpers<ForgotPasswordValues>
  ) => {
    console.log("Forgot password email:", values.email);
    setSubmitting(false);
    // TODO: call forgot password API
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched }: FormikProps<ForgotPasswordValues>) => (
          <Form className="flex flex-col gap-4">
            <Field
              type="email"
              name="email"
              placeholder="Enter your email"
              className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && touched.email && (
              <div className="text-red-500 text-sm">{errors.email}</div>
            )}

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send Reset Link"}
            </Button>

            <div className="text-center mt-2 text-sm">
              <button
                type="button"
                className="text-blue-500 underline"
                onClick={onBackToLogin}
              >
                Back to Login
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ForgotPasswordForm;
