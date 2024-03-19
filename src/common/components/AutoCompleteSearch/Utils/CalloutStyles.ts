import { DefaultEffects, ICalloutContentStyles } from '@fluentui/react';
import { BREAKPOINTS } from 'src/app/Breakpoints';

export const typeAheadCalloutStyle: Partial<ICalloutContentStyles> = {
    root: {
        boxShadow: DefaultEffects.elevation4,
        borderRadius: '12px',
        marginTop: 0,
        minWidth: '200px',
        overflow: 'auto',
        overflowY: 'scroll',
        width: '100%',
        selectors: {
            [BREAKPOINTS.SEARCH_OVERRIDE]: {
                top: '0px',
                left: '0px!important',
                minWidth: '200px',
            },
        },
    },
    container: {
        zIndex: 3,
        position: 'relative',
    },
    calloutMain: {
        minHeight: 'fit-content',
        maxHeight: '500px!important',
        height: '100%',
        width: '100%',
    },
};
