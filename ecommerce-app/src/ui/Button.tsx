import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  className = "",
  children,
  ...props
}) => {
  const baseClasses =
    "px-4 py-2 rounded-lg font-medium transition-all duration-300 focus:outline-none";

  const variantClasses =
    variant === "primary"
      ? "bg-orange-500 text-white hover:bg-orange-600"
      : "bg-orange-200 text-gray-900 hover:bg-orange-300";

  return (
    <button
      className={`${className} ${baseClasses} ${variantClasses}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
