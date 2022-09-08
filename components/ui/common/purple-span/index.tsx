const PurpleSpan: React.FC<React.PropsWithChildren> = ({
  children,
  ...rest
}) => {
  return (
    <span
      {...rest}
      className="disabled:opacity-50 disabled:cursor-not-allowed px-8 py-3 border rounded-md text-base font-medium text-white bg-indigo-600 "
    >
      {children}
    </span>
  );
};

export default PurpleSpan;
