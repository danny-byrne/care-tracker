import React from 'react';

interface GradientCircleProps {
    id: string;
    radius: number;
    gradientColorStart: string;
    gradientColorEnd: string;
}

/**
 * A circle with a gradient fill from bottom to top.
 */
const GradientCircle: React.FC<GradientCircleProps> = ({ id, radius, gradientColorStart, gradientColorEnd }) => {
    return (
        <svg>
            <defs>
                <linearGradient id={id} x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor={gradientColorStart} />
                    <stop offset="100%" stopColor={gradientColorEnd} />
                </linearGradient>
            </defs>
            <circle cx={radius} cy={radius} r={radius} fill={`url(#${id})`} />
        </svg>
    );
};

export default GradientCircle;
