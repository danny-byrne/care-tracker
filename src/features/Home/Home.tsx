import React, { useEffect, useState } from 'react';
import { Stack, Text } from '@fluentui/react';

import SubHeaderLayout from 'src/common/components/Layout/SubHeaderLayout';
import { PAGE_TITLES } from 'src/app/Constants';
import {
    useGetCarePlanConditionLazyQuery,
    useGetCareRecipientConditionsQuery,
    useGetCareTeamQuery,
    useGetConditionResourcesLazyQuery,
    useGetPositivitySlotLazyQuery,
    useCarePlanCreateMutation,
    useActivityDeleteMutation,
    useGetCareRecipientCarePlanLazyQuery,
    RecordStatus,
} from 'src/graphQL/serverMocks/graphQLGeneratedCode';
import { getClassNames } from './Home.classNames';
import ToolkitCarousel from './ToolkitCarousel';
import SuggestedArticle from './SuggestedArticle';
import ConditionsTodayView from './ConditionsTodayView';
import PositivitySlot from './PositivitySlot';
import { WebPageResource } from './SuggestedArticle';
import { useFeatureFlags } from 'src/common/hooks/useFeatureFlags';

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
    const { data } = useGetCareTeamQuery();

    const [relationshipToLovedOne, setRelationshipToLovedOne] = useState('NOT_SET');
    const [conditionName, setConditionName] = useState('');
    const [conditionId, setConditionId] = useState('');
    const [userName, setUserName] = useState(data?.me?.firstName);
    const defaultResources: WebPageResource[] = [];
    const [resources, setResources] = useState(defaultResources);

    const [sixMonthToolkitTasks, setSixMonthToolkitTasks] = useState([]);
    const [dailyTasks, setDailyTasks] = useState([]);
    const [openAIGeneratedTasks, setOpenAIGeneratedTasks] = useState([]);
    const [newConditionPresent, setNewConditionPresent] = useState(false);
    const [carePlans, setCarePlans] = useState(null);
    const [activeConditions, setActiveConditions] = useState([]);

    const {
        welcomeMessageState,
        sixMonthToolkitState,
        suggestedArticleState,
        positivitySlotState,
        todayViewState,
        setPositivitySlotEnabled,
    } = useFeatureFlags();

    useEffect(() => {
        if (carePlans?.length && conditionId) {
            //find a current care plan based conditionId
            const activeConditionCarePlanIndex = carePlans.findIndex(
                (plan) => plan.conditionOccurrence.id === conditionId,
            );
            //if not found, perform OpenAI queries and create new care plan based on new condition
            if (activeConditionCarePlanIndex === -1) {
                setNewConditionPresent(true);
            } else {
                const { activities } = carePlans[activeConditionCarePlanIndex];
                handleSortActivities(activities);
            }
        }
    }, [carePlans, conditionId]);

    useEffect(() => {
        const userId = data?.me?.id;
        const userData = data?.usersCareCircle?.careCircleMembers.find((member) => member?.careGiver?.id === userId);
        setRelationshipToLovedOne(userData?.relationshipToLovedOne);
    }, [data]);

    useEffect(() => {
        setUserName(data?.me?.firstName);
    }, [data]);

    const [welcomeText, setWelcomeText] = useState(`You're not alone in this journey`);

    useEffect(() => {
        if (userName !== undefined) setWelcomeText(`${userName}, you're not alone in this journey`);
    }, [userName]);

    const DEFAULT_MESSAGE = `Caring for a loved one can be
    challenging and stressful, but it is also a rewarding and meaningful experience.
    Remember to take care of yourself and prioritize self-care to avoid burnout.
    You are not alone and we’re here to help you navigate this journey.`;

    const [positivityMessage, setPositivityMessage] = useState(DEFAULT_MESSAGE);

    const { data: conditionsData } = useGetCareRecipientConditionsQuery();
    const [getPositivityMessage] = useGetPositivitySlotLazyQuery();
    const [getCarePlanCondition] = useGetCarePlanConditionLazyQuery();
    const [getConditionResources] = useGetConditionResourcesLazyQuery();
    const [getCareRecipientCarePlanData] = useGetCareRecipientCarePlanLazyQuery();

    const getCareRecipientCarePlanDataWrapper = async () => {
        const careRecipientCarePlanData = await getCareRecipientCarePlanData();
        const carePlans = careRecipientCarePlanData?.data?.careRecipientCarePlans?.carePlans;

        setCarePlans(carePlans);
    };

    useEffect(() => {
        getCareRecipientCarePlanDataWrapper();
    }, []);

    //will only run the initial time we load this page per condition
    const [createCarePlan] = useCarePlanCreateMutation({
        refetchQueries: ['GetCareRecipientCarePlan'],
        errorPolicy: 'all',
        onCompleted: () => {
            setTimeout(() => getCareRecipientCarePlanDataWrapper(), 1000);
        },
    });

    const [deleteActivity] = useActivityDeleteMutation({
        onCompleted: (data) => {
            const { id } = data.activityDelete.result;
            handleUpdateSixMonthTasksAfterDismiss(id);
        },
    });

    useEffect(() => {
        const userId = data?.me?.id;
        const userData = data?.usersCareCircle?.careCircleMembers.find((member) => member?.careGiver?.id === userId);
        setRelationshipToLovedOne(userData?.relationshipToLovedOne);

        const activeConditions = conditionsData?.careRecipientConditions?.conditions?.filter(
            (condition) =>
                !condition.conditionEndDateYear &&
                !condition.conditionEndDateRelativePeriodStart &&
                condition.recordStatus == RecordStatus.Active,
        );

        const arrayLength = activeConditions?.length;
        if (arrayLength) {
            const sortedConditions = [...activeConditions].sort((a, b) => {
                if (a.conditionStartDateYear > b.conditionStartDateYear) {
                    return -1;
                } else {
                    return 1;
                }
            });
            const activeConditionNames = sortedConditions.map((condition) => condition.condition.name);
            setActiveConditions(activeConditionNames);

            const mostRecentConditionName = sortedConditions[0]?.condition?.name;
            setConditionName(mostRecentConditionName);

            const mostRecentConditionId = sortedConditions[0]?.id;
            setConditionId(mostRecentConditionId);
        }
    }, [conditionsData]);

    const handleUpdateSixMonthTasksAfterDismiss = (id) => {
        const updatedTasks = sixMonthToolkitTasks.filter((task) => task.id !== id);
        setSixMonthToolkitTasks(updatedTasks);
    };

    const handleDeleteActivity = (id) => {
        deleteActivity({ variables: { input: { id } } });
    };

    const handleSortActivities = (activities) => {
        const dailyTasks = activities?.filter((task) => task.recurrence === 'FREQ=DAILY');
        const toolkitTasks = activities?.filter((task) => task.recurrence !== 'FREQ=DAILY');
        setDailyTasks(dailyTasks);
        setSixMonthToolkitTasks(toolkitTasks);
    };

    useEffect(() => {
        if (openAIGeneratedTasks?.length) {
            const carePlanCreateActivities = openAIGeneratedTasks?.map((task) => {
                return {
                    description: task.task,
                    recurrence: task.recurrence,
                };
            });

            const carePlanCreateInput = {
                activities: carePlanCreateActivities,
                conditionOccurrence: { id: conditionId },
            };

            createCarePlan({ variables: { input: carePlanCreateInput } });
            setNewConditionPresent(false);
            setOpenAIGeneratedTasks([]);
        }
    }, [openAIGeneratedTasks]);

    useEffect(() => {
        const setNewPositivityMessage = async () => {
            const activeConditionsList = activeConditions.join(', ');
            const result = await getPositivityMessage({
                variables: {
                    input: { condition: activeConditionsList, careRecipientRelationship: relationshipToLovedOne },
                },
            });
            const message = result?.data?.inquiryPositivitySlot?.result?.choices[0]?.text;
            setPositivityMessage(message);
        };

        const getResources = async () => {
            const result = await getConditionResources({
                variables: { input: { searchText: conditionName + ' caregiver' } },
            });
            const resourceResults = result?.data?.resourceSearch?.result?.webPages?.value.slice(0, 3);
            setResources(resourceResults !== undefined ? resourceResults : []);
        };

        const getCondition = async () => {
            const carePlanConditionResult = await getCarePlanCondition({
                variables: { input: { condition: conditionName } },
            });
            const tasks = carePlanConditionResult?.data?.inquiryCarePlanCondition?.result?.choices[0]?.text;

            setOpenAIGeneratedTasks(tasks);
        };

        if (conditionName) {
            setNewPositivityMessage();
            getResources();
            //only query OpenAI if no Care Plan already created in response to this, i.e. only run this once, initially.
            const carePlanHasNotBeenCreated = carePlans?.length === 0 || newConditionPresent;
            if (carePlanHasNotBeenCreated) {
                getCondition();
            }
        }
    }, [relationshipToLovedOne, conditionName, activeConditions, carePlans, newConditionPresent]);

    const classNames = getClassNames();

    const todayViewEnabled = todayViewState;

    const showTodayView = todayViewEnabled && conditionName && dailyTasks?.length > 0;

    const sixMonthToolKitEnabled = sixMonthToolkitState;

    const SuggestedArticleEnabled = suggestedArticleState;

    const WelcomeTextEnabled = welcomeMessageState;

    return (
        <>
            <SubHeaderLayout title={PAGE_TITLES.HOME}>
                <Stack className={classNames['wc-Home--container']}>
                    {WelcomeTextEnabled && <Text className={classNames['wc-Home--header']}>{welcomeText}</Text>}
                    {positivitySlotState && positivityMessage && (
                        <PositivitySlot
                            positivityMessage={positivityMessage}
                            dismissOnClick={() => setPositivitySlotEnabled(false)}
                        />
                    )}

                    {showTodayView && <ConditionsTodayView conditionName={conditionName} dailyTasks={dailyTasks} />}

                    {sixMonthToolkitTasks?.length > 0 && sixMonthToolKitEnabled && (
                        <ToolkitCarousel tasks={sixMonthToolkitTasks} handleDeleteActivity={handleDeleteActivity} />
                    )}

                    {resources.length > 0 && SuggestedArticleEnabled && <SuggestedArticle resources={resources} />}
                </Stack>
            </SubHeaderLayout>
        </>
    );
};

export default Home;
