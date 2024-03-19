import { render, screen } from '@testing-library/react';
import { Roles } from 'src/graphQL/serverMocks/graphQLGeneratedCode';
import { MemberListItem } from '../MemberListItem';
import { useIsMobile } from 'src/common/hooks/useMediaQueries';
import { UserProfileSummary } from 'src/graphQL/serverMocks/__mocks__/UserProfileSummary';
import { formatPhoneNumber } from 'src/utils/utils';

const testUser = {
    profile: {
        role: Roles.Owner,
    },
    isCurrentUser: false,
    isEmergencyContact: false,
    careGiver: UserProfileSummary(),
};

describe('Care Circle Member component on mobile', () => {
    beforeEach(() => {
        render(<MemberListItem {...testUser} />);
    });

    test('shows the user name', () => {
        const userName = screen.queryByText(testUser.careGiver.displayName);

        expect(userName).toBeInTheDocument();
    });
    test('includes a default profile picture', () => {
        const avatar = screen.queryByTestId('avatar');

        expect(avatar).toBeInTheDocument();
    });
    test('does not show emergency contact if not valid', () => {
        const text = screen.queryByText('Emergency Contact');

        expect(text).not.toBeInTheDocument();
    });
    test('does not show email', () => {
        const text = screen.queryByText(testUser.careGiver.email);
        const header = screen.queryByText('Email');

        expect(text).not.toBeInTheDocument();
        expect(header).not.toBeInTheDocument();
    });
    test('does not show phone', () => {
        const formattedPhoneNumber = formatPhoneNumber(testUser.careGiver.mobile);
        const text = screen.queryByText(formattedPhoneNumber);
        const header = screen.queryByText('Phone');

        expect(text).not.toBeInTheDocument();
        expect(header).not.toBeInTheDocument();
    });
});

describe('Care Circle Member component on mobile with different configurations', () => {
    test('shows emergency contact if valid', () => {
        testUser.isEmergencyContact = true;
        render(<MemberListItem {...testUser} />);

        const text = screen.queryByText('Emergency Contact');

        expect(text).toBeInTheDocument();
        testUser.isEmergencyContact = false;
    });
});

describe('Care Circle Member component on desktop', () => {
    beforeAll(() => {
        useIsMobile.mockReturnValue(false);
    });
    afterAll(() => {
        useIsMobile.mockReturnValue(true);
    });

    beforeEach(() => {
        jest.mock('src/common/hooks/useMediaQueries', () => ({
            useIsMobile: jest.fn(() => false),
        }));
        render(<MemberListItem {...testUser} />);
    });

    test('shows the user name', () => {
        const userName = screen.queryByText(testUser.careGiver.displayName);

        expect(userName).toBeInTheDocument();
    });
    test('includes a default profile picture', () => {
        const avatar = screen.queryByTestId('avatar');

        expect(avatar).toBeInTheDocument();
    });
    test('does not show emergency contact if not valid', () => {
        const text = screen.queryByText('Emergency Contact');

        expect(text).not.toBeInTheDocument();
    });
    test('shows email if present', () => {
        const text = screen.queryByText(testUser.careGiver.email);
        const header = screen.queryByText('Email');

        expect(text).toBeInTheDocument();
        expect(header).toBeInTheDocument();
    });
    test('shows phone if present', () => {
        const formattedPhoneNumber = formatPhoneNumber(testUser.careGiver.mobile);
        const text = screen.queryByText(formattedPhoneNumber);
        const header = screen.queryByText('Phone');

        expect(text).toBeInTheDocument();
        expect(header).toBeInTheDocument();
    });
});

describe('Care Circle Member component on desktop with different configurations', () => {
    beforeAll(() => {
        useIsMobile.mockReturnValue(false);
    });
    afterAll(() => {
        useIsMobile.mockReturnValue(true);
    });

    beforeEach(() => {
        jest.mock('src/common/hooks/useMediaQueries', () => ({
            useIsMobile: jest.fn(() => false),
        }));
    });
    test('shows emergency contact if valid', () => {
        testUser.isEmergencyContact = true;
        render(<MemberListItem {...testUser} />);

        const text = screen.queryByText('Emergency Contact');

        expect(text).toBeInTheDocument();
        testUser.isEmergencyContact = false;
    });
    test('does not show email if none given', () => {
        testUser.careGiver.email = undefined;
        render(<MemberListItem {...testUser} />);

        const text = screen.queryByText(UserProfileSummary().email);
        const header = screen.queryByText('Email');

        expect(text).not.toBeInTheDocument();
        expect(header).not.toBeInTheDocument();
        testUser.careGiver.email = UserProfileSummary().email;
    });
    test('does not show phone if none given', () => {
        testUser.careGiver.mobile = undefined;
        render(<MemberListItem {...testUser} />);

        const formattedPhoneNumber = formatPhoneNumber(UserProfileSummary().mobile);
        const text = screen.queryByText(formattedPhoneNumber);
        const header = screen.queryByText('Phone');

        expect(text).not.toBeInTheDocument();
        expect(header).not.toBeInTheDocument();
        testUser.careGiver.mobile = UserProfileSummary().mobile;
    });
});
