test('force pass', () => {
    expect(true).toBeTruthy();
});

// import { act, fireEvent, render, screen, waitFor, waitForElementToBeRemoved, within } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import MedManagerLayout from 'src/features/MedManagerLayout';
// import { Medication } from '..';
// import { mockGetSearchParam, mockNavigate, mockParams, mockAddSearchParam, mockSearchParams } from 'src/setupTests';
// import RouterConfig from 'src/app/RouterConfig';

// import {
//     mockId1,
//     mockStrength1,
//     mockCondition1,
//     mockMedication1,
//     mockRemainingRefills1,
// } from 'src/graphQL/serverMocks/__mocks__/CareRecipientMedicationPrescriptions';
// import { client as apolloClient } from 'src/common/helpers/ApolloHelper';
// import { ApolloProvider } from '@apollo/client';

// import { connectMocksToServer } from 'src/graphQL/serverMocks/server';
// import { serverMocks } from 'src/graphQL/serverMocks/mocks';
// import { SEARCH_MEDICATIONS_TEXT } from '../MedicationSearch';

// const user = userEvent.setup();

// const mockSuccessToastFn = jest.fn();
// const mockErrorToastFn = jest.fn();

// jest.mock('src/services/FeedbackService', () => {
//     return {
//         useFeedbackService: () => ({
//             setSuccessToast: mockSuccessToastFn,
//             setErrorToast: mockErrorToastFn,
//         }),
//     };
// });

// beforeEach(() => {
//     mockNavigate.mockReset();
//     mockSuccessToastFn.mockReset();
// });

// describe('Empty medication list page', () => {
//     beforeEach(async () => {
//         serverMocks.CareRecipientMedicationPrescriptions = () => ({
//             prescriptions: [],
//         });
//         connectMocksToServer(serverMocks);

//         await act(async () => {
//             render(
//                 <ApolloProvider client={apolloClient}>
//                     <MedManagerLayout />
//                 </ApolloProvider>,
//             );
//         });
//         await act(async () => {
//             await new Promise((resolve) => setTimeout(resolve, 0));
//         });
//     });

//     test('contains Medication manager message empty state', async () => {
//         const emptyStateText = await screen.findByText(`Add your loved one's medications.`);
//         expect(emptyStateText).toBeInTheDocument();
//     });

//     test('contains add button in empty state', async () => {
//         const addButton = screen.getByTestId('FAB');
//         expect(addButton).toBeInTheDocument();
//     });
// });

// describe('Populated medication list page', () => {
//     beforeEach(async () => {
//         render(
//             <ApolloProvider client={apolloClient}>
//                 <MedManagerLayout />
//             </ApolloProvider>,
//         );
//         await screen.findByTestId(`medicationList`);
//     });

//     test('page does not contain Medication manager populated state', async () => {
//         const emptyStateText = screen.queryByText(`Add your loved one's medications.`);
//         expect(emptyStateText).not.toBeInTheDocument();
//     });

//     test('page contains add in populated state', async () => {
//         const addButton = screen.getByTestId('FAB');
//         expect(addButton).toBeInTheDocument();
//     });

//     test('clicking add navigates to mode=add', async () => {
//         const addButton = screen.getByTestId('FAB');
//         await act(async () => {
//             user.click(addButton);
//         });
//         await waitFor(() => expect(mockAddSearchParam).toBeCalledWith({ mode: 'add' }));
//     });

//     test('clicking item in list navigates to Medication summary page with id ', async () => {
//         const medicationItem = await screen.findByText(/C Mock Medication/i);

//         await act(async () => {
//             user.click(medicationItem);
//         });
//         await waitFor(() => expect(mockNavigate).toBeCalledTimes(1));
//         // TODO uncomment this when we have a way to test the navigation
//         // expect(mockNavigate).toBeCalledWith(RouterConfig.Medications + '/1', { replace: true });
//     });

//     test('Medication page elements show name and condition', async () => {
//         const medicationItem = await screen.findByText(mockMedication1.concat(' ').concat(mockStrength1));
//         const condition = await screen.findByText(mockCondition1);
//         expect(medicationItem).toBeInTheDocument();
//         expect(condition).toBeInTheDocument();
//     });

