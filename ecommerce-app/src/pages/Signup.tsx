import React from "react";
import Button from "ui/Button";

const Signup: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <form className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Email"
            className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button type="submit">Sign Up</Button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
