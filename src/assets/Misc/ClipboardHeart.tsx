/* eslint-disable max-len */
import { FontIcon, mergeStyles } from '@fluentui/react';
import React from 'react';
export const ClipboardHeart = () => {
    return (
        <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g className="wc-clipboard--icon">
                <path d="M3.08535 1C3.29127 0.417403 3.84689 0 4.5 0H7.5C8.15311 0 8.70873 0.417404 8.91465 1H10.5C11.3284 1 12 1.67157 12 2.5V7.00308C11.6621 7.01657 11.3256 7.07433 11 7.17634V2.5C11 2.22386 10.7761 2 10.5 2H8.91465C8.70873 2.5826 8.15311 3 7.5 3H4.5C3.84689 3 3.29127 2.5826 3.08535 2H1.5C1.22386 2 1 2.22386 1 2.5V14.5C1 14.7761 1.22386 15 1.5 15H6.55455L7.55455 16H1.5C0.671573 16 0 15.3284 0 14.5V2.5C0 1.67157 0.671573 1 1.5 1H3.08535ZM4.5 1C4.22386 1 4 1.22386 4 1.5C4 1.77614 4.22386 2 4.5 2H7.5C7.77614 2 8 1.77614 8 1.5C8 1.22386 7.77614 1 7.5 1H4.5ZM5.8349 8.8349C6.94809 7.7217 8.75294 7.7217 9.86613 8.8349L10.0025 8.9713L10.1389 8.8349C11.2521 7.7217 13.057 7.7217 14.1702 8.8349C15.2834 9.94809 15.2834 11.7529 14.1702 12.8661L10.3561 16.6802C10.1608 16.8755 9.84422 16.8755 9.64896 16.6802L5.8349 12.8661C4.7217 11.7529 4.7217 9.94809 5.8349 8.8349Z" />
            </g>
        </svg>
    );
};

export const ClipboardHeartIcon: React.FunctionComponent<{ color?: string }> = (props) => {
    const { color = '#4426D9' } = props;

    // FontIcon is an optimized variant of standard Icon.
    return (
        <FontIcon
            iconName="ClipboardHeart"
            aria-hidden={undefined}
            className={mergeStyles({
                selectors: {
                    '.wc-clipboard--icon': {
                        fill: color,
                    },
                },
            })}
        />
    );
};