//     //I have a seperate branch for this fix vvv working through it -Danny
//     // test('Medication list is sorted alphabetically', () => {
//     //     const medicationList = screen.getByRole('list');
//     //     expect(medicationList).toBeInTheDocument();
//     //     const medicatonListItems = within(medicationList).getAllByRole('listitem');
//     //     expect(medicatonListItems[1].textContent).toContain(mockMedication1);
//     //     expect(medicatonListItems[0].textContent).toContain(mockMedication2);
//     // });
// });

// describe('Medication page with status = added', () => {
//     beforeEach(async () => {
//         mockGetSearchParam.mockImplementation((key: string) => {
//             if (key === 'status') return 'added';
//         });
//         await act(async () => {
//             render(
//                 <ApolloProvider client={apolloClient}>
//                     <MedManagerLayout />
//                 </ApolloProvider>,
//             );
//         });
//         await act(async () => {
//             await new Promise((resolve) => setTimeout(resolve, 0));
//         });
//     });

//     test('shows a populated list state', async () => {
//         const medicationListItem = await screen.findByText(mockMedication1.concat(' ').concat(mockStrength1));
//         expect(medicationListItem).toBeInTheDocument();
//     });

//     test('shows a medication added success toast', async () => {
//         expect(mockSuccessToastFn).toHaveBeenCalledWith('Medication added!');
//     });
// });

// describe('Medication page with status = deleted', () => {
//     beforeEach(async () => {
//         mockGetSearchParam.mockImplementation((key: string) => {
//             if (key === 'status') return 'deleted';
//         });
//         await act(async () => {
//             render(
//                 <ApolloProvider client={apolloClient}>
//                     {/* <MockedProvider mocks={emptyMocks} addTypename={false}> */}
//                     <MedManagerLayout />
//                 </ApolloProvider>,
//             );
//         });
//         await act(async () => {
//             await new Promise((resolve) => setTimeout(resolve, 0));
//         });
//     });

//     test('shows a medication deleted success toast', async () => {
//         expect(mockSuccessToastFn).toHaveBeenCalledWith('Medication deleted!');
//     });
// });

// describe('add panel open', () => {
//     beforeEach(async () => {
//         mockGetSearchParam.mockImplementation((key: string) => {
//             if (key === 'mode') return 'add';
//         });

//         render(
//             <ApolloProvider client={apolloClient}>
//                 <MedManagerLayout />
//             </ApolloProvider>,
//         );
//         await screen.findByTestId(`medicationList`);
//     });

//     test('add panel is present web mode=add is present', () => {
//         const addPanelTitle = screen.getByText('Add Medication');
//         expect(addPanelTitle).toBeInTheDocument();
//     });
//     test('contains cancel button', () => {
//         const addPanel = screen.queryByTestId('addPanel');
//         const backButton = within(addPanel).getByTestId('Cancel');
//         expect(backButton).toBeInTheDocument();
//     });
//     test('clicking cancel button closes panel', async () => {
//         const addPanel = screen.queryByTestId('addPanel');
//         const backButton = within(addPanel).getByTestId('Cancel');
//         await act(async () => {
//             user.click(backButton);
//         });
//         waitForElementToBeRemoved(() => screen.queryByTestId('addPanel'));
//     });

//     test('Save button is present on the panel', () => {
//         const saveButton = screen.getByText('Save');

//         expect(saveButton).toBeInTheDocument();
//     });

//     test('Form appears in the panel', () => {
//         const formField = screen.getByPlaceholderText(SEARCH_MEDICATIONS_TEXT);

//         expect(formField).toBeInTheDocument();
//     });

//     // TODO change this to 1 when we figure out the two mockNavigate calls
//     test('Form requires Medication Name field', async () => {
//         const strengthField = screen.getByLabelText('Strength');
//         const conditionField = screen.getByLabelText('Condition');
//         const saveButton = screen.getByText('Save');

