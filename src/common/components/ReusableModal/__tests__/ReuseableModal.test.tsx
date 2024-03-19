import { fireEvent, render, screen } from '@testing-library/react';
import ReuseableModal from '..';

const testModalTitle = 'Test Title';
const testModalDescription = 'Test description';
const testConfirmText = 'Confirm';
const testConfirmButtonOnClick = jest.fn();
const testCancelText = 'Cancel';
const testCancelButtonOnClick = jest.fn();
const testCloseModal = jest.fn();
const testModalIsOpen = true;

const testModalProps = {
    modalTitle: testModalTitle,
    modalDescriptionText: testModalDescription,
    confirmButtonText: testConfirmText,
    confirmButtonOnClick: testConfirmButtonOnClick,
    cancelButtonText: testCancelText,
    cancelButtonOnClick: testCancelButtonOnClick,
    closeModal: testCloseModal,
    modalIsOpen: testModalIsOpen,
};

describe('Reuseable Modal', () => {
    test('modal does not render if not open', () => {
        render(<ReuseableModal {...testModalProps} modalIsOpen={false} />);

        const modalTitle = screen.queryByText(testModalTitle);

        expect(modalTitle).not.toBeInTheDocument();
    });
    test('contains the title text', () => {
        render(<ReuseableModal {...testModalProps} />);

        const modalTitle = screen.getByText(testModalTitle);

        expect(modalTitle).toBeInTheDocument();
    });
    test('contains the description text', () => {
        render(<ReuseableModal {...testModalProps} />);

        const modalDescription = screen.getByText(testModalDescription);

        expect(modalDescription).toBeInTheDocument();
    });
    test('clicking the Confirm button runs the correct onClick', () => {
        render(<ReuseableModal {...testModalProps} />);

        const confirmButton = screen.getByText(testConfirmText);
        fireEvent.click(confirmButton);

        expect(testConfirmButtonOnClick).toHaveBeenCalled();
    });
    test('clicking the Cancel button runs the correct onClick', () => {
        render(<ReuseableModal {...testModalProps} />);

        const cancelButton = screen.getByText(testCancelText);
        fireEvent.click(cancelButton);

        expect(testCancelButtonOnClick).toHaveBeenCalled();
    });
});
