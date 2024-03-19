// import ReusableModal from 'src/common/components/ReusableModal';
// import { DatabaseService } from 'src/services/DatabaseService';
// export const DeleteMemberModal = ({
//     modalIsOpen,
//     closeModal,
// }: {
//     modalIsOpen: boolean;
//     closeModal: () => void;
// }) => {
//     const DeleteMember = async (id: string) => {
//         await DatabaseService.deleteMember(id);
//         // Logging out after caregiver data is deleted
//     };

//     const modalProps = {
//         modalTitle: 'Delete Member',
//         modalDescriptionText: 'Are you sure you want to delete this medication from your list?',
//         confirmButtonText: 'Delete',
//         cancelButtonText: 'Cancel',
//         cancelButtonOnClick: closeModal,
//         confirmButtonOnClick: DeleteMember,
//         closeModal: closeModal,
//         modalIsOpen: modalIsOpen,
//     };

//     return <ReusableModal {...modalProps} />;
// };
