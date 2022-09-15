interface IButton {
  title: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  variant?: "red" | "purple" | "lightPurple" | "white";
}

const Button: React.FC<IButton> = ({
  title,
  onClick = () => {},
  disabled,
  className,
  variant = "purple",
}) => {
  const buttonVariant = {
    red: `text-white bg-red-600 ${!disabled && "hover:bg-red-700"}`,
    purple: `text-white bg-indigo-600 ${!disabled && "hover:bg-indigo-700"}`,
    lightPurple: `text-indigo-700 bg-indigo-100 ${
      !disabled && "hover:bg-indigo-200"
    }`,
    white: `text-black bg-white`,
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`disabled:opacity-50 disabled:cursor-not-allowed xs:px-8 xs:py-3 border rounded-md text-base font-medium ${buttonVariant[variant]} ${className}`}
    >
      {title}
    </button>
  );
};

export default Button;
