import Spinner from "../Spinner";

type ButtonProps = {
  loading?: boolean;
  disabled?: boolean;
  backgroundColor?: string;
  type?: "submit" | "reset" | "button";
  onClick?: () => void;
};

const Button = ({
  loading = false,
  type = "submit",
  disabled = false,
  backgroundColor = "secondary",
  onClick,
}: ButtonProps) => {
  return (
    <button
      type={type}
      disabled={loading || disabled}
      onClick={onClick}
      className={
        disabled
          ? `button ${backgroundColor} disabled:opacity-50 pointer-events-none`
          : loading
          ? `button ${backgroundColor} pointer-events-none  `
          : `button ${backgroundColor} hover:bg-indigo-500 `
      }
    >
      {loading ? <Spinner /> : "Generate"}
    </button>
  );
};

export default Button;
