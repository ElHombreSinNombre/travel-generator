type SpinnerProps = {
  backgroundColor?: string;
};

function Spinner({ backgroundColor }: SpinnerProps) {
  return (
    <div
      className={`spinner align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] ${backgroundColor}`}
    />
  );
}
export default Spinner;
