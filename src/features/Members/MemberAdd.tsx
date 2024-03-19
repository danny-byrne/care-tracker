import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Stack, TextField } from '@fluentui/react';

import { useAddEmailInvitationMutation, useGetUserInfoQuery } from 'src/graphQL/serverMocks/graphQLGeneratedCode';
import { Formik, Form } from 'formik';

import { useFeedbackService } from 'src/services/FeedbackService';
import { FormErrorBar, FormFieldGap } from 'src/common/components/Form';
import { PanelContainerWithHeader } from 'src/common/components/Panel/PanelContainerWithHeader';
import { EditToggles, RelationshipContainer } from './MemberReuseableView';
import { getClassNames } from './MemberAdd.classNames';
import { USER_MESSAGES } from 'src/app/Strings';

import RouterConfig from 'src/app/RouterConfig';
import { trackClick, trackFieldChanged } from 'src/wcpConsentInit';
import { emailRegexValidCharacters } from 'src/utils/validators';
import { onKeyDown } from '../CareRecipient/CareRecipientUtils';

interface MemberListItemProps {
    onDismiss: () => void;
}

const MemberAdd: React.FC<MemberListItemProps> = ({ onDismiss }) => {
    const { setSuccessToast } = useFeedbackService();
    const navigate = useNavigate();
    const { formContainer } = getClassNames();

    const { data, loading: loadingUserData } = useGetUserInfoQuery();

    const [addMember, { loading, error }] = useAddEmailInvitationMutation({
        refetchQueries: ['GetCareTeam'],
        errorPolicy: 'all',
        onCompleted: () => {
            setSuccessToast(USER_MESSAGES.INVITATION_SUCCESS);
            navigate(RouterConfig.Members + '?status=added', { replace: true });
        },
        onError: (err) => {
            // tricking formik error handling
            throw new Error(err.graphQLErrors[0].extensions?.AdditionalDetails);
        },
    });

    return (
        <>
            <Formik
                initialValues={{
                    email: '',
                    relationshipToLovedOne: undefined,
                    isAdmin: false,
                    isEmergencyContact: false,
                }}
                validate={(values) => {
                    const errors: any = {};
                    if (!values.email) {
                        errors.email = 'Required';
                    }
                    if (!values.relationshipToLovedOne) {
                        errors.relationshipToLovedOne = 'Required';
                    }
                    return errors;
                }}
                onSubmit={async (values) => {
                    trackClick('send');

                    await addMember({
                        variables: {
                            email: values.email,
                            careCircleId: data.me.careCircleId,
                            makeAdmin: values.isAdmin,
                            makeEmergencyContact: values.isEmergencyContact,
                            relationshipToLovedOne: values.relationshipToLovedOne,
                        },
                    });
                }}
            >
                {(formik) => (
                    <Form>
                        <PanelContainerWithHeader
                            title={'Invite By Email'}
                            onClose={onDismiss}
                            {...{ formik }}
                            actionButtonText={'Send'}
                            loading={loading || loadingUserData}
                            onClickActionButton={formik.handleSubmit}
                        >
                            <Stack className={formContainer} tokens={{ childrenGap: FormFieldGap }}>
                                <TextField
                                    label="Email"
                                    name="email"
                                    required
                                    onKeyDown={(ev) => onKeyDown(ev, emailRegexValidCharacters)}
                                    {...formik.getFieldProps('email')}
                                />

                                <RelationshipContainer
                                    isEdit
                                    onChange={(_, item) => {
                                        trackFieldChanged('relationshipToLovedOne');
                                        formik.setFieldValue('relationshipToLovedOne', item.key);
                                    }}
                                    selectedKey={formik.values.relationshipToLovedOne}
                                />
                                <EditToggles {...{ formik }} showAdminToggle />
                                <FormErrorBar error={error?.message} />
                            </Stack>
                        </PanelContainerWithHeader>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default MemberAdd;
