import React from "react";

interface IButton {
  title: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  variant?: "red" | "purple" | "lightPurple" | "white" | "green";
}

const Button: React.FC<IButton & React.PropsWithChildren> = ({
  title,
  onClick = () => {},
  disabled,
  className,
  variant = "purple",
  children,
}) => {
  const buttonVariant = {
    red: `text-white bg-red-600 ${!disabled && "hover:bg-red-700"}`,
    purple: `text-white bg-indigo-600 ${!disabled && "hover:bg-indigo-700"}`,
    green: `text-white bg-green-600 ${!disabled && "hover:bg-green-700"}`,
    lightPurple: `text-indigo-700 bg-indigo-100 ${
      !disabled && "hover:bg-indigo-200"
    }`,
    white: `text-black bg-white`,
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`cursor:pointer disabled:opacity-50 disabled:cursor-not-allowed xs:px-4 xs:py-3 p-1 border rounded-md text-base font-medium ${buttonVariant[variant]} ${className}`}
    >
      {children ?? title}
    </button>
  );
};

export default Button;
