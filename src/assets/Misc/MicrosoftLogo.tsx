import { getClassNames } from './MicrosoftLogo.classNames';

const msRed = '#F34F1C',
    msGreen = '#7FBC00',
    msBlue = '#01A6F0',
    msYellow = '#FFBA01';
const squareColors = [msRed, msGreen, msBlue, msYellow];

export const MicrosoftLogo = () => {
    const classNames = getClassNames();
    return (
        <div className={classNames['wc-MicrosoftLogo--logoContainer']}>
            {squareColors.map((color) => {
                return (
                    <div
                        key={color}
                        className={classNames['wc-MicrosoftLogo--square']}
                        style={{ backgroundColor: color }}
                    />
                );
            })}
        </div>
    );
};
