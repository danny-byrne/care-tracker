import React, { useEffect } from "react";
import { useState } from "react";
import { useFeedbackService } from "src/services/FeedbackService";

import { Stack, Link, Text } from "@fluentui/react";
import { FormikProps } from "formik";
import { getClassNames } from "./PharmacySearch.classNames";
import CustomSearchBox, {
  ISuggestionItem,
} from "src/common/components/AutoCompleteSearch/CustomSearchBox/CustomSearchBox";
import { useSearchPharmacyLazyQuery } from "src/graphQL/serverMocks/graphQLGeneratedCode";
import { HighlightTextView } from "src/common/components/AutoCompleteSearch";

import { ERROR_MESSAGES } from "src/app/Strings";
import { Address } from "src/types/Address";
import { formatPhoneNumber } from "src/utils/utils";

// When making a new search component, Search interface needs to accurately reflect props
interface PharmacySearchProps {
  formik: FormikProps<{
    pharmacy: {
      name?: string;
      phoneNumber: string;
      location: {
        addressLine1: string;
        city: string;
        country: string;
        state: string;
        zipCode: string;
        freeTextAddress?: string;
      };
    };
  }>;
  defaultTerm?: string;
}

const OTHER_STRING = "Add your own";
const NO_RESULTS = "No results found";

const PharmacySearch: React.FC<PharmacySearchProps> = ({
  formik,
  defaultTerm,
}) => {
  const [term, setTerm] = useState(defaultTerm ?? "");

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

  const onSuggestionClicked = (
    suggestion: ISuggestionItem,
    handleClickSearchbox?: (suggestion) => void
  ) => {
    if (handleClickSearchbox) {
      handleClickSearchbox(suggestion);
    }
    if (typeof suggestion === "string") {
      setTerm(suggestion);
    } else {
      setTerm(suggestion.getSearchText());
    }

    setFormik(suggestion);
  };

  // Variable logic stored in custom hook for easy replication for different search components
  const {
    setFormik,
    setResultsFromApi,
    setDataResult,
    suggestions,
    searchLoading,
    viewCreators,
    clearFields,
  } = useSearchPharmacyHooks(formik, onSuggestionClicked);

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
          clearFields={clearFields}
          placeholder="Search pharmacies"
        />
      </Stack>
    </div>
  );
};

