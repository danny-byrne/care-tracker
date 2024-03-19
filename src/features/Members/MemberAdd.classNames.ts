import { mergeStyleSets } from '@fluentui/react';
import { BREAKPOINTS } from 'src/app/Breakpoints';

interface IMemberAddClassNames {
    formContainer: string;
}
export const getClassNames = (): IMemberAddClassNames => {
    return mergeStyleSets({
        formContainer: {
            [BREAKPOINTS.DESKTOP_SMALL]: {
                marginLeft: '13.25rem',
                marginRight: '13.25rem',
            },
        },
    });
};
