type InputProps = {
  max?: number;
  min?: number;
  type?: string;
  name?: string;
  value?: number;
  placeholder?: string;
  onChange?: (value: string | number) => void;
};

function Input({
  max,
  min,
  type = "text",
  name,
  placeholder,
  value,
  onChange,
}: InputProps) {
  const change = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    event.preventDefault();
    if (onChange) onChange(value);
  };

  const keyDown: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (type === "number") {
      event.preventDefault();
    }
  };

  return (
    <input
      type={type}
      onChange={change}
      onKeyDown={keyDown}
      name={name}
      value={value}
      max={max}
      min={min}
      placeholder={placeholder}
      className="input focus:outline-none focus:shadow-outline"
    />
  );
}

export default Input;
