import React, { useEffect } from 'react';
import { useState } from 'react';
import { Stack, Text, Spinner, SpinnerSize } from '@fluentui/react';
import { HighlightTextView, AutocompleteSearchBox, ISuggestionItem } from 'src/common/components/AutoCompleteSearch';
import { FormikProps } from 'formik';
import { getClassNames } from './MedicationSearch.classNames';
import { capitalizeFirstLetter } from 'src/common/helpers/textFormatting';
import { trackClick } from 'src/wcpConsentInit';

export const SEARCH_MEDICATIONS_TEXT = 'Search medications';

interface MedicationSearchProps {
    data: any;
    updateSearchTerm: (value: string) => void;
    onSuggestionClicked: (suggestion: string | ISuggestionItem) => Promise<void>;
    formik?: FormikProps<{
        name: string;
    }>;
    searchLoading?: boolean;
    defaultTerm?: string;
    hasError?: boolean;
}
/* eslint-disable react/jsx-no-bind */
const MedicationSearch: React.FC<MedicationSearchProps> = ({
    data,
    searchLoading,
    updateSearchTerm,
    onSuggestionClicked,
    formik,
    defaultTerm,
    hasError,
}) => {
    const classNames = getClassNames();

    const firstTerm = defaultTerm ? defaultTerm : '';
    const [term, setTerm] = useState(firstTerm);

    const debounceTime = 500;
    const [suggestions, setSuggestions] = useState<string[] | ISuggestionItem[]>([]);
    class SearchResult implements ISuggestionItem {
        constructor(
            private routedDoseFormDrugID: number,
            public drugNameDesc: string,
            private doseFormDesc: string,
            private routeDesc: string,
        ) {}
        getSearchText: () => string = () => {
            return this.drugNameDesc;
        };
        getSuggestionItem(query?: string) {
            return (
                <div key={this.routedDoseFormDrugID}>
                    <Stack>
                        <HighlightTextView text={this.drugNameDesc} filter={query || ''} />
                        <Text data-testid="routeDose"> {this.getRouteAndDoseForm()}</Text>
                    </Stack>
                </div>
            );
        }
        getSearchId: () => number = () => {
            return this.routedDoseFormDrugID;
        };
        getRouteAndDoseForm: () => string = () => {
            return `${this.routeDesc} ${this.doseFormDesc}`;
        };
    }

    useEffect(() => {
        const suggestionsData = data?.map(
            (val: any) =>
                new SearchResult(
                    val.routedDoseFormDrugID,
                    capitalizeFirstLetter(val.drugNameDesc),
                    capitalizeFirstLetter(val.doseFormDesc),
                    capitalizeFirstLetter(val.routeDesc),
                ),
        );

        setSuggestions(suggestionsData);
        if (data?.length === 0) {
            setSuggestions(['No results found']);
        }
    }, [data]);

    useEffect(() => {
        setTerm(firstTerm);
        if (formik) {
            formik.setFieldValue('name', firstTerm);
        }
    }, []);

    const onSuggestionClickedSearch = async (suggestion: ISuggestionItem) => {
        trackClick('onSuggestionClickedSearch');
        await onSuggestionClicked(suggestion);
        setTerm(suggestion.getSearchText());
        if (formik) {
            formik.setFieldValue('name', suggestion.getSearchText());
            formik.validateForm();
        }
    };

    return (
        //a custom document picker component
        <div>
            <Stack horizontal>
                <AutocompleteSearchBox
                    onSuggestionClicked={onSuggestionClickedSearch}
                    placeholder={SEARCH_MEDICATIONS_TEXT}
                    value={term}
                    onChange={(e, newValue) => {
                        // Fixing a UI bug where navigated from First Time Experience would launch suggestions
                        const defaultTermWasPopulated = e === undefined && newValue === defaultTerm;
                        if (!defaultTermWasPopulated) {
                            updateSearchTerm(newValue);
                            setTerm(newValue);
                            if (formik) {
                                formik.setFieldValue('name', newValue);
                            }
                        }
                    }}
                    suggestions={suggestions}
                    debounceTime={debounceTime}
                    inProgress={searchLoading}
                    defaultTerm={firstTerm}
                    onBlur={() => {
                        if (formik) {
                            formik.setTouched({ ...formik.touched, name: true });
                        }
                    }}
                    hasError={hasError}
                />

                {searchLoading && (
                    <Spinner className={classNames['wc-MedicationSearch--spinner']} size={SpinnerSize.small} />
                )}
            </Stack>
        </div>
    );
};

export default MedicationSearch;
