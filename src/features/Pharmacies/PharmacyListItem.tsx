/*eslint-disable*/
import React from 'react';
import { DocumentCard, Stack, Text } from '@fluentui/react';
import { getClassNames } from './PharmacyListItem.classNames';
import { useNavigate } from 'react-router';
import RouterConfig from 'src/app/RouterConfig';
import { trackClick } from 'src/wcpConsentInit';

interface PharmacyListItemProps {
    name: string;
    phoneNumber: string;
    id: string;
}

const PharmacyListItem: React.FC<PharmacyListItemProps> = (props) => {
    const { name, phoneNumber, id } = props;
    const classNames = getClassNames();

    const navigate = useNavigate();

    return (
        <div
            className={classNames['wc-PharmacyListItem--itemCell']}
            data-is-focusable
            onClick={() => {
                trackClick('pharmacy-list-item');
                navigate(RouterConfig.Pharmacy(id));
            }}
            data-testid={'pharmacy-list-item'}
        >
            <DocumentCard className={classNames['wc-PharmacyListItem--pharmacyCard']}>
                <Stack className={classNames['wc-PharmacyListItem--container']} tokens={{ childrenGap: 4 }}>
                    <Text data-testid={'pharmacy-name'} className={classNames['wc-PharmacyListItem--name']}>
                        {name}
                    </Text>
                    <a
                        data-testid={'pharmacy-phone'}
                        href={`tel: ${phoneNumber}`}
                        className={classNames['wc-PharmacyListItem--phone']}
                        // Prevent clicking phone number from navigating to next screen
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                    >
                        {phoneNumber}
                    </a>
                </Stack>
            </DocumentCard>
        </div>
    );
};

export default PharmacyListItem;
