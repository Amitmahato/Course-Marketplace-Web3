interface IButton {
  title: string;
  onClick: () => void;
}

const Button: React.FC<IButton> = ({ title, onClick }) => {
  return (
    <button onClick={onClick}>
      <a className="px-8 py-3 border rounded-md text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
        {title}
      </a>
    </button>
  );
};

export default Button;
