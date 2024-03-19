import React from 'react';
import { CommandButton, IButtonProps, IContextualMenuItem, IContextualMenuProps } from '@fluentui/react';
import { ReactComponent as FilterHeart } from 'src/assets/Timeline/FilterHeart.svg';
import { EntityIcon, entityTypeTitle } from './timelineUtils';
import { TimelineEntityType } from 'src/graphQL/serverMocks/graphQLGeneratedCode';

interface TimelineFilterButtonProps extends IButtonProps {
    onItemClick?: (_: any, item?: IContextualMenuItem) => void;
}

export const FILTER_RESET_KEY = 'RESET_FILTER_KEY';

/**
 * A custom `CommandButton` that opens a menu with filter options for the timeline.
 */
const TimelineFilterButton: React.FC<TimelineFilterButtonProps> = ({ onItemClick, ...props }) => {
    const filterMenuProps: IContextualMenuProps = {
        onItemClick: onItemClick,
        items: [
            {
                key: FILTER_RESET_KEY,
                text: 'All',
                iconProps: {
                    iconName: 'List',
                    styles: {
                        root: {
                            color: 'black',
                        },
                    },
                },
            },
            {
                key: TimelineEntityType.Appointment,
                text: entityTypeTitle(TimelineEntityType.Appointment, true),
                onRenderIcon: () => <EntityIcon entityType={TimelineEntityType.Appointment} />,
            },
            {
                key: TimelineEntityType.ConditionOccurrence,
                text: entityTypeTitle(TimelineEntityType.ConditionOccurrence, true),
                onRenderIcon: () => <EntityIcon entityType={TimelineEntityType.ConditionOccurrence} />,
            },
            {
                key: TimelineEntityType.Immunization,
                text: entityTypeTitle(TimelineEntityType.Immunization, true),
                onRenderIcon: () => <EntityIcon entityType={TimelineEntityType.Immunization} />,
            },
            {
                key: TimelineEntityType.Prescription,
                text: entityTypeTitle(TimelineEntityType.Prescription, true),
                onRenderIcon: () => <EntityIcon entityType={TimelineEntityType.Prescription} />,
            },
        ],
    };

    return (
        <CommandButton
            iconProps={{ iconName: 'Filter' }}
            onRenderIcon={() => <FilterHeart />}
            menuProps={filterMenuProps}
            disabled={false}
            style={{ marginBottom: '16px' }}
            {...props}
        />
    );
};

export default TimelineFilterButton;
