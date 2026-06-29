import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onValueChange?: (value: string) => void;
}

const Input = ({
  className = "",
  onValueChange,
  onChange,
  ...props
}: InputProps) => {
  const baseStyles =
    "block rounded-md border border-white/20 bg-slate-900/60 text-white placeholder-white/30 shadow-sm focus:ring-red-400 focus:border-red-400 focus:outline-none px-2";

  // Calls both our custom handler and the native input handler if provided
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onValueChange?.(e.target.value);
    onChange?.(e);
  };

  return (
    <input
      className={`${baseStyles} mt-1 py-2 text-md ${className}`}
      onChange={handleChange}
      {...props}
    />
  );
};

export default Input;
