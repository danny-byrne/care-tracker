import { Shimmer, Text } from '@fluentui/react';

import { getClassNames } from './MemberList.classNames';

interface ICareCircleNameProps {
    loading: boolean;
    careCircleName: string;
}
export const CareCircleName = (props: ICareCircleNameProps) => {
    const { loading, careCircleName } = props;
    const classNames = getClassNames();

    return loading ? (
        <Shimmer className={classNames['wc-MemberList--careCircleNameClass']} />
    ) : (
        <Text className={classNames['wc-MemberList--careCircleNameClass']}>{careCircleName}</Text>
    );
};
