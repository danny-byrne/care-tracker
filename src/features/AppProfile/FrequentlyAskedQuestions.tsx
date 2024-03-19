import React from 'react';
import { faqText, medManagerFaqText, carePlanFaqText } from './constants';
import { Stack, Separator, IconButton } from '@fluentui/react';
import { getClassNames } from './FrequentlyAskedQuestions.classNames';
import { useIsMobile } from 'src/common/hooks/useMediaQueries';
import { useNavigate } from 'react-router';
import RouterConfig from 'src/app/RouterConfig';
import { useWindowDimensions } from 'src/common/hooks/useMediaQueries';

interface IFAQProps {
    fromInitLogin?: boolean;
}

const FrequentlyAskedQuestions: React.FC<IFAQProps> = ({ fromInitLogin = false }) => {
    let { height } = useWindowDimensions();
    const isMobile = useIsMobile();

    const classNames = getClassNames(height);
    const navigate = useNavigate();

    const frequentlyAskedQuestions = faqText.map((item) => {
        return <QuestionAndAnswer key={item.question} question={item.question} answer={item.answer} />;
    });

    const medManagerFaq = medManagerFaqText.map((item) => {
        return <QuestionAndAnswer key={item.question} question={item.question} answer={item.answer} />;
    });

    const carePlanFaq = carePlanFaqText.map((item) => {
        return <QuestionAndAnswer key={item.question} question={item.question} answer={item.answer} />;
    });

    const content = (
        <Stack tokens={{ childrenGap: 10 }} className={classNames['wc-FAQ--listContainer']}>
            <div className={classNames['wc-FAQ--label']}>FAQ</div>
            {frequentlyAskedQuestions}
            <div className={classNames['wc-FAQ--label']}>Med Manager</div>
            {medManagerFaq}
            <div className={classNames['wc-FAQ--label']}>Care Plan</div>
            {carePlanFaq}
        </Stack>
    );

    return isMobile && !fromInitLogin ? (
        content
    ) : (
        <Stack className={classNames['wc-FAQ--desktopPageContainer']}>
            <Stack horizontal verticalAlign="center" className={classNames['wc-FAQ--panelHeader']}>
                <div>FAQs</div>
                <IconButton
                    data-testid={'Cancel'}
                    className={classNames['wc-FAQ--removeButton']}
                    iconProps={{ iconName: 'Cancel' }}
                    onClick={() => navigate(RouterConfig.CarePlan)}
                    disabled={false}
                />
            </Stack>
            <Separator className={classNames['wc-FAQ--separator']} />
            {content}
        </Stack>
    );
};

interface IQuestionAnswerProps {
    question: string;
    answer?: string | JSX.Element;
}

const QuestionAndAnswer: React.FC<IQuestionAnswerProps> = ({ question, answer }) => {
    const classNames = getClassNames();

    return (
        <Stack tokens={{ childrenGap: 5 }} className={classNames['wc-FAQ--questionAndAnswer']}>
            <div className={classNames['wc-FAQ--question']}>{question}</div>
            <div>{answer}</div>
        </Stack>
    );
};

export default FrequentlyAskedQuestions;
