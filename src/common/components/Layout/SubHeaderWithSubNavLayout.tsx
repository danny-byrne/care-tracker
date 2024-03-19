import React from 'react';
import SubNavigationPivot from 'src/common/components/SubNavigationPivot/SubNavigationPivot';

import SubHeaderLayout, { SubHeaderLayoutProps } from './SubHeaderLayout';

interface SubHeaderWithSubNavLayoutProps extends SubHeaderLayoutProps {
    // TODO: fix these any types
    buttons: any;
    defaultKey: any;
}

const SubHeaderWithSubNavLayout: React.FC<SubHeaderWithSubNavLayoutProps> = ({
    children,
    title,
    onClose,
    actionButtonText,
    actionButtonDisabled,
    onClickActionButton,
    onDelete,
    onShare,
    buttons,
    defaultKey,
    customHeaderChildren,
    onClickUploadDocument,
}) => {
    return (
        <>
            <SubHeaderLayout
                {...{
                    title,
                    onClose,
                    actionButtonText,
                    actionButtonDisabled,
                    onClickActionButton,
                    onDelete,
                    onShare,
                    customHeaderChildren,
                    onClickUploadDocument,
                }}
            >
                <>
                    <SubNavigationPivot {...{ buttons, defaultKey }} />
                </>
                {children}
            </SubHeaderLayout>
        </>
    );
};

export default SubHeaderWithSubNavLayout;
