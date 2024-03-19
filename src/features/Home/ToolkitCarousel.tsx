/*eslint-disable*/
import React, { useState } from 'react';
import { Stack, Image, ChoiceGroup, DefaultButton } from '@fluentui/react';

import { ChevronLeftButton } from 'src/assets/Misc/ChevronLeftButton';
import { ChevronRightButton } from 'src/assets/Misc/ChevronRightButton';

import { getClassNames, CAROUSEL_TRANSFORM_WIDTH } from './ToolkitCarousel.classNames';
import ComputerGuy from 'src/assets/images/ComputerGuy.jpg';
import {
    useCreateAppointmentMutation,
    useGetAppointmentsLazyQuery,
} from 'src/graphQL/serverMocks/graphQLGeneratedCode';
import { useFeedbackService } from 'src/services/FeedbackService';
import { getCurrentEventStartEndTimes } from 'src/features/Calendar/AppointmentUtils';

const enum Frequencies {
    EveryMonth = 'Every month',
    Once = 'Once',
    Weekly = 'Weekly',
    Yearly = 'Yearly',
}

const enum Recurrences {
    Weekly = 'FREQ=WEEKLY',
    Once = 'FREQ=ONCE',
    Monthly = 'FREQ=MONTHLY',
    Yearly = 'FREQ=YEARLY',
}

const classNames = getClassNames();

interface IToolkitCarouselProps {
    tasks?: any;
    handleDeleteActivity: (string) => void;
}

const ToolkitCarousel: React.FC<IToolkitCarouselProps> = ({ tasks, handleDeleteActivity }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const updateIndex = (newIndex) => {
        if (newIndex < 0) {
            newIndex = 0;
        } else if (newIndex >= tasks.length) {
            newIndex = tasks.length - 1;
        }
        setActiveIndex(newIndex);
    };

    return (
        <Stack tokens={{ childrenGap: 10 }} className={classNames['wc-ToolkitCarousel--container']}>
            <Stack horizontal horizontalAlign="space-between" verticalAlign="center">
                <div className={classNames['wc-ToolkitCarousel--toolkitText']}>My 6 Month Toolkit</div>
                <Stack horizontal tokens={{ childrenGap: 15 }} verticalAlign="center">
                    <div className={classNames['wc-ToolkitCarousel--seeAllText']}>See all</div>
                    <Stack
                        horizontal
                        tokens={{ childrenGap: 5 }}
                        className={classNames['wc-ToolkitCarousel--carouselButtonContainer']}
                    >
                        {/* TODO: implement greyed out/disabled buttons for start/end indexes*/}
                        <div onClick={() => updateIndex(activeIndex - 1)}>
                            <ChevronLeftButton />
                        </div>
                        <div onClick={() => updateIndex(activeIndex + 1)}>
                            <ChevronRightButton />
                        </div>
                    </Stack>
                </Stack>
            </Stack>

            <Carousel activeIndex={activeIndex}>
                {tasks?.map((task, index) => (
                    <ToolkitCard
                        task={task}
                        key={task.description + index}
                        handleDeleteActivity={handleDeleteActivity}
                    />
                ))}
            </Carousel>
        </Stack>
    );
};

interface IToolkitCardProps {
    task: any;
    handleDeleteActivity: (string) => void;
}

