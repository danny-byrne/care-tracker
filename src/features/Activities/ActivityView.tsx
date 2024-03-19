import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useBoolean } from '@fluentui/react-hooks';
import { useFeedbackService } from 'src/services/FeedbackService';
import { useQueryStringParams } from 'src/common/hooks/useQueryStringParams';
import {
    useGetActivityQuery,
    useRemoveActivityMutation,
    useCreateActivityOccurrenceMutation,
    useRemoveActivityOccurrenceMutation,
    useGetUserInfoQuery,
} from 'src/graphQL/serverMocks/graphQLGeneratedCode';
import { usePanelWidth } from 'src/common/hooks/usePanelWidth';

import { Panel, Stack, Text, PanelType, Spinner, Icon, PrimaryButton, DefaultButton } from '@fluentui/react';
import { Back, DeleteDialog, FormErrorBar } from 'src/common/components';
import { PagesWithDelete } from 'src/common/components/dialogs/DeleteDialog';
import RouterConfig from 'src/app/RouterConfig';
import SubHeaderLayout from 'src/common/components/Layout/SubHeaderLayout';

import { getClassNames } from './ActivityView.classNames';
import { PanelStyleOverrides } from 'src/common/components/Panel/PanelStyleOverrides';
import { Activity } from 'src/types/Activity';
import ActivityEdit from './ActivityEdit';
import { useIsMobile } from 'src/common/hooks/useMediaQueries';
import ActionButtonRow from 'src/common/components/ActionButtonRow/ActionButtonRow';
import ReusableCardList from 'src/common/components/ReusableCardList/ReusableCardList';
import { QuestionMark } from 'src/assets/Misc/QuestionMark';
import { CheckMark } from 'src/assets/Misc/CheckMark';
import Avatar, { AvatarSizes } from 'src/common/components/Avatar';
import { capitalizeFirstLetter } from 'src/common/helpers/textFormatting';
import { ReusableModal } from 'src/common/components';
import { ActivityLogo } from 'src/assets/Misc/ActivityLogo';
import { formatPhoneNumber } from 'src/utils/utils';
import { useGetBingAddressUri } from 'src/common/hooks/useGetBingAddressUri';

const LABEL_CARD_TOKEN_GAP = 10;

