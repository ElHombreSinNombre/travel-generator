type InputProps = {
  maxlength?: number
  minlength?: number
  max?: number
  min?: number
  type?: string
  name?: string
  value?: number | string | null
  required?: boolean
  placeholder?: string
  disabled?: boolean
  autofocus?: boolean
  onChange?: (value: string | number) => void
  onFocus?: () => void
}

function Input({
  max,
  min,
  autofocus,
  required = false,
  type = 'text',
  name,
  disabled,
  placeholder,
  maxlength,
  minlength,
  value = null,
  onChange,
  onFocus
}: InputProps) {
  const change = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    event.preventDefault()
    if (onChange) onChange(value)
  }

  const keyDown: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (type === 'number') {
      event.preventDefault()
    }
  }

  return (
    <input
      autoFocus={autofocus}
      disabled={disabled}
      onFocus={onFocus}
      required={required}
      type={type}
      onChange={change}
      onKeyDown={keyDown}
      name={name}
      value={value ?? ''}
      max={max}
      min={min}
      minLength={minlength}
      maxLength={maxlength}
      placeholder={placeholder}
      className='input'
    />
  )
}

export default Input