// All variable logic for custom search components is encapsulated in hook. Can be replaced with new hook
// for a different component.
const useSearchPharmacyHooks = (formik, onSuggestionClicked) => {
  const classNames = getClassNames();

  const { setErrorToast } = useFeedbackService();

  const [dataResult, setDataResult] = useState<any>();
  const [suggestions, setSuggestions] = useState<
    string[] | PharmacySearchResult[]
  >([]);

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
      setSuggestions([NO_RESULTS]);
    }
  }, [dataResult]);

  // Update values below for new search component.
  const PLACEHOLDER_TEXT = "Search pharmacies";

  // Search result defines attributes used by search box.
  class PharmacySearchResult implements ISuggestionItem {
    constructor(
      private name: string,
      private id: string,
      private address: Address,
      private phoneNumber: string
    ) {}
    getSearchText: () => string = () => {
      return this.name;
    };
    getSearchId: () => string = () => {
      return this.id;
    };
    // Not tied to ISuggestionItem interface, specifically used for ProviderSearchResult
    getName: () => string = () => {
      return this.name;
    };
    getAddress: () => Address = () => {
      return this.address;
    };
    getAddressText: () => string = () => {
      return this.address.freeTextDisplayAddress;
    };
    getPhoneNumber: () => string = () => {
      return this.phoneNumber;
    };
  }

  // Pull in data from API and map to new SearchResult class.
  const mapSuggestionsToSearchResults = (dataResult) => {
    // Filter out results that do not include a name
    const filteredResults = dataResult?.filter((val) => val.poi?.name);
    const suggestionsData = filteredResults?.map((val: any) => {
      return new PharmacySearchResult(
        val.poi?.name,
        val.id,
        val.address,
        val.poi?.phoneNumber
      );
    });

    return suggestionsData;
  };

  // API used to get data for search.
  const [searchPharmacies, { loading: searchLoading }] =
    useSearchPharmacyLazyQuery({
      onError: () => {
        setErrorToast(ERROR_MESSAGES.SEARCH_PHARMACY);
      },
    });

  // Implementation of API search function.
  const setResultsFromApi = async (searchTermDebounce: string) => {
    // Disable save after user has updated search term, the last action they take has to be selecting
    // the search term to populate
    clearFields();

    const result = await searchPharmacies({
      variables: { searchText: searchTermDebounce },
    });
    setDataResult(result?.data.pharmacySearch.result?.results);
  };

  // Set formik props used by search.
  const setFormik = (suggestion: ISuggestionItem | string) => {
    // Suggestion will return 'Other' if user clicks on the other option.
    // This acts as a manual entry for Provider name and info

    // TODO: Is the Other suggestion necessary?
    if (suggestion === OTHER_STRING) {
      clearFields();
      formik.setFieldValue("pharmacy.other", true);
    } else {
      const typedSuggestion = suggestion as PharmacySearchResult;
      const address = typedSuggestion.getAddress();
      const addressLine1 = `${address.streetNumber} ${address.streetName}`;

      formik.setFieldValue("pharmacy.name", typedSuggestion.getName());
      formik.setFieldValue(
        "pharmacy.phoneNumber",
        formatPhoneNumber(typedSuggestion.getPhoneNumber())
      );
      formik.setFieldValue("pharmacy.location.addressLine1", addressLine1);
      formik.setFieldValue("pharmacy.location.city", address.city);
      formik.setFieldValue("pharmacy.location.country", address.country);
      formik.setFieldValue("pharmacy.location.state", address.state);
      formik.setFieldValue("pharmacy.location.zipCode", address.zipCode);
      formik.setFieldValue(
        "pharmacy.location.freeTextAddress",
        address.freeTextDisplayAddress
      );
      formik.setFieldValue("pharmacy.other", false);
    }
  };

  // Changing search field values without selecting a suggestion will result in save being disabled
  const clearFields = () => {
    formik.setFieldValue("pharmacy.name", "");
    formik.setFieldValue("pharmacy.phoneNumber", "");
    formik.setFieldValue("pharmacy.location.addressLine1", "");
    formik.setFieldValue("pharmacy.location.city", "");
    formik.setFieldValue("pharmacy.location.country", "");
    formik.setFieldValue("pharmacy.location.state", "");
    formik.setFieldValue("pharmacy.location.zipCode", "");
    formik.setFieldValue("pharmacy.location.freeTextAddress", "");
    formik.setFieldValue("pharmacy.other", false);
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
    suggestions.forEach(
      (suggestion: string | PharmacySearchResult, i: number) => {
        if (typeof suggestion === "string") {
          views.push(
            <DefaultListItem
              suggestion={suggestion}
              index={i}
              handleClickSearchBox={handleClickSearchBox}
              key={suggestion}
              nonClickable
            />
          );
        } else {
          views.push(
            <PharmacyListItem
              suggestion={suggestion}
              index={i}
              query={query}
              handleClickSearchBox={handleClickSearchBox}
              key={suggestion.getSearchId()}
            />
          );
        }
      }
    );

    views.push(
      <DefaultListItem
        suggestion={OTHER_STRING}
        index={suggestions.length + 1}
        handleClickSearchBox={handleClickSearchBox}
        key={"otherOption"}
      />
    );

    return views;
  };

  interface IPharmacyListItemProps {
    suggestion: PharmacySearchResult;
    index: number;
    query: string;
    handleClickSearchBox: (suggestion) => void;
  }

  const PharmacyListItem: React.FC<IPharmacyListItemProps> = ({
    suggestion,
    index,
    query,
    handleClickSearchBox,
  }) => {
    return (
      <Link
        key={`${suggestion.getSearchId()}, ${index}`}
        onClick={() => onSuggestionClicked(suggestion, handleClickSearchBox)}
        className={classNames["wc-PharmacySearch--oneSuggestion"]}
        role="listitem"
        data-testid={"route-pharmacyName"}
      >
        <Stack>
          <HighlightTextView
            text={suggestion.getSearchText()}
            filter={query || ""}
          />
          <Text>{suggestion.getAddressText()}</Text>
        </Stack>
      </Link>
    );
  };

  const defaultSuggestionItem: React.CSSProperties = {
    width: "100%",
    float: "left",
    padding: "5px",
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
      ? "wc-PharmacySearch--defaultSuggestion-nonClickable"
      : `wc-PharmacySearch--defaultSuggestion`;

    return (
      <div className="oneSuggestion" role="listitem" key={index}>
        <Link
          data-testid={"route-pharmacyName"}
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
    PLACEHOLDER_TEXT,
    clearFields,
  };
};

export default PharmacySearch;
