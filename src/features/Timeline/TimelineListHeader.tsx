import React from 'react';
import { Text } from '@fluentui/react';
import { capitalizeFirstLetterOfEachWord } from 'src/common/helpers/textFormatting';
import { getClassNames } from './TimelineListHeader.classNames';

interface TimelineListHeaderProps {
    text: string;
}

const TimelineListHeader: React.FC<TimelineListHeaderProps> = ({ text }) => {
    const classNames = getClassNames();

    return (
        // We use a div to wrap the Text component to not have it take up the full width of the stack.
        <div>
            <Text className={classNames['wc-TimelineListHeader--text']}>
                &nbsp;&nbsp;{capitalizeFirstLetterOfEachWord(text)}&nbsp;&nbsp;
            </Text>
        </div>
    );
};

export default TimelineListHeader;
