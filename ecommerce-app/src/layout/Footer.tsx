import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 p-6 mt-10">
      <div className="container mx-auto text-center">
        <p>© {new Date().getFullYear()} E-Shop. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
