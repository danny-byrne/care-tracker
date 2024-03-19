// using code from the autocomplete searchbox example from: https://github.com/microsoft/autocomplete-search-box
import {
    DirectionalHint,
    ISearchBoxProps,
    SearchBox,
    IFocusZone,
    KeyCodes,
    IButtonProps,
    Callout,
    FocusZone,
    FocusZoneDirection,
    FocusZoneTabbableElements,
    Text,
    Spinner,
    SpinnerSize,
    Stack,
} from '@fluentui/react';
import React, { useEffect, useState } from 'react';
import { generateUniqueId } from 'src/utils/utils';
import { typeAheadCalloutStyle } from '../Utils/CalloutStyles';
import { getClassNames } from './CustomSearchBox.classNames';

export interface ISuggestionItem {
    getSearchId: (() => number) | (() => string);
    getSearchText: () => string;
}
interface ICustomSearchBoxProps extends ISearchBoxProps {
    suggestions?: string[] | ISuggestionItem[];
    inProgress?: boolean;
    debounceTime?: number;
    viewCreators: {
        getSuggestionViews?: (query: string, onSuggestionClicked: (suggestion) => void) => JSX.Element[];
        sectionHeaderText?: string;
    }[];
    defaultTerm?: string;
    searchLoading?: boolean;
    clearFields?: () => void;
    ariaLabel?: string;
    clearTextOnClick?: boolean;
    placeholder?: string;
}

const CustomSearchBox = (props: ICustomSearchBoxProps) => {
    const textInputRef = React.useRef<HTMLDivElement>(null);
    const focusZoneRef = React.useRef<IFocusZone>(null);
    const [isCalloutFocussed, setCalloutFocussed] = React.useState(false);
    const [isCallOutVisible, setIsCallOutVisible] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(true);
    const [query, setQuery] = React.useState(props.defaultTerm ?? '');
    const [suggestions, setSuggestions] = React.useState<string[] | ISuggestionItem[]>();
    const [suggestionClicked, setSuggestionClicked] = React.useState(false);
    const clearTextOnClick = props.clearTextOnClick ?? false;

    React.useEffect(() => {
        setQuery(props.defaultTerm ?? '');
    }, [props.defaultTerm]);

    const classNames = getClassNames();

    const clearButtonProps: IButtonProps = {
        className: classNames['wc-SearchBox--clearButtonHidden'],
    };

    React.useEffect(() => {
        if (props.suggestions === suggestions) {
            return;
        }

        setSuggestions(props.suggestions);
        setIsCallOutVisible(props.suggestions !== undefined);
    }, [props.suggestions]);

    React.useEffect(() => {
        setIsLoading(props.inProgress === true ? true : false);
    }, [props.inProgress]);

    const onFocus = (event: React.FocusEvent<HTMLInputElement>) => {
        setSuggestionClicked(false);
        setIsCallOutVisible(false);
        if (props.onFocus) props.onFocus(event);
    };

    const onKeyDown = (ev: React.KeyboardEvent<HTMLInputElement>) => {
        switch (ev.which) {
            case KeyCodes.down: {
                setCalloutFocussed(true);
                focusZoneRef.current?.focus();
                ev.preventDefault();
                break;
            }
            default:
                setCalloutFocussed(false);
        }
        const pattern = /^[0-9a-zA-Z\-' \b]+$/;
        if (!pattern.test(ev.key)) {
            ev.preventDefault();
        }
    };

    const onSuggestionClicked = (suggestion: string | ISuggestionItem) => {
        let query = typeof suggestion === 'string' ? suggestion : suggestion.getSearchText();
        const searchBoxVal = clearTextOnClick ? '' : query;
        setSuggestionClicked(true);
        setQuery(searchBoxVal);
        hideSuggestions();
    };

    const hideSuggestions = () => {
        setIsCallOutVisible(false);
    };

    const onChange = (event?: React.ChangeEvent<HTMLInputElement> | undefined, newValue?: string | undefined) => {
        setSuggestionClicked(false);
        setQuery(newValue || '');
    };

    React.useEffect(() => {
        if (props.onChange) {
            const timeOut = setTimeout(async () => {
                if (props.onChange && !suggestionClicked) props.onChange(undefined, query);
            }, props.debounceTime || 0);
            return () => {
                clearTimeout(timeOut);
            };
        }
    }, [query]);

    // pull width from ref to align with searchbox
    const [calloutWidth, setCalloutWidth] = useState(null);
    useEffect(() => {
        setCalloutWidth(textInputRef.current.clientWidth);
    }, [textInputRef.current?.clientWidth]);

    // Uses event from preventDismissOnEvent parameter in Callout to determine if a mouse click occurs outside
    // of the Callout, and if so will close the callout
    const dismissOnClickOff = (event: React.FocusEvent<HTMLInputElement> | React.PointerEvent<HTMLInputElement>) => {
        if (event instanceof PointerEvent) {
            setIsCallOutVisible(false);
        }
        return false;
    };

    return (
        <Stack className={classNames['wc-SearchBox--stack']}>
            <div className={classNames['wc-SearchBox--searchContainer']}>
                <div ref={textInputRef} className={props.className}>
                    <SearchBox
                        {...props}
                        autoComplete="off"
                        onChange={onChange}
                        onFocus={onFocus}
                        onKeyDown={onKeyDown}
                        value={query}
                        clearButtonProps={isLoading ? clearButtonProps : undefined}
                        showIcon
                        onClear={props.clearFields}
                        aria-label={props.ariaLabel}
                        placeholder={props.placeholder}
                    />
                    {props.searchLoading && (
                        <Spinner className={classNames['wc-SearchBox--spinner']} size={SpinnerSize.small} />
                    )}
                </div>
            </div>
            <Callout
                data-testid="searchResultsCallout"
                styles={typeAheadCalloutStyle}
                isBeakVisible={false}
                target={textInputRef.current}
                hidden={!(suggestions !== undefined && isCallOutVisible)}
                directionalHint={DirectionalHint.bottomLeftEdge}
                directionalHintFixed
                doNotLayer
                alignTargetEdge
                calloutWidth={calloutWidth}
                setInitialFocus={isCalloutFocussed}
                preventDismissOnEvent={dismissOnClickOff}
            >
                <FocusZone
                    direction={FocusZoneDirection.bidirectional}
                    handleTabKey={FocusZoneTabbableElements.all}
                    id="focusZoneSuggestions"
                    componentRef={focusZoneRef}
                    className={classNames['wc-SearchBox--suggestionBox']}
                >
                    {/* 
                        Map through viewCreators to generate an arbitrary number of search result lists that can target 
                        different search methodologies. For example: One list as a filtered set of current 
                        conditions and another list coming from an API call against an external database.
                    */}
                    {props.viewCreators.map((view) => {
                        const id = generateUniqueId();
                        return (
                            <div key={id}>
                                {view.sectionHeaderText && (
                                    <Text className={classNames['wc-SearchBox--sectionHeaderText']}>
                                        {view.sectionHeaderText}
                                    </Text>
                                )}
                                {view.getSuggestionViews(query, onSuggestionClicked)}
                            </div>
                        );
                    })}
                </FocusZone>
            </Callout>
        </Stack>
    );
};

export default CustomSearchBox;
