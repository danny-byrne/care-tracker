import { useNavigate } from "react-router";

import React from "react";
import { Stack } from "@fluentui/react";
import { Activity } from "src/types/Activity";

import RouterConfig from "src/app/RouterConfig";
import { getActivityCardClassNames } from "./Activities.classNames";
import ReusableCardList from "src/common/components/ReusableCardList/ReusableCardList";

interface IActivityCardProps {
  activity: Activity;
}

const ActivityCard: React.FC<IActivityCardProps> = ({ activity }) => {
  const navigate = useNavigate();

  const membersSignedUp = activity.careCircle?.careCircleMembers.filter(
    (member) => {
      return (
        member.experienceOccurrences.filter(
          (occurrence) => occurrence.experience.id === activity.id
        ).length > 0
      );
    }
  );

  // If phoneNumber or address and availability are present, 3 sections are rendered, else 2
  const numberOfSections =
    (activity?.phoneNumber || activity?.address?.addressLine1) &&
    activity?.availability
      ? 3
      : 2;
  const activityClassNames = getActivityCardClassNames(numberOfSections);

  const ActivityCardSection = () => {
    const contentCard = {
      content: (
        <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 10 }}>
          {activity?.availability && (
            <div data-testid={"activity-time"}>
              Availability: {activity?.availability}
            </div>
          )}
        </Stack>
      ),
      header: (
        <div
          data-testid={"activity-name"}
          className={activityClassNames["wc-ActivityCard--title"]}
        >
          {activity.title ?? ""}
        </div>
      ),
    };
    const signUpCard = !membersSignedUp.length
      ? {
          clickableContent: (
            <div
              className={activityClassNames["wc-ActivityCard--semiBoldText"]}
            >
              Be the first to sign up
            </div>
          ),
        }
      : null;
    const activityDetailsCards = [contentCard, signUpCard].filter(
      (element) => element !== null
    );
    return <ReusableCardList buttonPropsList={activityDetailsCards} />;
  };

  return (
    <div
      data-testid="activity-item"
      data-is-focusable
      onClick={() => {
        navigate(RouterConfig.Activity(activity.id));
      }}
    >
      <ActivityCardSection />
    </div>
  );
};

export default ActivityCard;
