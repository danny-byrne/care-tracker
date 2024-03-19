import { Stack } from '@fluentui/react';
import { getClassNames } from './DataProtectionNotice.classNames';

const DataProtectionNotice = () => {
    const classNames = getClassNames();
    return (
        <Stack className={classNames['wc-DataProtectionNotice--container']}>
            <div className={classNames['wc-DataProtectionNotice--notice']}>Data Protection Notice</div>
            <div>Overview</div>
            <div>
                Data Protection Notice Last updated: June 2022 What&apos;s New? Print Overview Your privacy is important
                to Microsoft (“we”, “us”, “our” or “Microsoft”). We respect the privacy rights of all individuals and we
                are committed to handling personal data responsibly and in accordance with applicable laws. This privacy
                notice, together with the Addenda and other notices provided at the time of data collection, explain
                what personal data Microsoft collects about you, how we use this personal data, and your rights to this
                personal data.
            </div>
        </Stack>
    );
};

export default DataProtectionNotice;
