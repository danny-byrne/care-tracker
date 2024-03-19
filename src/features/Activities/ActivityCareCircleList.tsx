import { useFeedbackService } from 'src/services/FeedbackService';
import {
    useCreateActivityOccurrenceMutation,
    useGetUserAppProfileInfoQuery,
    useRemoveActivityOccurrenceMutation,
} from 'src/graphQL/serverMocks/graphQLGeneratedCode';

import React from 'react';
import { Stack, Text, GroupedList, IGroupHeaderProps, DocumentCard, Persona, Checkbox } from '@fluentui/react';
import { Header } from 'src/common/components';

import { getClassNames } from './ActivityView.classNames';
import { Activity, MemberWithActivities } from 'src/types/Activity';
import Accordion from 'src/common/components/Accordion/Accordion';
import { getRelationshipText } from 'src/utils/utils';
import { usePermissionsService } from 'src/services/PermissionsService';

interface IActivityCareCircleListProps {
    activity: Activity;
    activityId: string;
}

const ActivityCareCircleList: React.FC<IActivityCareCircleListProps> = ({ activity, activityId }) => {
    const { setErrorToast } = useFeedbackService();
    const classNames = getClassNames();

    const { getHasAdminPermissions } = usePermissionsService();
    const hasAdminPermissions = getHasAdminPermissions();

    const { data: userProfileData } = useGetUserAppProfileInfoQuery({
        // user info only needed for Readers, admins can sign anybody up for activities
        skip: hasAdminPermissions,
    });

    const [createActivityOccurrence] = useCreateActivityOccurrenceMutation({
        refetchQueries: ['GetActivity'],
        onError: (err) => {
            setErrorToast(err.message);
        },
    });

    const [removeActivityOccurrence] = useRemoveActivityOccurrenceMutation({
        refetchQueries: ['GetActivity'],
        onError: (err) => {
            setErrorToast(err.message);
        },
    });

    const onRenderHeader = (props?: IGroupHeaderProps): JSX.Element | null => {
        if (props) {
            const toggleCollapse = (): void => {
                // eslint-disable-next-line react/prop-types
                props.onToggleCollapse!(props.group!);
            };
            return (
                <Accordion
                    // eslint-disable-next-line react/prop-types
                    collapsed={props.group!.isCollapsed}
                    onToggle={() => {
                        toggleCollapse();
                    }}
                    // eslint-disable-next-line react/prop-types
                    header={<Header text={props.group!.name} />}
                />
            );
        }

        return null;
    };

    return (
        <GroupedList
            items={activity?.careCircle?.careCircleMembers}
            groupProps={{ onRenderHeader }}
            groups={[
                {
                    key: 'Participating',
                    name: 'Participating',
                    startIndex: 0,
                    count: activity?.careCircle?.careCircleMembers.length,
                },
            ]}
            onRenderCell={(nestingDepth: 1, item: MemberWithActivities, itemIndex: number) => {
                const occurrencesTiedToActivity = item.experienceOccurrences.filter(
                    (occurrence) => occurrence.experience.id === activityId,
                );

                const src = item.careGiver.imageBase64 ? `data:image/png;base64,${item.careGiver.imageBase64}` : null;

                const relationship = getRelationshipText(item.relationshipToLovedOne, true);

                const onClick = async (checked: boolean) => {
                    if (checked) {
                        await createActivityOccurrence({
                            // TODO: Update once availability no longer required
                            variables: {
                                careGiverId: item.careGiver.id,
                                experience: { id: activityId, availability: '' },
                            },
                        });
                    } else {
                        await removeActivityOccurrence({ variables: { id: occurrencesTiedToActivity[0].id } });
                    }
                };

                // Admins can sign anybody up for activities, readers can only sign themselves up
                const checkBoxEnabled = hasAdminPermissions || userProfileData?.me?.id === item.careGiver.id;

                const CareCircleMemberCard = () => {
                    return (
                        <DocumentCard className={classNames['wc-ActivityView--cardContainer']}>
                            <Stack horizontal className={classNames['wc-ActivityView--stackContainer']}>
                                <Stack horizontal tokens={{ childrenGap: '16px' }}>
                                    <Persona
                                        text={item.careGiver.displayName}
                                        hidePersonaDetails
                                        imageUrl={src}
                                        imageAlt={item.careGiver.displayName}
                                        data-testid="avatar"
                                    />
                                    <Stack>
                                        <Text
                                            className={classNames['wc-ActivityView--name']}
                                            data-testid={'participant-name'}
                                        >
                                            {item.careGiver.displayName}
                                        </Text>
                                        <Text data-testid={'participant-relationship'}>{relationship}</Text>
                                    </Stack>
                                </Stack>
                                <Checkbox
                                    data-testid={'participant-checkbox'}
                                    onChange={(_, clicked) => onClick(clicked)}
                                    checked={occurrencesTiedToActivity.length > 0}
                                    disabled={!checkBoxEnabled}
                                />
                            </Stack>
                        </DocumentCard>
                    );
                };

                return (
                    <div data-selection-index={itemIndex} role="row">
                        <span role="cell">
                            <div className={classNames['wc-ActivityView--itemCell']}>
                                <CareCircleMemberCard />
                            </div>
                        </span>
                    </div>
                );
            }}
        />
    );
};

export default ActivityCareCircleList;
