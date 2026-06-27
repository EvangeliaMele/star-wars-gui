import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
  classNames?: string;
  text: string;
}

const Button = ({
  text,
  disabled = false,
  classNames = "",
  ...props
}: ButtonProps) => (
  <button
    disabled={disabled}
    className={`bg-red-500 hover:bg-red-400 text-sm text-white px-4 py-2 rounded-[10px] cursor-pointer ${classNames} ${
      disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : ""
    }`}
    {...props}
  >
    {text}
  </button>
);

export default Button;
