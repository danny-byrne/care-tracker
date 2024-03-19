import React, { useEffect } from 'react';
import { useState } from 'react';
import { useFeedbackService } from 'src/services/FeedbackService';

import { Stack, Link, Text } from '@fluentui/react';
import { FormikProps } from 'formik';
import { getClassNames } from './ImmunizationSearch.classNames';
import CustomSearchBox, {
    ISuggestionItem,
} from 'src/common/components/AutoCompleteSearch/CustomSearchBox/CustomSearchBox';
import { useSearchImmunizationLazyQuery } from 'src/graphQL/serverMocks/graphQLGeneratedCode';
import { HighlightTextView } from 'src/common/components/AutoCompleteSearch';

import { ERROR_MESSAGES } from 'src/app/Strings';
import { trackClick } from 'src/wcpConsentInit';

// When making a new search component, Search interface needs to accurately reflect props
interface ImmunizationSearchProps {
    formik?: FormikProps<{
        immunization: {
            name?: string;
            code?: string;
        };
    }>;
    defaultTerm?: string;
}

const ImmunizationSearch: React.FC<ImmunizationSearchProps> = ({ formik, defaultTerm }) => {
    const [term, setTerm] = useState(defaultTerm ?? '');

    const DEBOUNCE_TIME = 500;

    const onChange = (e, newValue) => {
        // Fixing a UI bug where navigated from First Time Experience would launch suggestions
        const defaultTermWasPopulated = e === undefined && newValue === defaultTerm;
        if (!defaultTermWasPopulated) {
            updateSearchTerm(newValue);
            setTerm(newValue);
        }
    };

    const updateSearchTerm = async (searchTermDebounce: string) => {
        if (searchTermDebounce.length > 0) {
            try {
                await setResultsFromApi(searchTermDebounce);
            } catch (error) {
                setDataResult(null);
            }
        }
        if (searchTermDebounce.length === 0) {
            setDataResult(null);
        }
    };

    const onSuggestionClicked = (suggestion: ISuggestionItem, handleClickSearchbox?: (suggestion) => void) => {
        trackClick('immunization-suggestion');
        if (handleClickSearchbox) {
            handleClickSearchbox(suggestion);
        }
        if (typeof suggestion === 'string') {
            setTerm(suggestion);
        } else {
            setTerm(suggestion.getSearchText());
        }

        setFormik(suggestion);
    };

    // Variable logic stored in custom hook for easy replication for different search components
    const { setFormik, setResultsFromApi, setDataResult, suggestions, searchLoading, viewCreators } =
        useSearchImmunizationHooks(formik, onSuggestionClicked);

    return (
        <div>
            <Stack horizontal>
                <CustomSearchBox
                    value={term}
                    onChange={onChange}
                    suggestions={suggestions}
                    debounceTime={DEBOUNCE_TIME}
                    inProgress={searchLoading}
                    viewCreators={viewCreators}
                    defaultTerm={defaultTerm}
                    searchLoading={searchLoading}
                    placeholder="Search immunizations"
                />
            </Stack>
        </div>
    );
};

