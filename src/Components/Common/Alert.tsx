import { useEffect } from "react";

interface AlertProps {
  message: string;
  type?: "success" | "error";
  onClose: () => void;
}

const Alert = ({ message, type = "success", onClose }: AlertProps) => {
  useEffect(() => {
    const timer = setTimeout(() => onClose(), 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed bottom-5 right-5 z-50 px-8 py-3 rounded-lg shadow-lg text-white
      ${type === "success" ? "bg-green-600" : "bg-red-600"}
      animate-[slideUp_0.6s_ease-out]`}
    >
      {message}
    </div>
  );
};

export default Alert;
