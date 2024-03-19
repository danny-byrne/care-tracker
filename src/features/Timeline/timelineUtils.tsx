import { TimelineEntityStatus, TimelineEntity, TimelineEntityType } from 'src/graphQL/serverMocks/graphQLGeneratedCode';
import RouterConfig from 'src/app/RouterConfig';
import TimelineListHeader from './TimelineListHeader';
import TimelineListItem from './TimelineListItem';

import { ReactComponent as PillIcon } from 'src/assets/Timeline/PillIcon.svg';
import { ReactComponent as StethoscopeIcon } from 'src/assets/Timeline/StethoscopeIcon.svg';
import { ReactComponent as SyringeIcon } from 'src/assets/Timeline/SyringeIcon.svg';
import { ReactComponent as CalendarIcon } from 'src/assets/Timeline/CalendarIcon.svg';

export const EntityIcon = ({ entityType, style }: { entityType: TimelineEntityType; style?: any }): JSX.Element => {
    switch (entityType) {
        case TimelineEntityType.Appointment:
            return <CalendarIcon style={style} />;
        case TimelineEntityType.ConditionOccurrence:
            return <StethoscopeIcon style={style} />;
        case TimelineEntityType.Immunization:
            return <SyringeIcon style={style} />;
        case TimelineEntityType.Prescription:
            return <PillIcon style={style} />;
    }
};

export const entityTypeTitle = (type: TimelineEntityType, plural = false): string => {
    switch (type) {
        case TimelineEntityType.Appointment:
            return plural ? 'Appointments' : 'Appointment';
        case TimelineEntityType.ConditionOccurrence:
            return plural ? 'Conditions' : 'Condition';
        case TimelineEntityType.Immunization:
            return plural ? 'Immunizations' : 'Immunization';
        case TimelineEntityType.Prescription:
            return plural ? 'Prescriptions' : 'Prescription';
    }
};

export const entityHeader = (entity: TimelineEntity): string => {
    return entity.relativeTimePeriod?.toString() ?? entity.date?.year.toString() ?? '';
};

export const entityTitle = (entity: TimelineEntity): string => {
    switch (entity.status) {
        case TimelineEntityStatus.Default:
            return entity.text;
        case TimelineEntityStatus.Start:
            return `${entity.text} started`;
        case TimelineEntityStatus.End:
            return `${entity.text} ended`;
    }
};

export const gradientCircleColors = (entityType: TimelineEntityType): [string, string] => {
    switch (entityType) {
        case TimelineEntityType.Appointment:
            return ['rgba(205, 122, 234, 0.25)', 'rgba(189, 36, 202, 0.25)'];
        case TimelineEntityType.ConditionOccurrence:
            return ['rgba(234, 122, 122, 0.25)', 'rgba(202, 36, 36, 0.25)'];
        case TimelineEntityType.Immunization:
            return ['rgba(234, 216, 122, 0.25)', 'rgba(189, 202, 36, 0.25)'];
        case TimelineEntityType.Prescription:
            return ['rgba(122, 127, 234, 0.25)', 'rgba(36, 97, 202, 0.25)'];
    }
};

export const entityUrl = (entity: TimelineEntity): string => {
    switch (entity.type) {
        case TimelineEntityType.Appointment:
            return RouterConfig.Appointment(entity.id);
        case TimelineEntityType.ConditionOccurrence:
            return RouterConfig.Condition(entity.id);
        case TimelineEntityType.Immunization:
            return RouterConfig.Immunization(entity.id);
        case TimelineEntityType.Prescription:
            return RouterConfig.Medication(entity.id);
    }
};

export const timelineEntitiesToListElements = (entities: TimelineEntity[]): JSX.Element[] => {
    const listItems: JSX.Element[] = [];

    for (let i = 0; i < entities.length; i++) {
        const entity = entities[i];
        const previousEntity = i > 0 ? entities[i - 1] : undefined;

        const header = entityHeader(entity);
        const showHeader = previousEntity ? header !== entityHeader(previousEntity) : true;
        if (showHeader) {
            listItems.push(<TimelineListHeader key={`header-${header}`} text={header} />);
        }

        let showDate = previousEntity
            ? entity.date?.day !== previousEntity.date?.day ||
              entity.date?.month !== previousEntity.date?.month ||
              entity.date?.year !== previousEntity.date?.year
            : true;

        if (entity.relativeTimePeriod) {
            showDate = false;
        }

        const key = `${entity.type}-${entity.id}-${entity.status}`;
        listItems.push(
            <TimelineListItem key={key} entity={entity} showDate={showDate} isLast={i === entities.length - 1} />,
        );
    }

    return listItems;
};
