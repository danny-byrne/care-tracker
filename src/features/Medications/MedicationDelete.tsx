// import ReusableModal from 'src/common/components/ReusableModal';
// import { DatabaseService } from 'src/services/DatabaseService';
// export const DeleteMedicationModal = ({
//     modalIsOpen,
//     closeModal,
// }: {
//     modalIsOpen: boolean;
//     closeModal: () => void;
// }) => {
//     const DeleteMedication = async (id: string) => {
//         await DatabaseService.deleteMedication(id);
//         // Logging out after caregiver data is deleted
//     };

//     const modalProps = {
//         modalTitle: 'Delete Medication',
//         modalDescriptionText: 'Are you sure you want to delete this medication from your list?',
//         confirmButtonText: 'Delete',
//         cancelButtonText: 'Cancel',
//         cancelButtonOnClick: closeModal,
//         confirmButtonOnClick: DeleteMedication,
//         closeModal: closeModal,
//         modalIsOpen: modalIsOpen,
//     };

//     return <ReusableModal {...modalProps} />;
// };
