import React from 'react';
import '../css/Fuelcircle.css';

const FuelCircle = ({ value }) => {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  const getColor = () => {
    if (value >= 75) return '#4caf50';
    if (value >= 40) return '#ff9800';
    return '#f44336';
  };

  return (
    <div className="fuel-circle">
      <svg className="progress-ring" width="120" height="120">
        <circle
          className="progress-ring__bg"
          stroke="#e6e6e6"
          strokeWidth="10"
          fill="transparent"
          r={radius}
          cx="60"
          cy="60"
        />
        <circle
          className="progress-ring__circle"
          stroke={getColor()}
          strokeWidth="10"
          fill="transparent"
          r={radius}
          cx="60"
          cy="60"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform="rotate(-90 60 60)"  
        />
        <text
          x="60"
          y="60"
          textAnchor="middle"
          dominantBaseline="middle"
          className="fuel-percent"
        >
          {value}%
        </text>
      </svg>
    </div>
  );
};

export default FuelCircle;