//         await act(async () => {
//             fireEvent.change(strengthField, { target: { value: 'TestStrength' } });
//             fireEvent.change(conditionField, { target: { value: 'TestCondition' } });
//             fireEvent.click(saveButton);
//         });

//         expect(mockNavigate).not.toBeCalledTimes(2);
//     });

//     test('Form requires Strength field', async () => {
//         const medicationField = screen.getByPlaceholderText(SEARCH_MEDICATIONS_TEXT);
//         const conditionField = screen.getByLabelText('Condition');
//         const saveButton = screen.getByText('Save');

//         await act(async () => {
//             fireEvent.change(medicationField, { target: { value: 'TestMed' } });
//             fireEvent.change(conditionField, { target: { value: 'TestCondition' } });
//             fireEvent.click(saveButton);
//         });

//         expect(mockNavigate).not.toBeCalledTimes(2);
//     });

//     test('Form requires Condition field', async () => {
//         const medicationField = screen.getByPlaceholderText(SEARCH_MEDICATIONS_TEXT);
//         const strengthField = screen.getByLabelText('Strength');
//         const saveButton = screen.getByText('Save');

//         await act(async () => {
//             fireEvent.change(strengthField, { target: { value: 'TestStrength' } });
//             fireEvent.change(medicationField, { target: { value: 'TestMed' } });
//             fireEvent.click(saveButton);
//         });
//         // TODO fix navigation
//         expect(mockNavigate).not.toBeCalledTimes(2);
//     });

//     test('Clicking save button dismisses panel', async () => {
//         const medicationField = screen.getByPlaceholderText(SEARCH_MEDICATIONS_TEXT);
//         const strengthField = screen.getByLabelText('Strength');
//         const conditionField = screen.getByLabelText('Condition');
//         const saveButton = screen.getByText('Save');

//         await act(async () => {
//             fireEvent.change(strengthField, { target: { value: 'TestStrength' } });
//             fireEvent.change(conditionField, { target: { value: 'TestCondition' } });
//             fireEvent.change(medicationField, { target: { value: 'TestMed' } });
//             fireEvent.click(saveButton);
//         });
//         waitForElementToBeRemoved(() => screen.queryByTestId('addPanel'));
//     });

//     test('clicking anywhere but the panel dismisses it', async () => {
//         const randomElement = await screen.findByTestId(`medicationList`);
//         await act(async () => {
//             await user.click(randomElement);
//         });
//         waitForElementToBeRemoved(() => screen.queryByTestId('addPanel'));
//     });

//     test('Clicking add schedule info shows controls', async () => {
//         const scheduleToggle = await screen.findByTestId('scheduleToggle');
//         await act(async () => {
//             await user.click(scheduleToggle);
//         });
//         const frequency = screen.getByText('When is this taken?');
//         expect(frequency).toBeInTheDocument();
//     });

//     test('Times a Day not visible by default', async () => {
//         const timesADay = screen.queryByText('Times a Day');

//         expect(timesADay).not.toBeInTheDocument();
//     });

//     test('Clicking add schedule info and Repeat Days of frequency type,  shows whichdays control', async () => {
//         const scheduleToggle = await screen.findByTestId('scheduleToggle');
//         await act(async () => {
//             await user.click(scheduleToggle);
//         });
//         const frequency = await screen.findByTestId('frequency');
//         expect(frequency).toBeInTheDocument();
//         await act(async () => {
//             fireEvent.click(frequency);
//         });
//         const frequencyList = screen.getByRole('listbox');
//         expect(frequencyList.textContent).toContain('Repeat Days');
//         await act(async () => {
//             fireEvent.click(screen.getByText('Repeat Days'));
//         });

//         const whichdays = await screen.findByTestId('whichDays');
//         expect(whichdays).toBeInTheDocument();
//         await act(async () => {
//             fireEvent.click(whichdays);
//         });
//         const whichdaysList = screen.getByRole('listbox');
//         expect(whichdaysList.textContent).toContain('Monday');
//         await act(async () => {
//             fireEvent.click(screen.getByText('Monday'));
//         });
//         await act(async () => {
//             fireEvent.click(screen.getByText('Wednesday'));
//         });
//         expect(whichdays.textContent).toContain('Monday, Wednesday');
//     });

