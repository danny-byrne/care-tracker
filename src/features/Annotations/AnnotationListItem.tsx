import React from "react";
import { DocumentCard, IconButton, Stack, Text } from "@fluentui/react";
import { getClassNames } from "./AnnotationListItem.classNames";
import { useNavigate } from "react-router";
import {
  Annotation,
  AnnotationType,
} from "src/graphQL/serverMocks/graphQLGeneratedCode";
import RouterConfig from "src/app/RouterConfig";

interface IAnnotationListItemProps {
  annotation: Annotation;
  onDelete?: (annotation: Annotation) => void;
}

const AnnotationListItem: React.FC<IAnnotationListItemProps> = (props) => {
  const classNames = getClassNames();
  const navigate = useNavigate();
  const { annotation, onDelete } = props;

  let type;
  let color;
  switch (annotation.type) {
    case AnnotationType.Note:
      type = "Note";
      color = "green";
      break;
    case AnnotationType.Question:
      type = "Question";
      color = "orange";
      break;
    default:
      type = "Unknown";
      color = "black";
      break;
  }

  const date = new Date(annotation.createdDateTime);
  const text = annotation.title ?? annotation.text;

  return (
    <div
      className={classNames["wc-AnnotationListItem--row"]}
      data-is-focusable
      onClick={() => {
        navigate(RouterConfig.Annotation(annotation.id));
      }}
    >
      <DocumentCard className={classNames["wc-AnnotationListItem--card"]}>
        <Stack
          horizontal
          horizontalAlign="space-between"
          verticalAlign="center"
        >
          <Stack
            className={classNames["wc-AnnotationListItem--container"]}
            tokens={{ childrenGap: 4 }}
          >
            <Text
              className={classNames["wc-AnnotationListItem--type"]}
              style={{ color: color }}
            >
              {type}
            </Text>
            <Text className={classNames["wc-AnnotationListItem--date"]}>
              {date.toLocaleString()}
            </Text>
            <Text className={classNames["wc-AnnotationListItem--text"]}>
              {text}
            </Text>
          </Stack>
          <IconButton
            className={classNames["wc-AnnotationListItem--deleteButton"]}
            iconProps={{ iconName: "Trash" }}
            title={`Delete ${type}`}
            onClick={(event) => {
              event.stopPropagation();
              onDelete(annotation);
            }}
          />
        </Stack>
      </DocumentCard>
    </div>
  );
};

export default AnnotationListItem;
