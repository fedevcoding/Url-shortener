export const Loader = ({ size = "sm" }: { size?: "sm" | "lg" }) => {
  return <span className={`loader ${size}`}></span>;
};
