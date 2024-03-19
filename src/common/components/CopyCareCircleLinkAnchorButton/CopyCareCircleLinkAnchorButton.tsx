import React from 'react';
import { Stack, DefaultButton } from '@fluentui/react';
import { getClassNames } from './CopyCareCircleLinkAnchorButton.classNames';

import { useCopyLink } from 'src/common/helpers/copyCareCircleLink';

export const CopyCareCircleLinkAnchorButton = () => {
    const classNames = getClassNames();

    const { copyLink, loading } = useCopyLink();

    return (
        <Stack className={classNames['wc-CopyCareCircleLinkAnchorButton--anchoredButtonStack']}>
            <CopyCareCircleLinkButton onClick={copyLink} disabled={loading} />
        </Stack>
    );
};
interface ICopyCareCircleLinkButton {
    onClick: () => void;
    disabled: boolean;
}

const CopyCareCircleLinkButton: React.FC<ICopyCareCircleLinkButton> = ({ onClick, disabled }) => {
    const classNames = getClassNames();
    const copyCareCircleLinkText = 'Copy Link';

    return (
        <DefaultButton
            {...{ disabled, onClick }}
            className={classNames['wc-CopyCareCircleLinkAnchorButton--careCircleLinkUnclicked']}
        >
            {copyCareCircleLinkText}
        </DefaultButton>
    );
};

export default CopyCareCircleLinkAnchorButton;
