import React from 'react';
import { ERROR_MESSAGES } from 'src/app/Strings';
import { useFeedbackService } from 'src/services/FeedbackService';
import {
    CareRecipientPhotoUploadInput,
    useGetCareRecipientPhotoQuery,
    useUploadCareRecipientPhotoMutation,
} from 'src/graphQL/serverMocks/graphQLGeneratedCode';
import { Stack, Persona, PersonaSize, Link, Spinner } from '@fluentui/react';
import { getClassNames } from './PhotoUpload.classNames';
import { colors } from 'src/common/styles/colors';
import defaultProfile from 'src/assets/CareRecipient/defaultProfile.jpg';

interface IPhotoUploadProps {
    photoChanged?: boolean;
    setPhotoChanged?: React.Dispatch<React.SetStateAction<boolean>>;
    formik?;
}

const PhotoUpload: React.FC<IPhotoUploadProps> = (props) => {
    const uploadedImage = React.useRef(null);
    const imageUploader = React.useRef(null);
    const { setErrorToast } = useFeedbackService();
    const classNames = getClassNames();

    const handleOnClick = () => {
        imageUploader.current.click();
    };
    const [image, setImage] = React.useState(null);
    const handleImageChange = (e) => {
        const [file] = e.target.files;

        if (file) {
            const reader = new FileReader();
            const { current } = uploadedImage;
            current.file = file;
            reader.onload = (e) => {
                current.src = e.target.result;
                setImage(current.src);
            };
            reader.readAsDataURL(file);
            handleImageUpload(file);
        }
    };
    const [uploadCareRecipientPhoto, { loading: uploadLoading }] = useUploadCareRecipientPhotoMutation({
        errorPolicy: 'all',
        refetchQueries: ['GetCareRecipientPhoto'],
        onError: () => {
            setErrorToast(ERROR_MESSAGES.UPLOAD_PHOTO);
        },
    });

    const { data: photoData, loading: photoLoading } = useGetCareRecipientPhotoQuery({
        errorPolicy: 'all',
        onError: (error) => {
            if (
                error.message !== 'Response not successful: Received status code 500' &&
                error.message !== 'Not Found'
            ) {
                setErrorToast(error.message);
            }
        },
    });
    const photoURL = photoData?.careRecipientPhoto?.careRecipientImageURL
        ? photoData?.careRecipientPhoto?.careRecipientImageURL
        : defaultProfile;

    const handleImageUpload = async (file) => {
        const upload: CareRecipientPhotoUploadInput = {
            file: file,
        };
        props.setPhotoChanged(true);
        await uploadCareRecipientPhoto({ variables: { input: upload } });
        props.formik.setFieldValue('photoChanged', true);
    };
    return (
        <>
            <Stack tokens={{ childrenGap: 20 }}>
                <Stack.Item align="center">
                    {!(photoLoading || uploadLoading) && (
                        <Persona
                            className={classNames['wc-PhotoUpload--Persona']}
                            size={PersonaSize.size120}
                            imageUrl={image ? image : photoURL}
                            ref={uploadedImage}
                            data-testid="avatar"
                            initialsColor={colors.fabric.neutrals.WCprimary}
                        />
                    )}
                    {(photoLoading || uploadLoading) && <Spinner />}
                </Stack.Item>
                <Stack.Item align="center">
                    <Link onClick={handleOnClick}>Upload a photo</Link>
                </Stack.Item>
                <input
                    type="file"
                    accept="image/png, image/jpeg, image/jpg"
                    onChange={handleImageChange}
                    ref={imageUploader}
                    style={{
                        display: 'none',
                    }}
                />
            </Stack>
        </>
    );
};

export default PhotoUpload;
