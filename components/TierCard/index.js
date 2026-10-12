import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const TierCard = ({ emoji, name, price, perks, access, badge }) => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && theme === "dark";

  return (
    <div
      className={`flex flex-col gap-3 rounded-xl p-5 mob:p-6 border transition-all ease-out duration-300 ${
        access
          ? isDark
            ? "border-fuchsia-400/50 bg-gradient-to-b from-indigo-500/10 to-fuchsia-500/5"
            : "border-fuchsia-400 bg-gradient-to-b from-indigo-50 to-fuchsia-50"
          : isDark
          ? "border-white/15"
          : "border-black/10"
      }`}
    >
      <h3 className="text-2xl">
        {emoji} {name}
      </h3>
      <p className="text-lg opacity-60">{price}</p>
      <ul className="mt-1 grid gap-2">
        {perks.map((perk, index) => (
          <li key={index} className="text-base opacity-80 leading-snug">
            {perk}
          </li>
        ))}
      </ul>
      {access && (
        <span
          className={`mt-auto self-start text-xs tracking-wider rounded-full px-3 py-1 ${
            isDark ? "bg-white text-black" : "bg-black text-white"
          }`}
        >
          {badge}
        </span>
      )}
    </div>
  );
};

export default TierCard;