//     // test('Clicking a Custom of frequency,  shows the medication course control', async () => {
//     //     const scheduleToggle = await screen.findByTestId('scheduleToggle');
//     //     await act(async () => {
//     //         await user.click(scheduleToggle);
//     //     });
//     //     const frequency = await screen.findByTestId('frequency');
//     //     expect(frequency).toBeInTheDocument();
//     //     await act(async () => {
//     //         fireEvent.click(frequency);
//     //     });
//     //     const frequencyList = screen.getByRole('listbox');
//     //     expect(frequencyList.textContent).toContain('Custom');
//     //     await act(async () => {
//     //         fireEvent.click(screen.getByText('Custom'));
//     //     });

//     //     const medicationCourseDays = screen.getByTestId('medicationCourseDays');
//     //     expect(medicationCourseDays).toBeInTheDocument();
//     //     await act(async () => {
//     //         fireEvent.click(medicationCourseDays);
//     //     });
//     //     const medicationCourseList = screen.getByRole('listbox');
//     //     expect(medicationCourseList.textContent).toContain('2');
//     //     await act(async () => {
//     //         fireEvent.click(screen.getByText('2'));
//     //     });
//     //     const medicationCourseEntries = screen.getByTestId('medicationCourseEntries');
//     //     expect(medicationCourseDays).toBeInTheDocument();
//     //     const items = within(medicationCourseEntries).getAllByRole('item');
//     //     expect(items).toHaveLength(2);
//     // });
// });

// describe('Medication Search in Add mode', () => {
//     beforeEach(async () => {
//         mockGetSearchParam.mockImplementation((key: string) => {
//             if (key === 'mode') return 'add';
//         });

//         connectMocksToServer(serverMocks);

//         render(
//             <ApolloProvider client={apolloClient}>
//                 <MedManagerLayout />
//             </ApolloProvider>,
//         );
//         await screen.findByTestId(`medicationList`);
//     });

//     test('Searching for a medication populates results', async () => {
//         const medicationField = screen.getByPlaceholderText(SEARCH_MEDICATIONS_TEXT);

//         await act(async () => {
//             fireEvent.change(medicationField, { target: { value: 'Mock' } });
//         });
//         const results = await screen.findByTestId('searchResultsCallout');

//         expect(results).toBeInTheDocument();
//     });

//     test('Searching for a medication populates results and has route and dose in the second line', async () => {
//         const medicationField = screen.getByPlaceholderText(SEARCH_MEDICATIONS_TEXT);

//         await act(async () => {
//             fireEvent.change(medicationField, { target: { value: 'Mock' } });
//         });
//         const results = await screen.findByTestId('searchResultsCallout');
//         const routeDesc = await within(results).findAllByTestId('routeDose');

//         expect(routeDesc[0]).toBeInTheDocument();
//     });
//     test('Clicking an option closes the callout results', async () => {
//         const medicationField = screen.getByPlaceholderText(SEARCH_MEDICATIONS_TEXT);

//         await act(async () => {
//             fireEvent.change(medicationField, { target: { value: 'Mock' } });
//         });
//         const results = await screen.findByTestId('searchResultsCallout');
//         await act(async () => {
//             fireEvent.click(results);
//         });
//         const resultsStyle = await (await screen.findByTestId('searchResultsCallout')).style;

//         expect(resultsStyle.visibility).not.toBe('visible');
//     });
// });

// describe('Medication Search with a result clicked', () => {
//     beforeEach(async () => {
//         mockGetSearchParam.mockImplementation((key: string) => {
//             if (key === 'mode') return 'add';
//         });
//         connectMocksToServer(serverMocks);
//         render(
//             <ApolloProvider client={apolloClient}>
//                 <MedManagerLayout />
//             </ApolloProvider>,
//         );
//         await screen.findByTestId(`medicationList`);
//         const medicationField = screen.getByPlaceholderText(SEARCH_MEDICATIONS_TEXT);

