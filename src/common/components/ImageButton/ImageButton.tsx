import React from 'react';
import { DocumentCard, Stack, Text } from '@fluentui/react';
import { getClassNames } from './ImageButton.classNames';
interface ImageButtonProps {
    onClick: () => void;
    image?: JSX.Element;
    title?: string;
}

const ImageButton: React.FC<ImageButtonProps> = ({ onClick, image, title }) => {
    const classNames = getClassNames();

    return (
        <DocumentCard data-testid={'ImageButton'} onClick={onClick} className={classNames['wc-ImageButton--Button']}>
            <Stack className={classNames['wc-ImageButton--Stack']}>
                <div className={classNames['wc-ImageButton--Image']}>{image}</div>
                <Text className={classNames['wc-ImageButton--Text']}>{title}</Text>
            </Stack>
        </DocumentCard>
    );
};

export default ImageButton;
