import { render } from '@testing-library/react';
import Toast from '../Toast';

const mockHasErrorGetter = jest.fn(() => false);
const mockHasSuccessGetter = jest.fn(() => false);
const mockClear = jest.fn();
const MOCK_MESSAGE = 'Mock Message';

jest.mock('src/services/FeedbackService', () => {
    return {
        useFeedbackService: () => ({
            message: MOCK_MESSAGE,
            hasErrorToast: mockHasErrorGetter(),
            hasSuccessToast: mockHasSuccessGetter(),
            clearFeedback: mockClear,
        }),
    };
});

afterEach(() => {
    jest.useRealTimers();
});

// Message display can't be tested due to bug in messagebar component
// https://github.com/microsoft/fluentui/issues/17004

describe('Success Toast', () => {
    test('displays correctly as success toast', async () => {
        mockHasSuccessGetter.mockImplementationOnce(() => true);
        const { container } = render(<Toast />);
        expect(container.firstChild.firstChild).toHaveClass('ms-MessageBar--success');
    });
});

describe('Timers', () => {
    beforeEach(() => {
        jest.useFakeTimers();
        mockHasSuccessGetter.mockImplementationOnce(() => true);
        render(<Toast />);
    });
    test('does not clear automatically', async () => {
        expect(mockClear).not.toHaveBeenCalled();
    });
    test('clears properly after time elapses', async () => {
        jest.runAllTimers();
        expect(mockClear).toHaveBeenCalled();
    });
});

describe('Error Toast', () => {
    test('displays correctly as error toast', async () => {
        mockHasErrorGetter.mockImplementationOnce(() => true);
        const { container } = render(<Toast />);
        expect(container.firstChild.firstChild).toHaveClass('ms-MessageBar--error');
    });
});
