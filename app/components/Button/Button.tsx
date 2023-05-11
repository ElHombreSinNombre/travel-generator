import Spinner from '@/components/Spinner/Spinner'

type ButtonProps = {
  loading?: boolean
  disabled?: boolean
  backgroundColor?: string
  text?: string
  type?: 'submit' | 'reset' | 'button'
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const Button = ({
  loading = false,
  type = 'submit',
  disabled = false,
  text = 'Save',
  backgroundColor = 'secondary',
  onClick
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
      {loading ? <Spinner /> : text}
    </button>
  )
}

export default Button
