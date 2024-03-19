// using code from the autocomplete searchbox example from: https://github.com/microsoft/autocomplete-search-box
import {
    Callout,
    DirectionalHint,
    FocusZone,
    ISearchBoxProps,
    SearchBox,
    IFocusZone,
    FocusZoneDirection,
    FocusZoneTabbableElements,
    Link,
    KeyCodes,
    IButtonProps,
} from '@fluentui/react';
import React from 'react';
import HighlightTextView from '../Utils/HighlightTextView';
import { typeAheadCalloutStyle } from '../Utils/CalloutStyles';
import { getClassNames } from './AutocompleteSearchBox.classNames';
import { useFeedbackService } from 'src/services/FeedbackService';

export interface ISuggestionItem {
    getSuggestionItem: (query?: string) => JSX.Element;
    getSearchId: () => number;
    getSearchText: () => string;
    drugNameDesc?: string;
}

interface IAutocompleteSearchBoxProps extends ISearchBoxProps {
    suggestions?: string[] | ISuggestionItem[];
    onSuggestionClicked: (suggestion: string | ISuggestionItem) => void;
    inProgress?: boolean;
    debounceTime?: number;
    defaultTerm?: string;
    hasError?: boolean;
}

const AutocompleteSearchBox = (props: IAutocompleteSearchBoxProps) => {
    const textInput = React.useRef<HTMLDivElement>(null);
    const [isCalloutFocussed, setCalloutFocussed] = React.useState(false);
    const [isCallOutVisible, setIsCallOutVisible] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(true);
    const [query, setQuery] = React.useState(props.defaultTerm ?? '');
    const focusZoneRef = React.useRef<IFocusZone>(null);
    const [suggestions, setSuggestions] = React.useState<string[] | ISuggestionItem[]>();
    const [suggestionClicked, setSuggestionClicked] = React.useState(false);
    const { clearFeedback, hasToast } = useFeedbackService();

    const classNames = getClassNames(props.hasError);

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
        // Clear toast on screen if present. Workaround to prevent clearFeedback function
        // from clearing text input into searchbox
        if (hasToast) {
            clearFeedback();
        }

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
        setSuggestionClicked(true);
        setQuery(query);
        props.onSuggestionClicked(suggestion);
        hideSuggestions();
    };

    const hideSuggestions = () => {
        setIsCallOutVisible(false);
    };

    const onSuggestionKeyDown = (event: React.KeyboardEvent<any>, suggestion: ISuggestionItem) => {
        if (event.which === KeyCodes.enter) onSuggestionClicked(suggestion);
    };
    const getSuggestionViews = () => {
        let views: JSX.Element[] = [];
        if (!suggestions) return <></>;
        suggestions.forEach((suggestion: string | ISuggestionItem, i: number) => {
            if (typeof suggestion === 'string') {
                views.push(DefaultListItem(suggestion, i));
            } else {
                views.push(
                    <Link
                        key={suggestion.getSearchId()}
                        onKeyPress={(e) => onSuggestionKeyDown(e, suggestion)}
                        onClick={() => onSuggestionClicked(suggestion)}
                        className={classNames['wc-SearchBox--oneSuggestion']}
                        role="listitem"
                        data-testid={'route-medName'}
                    >
                        {suggestion.getSuggestionItem(query)}
                    </Link>,
                );
            }
        });

        return views;
    };

    const defaultSuggestionItem: React.CSSProperties = {
        width: '100%',
        float: 'left',
        padding: '7px',
        paddingBottom: '16px',
    };

    const DefaultListItem = (suggestion: string, key: any) => {
        return (
            <div className={classNames['wc-SearchBox--oneSuggestion']} role="listitem" key={key}>
                <Link
                    data-testid={'route-medName'}
                    onClick={() => onSuggestionClicked(suggestion)}
                    style={defaultSuggestionItem}
                >
                    <HighlightTextView text={suggestion} filter={query} />
                </Link>
            </div>
        );
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

    // Uses event from preventDismissOnEvent parameter in Callout to determine if a mouse click occurs outside
    // of the Callout, and if so will close the callout
    const dismissOnClickOff = (event: React.FocusEvent<HTMLInputElement> | React.PointerEvent<HTMLInputElement>) => {
        if (event instanceof PointerEvent) {
            setIsCallOutVisible(false);
        }
        return false;
    };

    return (
        <div className={classNames['wc-SearchBox--searchContainer']}>
            <div ref={textInput} className={props.className}>
                <SearchBox
                    {...props}
                    autoComplete="off"
                    onChange={onChange}
                    onFocus={onFocus}
                    onKeyDown={onKeyDown}
                    value={query}
                    clearButtonProps={isLoading ? clearButtonProps : undefined}
                    showIcon
                />
            </div>
            {suggestions !== undefined && isCallOutVisible && (
                <Callout
                    data-testid="searchResultsCallout"
                    styles={typeAheadCalloutStyle}
                    isBeakVisible={false}
                    target={textInput.current}
                    directionalHintFixed
                    directionalHint={DirectionalHint.bottomLeftEdge}
                    directionalHintForRTL={DirectionalHint.bottomRightEdge}
                    setInitialFocus={isCalloutFocussed}
                    doNotLayer
                    preventDismissOnEvent={dismissOnClickOff}
                >
                    <FocusZone
                        direction={FocusZoneDirection.bidirectional}
                        handleTabKey={FocusZoneTabbableElements.all}
                        id="focusZoneSuggestions"
                        componentRef={focusZoneRef}
                        className={classNames['wc-SearchBox--suggestionBox']}
                    >
                        {getSuggestionViews()}
                    </FocusZone>
                </Callout>
            )}
        </div>
    );
};

export default AutocompleteSearchBox;
