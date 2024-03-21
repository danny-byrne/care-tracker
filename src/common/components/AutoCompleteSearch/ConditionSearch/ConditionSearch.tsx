import React, { useEffect, useState } from "react";
import { Stack, Spinner, SpinnerSize, Link, Label } from "@fluentui/react";
import { FormikProps } from "formik";

import { useFeedbackService } from "src/services/FeedbackService";
import { getClassNames } from "./ConditionSearch.classNames";
import CustomSearchBox, {
  ISuggestionItem,
} from "src/common/components/AutoCompleteSearch/CustomSearchBox/CustomSearchBox";
import { useConditionSearchLazyQuery } from "src/graphQL/serverMocks/graphQLGeneratedCode";
import { HighlightTextView } from "src/common/components/AutoCompleteSearch";
import { ERROR_MESSAGES } from "src/app/Strings";

import { addNewText } from "src/helpers/medications";

interface ConditionSearchProps {
  formik?: FormikProps<{
    condition?: { conditionName: string; icd10Code: string };
    conditions?: { conditionName: string; icd10Code: string }[];
  }>;
  fromMedManagerView?: boolean;
  showLabel?: boolean;
  isArray?: boolean;
  clearTextOnClick?: boolean;
  defaultTerm?: string;
}

interface MedicationConditionSearchProps {
  formik?: any;
  fromMedManagerView?: boolean;
  showLabel?: boolean;
  isArray?: boolean;
  clearTextOnClick?: boolean;
  defaultTerm?: string;
}
/* eslint-disable react/jsx-no-bind */
const ConditionSearch: React.FC<
  ConditionSearchProps | MedicationConditionSearchProps
