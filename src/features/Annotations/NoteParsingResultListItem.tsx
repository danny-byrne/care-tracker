import React from 'react';
import { Checkbox, DocumentCard, Stack, Text } from '@fluentui/react';
import { getClassNames } from '../Allergies/AllergyListItem.classNames';

interface INoteParsingResultListItemProps {
    name: string;
    isChecked: boolean;
    onChange: (isChecked: boolean) => void;
}

const NoteParsingResultListItem: React.FC<INoteParsingResultListItemProps> = ({ name, isChecked, onChange }) => {
    const classNames = getClassNames();

    return (
        <div className={classNames['wc-AllergyListItem--itemCell']} data-is-focusable>
            <DocumentCard className={classNames['wc-AllergyListItem--allergyCard']}>
                <Stack
                    horizontal
                    horizontalAlign="space-between"
                    className={classNames['wc-AllergyListItem--container']}
                    tokens={{ childrenGap: 4 }}
                >
                    <Text className={classNames['wc-AllergyListItem--name']}>{name}</Text>
                    <Checkbox
                        checked={isChecked}
                        onChange={(_, checked: boolean) => {
                            onChange(checked);
                        }}
                    />
                </Stack>
            </DocumentCard>
        </div>
    );
};

export default NoteParsingResultListItem;
