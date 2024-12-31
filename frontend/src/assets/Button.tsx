interface ButtonProps {
  label: string;
  disabled: boolean;
  onClick: () => void;
  loading?: boolean;
}

function Button({ label, disabled, onClick, loading }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full font-bold bg-primary hover:bg-secondary p-2 sm:p-3 ${
        disabled && "cursor-not-allowed"
      }`}
    >
      {loading ? "Loading..." : label}
    </button>
  );
}

export default Button;
