import { Component, ErrorInfo, ReactNode } from 'react';
import { Stack, Text } from '@fluentui/react';
import SubHeaderLayout from '../Layout/SubHeaderLayout';

interface Props {
    children?: ReactNode;
}

interface State {
    hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
    };

    public static getDerivedStateFromError(error: Error): State {
        // Update state so the next render will show the fallback UI.
        if (error) {
            return { hasError: true };
        }
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <SubHeaderLayout title={'Error'}>
                    <Stack horizontalAlign="center">
                        <Text variant="xxLarge">We are sorry, something went wrong. </Text>
                        <Text variant="large">Please try again later..</Text>
                    </Stack>
                </SubHeaderLayout>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
