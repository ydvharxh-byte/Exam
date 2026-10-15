import React from "react";

interface KvsLogoProps {
  className?: string;
  variant?: "light" | "dark";
  showSubtitle?: boolean;
}

export const KvsLogo: React.FC<KvsLogoProps> = ({
  className = "",
  variant = "dark",
  showSubtitle = true
}) => {
  const isLight = variant === "light";
  const primaryColor = isLight ? "#FFFFFF" : "#11382B";
  const subtitleColor = isLight ? "#D5E5DB" : "#566C60";

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Symmetrical Open Book + Sprouting Laurel Leaves Icon */}
      <div className="relative w-10 h-10 flex items-center justify-center shrink-0">
        <svg
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-10 h-10"
        >
          {/* Leaves sprouting upward */}
          <path
            d="M22 6C22 6 20 11 22 15C24 11 22 6 22 6Z"
            fill={primaryColor}
          />
          <path
            d="M17 9C17 9 17.5 13.5 20.5 16.5C20.5 13 17 9 17 9Z"
            fill={primaryColor}
          />
          <path
            d="M27 9C27 9 26.5 13.5 23.5 16.5C23.5 13 27 9 27 9Z"
            fill={primaryColor}
          />
          <path
            d="M13 13C13 13 15 17 19.5 18.5C18 15 13 13 13 13Z"
            fill={primaryColor}
          />
          <path
            d="M31 13C31 13 29 17 24.5 18.5C26 15 31 13 31 13Z"
            fill={primaryColor}
          />
          <path
            d="M10 18C10 18 13.5 20.5 18.5 21C16 18 10 18 10 18Z"
            fill={primaryColor}
          />
          <path
            d="M34 18C34 18 30.5 20.5 25.5 21C28 18 34 18 34 18Z"
            fill={primaryColor}
          />

          {/* Open Book Wings */}
          <path
            d="M22 25C17.5 23.5 11 23 6 25V35C11 33 17.5 33.5 22 36C26.5 33.5 33 33 38 35V25C33 23 26.5 23.5 22 25Z"
            fill={primaryColor}
          />
          {/* Central spine divider */}
          <path
            d="M22 25V36"
            stroke={isLight ? "#11382B" : "#F8F9F5"}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          {/* Subtle page lines */}
          <path
            d="M9 28C13 26.5 17.5 27 20 28"
            stroke={isLight ? "#11382B" : "#FFFFFF"}
            strokeWidth="0.8"
            strokeLinecap="round"
          />
          <path
            d="M35 28C31 26.5 26.5 27 24 28"
            stroke={isLight ? "#11382B" : "#FFFFFF"}
            strokeWidth="0.8"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Typography */}
      <div className="flex flex-col">
        <span
          className="text-lg sm:text-xl font-bold tracking-wider font-serif-title leading-tight"
          style={{ color: primaryColor }}
        >
          ADMINISTRATIVE EXAM
        </span>
        {showSubtitle && (
          <span
            className="text-[10px] sm:text-[11px] font-medium tracking-widest uppercase mt-0.5"
            style={{ color: subtitleColor }}
          >
            Learn • Prepare • Lead
          </span>
        )}
      </div>
    </div>
  );
};