> = ({
  formik,
  fromMedManagerView = false,
  showLabel = false,
  isArray = false,
  clearTextOnClick = false,
  defaultTerm,
}) => {
  const classNames = getClassNames();
  const [term, setTerm] = useState(defaultTerm ?? "");

  const DEBOUNCE_TIME = 500;

  const onChange = (e, newValue) => {
    updateSearchTerm(newValue);
    setTerm(newValue);
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

  const onSuggestionClicked = (
    suggestion: any,
    handleClickSearchbox?: (suggestion) => void
  ) => {
    if (handleClickSearchbox) {
      handleClickSearchbox(suggestion);
    }
    setTerm(suggestion.conditionName);
    if (formik) {
      setFormik(suggestion);
    }
  };

  const handleClearFields = () => {
    const initCondition = {
      conditionOccurrenceId: null,
      name: null,
      iCD10Code: null,
      conditionId: null,
      conditionStarted: {
        year: null,
        day: null,
        month: null,
        unsureOfSpecificYear: false,
        relativeStart: null,
        relativeEnd: null,
      },
    };
    formik.setFieldValue("condition", initCondition);
  };

  // Variable logic stored in custom hook for easy replication for different search components
  const {
    setFormik,
    setResultsFromApi,
    setDataResult,
    suggestions,
    searchLoading,
    viewCreators,
    PLACEHOLDER_TEXT,
  } = useSearchConditionHooks(
    formik,
    onSuggestionClicked,
    fromMedManagerView,
    isArray
  );

  return (
    //a custom document picker component
    <div>
      {showLabel && <Label>Condition</Label>}
      <Stack horizontal>
        <CustomSearchBox
          placeholder={PLACEHOLDER_TEXT}
          value={term}
          onChange={onChange}
          suggestions={suggestions}
          debounceTime={DEBOUNCE_TIME}
          inProgress={searchLoading}
          viewCreators={viewCreators}
          clearFields={handleClearFields}
          clearTextOnClick={clearTextOnClick}
          defaultTerm={defaultTerm}
        />
        {searchLoading && (
          <Spinner
            className={classNames["wc-ConditionSearch--spinner"]}
            size={SpinnerSize.small}
          />
        )}
      </Stack>
    </div>
  );
};

// All variable logic for custom search components is encapsulated in hook. Can be replaced with new hook
// for a different component.
const useSearchConditionHooks = (
  formik,
  onSuggestionClicked,
  fromMedManagerView,
  isArray
) => {
  const classNames = getClassNames();

  const { setErrorToast } = useFeedbackService();

  const [dataResult, setDataResult] = useState<any>();
  const [suggestions, setSuggestions] = useState<any[]>([]);

  useEffect(() => {
    const suggestionsData = mapSuggestionsToSearchResults(dataResult);

    if (suggestionsData?.length === 0) {
      setSuggestions(["No results found"]);
    } else {
      setSuggestions(suggestionsData);
    }
  }, [dataResult]);

  // Update values below for new search component.

  const PLACEHOLDER_TEXT = "Search to add a condition";

  // Search result defines attributes used by search box.
  class ConditionSearchResult implements ISuggestionItem {
    constructor(
      private conditionName: string,
      private icd10Code: string,
      private index: number
    ) {}
    getSearchText: () => string = () => {
      return `${this.conditionName}`;
    };
    getSearchId: () => number = () => {
      return this.index;
    };
  }

  // Pull in data from API and map to new SearchResult class.
  const mapSuggestionsToSearchResults = (dataResult) => {
    const suggestionsData = dataResult?.map((val: any, index) => {
      return new ConditionSearchResult(val.conditionName, val.icd10Code, index);
    });

    return suggestionsData;
  };

  const [searchCondition, { loading: searchLoading }] =
    useConditionSearchLazyQuery({
      onError: () => {
        setErrorToast(ERROR_MESSAGES.SEARCH_CONDITION);
      },
    });

  // Implementation of API search function.
  const setResultsFromApi = async (searchTermDebounce: string) => {
    const result = await searchCondition({
      variables: { input: { searchText: searchTermDebounce } },
    });
    setDataResult(result?.data.conditionSearch.result?.conditions);
  };

  // Set formik props used by search.
  const setFormik = (suggestion: any) => {
    //  Different handlers if only a single entity is being added (e.g. Care Plan flow)
    //  vs if an array is modfified (e.g. Onboarding Wizard flow)
    if (!isArray) {
      if (fromMedManagerView) {
        formik.setFieldValue("condition", {
          name: suggestion.conditionName,
          iCD10Code: suggestion.icd10Code,
          conditionOccurrenceId: addNewText,
        });
      } else {
        formik.setFieldValue("condition", {
          conditionName: suggestion.conditionName,
          icd10Code: suggestion.icd10Code,
        });
      }
    } else {
      // Only add condition to array if it's not already present
      const conditionIndexInCurrentArray = formik.values.conditions?.find(
        (condition) => {
          return condition.icd10Code === suggestion.icd10Code;
        }
      );
      if (conditionIndexInCurrentArray === undefined) {
        const index = formik.values.conditions?.length;
        formik.setFieldValue(`conditions.${index}`, {
          conditionName: suggestion.conditionName,
          icd10Code: suggestion.icd10Code,
        });
        // Searchbox clears after adding to array
      }
    }
  };

  // This function returns one of the two ListItem components below based on the suggestion.
  // It is called inside of the CustomSearchBox component, query corresponds to the value in the searchbox
  // and handleClickSearchBox handles the formatting of the searchbox itself.
  const getSuggestionViews = (
    query: string,
    handleClickSearchBox: (suggestion) => void
  ): JSX.Element[] => {
    let views: JSX.Element[] = [];
    if (!suggestions) return [<div key={"empty-div"} />];
    else {
      suggestions.forEach((suggestion, i) => {
        views.push(
          <ConditionListItem
            suggestion={suggestion}
            index={i}
            query={query}
            handleClickSearchBox={handleClickSearchBox}
          />
        );
      });
    }

    return views;
  };

  interface IConditionListItemProps {
    suggestion: any;
    index: number;
    query: string;
    handleClickSearchBox: (suggestion) => void;
  }

  const ConditionListItem: React.FC<IConditionListItemProps> = ({
    suggestion,
    index,
    query,
    handleClickSearchBox,
  }) => {
    return (
      <Link
        key={`${index}`}
        onClick={() => {
          onSuggestionClicked(suggestion, handleClickSearchBox);
        }}
        className={classNames["wc-ConditionSearch--oneSuggestion"]}
        role="listitem"
        data-testid={"route-medName"}
      >
        <Stack>
          <HighlightTextView
            text={suggestion.conditionName}
            filter={query || ""}
          />
        </Stack>
      </Link>
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
    PLACEHOLDER_TEXT,
  };
};

export default ConditionSearch;
