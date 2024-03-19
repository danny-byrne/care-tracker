import { Stack, Text } from '@fluentui/react';
import SubHeaderLayout from 'src/common/components/Layout/SubHeaderLayout';

const PageNotFound = () => {
    return (
        <SubHeaderLayout title={'Page Not Found'}>
            <Stack verticalAlign="end" horizontalAlign="center" tokens={{ childrenGap: 20 }}>
                <Text variant="xxLarge">We are sorry, the page you requested cannot be found </Text>
                <Text variant="large">
                    The URL may be misspelled or the page you&apos;re looking for is no longer available.{' '}
                </Text>
            </Stack>
        </SubHeaderLayout>
    );
};

export default PageNotFound;
