import React, { useEffect } from 'react';
import ConditionSearch from 'src/common/components/AutoCompleteSearch/ConditionSearch/ConditionSearch';

import { getClassNames } from './ConditionWizard.className';

import { IConditionWizardPageProps } from './ConditionWizard';

export const ConditionSearchPage: React.FC<IConditionWizardPageProps> = ({ formik, setNextButtonEnabled }) => {
    const classNames = getClassNames();

    useEffect(() => {
        setNextButtonEnabled(false);
    }, []);

    useEffect(() => {
        setNextButtonEnabled(formik.values.condition?.conditionName !== undefined);
    }, [formik.values.condition?.conditionName]);

    return (
        <div className={classNames['wc-ConditionWizard--conditionPageContainer']}>
            <ConditionSearch
                formik={formik}
                aria-label="Condition Search"
                defaultTerm={formik.values.condition?.conditionName}
            />
        </div>
    );
};