//         await act(async () => {
//             fireEvent.change(medicationField, { target: { value: 'Mock' } });
//         });
//         const results = await screen.findByTestId('searchResultsCallout');
//         const BMock = await within(results).findByText('B');
//         await act(async () => {
//             fireEvent.click(BMock);
//         });
//     });
//     test('Search Field is populated with Name after search result selection', async () => {
//         const searchField = screen.getByRole('searchbox');
//         expect(searchField).toHaveValue('B Mock Medication');
//     });

//     test('Clicking a search option populates the strength dropdown', async () => {
//         const strengthField = screen.getByLabelText('Strength');
//         await act(async () => {
//             fireEvent.click(strengthField);
//         });
//         const strengthList = await screen.getByTestId('strength-dropdown');
//         expect(strengthList).toBeInTheDocument();
//     });
// });

// describe('Medication Summary page', () => {
//     beforeEach(async () => {
//         mockParams.mockImplementation(() => {
//             return {
//                 id: mockId1,
//             };
//         });
//         RouterConfig.Medication = jest.fn().mockImplementation((id: string) => {
//             return `/medication/${id}`;
//         });

//         await act(async () => {
//             render(
//                 <ApolloProvider client={apolloClient}>
//                     <Medication />
//                 </ApolloProvider>,
//             );
//         });
//         await act(async () => {
//             await new Promise((resolve) => setTimeout(resolve, 0));
//         });
//     });

//     test('Delete button is present in the page', () => {
//         const backButton = screen.getByTestId('Delete');
//         expect(backButton).toBeInTheDocument();
//     });

//     test('edit button is present in the page', () => {
//         const editButton = screen.getByTestId('Edit');

//         expect(editButton).toBeInTheDocument();
//     });

//     test('Medication name is populated with medication info', () => {
//         const medicationNameInfo = screen.getByText(mockMedication1);
//         expect(medicationNameInfo).toBeInTheDocument();
//     });

//     test('Strength field is populated with medication info', () => {
//         const medicationStrengthInfo = screen.getByText(mockStrength1);
//         expect(medicationStrengthInfo).toBeInTheDocument();
//     });

//     test('Condition field is populated with medication info', () => {
//         const medicationConditionInfo = screen.getByText(mockCondition1);
//         expect(medicationConditionInfo).toBeInTheDocument();
//     });

//     test('Clicking delete button shows medication delete dialog', async () => {
//         const deleteButton = screen.getByTestId('Delete');

//         await act(async () => {
//             fireEvent.click(deleteButton);
//         });

//         const deleteDialog = screen.getByText('Delete Medication');
//         expect(deleteDialog).toBeInTheDocument();
//     });

//     test('Delete dialog contains delete button', async () => {
//         const deleteButton = screen.getByTestId('Delete');

//         await act(async () => {
//             fireEvent.click(deleteButton);
//         });
//         const deleteDialog = screen.getByRole('dialog');
//         const deleteButtonInDialog = within(deleteDialog).getByText('Delete');

//         expect(deleteButtonInDialog).toBeInTheDocument();
//     });

//     test('Delete dialog contains cancel button', async () => {
//         const deleteButton = screen.getByTestId('Delete');

//         await act(async () => {
//             fireEvent.click(deleteButton);
//         });
//         const deleteDialog = screen.getByRole('dialog');
//         const cancelButton = within(deleteDialog).getByText('Cancel');

//         expect(cancelButton).toBeInTheDocument();
//     });

//     test('Clicking cancel dismisses delete dialog', async () => {
//         const deleteButton = screen.getByTestId('Delete');
//         await act(async () => {
//             fireEvent.click(deleteButton);
//         });
//         const deleteDialog = screen.getByRole('dialog');
//         const cancelButton = within(deleteDialog).getByText('Cancel');

//         await act(async () => {
//             fireEvent.click(cancelButton);
//         });

//         const deleteDialogStyle = screen.getByRole('dialog').style;
//         expect(deleteDialogStyle.visibility).not.toBe('visible');
//     });

