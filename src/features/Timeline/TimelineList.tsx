import React, { useCallback, useMemo, useState } from 'react';
import { IContextualMenuItem, MessageBar, MessageBarType, Spinner, Stack, Text } from '@fluentui/react';
import { ERROR_MESSAGES } from 'src/app/Strings';
import { useFeedbackService } from 'src/services/FeedbackService';
import { entityTypeTitle, timelineEntitiesToListElements } from './timelineUtils';
import TimelineFilterButton, { FILTER_RESET_KEY } from './TimelineFilterButton';
import {
    TimelineEntity,
    TimelineEntityType,
    useGetCareRecipientTimelineQuery,
} from 'src/graphQL/serverMocks/graphQLGeneratedCode';

const Container = ({ children }: { children: JSX.Element | JSX.Element[] }): JSX.Element => {
    return <div style={{ marginTop: '16px' }}>{children}</div>;
};

const EmptyView = (): JSX.Element => {
    return (
        <Stack horizontalAlign="center" tokens={{ childrenGap: 6 }}>
            <Text variant="xLarge">No timeline items</Text>
        </Stack>
    );
};

const TimelineList: React.FC = () => {
    const { setErrorToast } = useFeedbackService();

    const [filter, setFilter] = useState<TimelineEntityType | undefined>(undefined);

    const { loading, error, data } = useGetCareRecipientTimelineQuery({
        fetchPolicy: 'no-cache',
        onError: () => {
            setErrorToast(ERROR_MESSAGES.GET_PROVIDERS);
        },
    });

    const listItems = useMemo(() => {
        let entities: TimelineEntity[] = data?.careRecipientTimeline?.entities ?? [];
        if (filter && entities.length > 0) {
            entities = entities.filter((entity) => entity.type === filter);
        }
        return timelineEntitiesToListElements(entities);
    }, [data, filter]);

    const handleFilterChange = useCallback(
        (_: any, item?: IContextualMenuItem) => {
            if (filter === item?.key) {
                return;
            }

            if (item && item.key !== FILTER_RESET_KEY) {
                setFilter(item.key as TimelineEntityType);
            } else {
                setFilter(undefined);
            }
        },
        [filter],
    );

    if (loading) {
        return (
            <Container>
                <Stack horizontalAlign="center">
                    <Spinner label="Loading..." />
                </Stack>
            </Container>
        );
    }

    if (error) {
        return (
            <Container>
                <MessageBar messageBarType={MessageBarType.error}>{`Error: ${error.message}`}</MessageBar>
            </Container>
        );
    }

    if (data?.careRecipientTimeline?.entities.length === 0) {
        return (
            <Container>
                <EmptyView />
            </Container>
        );
    }

    return (
        <Container>
            <Stack.Item align="start">
                <TimelineFilterButton
                    text={filter ? entityTypeTitle(filter, true) : 'Filter'}
                    onItemClick={handleFilterChange}
                />
            </Stack.Item>
            {listItems.length ? <Stack tokens={{ childrenGap: 0 }}>{listItems}</Stack> : <EmptyView />}
        </Container>
    );
};

export default TimelineList;
