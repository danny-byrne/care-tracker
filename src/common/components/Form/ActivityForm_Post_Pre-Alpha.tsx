// TODO: This file is based on designs for post pre-alpha, reuse the logic when
// we update activities

// import React, { useState } from 'react';

// import {
//     DatePicker,
//     DayOfWeek,
//     DefaultButton,
//     Dropdown,
//     Icon,
//     IDropdownOption,
//     ResponsiveMode,
//     Stack,
//     TextField,
// } from '@fluentui/react';
// import Accordion from '../Accordion/Accordion';
// import Header from './Header';
// import StartStopTime from 'src/features/Activities/StartStopTime';

// import { FormikProps } from 'formik';
// import { dropdownStyle, getClassNames } from './ActivityForm.classNames';
// import { trackClick, trackFieldChanged } from 'src/wcpConsentInit';
// import { activityFrequencyDropdown, whichDaysOptions } from 'src/utils/utils';
// import { colors } from 'src/common/styles/colors';

// interface IActivityFormProps {
//     formik: FormikProps<{
//         activity: {
//             name: string;
//             tips?: string;
//             availability?: {
//                 frequency?: string;
//                 specificDate?: Date;
//                 days?: string[];
//                 startTime?: string;
//                 stopTime?: string;
//             };
//         };
//     }>;
//     isAdd?: boolean;
//     recipientName?: string;
// }

// const ActivityForm: React.FC<IActivityFormProps> = ({ formik, recipientName }) => {
//     const classNames = getClassNames();

//     // TODO: Reimplement these features post pre-alpha
//     // If frequency is defined, availabity should not be collapsed
//     // Frequency should be set to undefined when option is collapsed
//     // const [availabilityCollapsed, setAvailabilityCollapsed] = useState(
//     //     formik.values.activity.availability === undefined,
//     // );

//     // const [currentDayOptions, setCurrentDayOptions] = React.useState(JSON.parse(JSON.stringify(whichDaysOptions)));

//     // // TODO: Update to use activity frequency options
//     // const onChangeFrequencyDropDown = (item, formik): void => {
//     //     if (item.key !== 'REPEAT_DAYS') {
//     //         formik.setFieldValue('activity.availability.days', undefined);
//     //     } else if (item.key !== 'SPECIFIC_DATE') {
//     //         formik.setFieldValue('activity.availability.specificDate', undefined);
//     //     }
//     //     formik.setFieldValue('activity.availability.frequency', item.key);
//     // };

//     // const onRenderDayOption = (option: IDropdownOption): JSX.Element => {
//     //     return (
//     //         <div className={classNames['wc-ActivityForm--optionItem']}>
//     // eslint-disable-next-line
//     //             <div style={option.selected ? { color: colors.fabric.neutrals.WCprimary } : null}> {option.text}</div>
//     //             {option.selected && (
//     //                 <Icon
//     //                     className={classNames['wc-ActivityForm--optionIcon']}
//     //                     iconName={'CheckMark'}
//     //                     aria-hidden="true"
//     //                     title={'CheckMark'}
//     //                 />
//     //             )}
//     //         </div>
//     //     );
//     // };

//     // const onChangeDayDropDown = (_, item): void => {
//     //     trackFieldChanged('whichDays');
//     //     let options = JSON.parse(JSON.stringify(currentDayOptions));
//     //     options[item.key].selected = item.selected ? true : false;
//     //     setCurrentDayOptions(options);

//     //     let oldWhichDays = formik.values.activity.availability?.days;
//     //     let selectedWhichDays = item.selected
//     //         ? [...oldWhichDays, item.key]
//     //         : oldWhichDays.filter((key) => key !== item.key);
//     //     formik.setFieldValue('whichdays', selectedWhichDays);
//     // };

//     return (
//         <Stack tokens={{ childrenGap: 24 }} style={{ paddingBottom: '10rem' }}>
//             <TextField
//                 label="Activity Name"
//                 name="Activity Name"
//                 resizable={false}
//                 required
//                 {...formik.getFieldProps('activity.name')}
//             />
//             <TextField
//                 label="Tips to Make It Special"
//                 name="tips"
//                 resizable={false}
//                 {...formik.getFieldProps('activity.tips')}
//             />

//             {/* TODO: Implement these features post pre-alpha */}
//             {/* {availabilityCollapsed && (
//                 <DefaultButton
//                     data-testid={'availability'}
//                     onClick={() => {
//                         trackClick('availability');
//                         setAvailabilityCollapsed(false);
//                     }}
//                     className={classNames['wc-ActivityForm--availabilityButton']}
//                 >
//                     <Stack horizontal className={classNames['wc-ActivityForm--availabilityContainer']}>
//                         <Icon iconName="CirclePlus" /> &nbsp; {`Add ${recipientName}'s availability`}
//                     </Stack>
//                 </DefaultButton>
//             )}

//             {!availabilityCollapsed && (
//                 <Stack tokens={{ childrenGap: 24 }}>
//                     <Accordion
//                         className={classNames['wc-ActivityForm--accordion']}
//                         collapsed={false}
//                         onToggle={() => {
//                             setAvailabilityCollapsed(true);
//                             formik.setFieldValue('activity.availability', undefined);
//                         }}
//                         header={<Header text={`${recipientName}'s Availability`} />}
//                     >
//                         <Stack tokens={{ childrenGap: 24 }}>
//                             <Dropdown
//                                 id="frequency"
//                                 label="Frequency"
//                                 data-testid={'frequency'}
//                                 selectedKey={formik.values.activity.availability?.frequency}
//                                 onChange={(_, item) => {
//                                     trackFieldChanged('frequency');
//                                     onChangeFrequencyDropDown(item, formik);
//                                 }}
//                                 placeholder="When is this taken?"
//                                 options={activityFrequencyDropdown}
//                                 responsiveMode={ResponsiveMode.large}
//                             />

//                             {formik.values.activity.availability?.frequency === 'SPECIFIC_DATE' && (
//                                 <Stack tokens={{ childrenGap: 24 }}>
//                                     <DatePicker
//                                         id="activityDate"
//                                         className={classNames['wc-ActivityForm--datePicker']}
//                                         label="Date"
//                                         firstDayOfWeek={DayOfWeek.Sunday}
//                                         placeholder="Select a date"
//                                         onSelectDate={(date) => {
//                                             trackFieldChanged('activityDate');
//                                             formik.setFieldValue('activity.availability.specificDate', date);
//                                         }}
//                                         {...formik.getFieldProps('refillDate')}
//                                         minDate={new Date()}
//                                         // Removing unnecessary error message
//                                         textField={{ errorMessage: '' }}
//                                     />
//                                     <StartStopTime formik={formik} />
//                                 </Stack>
//                             )}

//                             {formik.values.activity.availability?.frequency === 'REPEAT_DAYS' && (
//                                 <Stack tokens={{ childrenGap: 24 }}>
//                                     <Dropdown
//                                         responsiveMode={ResponsiveMode.large}
//                                         id="whichDays"
//                                         label="Which days"
//                                         data-testid={'whichDays'}
//                                         placeholder="Select all that apply"
//                                         styles={dropdownStyle}
//                                         selectedKeys={formik.values.activity.availability?.days}
//                                         onRenderOption={onRenderDayOption}
//                                         onChange={onChangeDayDropDown}
//                                         multiSelect
//                                         options={currentDayOptions}
//                                     />
//                                     <StartStopTime formik={formik} />
//                                 </Stack>
//                             )}
//                         </Stack>
//                     </Accordion>
//                 </Stack>
//             )} */}
//         </Stack>
//     );
// };

// export default ActivityForm;
