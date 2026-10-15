import React from "react";

interface UpscEmblemProps {
  className?: string;
  size?: number;
  variant?: "gold" | "navy" | "white" | "monochrome";
}

export const UpscEmblem: React.FC<UpscEmblemProps> = ({
  className = "",
  size = 36,
  variant = "gold"
}) => {
  const primaryColor =
    variant === "gold"
      ? "#C98A2C"
      : variant === "navy"
      ? "#0F1E36"
      : variant === "white"
      ? "#FFFFFF"
      : "currentColor";

  const secondaryColor =
    variant === "gold"
      ? "#E5A93C"
      : variant === "navy"
      ? "#1E3A5F"
      : variant === "white"
      ? "#E2E8F0"
      : "currentColor";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
    >
      {/* Outer Imperial Ring with ornamental dots */}
      <circle cx="24" cy="24" r="22" stroke={primaryColor} strokeWidth="2" strokeDasharray="1 3" />
      <circle cx="24" cy="24" r="20" stroke={primaryColor} strokeWidth="1" opacity="0.6" />
      
      {/* Inner Ashoka Chakra Circle */}
      <circle cx="24" cy="24" r="14" stroke={secondaryColor} strokeWidth="1.5" />
      
      {/* 24-spoke Ashoka Chakra stylized rays */}
      <g stroke={secondaryColor} strokeWidth="1" strokeLinecap="round" opacity="0.85">
        <line x1="24" y1="10" x2="24" y2="38" />
        <line x1="10" y1="24" x2="38" y2="24" />
        <line x1="14.1" y1="14.1" x2="33.9" y2="33.9" />
        <line x1="14.1" y1="33.9" x2="33.9" y2="14.1" />
        <line x1="19" y1="10.7" x2="29" y2="37.3" />
        <line x1="29" y1="10.7" x2="19" y2="37.3" />
        <line x1="10.7" y1="19" x2="37.3" y2="29" />
        <line x1="10.7" y1="29" x2="37.3" y2="19" />
      </g>

      {/* Central Hub */}
      <circle cx="24" cy="24" r="4.5" fill={primaryColor} />
      <circle cx="24" cy="24" r="2" fill="#FFFFFF" opacity="0.9" />

      {/* Laurel leaves on bottom */}
      <path
        d="M12 36C15 40 20 42 24 42C28 42 33 40 36 36"
        stroke={primaryColor}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="15" cy="38" r="1" fill={secondaryColor} />
      <circle cx="20" cy="41" r="1" fill={secondaryColor} />
      <circle cx="28" cy="41" r="1" fill={secondaryColor} />
      <circle cx="33" cy="38" r="1" fill={secondaryColor} />
    </svg>
  );
};
