const LoaderSize = {
  sm: "w-6 h-6",
  md: "w-8 h-8",
  lg: "w-12 h-12",
};

const Loader: React.FC<{
  size: "sm" | "md" | "lg";
}> = ({ size }) => {
  return (
    <div className={`sk-fading-circle ${LoaderSize[size]}`}>
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={`dot-${i}`} className={`sk-circle${i + 1} sk-circle`} />
      ))}
    </div>
  );
};

export default Loader;
