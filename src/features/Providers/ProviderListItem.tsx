import React from 'react';
import { DocumentCard, Stack, Text } from '@fluentui/react';
import { getClassNames } from './ProviderListItem.classNames';
import { useNavigate } from 'react-router';
import RouterConfig from 'src/app/RouterConfig';
import { trackClick } from 'src/wcpConsentInit';
import { formatPhoneNumber } from 'src/utils/utils';

interface ProviderListItemProps {
    name: string;
    phoneNumber: string;
    id: string;
    specialty?: string;
}

const ProviderListItem: React.FC<ProviderListItemProps> = (props) => {
    const { name, phoneNumber, id, specialty } = props;
    const classNames = getClassNames();

    const navigate = useNavigate();
    const formattedPhoneNumber = phoneNumber ? formatPhoneNumber(phoneNumber) : undefined;

    return (
        <div
            className={classNames['wc-ProviderListItem--itemCell']}
            data-is-focusable
            onClick={() => {
                trackClick('pharmacy-list-item');
                navigate(RouterConfig.Provider(id));
            }}
            data-testid={'pharmacy-list-item'}
        >
            <DocumentCard className={classNames['wc-ProviderListItem--providerCard']}>
                <Stack className={classNames['wc-ProviderListItem--container']} tokens={{ childrenGap: 4 }}>
                    <Text className={classNames['wc-ProviderListItem--name']} data-testid={'pharmacy-name'}>
                        {name}
                    </Text>
                    {specialty && <Text>{specialty}</Text>}
                    <a
                        href={`tel: ${phoneNumber}`}
                        className={classNames['wc-ProviderListItem--phone']}
                        data-testid={'pharmacy-phone'}
                        // Prevent clicking phone number from navigating to next screen
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                    >
                        {formattedPhoneNumber}
                    </a>
                </Stack>
            </DocumentCard>
        </div>
    );
};

export default ProviderListItem;