// All variable logic for custom search components is encapsulated in hook. Can be replaced with new hook
// for a different component.
const useSearchImmunizationHooks = (formik, onSuggestionClicked) => {
    const classNames = getClassNames();

    const { setErrorToast } = useFeedbackService();

    const [dataResult, setDataResult] = useState<any>();
    const [suggestions, setSuggestions] = useState<string[] | ImmunizationSearchResult[]>([]);

    useEffect(() => {
        // Disable save after user has updated search term, the last action they take has to be selecting
        // the search term to populate
        // dataResult === undefined is only applicable when the default term is loading in for the Edit field
        if (dataResult !== undefined) {
            clearFields();
        }

        const suggestionsData = mapSuggestionsToSearchResults(dataResult);
        setSuggestions(suggestionsData);

        if (dataResult?.length === 0) {
            setSuggestions(['No results found']);
        }
    }, [dataResult]);

    // Update values below for new search component.

    // Search result defines attributes used by search box.
    class ImmunizationSearchResult implements ISuggestionItem {
        constructor(private name: string, private code: string) {}
        getSearchText: () => string = () => {
            return this.name;
        };
        getSearchId: () => string = () => {
            return this.code;
        };

        // Not tied to ISuggestionItem interface, specifically used for ImmunizationSearchResult
        getName: () => string = () => {
            return this.name;
        };
        getCode: () => string = () => {
            return this.code;
        };
    }

    // Pull in data from API and map to new SearchResult class.
    const mapSuggestionsToSearchResults = (dataResult) => {
        const suggestionsData = dataResult?.map((val: any) => {
            return new ImmunizationSearchResult(val.name, val.code);
        });

        return suggestionsData;
    };

    // API used to get data for search.
    const [searchImmunizations, { loading: searchLoading }] = useSearchImmunizationLazyQuery({
        onError: () => {
            setErrorToast(ERROR_MESSAGES.SEARCH_IMMUNIZATION);
        },
    });

    // Implementation of API search function.
    const setResultsFromApi = async (searchTermDebounce: string) => {
        // Disable save after user has updated search term, the last action they take has to be selecting
        // the search term to populate
        clearFields();

        const result = await searchImmunizations({ variables: { searchText: searchTermDebounce } });
        setDataResult(result?.data.vaccineSearch.result?.searchResults);
    };

    // Set formik props used by search.
    const setFormik = (suggestion: ISuggestionItem | string) => {
        const typedSuggestion = suggestion as ImmunizationSearchResult;
        formik.setFieldValue('immunization.name', typedSuggestion.getName());
        formik.setFieldValue('immunization.code', typedSuggestion.getCode());
    };

    // Changing search field values without selecting a suggestion will result in save being disabled
    const clearFields = () => {
        formik.setFieldValue('immunization.name', '');
        formik.setFieldValue('immunization.code', '');
    };

    // This function returns one of the two ListItem components below based on the suggestion.
    // It is called inside of the CustomSearchBox component, query corresponds to the value in the searchbox
    // and handleClickSearchBox handles the formatting of the searchbox itself.
    const getSuggestionViews = (query: string, handleClickSearchBox: (suggestion) => void): JSX.Element[] => {
        let views: JSX.Element[] = [];
        if (!suggestions) return [<div key={'empty-div'} />];
        suggestions.forEach((suggestion: string | ImmunizationSearchResult, i: number) => {
            if (typeof suggestion === 'string') {
                views.push(
                    <DefaultListItem
                        suggestion={suggestion}
                        index={i}
                        handleClickSearchBox={handleClickSearchBox}
                        key={suggestion}
                        nonClickable
                    />,
                );
            } else {
                views.push(
                    <ImmunizationListItem
                        suggestion={suggestion}
                        index={i}
                        query={query}
                        handleClickSearchBox={handleClickSearchBox}
                        key={suggestion.getSearchId()}
                    />,
                );
            }
        });

        return views;
    };

    interface IImmunizationListItemProps {
        suggestion: ImmunizationSearchResult;
        index: number;
        query: string;
        handleClickSearchBox: (suggestion) => void;
    }

    const ImmunizationListItem: React.FC<IImmunizationListItemProps> = ({
        suggestion,
        index,
        query,
        handleClickSearchBox,
    }) => {
        return (
            <Link
                key={`${suggestion.getSearchId()}, ${index}`}
                onClick={() => onSuggestionClicked(suggestion, handleClickSearchBox)}
                className={classNames['wc-ImmunizationSearch--oneSuggestion']}
                role="listitem"
                data-testid={'route-medName'}
            >
                <Stack>
                    <HighlightTextView text={suggestion.getSearchText()} filter={query || ''} />
                </Stack>
            </Link>
        );
    };

    const defaultSuggestionItem: React.CSSProperties = {
        width: '100%',
        float: 'left',
        padding: '5px',
    };

    interface IDefaultListItemProps {
        suggestion: string;
        index: number;
        handleClickSearchBox: (suggestion) => void;
        nonClickable?: boolean;
    }

    const DefaultListItem: React.FC<IDefaultListItemProps> = ({
        suggestion,
        index,
        handleClickSearchBox,
        nonClickable = false,
    }) => {
        const style = nonClickable
            ? 'wc-ImmunizationSearch--defaultSuggestion-nonClickable'
            : `wc-ImmunizationSearch--defaultSuggestion`;

        return (
            <div className="oneSuggestion" role="listitem" key={index}>
                <Link
                    data-testid={'route-immunizationName'}
                    onClick={() => onSuggestionClicked(suggestion, handleClickSearchBox)}
                    style={defaultSuggestionItem}
                    className={classNames[style]}
                >
                    <Text>{suggestion}</Text>
                </Link>
            </div>
        );
    };

    // viewCreators is structured as an array of objects to allow for multiple sections of
    // search results to be passed into the CustomSearchBox component.
    const viewCreators = [
        {
            getSuggestionViews: getSuggestionViews,
        },
    ];

    return {
        suggestions,
        searchLoading,
        viewCreators,
        setResultsFromApi,
        setFormik,
        setDataResult,
    };
};

export default ImmunizationSearch;
