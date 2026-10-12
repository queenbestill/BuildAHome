import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const TierCard = ({
  emoji,
  name,
  price,
  perks,
  access,
  badge,
  href,
  cta,
}) => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && theme === "dark";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${name} (${price}): ${cta}`}
      className={`group flex flex-col gap-3 rounded-xl p-5 mob:p-6 border transition-all ease-out duration-300 hover:scale-[1.02] active:scale-100 link ${
        access
          ? isDark
            ? "border-fuchsia-400/50 bg-gradient-to-b from-indigo-500/10 to-fuchsia-500/5 hover:border-fuchsia-300"
            : "border-fuchsia-400 bg-gradient-to-b from-indigo-50 to-fuchsia-50 hover:border-fuchsia-600"
          : isDark
          ? "border-white/15 hover:border-white/50"
          : "border-black/10 hover:border-black/40"
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
      <div className="mt-auto pt-2 flex flex-col gap-3 items-start">
        {access && (
          <span
            className={`text-xs tracking-wider rounded-full px-3 py-1 ${
              isDark ? "bg-white text-black" : "bg-black text-white"
            }`}
          >
            {badge}
          </span>
        )}
        <span className="text-sm opacity-60 transition-opacity duration-300 group-hover:opacity-100">
          {cta} →
        </span>
      </div>
    </a>
  );
};

export default TierCard;
