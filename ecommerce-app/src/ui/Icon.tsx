import React from "react";
import { IconType } from "react-icons";

interface Props {
  icon: IconType; // This is the type for react-icons
  size?: number;
  color?: string;
  className?: string;
}

const Icon: React.FC<Props> = ({ icon: IconComponent, size = 24, color = "currentColor", className }) => {
  // Make sure IconComponent exists before rendering
  if (!IconComponent) return null;

  return <IconComponent size={size} color={color} className={className} />;
};

export default Icon;
