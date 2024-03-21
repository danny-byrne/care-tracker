import React from "react";

import { Pivot, PivotItem } from "@fluentui/react";

import SubHeaderLayout, { SubHeaderLayoutProps } from "./SubHeaderLayout";
import { PIVOT_BUTTON_WIDTH } from "src/app/Styles";

interface SubHeaderWithFilterLayoutProps extends SubHeaderLayoutProps {
  filter: string;
  onLinkClick: (item?: PivotItem) => void;
  filterButtons: {
    headerText: string;
    itemKey: string;
  }[];
  pivotAriaLabel: string;
  pivotTestId: string;
  onClickUploadDocument?: (e) => void;
}

const SubHeaderWithFilterLayout: React.FC<SubHeaderWithFilterLayoutProps> = ({
  children,
  title,
  onClose,
  actionButtonText,
  actionButtonDisabled,
  onClickActionButton,
  onDelete,
  onShare,
  filter,
  onLinkClick,
  filterButtons,
  pivotAriaLabel,
  pivotTestId,
  onClickUploadDocument,
}) => {
  const pivotWidth = `${filterButtons.length * PIVOT_BUTTON_WIDTH}px`;

  return (
    <>
      <SubHeaderLayout
        {...{
          title,
          onClose,
          actionButtonText,
          actionButtonDisabled,
          onClickActionButton,
          onDelete,
          onShare,
          onClickUploadDocument,
        }}
      >
        <>
          <Pivot
            style={{ width: pivotWidth }}
            aria-label={pivotAriaLabel}
            selectedKey={filter}
            headersOnly
            linkFormat="tabs"
            data-testid={pivotTestId}
            onLinkClick={(item) => {
              onLinkClick(item);
            }}
          >
            {filterButtons.map((filterButton) => (
              <PivotItem key={filterButton.itemKey} {...filterButton} />
            ))}
          </Pivot>
        </>
        {children}
      </SubHeaderLayout>
    </>
  );
};

export default SubHeaderWithFilterLayout;
