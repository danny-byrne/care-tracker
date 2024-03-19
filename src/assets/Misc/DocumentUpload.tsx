/* eslint-disable max-len */
import { FontIcon, mergeStyles } from '@fluentui/react';
import React from 'react';

export const DocumentUpload = () => {
    return (
        <svg width="15" height="17" viewBox="0 0 15 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g className="wc-documentUpload--icon">
                <path d="M5 0C3.89543 0 3 0.895431 3 2V7.20703C3.32228 7.11588 3.65659 7.05337 4 7.02242V2C4 1.44772 4.44772 1 5 1H9V4.5C9 5.32843 9.67157 6 10.5 6H14V14C14 14.5523 13.5523 15 13 15H9.40029C9.21739 15.3578 8.99647 15.6929 8.74284 16H13C14.1046 16 15 15.1046 15 14V5.41421C15 5.01639 14.842 4.63486 14.5607 4.35355L10.6464 0.43934C10.3651 0.158035 9.98361 0 9.58579 0H5ZM13.7929 5H10.5C10.2239 5 10 4.77614 10 4.5V1.20711L13.7929 5ZM9 12.5C9 14.9853 6.98528 17 4.5 17C2.01472 17 0 14.9853 0 12.5C0 10.0147 2.01472 8 4.5 8C6.98528 8 9 10.0147 9 12.5ZM5 10.5C5 10.2239 4.77614 10 4.5 10C4.22386 10 4 10.2239 4 10.5V12H2.5C2.22386 12 2 12.2239 2 12.5C2 12.7761 2.22386 13 2.5 13H4L4 14.5C4 14.7761 4.22386 15 4.5 15C4.77614 15 5 14.7761 5 14.5V13H6.5C6.77614 13 7 12.7761 7 12.5C7 12.2239 6.77614 12 6.5 12H5V10.5Z" />
            </g>
        </svg>
    );
};

export const DocumentUploadIcon: React.FunctionComponent<{ color?: string }> = (props) => {
    const { color = '#4426D9' } = props;

    // FontIcon is an optimized variant of standard Icon.
    return (
        <FontIcon
            iconName="DocumentUpload"
            aria-hidden={undefined}
            className={mergeStyles({
                selectors: {
                    '.wc-documentUpload--icon': {
                        fill: color,
                    },
                },
            })}
        />
    );
};
