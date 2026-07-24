import React from 'react';

interface LogoProps {
  variant?: 'header_yellow' | 'dark' | 'light' | 'compact';
  className?: string;
  showTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'header_yellow',
  className = '',
  showTagline = true,
}) => {
  // Brand Colors:
  // Primary Navy Blue: #0D1B2A / #1B263B
  // Vibrant Yellow Accent: #FFE600 (Mercado Libre signature yellow)
  // Gold/Amber speed streak: #F59E0B

  const isYellowHeader = variant === 'header_yellow';
  const isDark = variant === 'dark';

  const textColor = isYellowHeader
    ? 'text-[#0D1B2A]'
    : isDark
    ? 'text-white'
    : 'text-[#0D1B2A]';

  const accentBadgeBg = isYellowHeader
    ? 'bg-[#0D1B2A] text-[#FFE600]'
    : 'bg-[#FFE600] text-[#0D1B2A]';

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Icon Emblem: Stylized Speed Car + 'A' Emblem */}
      <div className="relative flex items-center justify-center">
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center shadow-md font-bold transition-transform hover:scale-105 ${accentBadgeBg}`}>
          <svg
            className="w-6 h-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Speed car front grille & hood contour */}
            <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9C1.4 11.4 1 12.2 1 13v3c0 .6.4 1 1 1h2" />
            <circle cx="7" cy="17" r="2" />
            <circle cx="17" cy="17" r="2" />
            {/* Speed wing emblem */}
            <path d="M9 11l2-4h3l2 4" />
          </svg>
        </div>
      </div>

      {/* Text Brandmark */}
      <div className="flex flex-col leading-none">
        <div className="flex items-baseline gap-1">
          <span className={`text-2xl font-black tracking-tight ${textColor}`}>
            auto<span className="text-[#3483FA]">plaza</span>
          </span>
          <span className="text-[10px] font-extrabold uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#3483FA] text-white">
            Autos
          </span>
        </div>
        {showTagline && (
          <span className={`text-[10px] font-medium tracking-wide mt-0.5 ${isYellowHeader ? 'text-gray-800' : isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Mercado de Vehículos
          </span>
        )}
      </div>
    </div>
  );
};
