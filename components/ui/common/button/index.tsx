interface IButton {
  title: string;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "purple" | "lightPurple";
}

const Button: React.FC<IButton> = ({
  title,
  onClick = () => {},
  disabled,
  variant = "purple",
}) => {
  const buttonVariant = {
    purple: "text-white bg-indigo-600 hover:bg-indigo-700",
    lightPurple: "text-indigo-700 bg-indigo-100 hover:bg-indigo-200",
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`disabled:opacity-50 disabled:cursor-not-allowed px-8 py-3 border rounded-md text-base font-medium ${buttonVariant[variant]}`}
    >
      {title}
    </button>
  );
};

export default Button;
