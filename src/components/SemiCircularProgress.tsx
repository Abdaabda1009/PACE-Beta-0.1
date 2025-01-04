import React from 'react';

interface SemiCircularProgressProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  children?: React.ReactNode;
}

export const SemiCircularProgress: React.FC<SemiCircularProgressProps> = ({
  percentage,
  size = 200,
  strokeWidth = 15,
  children,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * Math.PI;
  const progress = (percentage / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size / 2 }}>
      <svg
        width={size}
        height={size / 2}
        className="transform -rotate-180"
      >
        <path
          d={`M ${strokeWidth / 2} ${size / 2} 
              A ${radius} ${radius} 0 0 1 ${size - strokeWidth / 2} ${size / 2}`}
          fill="none"
          stroke="#1e40af20"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        <path
          d={`M ${strokeWidth / 2} ${size / 2} 
              A ${radius} ${radius} 0 0 1 ${size - strokeWidth / 2} ${size / 2}`}
          fill="none"
          stroke="#3b82f6"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={`${progress} ${circumference}`}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center" style={{ marginTop: '10px' }}>
        {children}
      </div>
    </div>
  );
};