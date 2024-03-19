import { mergeStyleSets } from '@fluentui/react';
import { colors } from 'src/common/styles/colors';

interface IDataProtectionNoticeClassNames {
    'wc-DataProtectionNotice--container': string;
    'wc-DataProtectionNotice--notice': string;
}

export const getClassNames = (): IDataProtectionNoticeClassNames => {
    return mergeStyleSets({
        'wc-DataProtectionNotice--container': {
            height: '92%',
            borderRadius: '12px 0px 0px',
            backgroundColor: colors.windcrest.pageBackground,
        },
        'wc-DataProtectionNotice--notice': {
            fontSize: '30px',
            lineHeight: '24px',
        },
    });
};
