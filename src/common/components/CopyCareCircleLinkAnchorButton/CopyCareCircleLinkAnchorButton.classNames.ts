import { mergeStyleSets, FontSizes, FontWeights } from '@fluentui/react';
import { colors } from 'src/common/styles/colors';

interface ITogetherTimeLayoutClassNames {
    'wc-CopyCareCircleLinkAnchorButton--anchoredButtonStack': string;
    'wc-CopyCareCircleLinkAnchorButton--careCircleLinkUnclicked': string;
    'wc-CopyCareCircleLinkAnchorButton--careCircleLinkClicked': string;
    'wc-CopyCareCircleLinkAnchorButton--careCircleLinkClickedIcon': string;
}

export const getClassNames = (): ITogetherTimeLayoutClassNames => {
    return mergeStyleSets({
        'wc-CopyCareCircleLinkAnchorButton--anchoredButtonStack': {},
        'wc-CopyCareCircleLinkAnchorButton--careCircleLinkUnclicked': {
            fontWeight: FontWeights.semibold,
            height: '36px',
            ':hover': {
                backgroundColor: colors.fabric.neutrals.gray20,
            },
        },
        'wc-CopyCareCircleLinkAnchorButton--careCircleLinkClicked': {
            border: 'none',
            backgroundColor: colors.windcrest.careCircleLink,
            display: 'flex',
            height: '36px',
            fontSize: FontSizes.size12,
            ':hover': {
                backgroundColor: colors.windcrest.careCircleLink,
            },
        },
        'wc-CopyCareCircleLinkAnchorButton--careCircleLinkClickedIcon': {
            height: 16,
            width: 16,
            marginRight: 8,
        },
    });
};