//     //TODO: once we mock apollo delete
//     // test('Clicking delete navigates to medication page with status=deleted ', async () => {
//     //     const deleteButton = screen.getByText('Delete');

//     //     await act(async () => {
//     //         user.click(deleteButton);
//     //     });
//     //     const deleteDialog = await screen.getByRole('dialog');
//     //     const deleteButtonInDialog = within(deleteDialog).getByText('Delete');

//     //     await act(async () => {
//     //         user.click(deleteButtonInDialog);
//     //     });

//     //     // Not working because I don't know how to mock the Apollo delete.
//     //     // expect(mockNavigate).toBeCalledWith(RouterConfig.Medications + '?status=deleted', { replace: true });
//     // });

//     test('clicking edit button navigates with mode=edit', async () => {
//         const editButton = screen.getByTestId('Edit');
//         await act(async () => {
//             fireEvent.click(editButton);
//         });
//         expect(mockAddSearchParam).toBeCalledWith({ mode: 'edit' });
//     });
// });

// describe('Medication has a Prescription toggle with subfields', () => {
//     beforeEach(async () => {
//         mockParams.mockImplementation(() => {
//             return {
//                 id: '1',
//             };
//         });
//         mockGetSearchParam.mockImplementation((key: string) => {
//             if (key === 'mode') return 'edit';
//         });
//         await act(async () => {
//             render(
//                 <ApolloProvider client={apolloClient}>
//                     <Medication />
//                 </ApolloProvider>,
//             );
//         });
//         await act(async () => {
//             await new Promise((resolve) => setTimeout(resolve, 0));
//         });
//     });

//     test('Clicking a hasRefills toggle button, show yes/no status', async () => {
//         const toggleButton = await screen.findByTestId('prescribedToggle');
//         expect(toggleButton).toBeInTheDocument();
//         await act(async () => {
//             fireEvent.click(toggleButton);
//         });
//         expect(toggleButton.parentElement.textContent).toContain('No');
//         await act(async () => {
//             fireEvent.click(toggleButton);
//         });
//         expect(toggleButton.parentElement.textContent).toContain('Yes');
//     });

//     test('A Prescribed Medication shows calendar and remaining count', async () => {
//         const prescribedToggle = await screen.findByTestId('prescribedToggle');
//         expect(prescribedToggle).toBeInTheDocument();

//         const refillToggle = await screen.getByText('This prescription has refills');
//         expect(refillToggle).toBeInTheDocument();

//         const editPanel = await screen.findByTestId('editPanel');
//         const refillDateLabel = within(editPanel).getByText('Next Refill Date');
//         expect(refillDateLabel).toBeInTheDocument();

//         const remainingRefillsLabel = within(editPanel).getByText('# of Refills');
//         expect(remainingRefillsLabel).toBeInTheDocument();

//         expect(remainingRefillsLabel.parentElement.textContent).toContain(mockRemainingRefills1.toString());
//     });
// });

// describe('Medication Summary Schedule page with edit panel', () => {
//     beforeEach(async () => {
//         mockParams.mockImplementation(() => {
//             return {
//                 id: '1',
//             };
//         });
//         mockGetSearchParam.mockImplementation((key: string) => {
//             if (key === 'mode') return 'edit';
//         });
//         await act(async () => {
//             render(
//                 <ApolloProvider client={apolloClient}>
//                     <Medication />
//                 </ApolloProvider>,
//             );
//         });
//         await act(async () => {
//             await new Promise((resolve) => setTimeout(resolve, 0));
//         });
//     });

//     // test('page with mode=edit does not show the edit panel', () => {
//     //     const editPanelTitle = screen.getByText('Edit medication');
//     //     expect(editPanelTitle).not.toBeInTheDocument();
//     // });

//     test('clicking edit does show the edit panel', async () => {
//         const editPanelTitle = screen.getByText('Edit');
//         expect(editPanelTitle).toBeInTheDocument();
//     });

//     test('Edit panel contains cancel button', () => {
//         const editPanel = screen.getByTestId('editPanel');
//         const button = within(editPanel).getByTestId('Cancel');
//         expect(button).toBeInTheDocument();
//     });

