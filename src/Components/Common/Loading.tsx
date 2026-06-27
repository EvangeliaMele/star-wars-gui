import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface LoadingProps {
  text?: string;
}

const Loading = ({ text }: LoadingProps) => {
  // Waits for browser to be ready before rendering the portal
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[1000] bg-slate-900/50 backdrop-blur-sm flex flex-col items-center justify-center pointer-events-auto">
      {text && (
        <p className="mb-4 text-white text-lg font-medium tracking-wide">
          {text}
        </p>
      )}
      <div className="animate-spin border-4 border-red-500 border-t-transparent rounded-full w-16 h-16" />
    </div>,
    document.body,
  );
};

export default Loading;
