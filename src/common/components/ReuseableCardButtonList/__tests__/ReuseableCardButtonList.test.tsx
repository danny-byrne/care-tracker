import { fireEvent, render, screen } from '@testing-library/react';
import ReuseableCardButtonList from '..';

const testButton1Text = 'button1';
const testButton2Text = 'button2';
const testButton3Text = 'button3';
const testButton1OnClick = jest.fn();
const testButton2OnClick = jest.fn();
const testButton3OnClick = jest.fn();
const testListProps = {
    buttonPropsList: [
        { label: testButton1Text, onClick: testButton1OnClick },
        { label: testButton2Text, onClick: testButton2OnClick },
        { label: testButton3Text, onClick: testButton3OnClick },
    ],
};

beforeEach(() => {
    jest.clearAllMocks();
});

describe('ReuseableCardButtonList', () => {
    test('button1 onClick fires', () => {
        render(<ReuseableCardButtonList {...testListProps} />);

        const button1 = screen.getByText(testButton1Text);
        fireEvent.click(button1);

        expect(testButton1OnClick).toBeCalledTimes(1);
    });
    test('button2 onClick fires', () => {
        render(<ReuseableCardButtonList {...testListProps} />);

        const button2 = screen.getByText(testButton2Text);
        fireEvent.click(button2);

        expect(testButton2OnClick).toBeCalledTimes(1);
    });
    test('button3 onClick fires', () => {
        render(<ReuseableCardButtonList {...testListProps} />);

        const button3 = screen.getByText(testButton3Text);
        fireEvent.click(button3);

        expect(testButton3OnClick).toBeCalledTimes(1);
    });
    test('button1 does not fire button2 onClick', () => {
        render(<ReuseableCardButtonList {...testListProps} />);

        const button1 = screen.getByText(testButton1Text);
        fireEvent.click(button1);

        expect(testButton2OnClick).not.toHaveBeenCalled();
    });
});