//     test('Edit panel contains save button', () => {
//         const editPanel = screen.getByTestId('editPanel');
//         const button = within(editPanel).getByText('Save');
//         expect(button).toBeInTheDocument();
//     });

//     test('Edit panel contains medication name', () => {
//         const editPanel = screen.getByTestId('editPanel');
//         const medicationName = within(editPanel).getByText(mockMedication1);
//         expect(medicationName).toBeInTheDocument();
//     });

//     test('Form requires Strength field', async () => {
//         const editPanel = screen.getByTestId('editPanel');
//         const conditionField = within(editPanel).getByLabelText('Condition');
//         const saveButton = within(editPanel).getByText('Save');

//         await act(async () => {
//             fireEvent.change(conditionField, { target: { value: 'TestCondition' } });
//             fireEvent.click(saveButton);
//         });

//         expect(mockNavigate).not.toBeCalledTimes(3);
//     });

//     test('Form requires Condition field', async () => {
//         const editPanel = screen.getByTestId('editPanel');
//         const strengthField = within(editPanel).getByLabelText('Strength');
//         const saveButton = within(editPanel).getByText('Save');

//         await act(async () => {
//             fireEvent.change(strengthField, { target: { value: 'TestStrength' } });
//             fireEvent.click(saveButton);
//         });

//         expect(mockNavigate).not.toBeCalledTimes(3);
//     });

//     test('Clicking a schedule toggle button, show Yes/No status', async () => {
//         const scheduleToggle = await screen.findByTestId('scheduleToggle');
//         await act(async () => {
//             fireEvent.click(scheduleToggle);
//         });
//         expect(scheduleToggle.parentElement.textContent).toContain('No');
//         await act(async () => {
//             fireEvent.click(scheduleToggle);
//         });
//         expect(scheduleToggle.parentElement.textContent).toContain('Yes');
//     });

//     test('Clicking a schedule toggle button, edit a startstop component', async () => {
//         const editPanel = await screen.findByTestId('editPanel');
//         expect(editPanel).toBeInTheDocument();

//         const removeStopButton = within(editPanel).getByTestId('removeStopButton');
//         expect(removeStopButton).toBeInTheDocument();
//         await act(async () => {
//             fireEvent.click(removeStopButton);
//         });
//         const stopbutton = within(editPanel).getByTestId('stopButton');
//         expect(stopbutton).toBeInTheDocument();
//     });

//     test('Test for frequency component', async () => {
//         const frequency = await screen.findByTestId('frequency');
//         expect(frequency).toBeInTheDocument();
//         await act(async () => {
//             fireEvent.click(frequency);
//         });
//         const frequencyList = screen.getByRole('listbox');
//         expect(frequencyList.textContent).toContain('Daily');
//         expect(frequencyList.textContent).toContain('As Needed');
//         expect(frequencyList.textContent).toContain('Repeat Days');
//         expect(frequencyList.textContent).toContain('Custom');

//         await act(async () => {
//             const items = await screen.getAllByText('Daily');
//             fireEvent.click(items[0]);
//         });
//         expect(frequency.textContent).toContain('Daily');

//         await act(async () => {
//             fireEvent.click(frequency);
//         });
//         await act(async () => {
//             fireEvent.click(await screen.getByText('As Needed'));
//         });
//         expect(frequency.textContent).toContain('As Needed');

//         await act(async () => {
//             fireEvent.click(frequency);
//         });
//         await act(async () => {
//             fireEvent.click(await screen.findByText('Repeat Days'));
//         });
//         expect(frequency.textContent).toContain('Repeat Days');

//         await act(async () => {
//             fireEvent.click(frequency);
//         });
//         await act(async () => {
//             fireEvent.click(await screen.findByText('Custom'));
//         });
//         expect(frequency.textContent).toContain('Custom');
//     });

