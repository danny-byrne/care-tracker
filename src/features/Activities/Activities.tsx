import React, { useEffect } from "react";
import { useGetActivitiesQuery } from "src/graphQL/serverMocks/graphQLGeneratedCode";
import { useFeedbackService } from "src/services/FeedbackService";
import { useQueryStringParams } from "src/common/hooks/useQueryStringParams";
import { useIsMobile } from "src/common/hooks/useMediaQueries";
import { useGetDataForPrintPages } from "src/common/hooks/useGetDataForPrintPages";
import { useAddPanelControls } from "src/common/hooks/useAddPanel";
import { useReactToPrint } from "react-to-print";

import {
  DefaultButton,
  GroupedList,
  IGroup,
  IGroupHeaderProps,
  Spinner,
  Stack,
  Text,
  Image,
} from "@fluentui/react";
import ActivityCard from "./ActivityCard";
import ActivityAdd from "./ActivityAdd";
import { FloatingActionButton, Header } from "src/common/components";
import Accordion from "src/common/components/Accordion/Accordion";
import { AddPanel } from "src/common/components/Panel/AddPanel";

import { Activity } from "src/types/Activity";
import ActivitiesIcon from "src/assets/Activities/ActivitiesIcon.svg";
import { getClassNames } from "./Activities.classNames";
import { ReuseableCardButtonList } from "src/common/components";
import { getClassNames as getFABClassNames } from "src/common/components/FAB/FloatingActionButton.classNames";
import ActivitiesPrint from "src/features/PrintableContent/ActivitiesPrint";
import ReusablePrintButton from "src/common/components/ReusablePrintButton/ReusablePrintButton";
import PrintableContentContainer from "src/features/PrintableContent/PrintableContentContainer";

export enum ActivityOptions {
  Call = "call",
  Visit = "visit",
  Letter = "letter",
  Custom = "custom",
  Outing = "outing",
}

