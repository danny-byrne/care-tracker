import { FontWeights, mergeStyleSets } from '@fluentui/react';

interface IToolkitCarouselNames {
    'wc-ToolkitCarousel--container': string;
    'wc-ToolkitCarousel--toolkitText': string;
    'wc-ToolkitCarousel--seeAllText': string;
    'wc-ToolkitCarousel--cardsContainer': string;
    'wc-ToolkitCarousel--card': string;
    'wc-ToolkitCarousel--cardContent': string;
    'wc-ToolkitCarousel--cardText': string;
    'wc-ToolkitCarousel--monthlyfrequencyTag': string;
    'wc-ToolkitCarousel--onceFrequencyTag': string;
    'wc-ToolkitCarousel--addToCalendarButton': string;
    'wc-ToolkitCarousel--carousel': string;
    'wc-ToolkitCarousel--carousel-inner': string;
    'wc-ToolkitCarousel--carouselButtonContainer': string;
}

const frequencyTag = {
    height: 18,
    width: 80,
    borderRadius: 4,
    fontSize: 10,
    textAlign: 'center',
};

const blueText = {
    fontWeight: FontWeights.regular,
    color: '#335CCC',
};

const CAROUSEL_CARD_WIDTH = 199,
    CAROUSEL_CARD_GAP = 20;

export const CAROUSEL_TRANSFORM_WIDTH = CAROUSEL_CARD_GAP + CAROUSEL_CARD_WIDTH;

export const getClassNames = (): IToolkitCarouselNames => {
    return mergeStyleSets({
        'wc-ToolkitCarousel--container': {
            fontWeight: FontWeights.semibold,
            fontSize: '1.5rem',
            lineHeight: '32px',
            height: 400,
            marginBottom: 20,
            marginTop: 20,
        },
        'wc-ToolkitCarousel--toolkitText': {
            fontWeight: FontWeights.regular,
            fontSize: '16px',
            lineHeight: '32px',
        },
        'wc-ToolkitCarousel--seeAllText': {
            ...blueText,
            fontSize: '14px',
        },
        'wc-ToolkitCarousel--dismissText': {
            ...blueText,
            fontSize: '10px',
            marginLeft: '75%',
        },
        'wc-ToolkitCarousel--cardsContainer': {
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            height: 360,
            overflowY: 'auto',
            gap: 20,
            marginLeft: 5,
        },
        'wc-ToolkitCarousel--card': {
            width: CAROUSEL_CARD_WIDTH,
            height: 356,
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.14), 0px 0px 2px rgba(0, 0, 0, 0.12)',
            borderRadius: '8px',
            flexShrink: 0,
            overflow: 'hidden',
        },
        'wc-ToolkitCarousel--cardContent': {
            margin: '15px 10px 10px 10px',
            height: 140,
        },
        'wc-ToolkitCarousel--cardText': {
            fontSize: 14,
            width: 180,
            height: 240,
            whiteSpace: 'pre-wrap',
            lineHeight: '18px',
        },
        'wc-ToolkitCarousel--monthlyfrequencyTag': {
            ...frequencyTag,
            backgroundColor: '#FED9CC',
            border: '1px solid #E66C37',
        },
        'wc-ToolkitCarousel--onceFrequencyTag': {
            ...frequencyTag,
            width: 40,
            backgroundColor: '#FEEACC',
            border: '1px solid #E69537',
        },
        'wc-ToolkitCarousel--addToCalendarButton': {
            borderRadius: '0', // Set border-radius to 0 for straight corners
            borderColor: '#D1D1D1',
            color: '#323130',
            border: '1px solid #919191',
            fontSize: 14,
            textAlign: 'center',
        },
        'wc-ToolkitCarousel--carousel': {
            height: 360,
        },
        'wc-ToolkitCarousel--carousel-inner': {
            whiteSpace: 'nowrap',
            transition: 'transform 0.3s',
            height: '100%',
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            gap: CAROUSEL_CARD_GAP,
        },
        'wc-ToolkitCarousel--carouselButtonContainer': {
            position: 'relative',
            top: 2,
        },
    });
};
