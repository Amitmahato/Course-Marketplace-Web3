interface IButton {
  title: string;
  onClick?: () => void;
  disabled?: boolean;
}

const Button: React.FC<IButton> = ({ title, onClick = () => {}, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="disabled:opacity-50 disabled:cursor-not-allowed px-8 py-3 border rounded-md text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
    >
      {title}
    </button>
  );
};

export default Button;
