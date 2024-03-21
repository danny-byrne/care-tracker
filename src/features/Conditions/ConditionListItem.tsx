import React from "react";
import { DocumentCard, Stack, Text } from "@fluentui/react";
import { getClassNames } from "./ConditionListItem.classNames";
import { useNavigate } from "react-router";
import RouterConfig from "src/app/RouterConfig";

interface MedicationListItemProps {
  name: string;
  id: string;
  timeframeText: string;
  index: number;
  hasNoStartDate: boolean;
}

const ConditionListItem: React.FC<MedicationListItemProps> = ({
  name,
  id,
  timeframeText,
  hasNoStartDate,
}) => {
  const classNames = getClassNames();

  const navigate = useNavigate();

  const navigateToConditionEditPage = (e) => {
    e.stopPropagation();
    navigate(RouterConfig.Condition(id) + "?mode=edit", { replace: true });
  };

  const navigateToConditionDetailsPage = () => {
    navigate(RouterConfig.Condition(id));
  };

  const ConditionTextWithNoStartDate = () => {
    return (
      <Text
        className={classNames["wc-ConditionListItem--noStartDate"]}
        data-testid={"conditon-timeframe"}
        onClick={navigateToConditionEditPage}
      >
        {timeframeText}
      </Text>
    );
  };

  const ConditionTextWithStartDate = () => {
    return (
      <Text
        className={classNames["wc-ConditionListItem--timeframe"]}
        data-testid={"conditon-timeframe"}
      >
        {timeframeText}
      </Text>
    );
  };

  return (
    <div
      className={classNames["wc-ConditionListItem--itemCell"]}
      data-is-focusable
      onClick={navigateToConditionDetailsPage}
      data-testid={"condition-list-item"}
    >
      <DocumentCard
        className={classNames["wc-ConditionListItem--ConditionCard"]}
      >
        <Stack
          className={classNames["wc-ConditionListItem--container"]}
          tokens={{ childrenGap: 4 }}
        >
          <Text
            className={classNames["wc-ConditionListItem--name"]}
            data-testid={"conditon-name"}
          >
            {name}
          </Text>
          {hasNoStartDate ? (
            <ConditionTextWithNoStartDate />
          ) : (
            <ConditionTextWithStartDate />
          )}
        </Stack>
      </DocumentCard>
    </div>
  );
};

export default ConditionListItem;
