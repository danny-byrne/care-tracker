import React, { useEffect, useState } from 'react';
import { useIsMobile } from 'src/common/hooks/useMediaQueries';
import { useAddPanelControls } from 'src/common/hooks/useAddPanel';
import { useQueryStringParams } from 'src/common/hooks/useQueryStringParams';

import { Stack } from '@fluentui/react';
import SubHeaderLayout from 'src/common/components/Layout/SubHeaderLayout';
import ImmunizationAdd from './ImmunizationAdd';
import { AddPanel } from 'src/common/components/Panel/AddPanel';

import { getClassNames as getFABClassNames } from 'src/common/components/FAB/FloatingActionButton.classNames';
import { useLocation, useNavigate } from 'react-router';
import { RecordStatus, useGetImmunizationsQuery } from 'src/graphQL/serverMocks/graphQLGeneratedCode';
import { useFeedbackService } from 'src/services/FeedbackService';
import { ERROR_MESSAGES } from 'src/app/Strings';
import RouterConfig from 'src/app/RouterConfig';
import { FloatingActionButton } from 'src/common/components';
import ImmunizationListItem from './ImmunizationListItem';
import { Immunization } from 'src/types/Immunization';
import { MonthIndicies } from 'src/common/helpers/monthFormatting';

interface ImmunizationLocationState {
    mode: string;
}

const ImmunizationList: React.FC = () => {
    const fabClassNames = getFABClassNames(false);

    const navigate = useNavigate();
    const { setErrorToast, setSuccessToast } = useFeedbackService();
    const isMobile = useIsMobile();

    const { getSearchParam, removeSearchParam } = useQueryStringParams();
    const status = getSearchParam('status');

    const location = useLocation();
    const state = location.state as ImmunizationLocationState;

    const { showAddPanel, hideAddPanel, showAdd } = useAddPanelControls();
    const [immunizationAdded, setImmunizationAdded] = useState(false);

    const { data, loading } = useGetImmunizationsQuery({
        onError: () => {
            setErrorToast(ERROR_MESSAGES.GET_IMMUNIZATIONS);
        },
    });

    useEffect(() => {
        if (status === 'added' || status === 'deleted') {
            removeSearchParam('status');
            setSuccessToast(`Immunization ${status}`);
        }
        if (status === 'added') {
            setImmunizationAdded(true);
        }
    }, [status]);

    useEffect(() => {
        if (state?.mode === 'add') {
            showAddPanel();
        }
    }, []);

    // Navigate back to care plan if the list is empty and an entity hasn't just been added
    useEffect(() => {
        const activeImmunizations = data?.careRecipientImmunizations.immunizations.filter(
            (immunization) => immunization.recordStatus == RecordStatus.Active,
        ).length;
        const emptyListWithoutAddModal =
            !loading &&
            state?.mode !== 'add' &&
            !showAdd &&
            activeImmunizations === 0 &&
            status !== 'added' &&
            !immunizationAdded;

        // If only 0 active entity remains, user has deleted last entity
        const emptyListAfterDelete = status === 'deleted' && activeImmunizations === 0;

        if (emptyListWithoutAddModal || emptyListAfterDelete) {
            navigate(RouterConfig.CarePlan);
        }
    }, [loading, state, showAdd, status, immunizationAdded, data]);

    const onClickActionButton = isMobile ? undefined : showAddPanel;

    const [activeImmunizationList, setActiveImmunizationList] = useState<Immunization[]>([]);

    useEffect(() => {
        const activeImmunizations = data?.careRecipientImmunizations?.immunizations?.filter(
            (immunization) => immunization.recordStatus == RecordStatus.Active,
        );
        const sortedExactDates = activeImmunizations
            ? activeImmunizations.sort((a, b) => {
                  if (a.immunizationDateYear === b.immunizationDateYear) {
                      // null checks included to account for days or months that aren't entered
                      if (
                          a.immunizationDateMonth === b.immunizationDateMonth &&
                          a.immunizationDateMonth &&
                          b.immunizationDateMonth
                      ) {
                          if (a.immunizationDateDay && b.immunizationDateDay) {
                              return b.immunizationDateDay - a.immunizationDateDay;
                          }
                      } else {
                          return MonthIndicies[b.immunizationDateMonth] - MonthIndicies[a.immunizationDateMonth];
                      }
                  } else {
                      return b.immunizationDateYear - a.immunizationDateYear;
                  }
              })
            : [];
        const sortedRelativeDates = activeImmunizations
            ? activeImmunizations
                  .filter((immunization) => immunization.immunizationDateRelativePeriodStart !== null)
                  .sort((a, b) => {
                      if (a.immunizationDateRelativePeriodStart === b.immunizationDateRelativePeriodStart) {
                          return b.immunizationDateRelativePeriodEnd - a.immunizationDateRelativePeriodEnd;
                      }
                      return b.immunizationDateRelativePeriodStart - a.immunizationDateRelativePeriodStart;
                  })
            : [];

        const sortedImmunizations = [...sortedExactDates, ...sortedRelativeDates];

        setActiveImmunizationList(sortedImmunizations);
    }, [data]);

    return (
        <SubHeaderLayout title={'Immunizations'} actionButtonText={'Add'} onClickActionButton={onClickActionButton}>
            {data && (
                <Stack>
                    {activeImmunizationList?.map((immunization) => {
                        return <ImmunizationListItem immunization={immunization} key={immunization.id} />;
                    })}
                </Stack>
            )}
            {isMobile && (
                <Stack className={fabClassNames['wc-FloatingActionButton--fabContainer']}>
                    <FloatingActionButton onClick={showAddPanel} />
                </Stack>
            )}
            <AddPanel>
                <ImmunizationAdd onDismiss={hideAddPanel} />
            </AddPanel>
        </SubHeaderLayout>
    );
};

export default ImmunizationList;