const Activities = () => {
  const { getSearchParam, removeSearchParam } = useQueryStringParams();
  const status = getSearchParam("status");
  const isMobile = useIsMobile();
  const fabClassNames = getFABClassNames(false);

  const classNames = getClassNames();
  const { showAddPanelWithCustomParameter, showAddPanel, hideAddPanel } =
    useAddPanelControls();
  const { setSuccessToast, setErrorToast } = useFeedbackService();
  const recipientData = useGetDataForPrintPages();

  const { data, loading } = useGetActivitiesQuery({
    fetchPolicy: "cache-and-network",
    onError: (error) => {
      setErrorToast(error.message);
    },
  });

  useEffect(() => {
    if (status === "deleted") {
      removeSearchParam("status");
      setSuccessToast(`Activity ${status}`);
    }
    if (status === "added") {
      removeSearchParam("status");
      setSuccessToast(
        "Create another one",
        "Activity Created",
        `Let's Go`,
        () => showAddPanel()
      );
    }
  }, [status]);

  const ActivitiesFirstTimeUserExperience = () => {
    const HEADER_LINE = `Add your first activity`;
    const IDEAS_LINE = "Customize one of these for the Care Circle";

    const ACTIVITY_FTUE_CARD_INFO = [
      {
        label: "Phone Call",
        icon: "Phone",
        onClick: () => showAddPanelWithCustomParameter(ActivityOptions.Call),
      },
      {
        label: "Home Visit",
        icon: "House",
        onClick: () => showAddPanelWithCustomParameter(ActivityOptions.Visit),
      },
      {
        label: "Outing",
        icon: "Car",
        onClick: () => showAddPanelWithCustomParameter(ActivityOptions.Outing),
      },
      {
        label: "Send a Letter",
        icon: "Letter",
        onClick: () => showAddPanelWithCustomParameter(ActivityOptions.Letter),
      },
      {
        label: "Create your own",
        icon: "Pen",
        onClick: () => showAddPanelWithCustomParameter(ActivityOptions.Custom),
      },
    ];

    return (
      <>
        <Stack
          tokens={{ childrenGap: 8 }}
          className={classNames["wc-Activities--ftueContainer"]}
          horizontalAlign="center"
        >
          <Image src={ActivitiesIcon} />
          <Text className={classNames["wc-Activities--header"]}>
            {HEADER_LINE}
          </Text>
          <Text className={classNames["wc-Activities--subHeader"]}>
            {IDEAS_LINE}
          </Text>
        </Stack>

        <ReuseableCardButtonList buttonPropsList={ACTIVITY_FTUE_CARD_INFO} />
      </>
    );
  };

  // Infrastructure for future groups
  const getActivityGroups = (activities: Activity[]): IGroup[] => {
    const groups: IGroup[] = [];

    if (activities !== undefined) {
      groups.push({
        key: "All Activities",
        name: "All Activities",
        startIndex: 0,
        count: activities.length,
      });
    }

    return groups;
  };

  const NewActivityButton = () => {
    return (
      <DefaultButton
        className={classNames["wc-Activities--newActivityButton"]}
        onClick={() => {
          showAddPanel();
        }}
      >
        Create New Activity
      </DefaultButton>
    );
  };

  const onRenderHeader = (props?: IGroupHeaderProps): JSX.Element | null => {
    if (props) {
      const toggleCollapse = (): void => {
        // eslint-disable-next-line react/prop-types
        props.onToggleCollapse!(props.group!);
      };
      return (
        <Stack
          horizontal
          className={classNames["wc-Activities--allActivitiesHeader"]}
          verticalAlign="center"
        >
          <Accordion
            // eslint-disable-next-line react/prop-types
            collapsed={props.group!.isCollapsed}
            onToggle={() => {
              toggleCollapse();
            }}
            // eslint-disable-next-line react/prop-types
            header={<Header text={props.group!.name} />}
          />
          <Stack horizontal tokens={{ childrenGap: 10 }} verticalAlign="center">
            <ReusablePrintButton onClick={handlePrint} />
            {/* eslint-disable-next-line react/prop-types */}
            {!isMobile && props?.group?.key === "All Activities" && (
              <NewActivityButton />
            )}
          </Stack>
        </Stack>
      );
    }

    return null;
  };

  const experiences = data?.careCircleExperiences?.experiences;

  const ActivitiesList = () => {
    return (
      <GroupedList
        className={classNames["wc-Activities--activityCardList"]}
        items={experiences}
        groupProps={{ onRenderHeader }}
        groups={getActivityGroups(experiences)}
        styles={{
          root: {
            gap: 5,
          },
        }}
        onRenderCell={(nestingDepth: 1, item: Activity, itemIndex: number) => {
          return (
            <div
              data-selection-index={itemIndex}
              role="row"
              className={classNames["wc-Activities--activityCard"]}
            >
              <span role="cell">
                <ActivityCard activity={item} />
              </span>
            </div>
          );
        }}
      />
    );
  };

  const printActivitiesRef = React.useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    content: () => printActivitiesRef.current,
    documentTitle: "Activities",
  });

  return loading ? (
    <Spinner />
  ) : (
    <Stack
      className={classNames["wc-Activities--container"]}
      tokens={{ childrenGap: 24 }}
    >
      {experiences?.length === 0 ? (
        <ActivitiesFirstTimeUserExperience />
      ) : (
        <>
          <ActivitiesList />
          <PrintableContentContainer ref={printActivitiesRef}>
            <ActivitiesPrint
              experiences={experiences}
              recipientData={recipientData}
            />
          </PrintableContentContainer>
        </>
      )}

      {isMobile && (
        <Stack
          className={fabClassNames["wc-FloatingActionButton--fabContainer"]}
        >
          <FloatingActionButton onClick={showAddPanel} />
        </Stack>
      )}

      <AddPanel>
        <ActivityAdd onDismiss={hideAddPanel} />
      </AddPanel>
    </Stack>
  );
};

export default Activities;
