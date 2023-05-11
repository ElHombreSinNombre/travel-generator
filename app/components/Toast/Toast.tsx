type ToastProps = {
  text: string;
  backgroundColor?: string;
};

function Toast({ text, backgroundColor = "primary" }: ToastProps) {
  return (
    <div className={`cursor-pointer toast ${backgroundColor}`}>{text}</div>
  );
}

export default Toast;
