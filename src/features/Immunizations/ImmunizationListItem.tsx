import React from 'react';
import { DocumentCard, Stack, Text } from '@fluentui/react';
import { getClassNames } from './ImmunizationListItem.classNames';
import { useNavigate } from 'react-router';
import RouterConfig from 'src/app/RouterConfig';
import { Immunization } from 'src/types/Immunization';
import { useImmunizationDateText } from 'src/common/hooks/useImmunizationDateText';
import { trackClick } from 'src/wcpConsentInit';

interface ImmunizationListItemProps {
    immunization: Immunization;
}

const ImmunizationListItem: React.FC<ImmunizationListItemProps> = (props) => {
    const { immunization } = props;
    const classNames = getClassNames();

    const navigate = useNavigate();

    const { dateText, timeframeText } = useImmunizationDateText(immunization);

    return (
        <div
            className={classNames['wc-ImmunizationListItem--itemCell']}
            data-is-focusable
            onClick={() => {
                trackClick('immunization-list-item');
                navigate(RouterConfig.Immunization(immunization.id));
            }}
            data-testid={'immunization-list-item'}
        >
            <DocumentCard className={classNames['wc-ImmunizationListItem--immunizationCard']}>
                <Stack className={classNames['wc-ImmunizationListItem--container']} tokens={{ childrenGap: 4 }}>
                    <Text className={classNames['wc-ImmunizationListItem--name']} data-testid={'immunization-date'}>
                        {immunization.vaccineProductAdministered.name}
                    </Text>
                    {dateText && <Text data-testid={'immunization-date'}>{dateText}</Text>}
                    {timeframeText && <Text data-testid={'immunization-timeframe'}>{timeframeText}</Text>}
                </Stack>
            </DocumentCard>
        </div>
    );
};

export default ImmunizationListItem;
