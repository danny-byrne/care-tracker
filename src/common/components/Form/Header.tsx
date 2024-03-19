import { Text } from '@fluentui/react';
import { getClassNames } from './Header.classNames';

interface HeaderProps {
    text: string;
}

const Header = (props: HeaderProps) => {
    const classNames = getClassNames();
    const { text } = props;
    return (
        <Text variant="mediumPlus" className={classNames['wc-Header--textStyle']}>
            {text}
        </Text>
    );
};

export default Header;
