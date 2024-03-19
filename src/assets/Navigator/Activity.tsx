/* eslint-disable max-len */
import React from 'react';

interface IActivityProps {
    color: string;
    height: string;
    width: string;
}
export const Activity: React.FC<IActivityProps> = ({ color, height, width }) => {
    return (
        <svg width={width} height={height} viewBox="0 0 36 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M17.9999 0C9.71565 0 2.99992 6.71573 2.99992 15V23.4865L0.195709 29.8417C-0.460548 31.329 0.628578 33 2.25422 33H33.7457C35.3713 33 36.4605 31.329 35.8042 29.8417L32.9999 23.4865V15C32.9999 6.71573 26.2842 0 17.9999 0ZM18 40C15.0271 40 12.5591 37.8377 12.083 35H23.9171C23.441 37.8377 20.973 40 18 40Z"
                fill={color}
            />
        </svg>
    );
};
