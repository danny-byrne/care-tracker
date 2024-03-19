import { getClassNames } from './MicrosoftLogo.classNames';

const msWhite = '#FFFFFF';
const squareColors = [msWhite, msWhite, msWhite, msWhite];

export const MicrosoftWhiteLogo = () => {
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
