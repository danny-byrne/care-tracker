import React, { ReactNode } from 'react';

import { Stack, Text } from '@fluentui/react';
import { QuestionMarkCircle } from 'src/assets/Misc/QuestionMarkCircle';
import { Notepad } from 'src/assets/Misc/Notepad';

const exampleQuestions = [
    '"What can I ask a clinician?"',
    '"How do I dress a wound?"',
    '"How can I assist someone with mobility challenges?"',
];
const exampleNotes = [
    'The claritiy I have mom for her allergies helped.',
    "Mom hasn't been sleeping well and wakes up often during the night.",
    'It might be time to get mom a walker and we should discuss this with the doctor.',
];

import { getClassNames } from './AnnotationEmptyState.classNames';
const classNames = getClassNames();

const AnnotationsEmptyState: React.FC = () => {
    const exampleSection = (title: string, examples: string[], icon: ReactNode) => {
        return (
            <Stack horizontalAlign="center" tokens={{ childrenGap: 8 }}>
                <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 9 }}>
                    <div className={classNames['wc-AnnotationEmptyState--icon']}>{icon}</div>
                    <div className={classNames['wc-AnnotationEmptyState--labelText']}>{title}:</div>
                </Stack>
                <Stack tokens={{ childrenGap: 3 }}>
                    {examples.map((example) => {
                        return (
                            <div key={example} className={classNames['wc-AnnotationEmptyState--exampleBox']}>
                                {example}
                            </div>
                        );
                    })}
                </Stack>
            </Stack>
        );
    };
    return (
        <Stack horizontalAlign="center" tokens={{ childrenGap: 20 }}>
            <Text className={classNames['wc-AnnotationEmptyState--instructionText']}>
                When you ask a question or take a note it will appear here.
            </Text>
            <div className={classNames['wc-AnnotationEmptyState--horizontalLine']} />
            {exampleSection('Questions', exampleQuestions, <QuestionMarkCircle />)}
            {exampleSection('Notes', exampleNotes, <Notepad />)}
        </Stack>
    );
};

export default AnnotationsEmptyState;
