import { render, screen } from '@testing-library/react';
import FullScreenErrorModal from '../FullScreenErrorModal';

const mockHasErrorGetter = jest.fn(() => false);
const mockClear = jest.fn();
const MOCK_MESSAGE = 'Mock Message';

jest.mock('src/services/FeedbackService', () => {
    return {
        useFeedbackService: () => ({
            message: MOCK_MESSAGE,
            hasErrorFullscreen: mockHasErrorGetter(),
            clearFeedback: mockClear,
        }),
    };
});

describe('Full Screen Errors', () => {
    test('displays message when error is set', async () => {
        mockHasErrorGetter.mockImplementationOnce(() => true);
        render(<FullScreenErrorModal />);
        const message = screen.queryByText(MOCK_MESSAGE);
        expect(message).toBeInTheDocument();
    });

    test('does not display message when no error is set', async () => {
        render(<FullScreenErrorModal />);
        const message = screen.queryByText(MOCK_MESSAGE);
        expect(message).not.toBeInTheDocument();
    });
});
