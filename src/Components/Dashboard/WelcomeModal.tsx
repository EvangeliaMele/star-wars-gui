import Image from "next/image";
import { useEffect, useState } from "react";

const WelcomeModal = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show modal only once and persisted in localStorage after first dismiss
    const hasSeenWelcome = localStorage.getItem("hasSeenWelcome");
    if (!hasSeenWelcome) {
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    localStorage.setItem("hasSeenWelcome", "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={handleDismiss}
      />

      <div className="relative z-10 w-full max-w-lg bg-slate-900/90 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden">
        <div className="relative h-56 w-full overflow-hidden">
          <Image
            src="/images/welcome-baby-yoda.png"
            alt="Welcome"
            fill
            className="object-cover opacity-80"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/90" />
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500 z-20" />
        </div>

        <div className="px-8 py-6">
          <p className="text-red-500 text-xs font-semibold tracking-widest mb-2">
            In a galaxy far, far away... a company called Up Hellas was
            searching for a developer strong enough to join their ranks
          </p>

          <button
            onClick={handleDismiss}
            className="w-full py-3 rounded-lg bg-red-500 hover:bg-red-400 text-white text-sm font-semibold tracking-wide transition-all duration-200"
          >
            The chosen one has arrived!
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeModal;
