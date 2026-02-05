// src/features/auth/components/LoginForm.tsx
import React from "react";
import { Formik, Form, Field, FormikHelpers, FormikProps } from "formik";
import * as Yup from "yup";
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
  const initialValues: LoginFormValues = { username: "", password: "" };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = (
    values: LoginFormValues,
    { setSubmitting }: FormikHelpers<LoginFormValues>
  ) => {
    console.log("Login values:", values);
    setSubmitting(false);
    // TODO: call login API
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
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
            />
            {errors.username && touched.username && (
              <div className="text-red-500 text-sm">{errors.username}</div>
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

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Logging in..." : "Login"}
            </Button>

            <div className="text-right mt-2">
              <button
                type="button"
                className="text-blue-500 underline text-sm"
                onClick={onForgotPassword}
              >
                Forgot Password?
              </button>
            </div>

            <div className="text-center mt-4 text-gray-600 text-sm">
              Don’t have an account?{" "}
              <button
                type="button"
                className="text-blue-500 underline"
                onClick={onSwitchToSignup}
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
