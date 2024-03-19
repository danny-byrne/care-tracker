import { MessageBar, MessageBarType } from '@fluentui/react';

const ErrorBar = (props: ErrorBarProps) => {
    const { error, className } = props;
    if (!error) return null;
    return (
        <MessageBar messageBarType={MessageBarType.error} className={className}>
            {error}
        </MessageBar>
    );
};

interface ErrorBarProps {
    error: string | null;
    className?: string;
}

export default ErrorBar;
