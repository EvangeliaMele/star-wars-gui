import React from "react";
import Image from "next/image";

const Logo = () => {
  return (
    <div className="flex justify-center">
      <Image
        src="/images/lightsaber.png"
        alt="Star Wars"
        width={36}
        height={36}
        className="object-contain invert"
      />
    </div>
  );
};

export default Logo;