const ActivityView = () => {
    const navigate = useNavigate();
    const classNames = getClassNames();
    const { setErrorToast } = useFeedbackService();
    const { id } = useParams();
    const [activeActivity, setActiveActivity] = useState<Activity>(undefined);
    const [showModal, setShowModal] = useState(false);

    const isMobile = useIsMobile();

    const { data, loading } = useGetActivityQuery({
        variables: { id },
        onError: (err) => {
            setErrorToast(err.message);
        },
    });

    const [removeActivity, { loading: deleteLoading, error: deleteError }] = useRemoveActivityMutation({
        errorPolicy: 'all',
        onCompleted: () => {
            navigate(RouterConfig.Activities + '?status=deleted', { replace: true });
        },
    });

    const handleDelete = (event) => {
        event.preventDefault();
        removeActivity({ variables: { id: id } });
        toggleHideDeleteDialog();
    };

    useEffect(() => {
        const activityData = data?.careCircleExperiences?.experiences[0];
        setActiveActivity({
            ...activityData,
        });
    }, [data, loading]);

    // TODO: Abstract this into edit panel specific hook
    const { getSearchParam, addSearchParam, removeSearchParam } = useQueryStringParams();

    const showEdit = getSearchParam('mode') === 'edit';
    const showEditPanel = () => addSearchParam({ mode: 'edit' });
    const hideEditPanel = () => removeSearchParam('mode');
    const customWidth = usePanelWidth();

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

    const { data: careGiverData } = useGetUserInfoQuery();

    const careGiverId = careGiverData?.me?.id;

    const onSignUp = async () => {
        await createActivityOccurrence({
            // TODO: Update once availability no longer required
            variables: {
                careGiverId: careGiverId,
                experience: { id: activeActivity.id, availability: '' },
            },
        });
    };

    const onDecline = async () => {
        //match careGiverId with activity careCircleMember unique experience id
        const careGiverActivityExperience = activeActivity.careCircle.careCircleMembers.filter(
            (member) => member.careGiver.id === careGiverId,
        )[0];
        const experienceId = careGiverActivityExperience.experienceOccurrences.filter((experience) => {
            return experience.experience.id === activeActivity.id;
        })[0].id;

        await removeActivityOccurrence({ variables: { id: experienceId } });
        setShowModal(false);
    };

    const [hideDeleteDialog, { toggle: toggleHideDeleteDialog }] = useBoolean(true);

    const availabilityContent = activeActivity?.availability
        ? {
              content: (
                  <Stack className={classNames['wc-ActivityView--AvailabilityContent']}>
                      <Stack verticalAlign="center" tokens={{ childrenGap: 10 }}>
                          <div className={classNames['wc-ActivityView--AvailabilityLabel']}>Availability: </div>
                          <div>{activeActivity?.availability}</div>
                      </Stack>
                      {/* Scratch implementation for more detailed availabilities in vnext */}
                      {/* {availability.map((e) => (
                <Stack horizontal tokens={{ childrenGap: 14 }}>
                    <div className={classNames['wc-ActivityView--AvailabilityText']}>{e.frequency}: </div>
                    <div className={classNames['wc-ActivityView--AvailabilityText']}>
                        <DayTime time={e.availabilityStart} /> - <DayTime time={e.availabilityEnd} />
                    </div>
                </Stack>
            ))} */}
                  </Stack>
              ),
          }
        : null;

    const activityAddress = activeActivity?.address?.freeTextAddress ?? null;

    const { mapsUri } = useGetBingAddressUri(activityAddress);

    const activityAddressContent = activityAddress
        ? {
              clickableContent: (
                  <Stack horizontal tokens={{ childrenGap: 10 }} verticalAlign="center">
                      <Icon iconName="location" className={classNames['wc-ActivityView--icon']} />
                      {/**todo: maybe implement bing address search here */}
                      <a
                          href={mapsUri}
                          className={classNames['wc-ActivityView--clickableLinkText']}
                          target="_blank"
                          rel="noreferrer"
                      >
                          {activityAddress}
                      </a>
                  </Stack>
              ),
          }
        : null;

    const formattedPhoneNumber = activeActivity?.phoneNumber
        ? formatPhoneNumber(activeActivity.phoneNumber)
        : undefined;
    const activityPhoneNumberContent = formattedPhoneNumber
        ? {
              clickableContent: (
                  <Stack horizontal tokens={{ childrenGap: 10 }} verticalAlign="center">
                      <Icon iconName="phone" className={classNames['wc-ActivityView--icon']} />
                      <a
                          href={`tel:${activeActivity.phoneNumber}`}
                          className={classNames['wc-ActivityView--clickableLinkText']}
                      >
                          Call {formattedPhoneNumber}
                      </a>
                  </Stack>
              ),
          }
        : null;

    const activityDetailsContent = activeActivity?.details
        ? { content: <div className={classNames['wc-ActivityView--DescriptionText']}>{activeActivity?.details}</div> }
        : null;

    const detailsButtonProps = [
        availabilityContent,
        activityAddressContent,
        activityPhoneNumberContent,
        activityDetailsContent,
    ].filter((element) => element !== null);

    const Details = () => {
        const buttonProps = [...detailsButtonProps];

        return buttonProps.length ? (
            <Stack
                tokens={{ childrenGap: LABEL_CARD_TOKEN_GAP }}
                className={classNames['wc-ActivityView--listContainer']}
            >
                <Text className={classNames['wc-ActivityView--sectionTitle']}>Details:</Text>
                <ReusableCardList buttonPropsList={buttonProps} />
            </Stack>
        ) : null;
    };

    const getInvitees = () => {
        const invitees = activeActivity?.careCircle?.careCircleMembers?.map((member) => {
            const memberActivities = member.experienceOccurrences.map((occurrence) => occurrence.experience.id);
            const memberRelationship =
                member.relationshipToLovedOne !== 'NOT_SET'
                    ? capitalizeFirstLetter(member.relationshipToLovedOne.toLowerCase())
                    : '';
            return {
                name: member.careGiver.displayName,
                relationship: memberRelationship,
                hasAccepted: memberActivities.includes(activeActivity.id),
                image: member.careGiver.imageBase64,
            };
        });

        return invitees;
    };

    const invitees = getInvitees();

    const inviteeButtonProps = invitees?.map((invitee) => {
        const content = (
            <Stack horizontal verticalAlign="center">
                <Stack
                    horizontal
                    verticalAlign="center"
                    tokens={{ childrenGap: 14 }}
                    className={classNames['wc-ActivityView--inviteeCard']}
                >
                    <Avatar size={AvatarSizes.small} base64={invitee?.image} name={invitee.name} />
                    <Stack className={classNames['wc-ActivityView--nameAndRelationshipContainer']}>
                        <div className={classNames['wc-ActivityView--InviteeName']}>{invitee.name}</div>
                        <div className={classNames['wc-ActivityView--InviteeRelationship']}>{invitee.relationship}</div>
                    </Stack>
                </Stack>
                <div>{invitee.hasAccepted ? <CheckMark /> : <QuestionMark />}</div>
            </Stack>
        );
        return { content: content };
    });

    const getActivityMembers = () => {
        const members = [];
        let careCircleMembers = activeActivity?.careCircle?.careCircleMembers;
        if (careCircleMembers?.length) {
            for (let i = 0; i < careCircleMembers.length; i++) {
                let careMemberExperienceOccurrences = careCircleMembers[i].experienceOccurrences;
                for (let j = 0; j < careMemberExperienceOccurrences.length; j++) {
                    if (careMemberExperienceOccurrences[j].experience.id === activeActivity.id) {
                        members.push(careCircleMembers[i].careGiver.id);
                    }
                }
            }
        }

        return members;
    };

    const activityMembers = getActivityMembers();

    const currentUserHasAcceptedInvite = activityMembers?.includes(careGiverData?.me?.id);

    const InvitedList = () => {
        return (
            <Stack
                tokens={{ childrenGap: LABEL_CARD_TOKEN_GAP }}
                className={classNames['wc-ActivityView--listContainer']}
            >
                <Text className={classNames['wc-ActivityView--sectionTitle']}>Invited:</Text>
                <ReusableCardList buttonPropsList={inviteeButtonProps} />
            </Stack>
        );
    };

    const declineActivityModalProps = {
        modalTitle: 'Declining an activity',
        modalDescriptionText: 'Be sure to let your loved one know if you have already coordinated a day and time.',
        confirmButtonText: 'Ok, thanks',
        confirmButtonOnClick: () => onDecline(),
        cancelButtonText: 'Cancel',
        cancelButtonOnClick: () => setShowModal(false),
        closeModal: () => setShowModal(false),
        modalIsOpen: showModal,
    };

    return (
        <>
            <SubHeaderLayout
                title={'Together Time'}
                actionButtonText={'Edit'}
                onClickActionButton={showEditPanel}
                onDelete={toggleHideDeleteDialog}
                deleteButtonDisabled={deleteLoading}
            >
                {loading ? (
                    <Spinner />
                ) : (
                    <Stack
                        data-testid="activityView"
                        tokens={{ childrenGap: isMobile ? '0px' : '16px' }}
                        className={classNames['wc-ActivityView--pageContainer']}
                        horizontalAlign={isMobile ? 'center' : null}
                        // horizontal={!isMobile}
                    >
                        <div className={classNames['wc-ActivityView--backButton']}>
                            <Back />
                        </div>

                        <div>
                            <ActivityLogo />
                        </div>

                        <Stack
                            tokens={{ childrenGap: '16px' }}
                            className={classNames['wc-ActivityView--contentContainer']}
                        >
                            <Text data-testid={'activity-name'} className={classNames['wc-ActivityView--title']}>
                                {activeActivity?.title}
                            </Text>

                            {isMobile && <ActionButtonRow onDelete={toggleHideDeleteDialog} hideSeparator />}

                            <Details />

                            <InvitedList />
                            {currentUserHasAcceptedInvite ? (
                                <DefaultButton
                                    className={classNames['wc-ActivityView--buttonContainer']}
                                    text="Decline"
                                    onClick={() => setShowModal(true)}
                                />
                            ) : (
                                <PrimaryButton
                                    className={classNames['wc-ActivityView--buttonContainer']}
                                    text="Sign-up"
                                    onClick={onSignUp}
                                />
                            )}

                            <div>
                                <DeleteDialog
                                    hidden={hideDeleteDialog}
                                    toggleHideDialog={toggleHideDeleteDialog}
                                    onDelete={handleDelete}
                                    screen={PagesWithDelete.activity}
                                >
                                    Delete
                                </DeleteDialog>
                                <FormErrorBar error={deleteError?.message} />
                            </div>
                        </Stack>

                        <ReusableModal {...declineActivityModalProps} />

                        <Panel
                            isOpen={showEdit}
                            isLightDismiss
                            hasCloseButton={false}
                            onDismiss={hideEditPanel}
                            data-testid="editPanel"
                            // Disabling navigation container to replace with header in form
                            onRenderNavigation={() => null}
                            onRenderHeader={() => null}
                            styles={PanelStyleOverrides}
                            type={PanelType.custom}
                            customWidth={customWidth}
                        >
                            <ActivityEdit onDismiss={hideEditPanel} activity={activeActivity} />
                        </Panel>
                    </Stack>
                )}
            </SubHeaderLayout>
        </>
    );
};

export default ActivityView;
