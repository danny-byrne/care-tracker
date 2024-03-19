import React from 'react';
import { DocumentCard, Stack, Text } from '@fluentui/react';
import { TimelineEntity } from 'src/graphQL/serverMocks/graphQLGeneratedCode';
import { DateTimeFormatOptions } from '../Medications/MedicationMutationTypes';
import GradientCircle from './GradientCircle';
import { useNavigate } from 'react-router';
import { EntityIcon, entityTitle, entityUrl, gradientCircleColors } from './timelineUtils';
import { getClassNames } from './TimelineListItem.classNames';

interface ProviderListItemProps {
    entity: TimelineEntity;
    showDate: boolean;
    isLast: boolean;
}

const dateTimeFormatOptions: DateTimeFormatOptions = {
    year: undefined,
    month: 'short',
    day: 'numeric',
};

const TimelineListItem: React.FC<ProviderListItemProps> = ({ entity, showDate, isLast }) => {
    const classNames = getClassNames(isLast, showDate);
    const navigate = useNavigate();

    // Month uses -1 because Date month is `monthIndex`
    const date = new Date(entity.date?.year, entity.date?.month - 1, entity.date?.day);
    const text = entityTitle(entity);
    const [gradientColorStart, gradientColorEnd] = gradientCircleColors(entity.type);
    const showHr = showDate || entity.relativeTimePeriod !== null || isLast;
    const url = entityUrl(entity);

    return (
        <Stack horizontal verticalAlign="center" className={classNames['wc-TimelineListItem--container']}>
            <div className={classNames['wc-TimelineListItem--verticalLine']} />
            <Stack className={classNames['wc-TimelineListItem--dateContainer']}>
                {showDate && (
                    <Text className={classNames['wc-TimelineListItem--date']}>
                        <b>{date.toLocaleDateString('en-US', dateTimeFormatOptions)}</b>
                    </Text>
                )}
                {showHr && <hr className={classNames['wc-TimelineListItem--hr']} />}
            </Stack>

            <DocumentCard
                // FIXME: could not use with classNames, style was disrupted.
                style={{ width: '70%', padding: '6px', minHeight: '40px' }}
                onClick={() => {
                    navigate(url);
                }}
            >
                <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 6 }}>
                    <div className={classNames['wc-TimelineListItem--iconContainer']}>
                        <GradientCircle
                            id={entity.type.toString()}
                            radius={18}
                            gradientColorStart={gradientColorStart}
                            gradientColorEnd={gradientColorEnd}
                        />
                        <EntityIcon entityType={entity.type} style={{ position: 'absolute', top: 14, left: 14 }} />
                    </div>
                    {/* FIXME: `WebkitLineClamp` is added inline as it does not seem to work in classNames */}
                    <Text className={classNames['wc-TimelineListItem--text']} style={{ WebkitLineClamp: 2 }}>
                        {text}
                    </Text>
                </Stack>
            </DocumentCard>
        </Stack>
    );
};

export default TimelineListItem;