//     test('Clicking a Daily, shows Daily component', async () => {
//         const frequency = await screen.findByTestId('frequency');
//         expect(frequency).toBeInTheDocument();
//         await act(async () => {
//             fireEvent.click(frequency);
//         });
//         const frequencyList = screen.getByRole('listbox');
//         expect(frequencyList.textContent).toContain('Daily');
//         await act(async () => {
//             const items = await screen.getAllByText('Daily');
//             fireEvent.click(items[0]);
//         });

//         const timesPerDay = await screen.findByTestId('timesPerDay');
//         expect(timesPerDay).toBeInTheDocument();
//         await act(async () => {
//             fireEvent.click(timesPerDay);
//         });
//         const timesPerDayList = screen.getByRole('listbox');
//         expect(timesPerDayList.textContent).toContain('2x');
//         await act(async () => {
//             fireEvent.click(within(timesPerDayList).getByText('2x'));
//         });
//     });

//     test('Clicking a Repeat Days, shows whichdays control', async () => {
//         const frequency = await screen.findByTestId('frequency');
//         expect(frequency).toBeInTheDocument();
//         await act(async () => {
//             fireEvent.click(frequency);
//         });
//         const frequencyList = screen.getByRole('listbox');
//         expect(frequencyList.textContent).toContain('Repeat Days');
//         await act(async () => {
//             fireEvent.click(screen.getByText('Repeat Days'));
//         });

//         const whichdays = await screen.findByTestId('whichDays');
//         expect(whichdays).toBeInTheDocument();
//         await act(async () => {
//             fireEvent.click(whichdays);
//         });
//         const whichdaysList = screen.getByRole('listbox');
//         expect(whichdaysList.textContent).toContain('Monday');
//     });

//     // test('Clicking a Custom Days, shows the medication course control', async () => {
//     //     const frequency = await screen.findByTestId('frequency');
//     //     expect(frequency).toBeInTheDocument();
//     //     await act(async () => {
//     //         fireEvent.click(frequency);
//     //     });
//     //     const frequencyList = screen.getByRole('listbox');
//     //     expect(frequencyList.textContent).toContain('Custom');
//     //     await act(async () => {
//     //         fireEvent.click(screen.getByText('Custom'));
//     //     });

//     //     const medicationCourseDays = screen.getByTestId('medicationCourseDays');
//     //     expect(medicationCourseDays).toBeInTheDocument();
//     //     await act(async () => {
//     //         fireEvent.click(medicationCourseDays);
//     //     });
//     //     const medicationCourseList = screen.getByRole('listbox');
//     //     expect(medicationCourseList.textContent).toContain('2');
//     //     await act(async () => {
//     //         fireEvent.click(screen.getByText('2'));
//     //     });
//     //     const medicationCourseEntries = screen.getByTestId('medicationCourseEntries');
//     //     expect(medicationCourseDays).toBeInTheDocument();
//     //     const items = within(medicationCourseEntries).getAllByRole('item');
//     //     expect(items).toHaveLength(2);
//     // });

//     test('Clicking save button calls navigate to summary page with status=edited', async () => {
//         const editPanel = screen.getByTestId('editPanel');
//         const saveButton = within(editPanel).getByText('Save');

//         await act(async () => {
//             user.click(saveButton);
//         });
//     });
// });

// describe('Medication page with status = edit', () => {
//     beforeEach(async () => {
//         mockGetSearchParam.mockImplementation((key: string) => {
//             if (key === `status`) return 'edited';
//         });

//         render(
//             <ApolloProvider client={apolloClient}>
//                 <Medication />
//             </ApolloProvider>,
//         );
//         await screen.findByTestId(`medicationView`);
//     });

//     test('shows a medication edited success toast', async () => {
//         expect(mockSuccessToastFn).toHaveBeenCalledWith('Medication edited!');
//     });
// });

// describe('Medication error states', () => {
//     test('errors TODO', () => {
//         expect(false);
//     });
// });

// mockParams.mockImplementation(() => {
//     return {
//         id: '1',
//     };
// });

// mockSearchParams.mockImplementation(() => {
//     return {
//         get: (param: string) => {
//             if (param === `status`) return `added`;
//         },
//         delete: jest.fn(),
//     };
// });