const ToolkitCard: React.FC<IToolkitCardProps> = ({ task, handleDeleteActivity }) => {
    const { description, recurrence, id } = task;
    const { setSuccessToast } = useFeedbackService();
    const [hasBeenAddedToCalendar, sethasBeenAddedToCalendar] = useState(false);

    const [getAppointments] = useGetAppointmentsLazyQuery({
        fetchPolicy: 'network-only',
    });

    const [createAppointment] = useCreateAppointmentMutation({
        refetchQueries: ['GetAppointments'],
        onCompleted: async () => {
            await getAppointments();
            setSuccessToast('Event added to Calendar');
        },
    });

    const onClickAddToCalendar = async () => {
        const [startDateTime, endDateTime] = getCurrentEventStartEndTimes();
        await createAppointment({
            variables: {
                input: {
                    description: description,
                    recurrence: recurrence,
                    startDateTime: startDateTime,
                    endDateTime: endDateTime,
                },
            },
        });
        sethasBeenAddedToCalendar(true);
    };

    const buttonText = hasBeenAddedToCalendar ? 'Added to Calendar' : 'Add to Calendar';

    return (
        <div className={classNames['wc-ToolkitCarousel--card']}>
            <Image src={ComputerGuy} />
            <Stack tokens={{ childrenGap: 10 }} className={classNames['wc-ToolkitCarousel--cardContent']}>
                <FrequencyTag frequency={recurrence} />
                <div className={classNames['wc-ToolkitCarousel--cardText']}>{description}</div>

                <DefaultButton
                    className={classNames['wc-ToolkitCarousel--addToCalendarButton']}
                    style={
                        hasBeenAddedToCalendar
                            ? { pointerEvents: 'none', backgroundColor: 'lightGrey', color: 'darkgrey' }
                            : null
                    }
                    onClick={(e) => {
                        e.preventDefault();
                        if (!hasBeenAddedToCalendar) {
                            onClickAddToCalendar();
                        }
                    }}
                >
                    <Stack
                        horizontal
                        tokens={{ childrenGap: 5 }}
                        verticalAlign="center"
                        styles={{ root: { height: '100%', alignItems: 'center' } }}
                    >
                        <label style={{ display: 'flex', alignItems: 'center' }}>
                            {!hasBeenAddedToCalendar && <input type="radio" style={{ verticalAlign: 'middle' }} />}
                            <span style={{ verticalAlign: 'middle' }}>{buttonText}</span>
                        </label>
                    </Stack>
                </DefaultButton>
            </Stack>
            {!hasBeenAddedToCalendar && (
                <div className={classNames['wc-ToolkitCarousel--dismissText']} onClick={() => handleDeleteActivity(id)}>
                    Dismiss
                </div>
            )}
        </div>
    );
};

const FrequencyTag = ({ frequency }) => {
    const frequencyTagClass = frequency.includes(Recurrences.Monthly) ? 'monthlyfrequencyTag' : 'onceFrequencyTag';
    const getFrequencyText = (freq) => {
        //TODO: determine classes here as well.
        const interval = 'INTERVAL';
        let text = '',
            frequencyInterval = null;
        const frequencyIntervalPresent = freq.includes(interval);
        if (frequencyIntervalPresent) {
            frequencyInterval = freq[freq.length - 1];
        }
        switch (true) {
            case freq.includes(Recurrences.Yearly):
                if (frequencyIntervalPresent) {
                    text = `Every ${frequencyInterval} years`;
                } else {
                    text = Frequencies.Yearly;
                }
                break;

            case freq.includes(Recurrences.Weekly):
                if (frequencyIntervalPresent) {
                    text = `Every ${frequencyInterval} weeks`;
                } else {
                    text = Frequencies.Weekly;
                }
                break;

            case freq.includes(Recurrences.Monthly):
                if (frequencyIntervalPresent) {
                    text = `Every ${frequencyInterval} months`;
                } else {
                    text = Frequencies.EveryMonth;
                }
                break;

            case freq.includes(Recurrences.Once):
                text = Frequencies.Once;
                break;

            default:
                text = '';
        }
        return text;
    };

    const frequencyText = getFrequencyText(frequency);

    return (
        <Stack verticalAlign="center" className={classNames[`wc-ToolkitCarousel--${frequencyTagClass}`]}>
            {frequencyText}
        </Stack>
    );
};

const Carousel = ({ children, activeIndex }) => {
    const transformAmount = activeIndex * CAROUSEL_TRANSFORM_WIDTH;
    return (
        <div className={classNames['wc-ToolkitCarousel--carousel']}>
            <div
                className={classNames['wc-ToolkitCarousel--carousel-inner']}
                style={{ transform: `translateX(-${transformAmount}px)` }}
            >
                {React.Children.map(children, (child, index) => {
                    return React.cloneElement(child, { width: '100%' });
                })}
            </div>
        </div>
    );
};

export default ToolkitCarousel;
