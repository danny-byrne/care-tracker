/*eslint-disable*/
import React, { useState, useEffect } from 'react';
import { Stack, ChoiceGroup } from '@fluentui/react';
import { getClassNames } from './ConditionsTodayView.classNames';

import ReusableCardList from 'src/common/components/ReusableCardList/ReusableCardList';
import { InfoIcon } from 'src/assets/Misc/InfoIcon';
import { CloseIcon } from 'src/assets/Misc/CloseIcon';

interface IConditionsTodayViewProps {
    conditionName: string;
    dailyTasks?: any;
}

const DEFAULT_LIST_LENGTH = 3;

const ConditionsTodayView: React.FC<IConditionsTodayViewProps> = ({ conditionName, dailyTasks }) => {
    const [showMoreClicked, setShowMoreClicked] = useState(false);
    const [tasksToShow, setTasksToShow] = useState([]);

    useEffect(() => {
        if (showMoreClicked) {
            setTasksToShow(dailyTasks);
        } else {
            const taskSubSelection = dailyTasks?.slice(0, DEFAULT_LIST_LENGTH);
            setTasksToShow(taskSubSelection);
        }
    }, [showMoreClicked]);

    const classNames = getClassNames();
    const conditionContent = {
        content: (
            <Stack horizontal horizontalAlign="space-between" verticalAlign="center">
                <Stack horizontal tokens={{ childrenGap: 5 }} verticalAlign="center">
                    <div className={classNames['wc-ConditionsTodayView--conditionLabel']}>{conditionName}</div>
                    <div className={classNames['wc-ConditionsTodayView--infoIcon']}>
                        <InfoIcon />
                    </div>
                </Stack>
                <CloseIcon />
            </Stack>
        ),
    };

    const taskListFooterText = showMoreClicked ? 'Show less' : 'Show more';

    const instructionContent = {
        content: (
            <Stack tokens={{ childrenGap: 10 }}>
                <div className={classNames['wc-ConditionsTodayView--todayLabel']}>Today</div>
                {tasksToShow?.map((task, index) => (
                    <Stack horizontal tokens={{ childrenGap: 5 }} verticalAlign="center" key={task.description + index}>
                        <ChoiceGroup options={[{ key: 'A', text: '' }]} />
                        <div className={classNames['wc-ConditionsTodayView--todayInstructions']}>
                            {task.description}
                        </div>
                    </Stack>
                ))}
                {dailyTasks?.length > DEFAULT_LIST_LENGTH && (
                    <Stack horizontal horizontalAlign="space-between" verticalAlign="center">
                        <div
                            className={classNames['wc-ConditionsTodayView--showMoreText']}
                            onClick={() => setShowMoreClicked(!showMoreClicked)}
                        >
                            {taskListFooterText}
                        </div>
                        <div className={classNames['wc-ConditionsTodayView--ellipses']}>...</div>
                    </Stack>
                )}
            </Stack>
        ),
    };

    return (
        <div className={classNames['wc-ConditionsTodayView--container']}>
            <ReusableCardList buttonPropsList={[conditionContent, instructionContent]} />
        </div>
    );
};

export default ConditionsTodayView;
