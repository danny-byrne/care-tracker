import React from 'react';
import { DocumentCard, Stack, Text } from '@fluentui/react';
import { getClassNames } from './AllergyListItem.classNames';
import { useNavigate } from 'react-router';
import RouterConfig from 'src/app/RouterConfig';
import { AllergySeverity } from 'src/graphQL/serverMocks/graphQLGeneratedCode';
import { capitalizeOnlyFirstLetter } from 'src/common/helpers/textFormatting';
import { trackClick } from 'src/wcpConsentInit';

interface IAllergyListItemProps {
    name: string;
    severity: AllergySeverity;
    id: string;
}

const AllergyListItem: React.FC<IAllergyListItemProps> = (props) => {
    const { name, id, severity } = props;
    const classNames = getClassNames();

    const navigate = useNavigate();

    const severityFormatted = capitalizeOnlyFirstLetter(severity);

    return (
        <div
            className={classNames['wc-AllergyListItem--itemCell']}
            data-is-focusable
            onClick={() => {
                trackClick('allergy-list-item');
                navigate(RouterConfig.Allergy(id));
            }}
            data-testid={'allergy-list-item'}
        >
            <DocumentCard className={classNames['wc-AllergyListItem--allergyCard']}>
                <Stack className={classNames['wc-AllergyListItem--container']} tokens={{ childrenGap: 4 }}>
                    <Text className={classNames['wc-AllergyListItem--name']} data-testid={'allergy-name'}>
                        {name}
                    </Text>
                    <Text data-testid={'allergy-severity'}>{`${severityFormatted} Reaction`}</Text>
                </Stack>
            </DocumentCard>
        </div>
    );
};

export default AllergyListItem;
