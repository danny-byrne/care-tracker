import React, { useEffect } from "react";
import { useState } from "react";
import { useFeedbackService } from "src/services/FeedbackService";

import { Stack, Link, Text } from "@fluentui/react";
import { FormikProps } from "formik";
import { getClassNames } from "./ProviderSearch.classNames";
import CustomSearchBox, {
  ISuggestionItem,
} from "src/common/components/AutoCompleteSearch/CustomSearchBox/CustomSearchBox";

import { useSearchProviderLazyQuery } from "src/graphQL/serverMocks/graphQLGeneratedCode";
import { HighlightTextView } from "src/common/components/AutoCompleteSearch";

import {
  capitalizeFirstLetterOfEachWord,
  capitalizeOnlyFirstLetter,
} from "src/common/helpers/textFormatting";
import { ERROR_MESSAGES } from "src/app/Strings";

import { addNewText } from "src/helpers/medications";
import { formatPhoneNumber } from "src/utils/utils";

// When making a new search component, Search interface needs to accurately reflect props
interface ProviderSearchProps {
  formik?: FormikProps<{
    provider: {
      phone: string;
      nPI: string;
      firstName: string;
      lastName: string;
      id?: string;
      providerSelected: boolean;
      address: {
        addressLine1: string;
        city: string;
        country: string;
        state: string;
        zipCode: string;
      };
      primarySpecialty?: string;
      other?: boolean;
    };
  }>;
  defaultTerm?: string;
  isAdd?: boolean;
}

type Address = {
  address1: string;
  address2: string;
  city: string;
  zipCode: string;
  state: string;
  telephoneNumber: string;
};

const OTHER_STRING = "Add your own";

const ProviderSearch: React.FC<ProviderSearchProps> = ({
  formik,
  defaultTerm,
  isAdd,
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
  } = useSearchProviderHooks(formik, onSuggestionClicked, isAdd);

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
          placeholder="Search a provider name or address"
          clearFields={clearFields}
        />
      </Stack>
    </div>
  );
};

// All variable logic for custom search components is encapsulated in hook. Can be replaced with new hook
// for a different component.
const useSearchProviderHooks = (formik, onSuggestionClicked, isAdd) => {
  const classNames = getClassNames();

  const { setErrorToast } = useFeedbackService();

  const [dataResult, setDataResult] = useState<any>();
  const [suggestions, setSuggestions] = useState<
    string[] | ProviderSearchResult[]
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
      setSuggestions(["No results found"]);
    }
  }, [dataResult]);

  // Update values below for new search component.

  // Add Providers page has a different placeholder
  const PLACEHOLDER_TEXT = isAdd
    ? "Search a provider name or address"
    : "Who prescribed this medication?";

  // Search result defines attributes used by search box.
  class ProviderSearchResult implements ISuggestionItem {
    constructor(
      private firstName: string,
      private lastName: string,
      private taxonomy: string,
      private address: Address,
      private nPI: string
    ) {}
    getSearchText: () => string = () => {
      return `${this.firstName} ${this.lastName}, ${this.taxonomy}`;
    };
    getSearchId: () => number = () => {
      return parseInt(this.nPI);
    };
    getAddress: () => Address = () => {
      return this.address;
    };
    getAddressText: () => string = () => {
      const addressTwoIfProvided = this.address.address2
        ? " " + this.address.address2 + ","
        : ",";
      const addressStringWithoutState = `${this.address.address1}${addressTwoIfProvided} ${this.address.city}`;
      const formattedAddress = capitalizeFirstLetterOfEachWord(
        addressStringWithoutState
      );
      const finalAddress =
        formattedAddress + `, ${this.address.state} ${this.address.zipCode}`;
      return finalAddress;
    };
    getPhoneNumber: () => string = () => {
      return this.address.telephoneNumber;
    };
    getNPI: () => string = () => {
      return this.nPI;
    };
    getFirstName: () => string = () => {
      return this.firstName;
    };
    getLastName: () => string = () => {
      return this.lastName;
    };
    getTaxonomy: () => string = () => {
      return this.taxonomy;
    };
  }

  // Pull in data from API and map to new SearchResult class.
  const mapSuggestionsToSearchResults = (dataResult) => {
    const suggestionsData = dataResult?.map((val: any) => {
      const address: Address = {
        address1: val?.providerFirstLineBusinessPracticeLocationAddress,
        address2: val?.providerSecondLineBusinessPracticeLocationAddress,
        city: val?.providerBusinessPracticeLocationAddressCityName,
        zipCode: val?.providerBusinessPracticeLocationAddressPostalCode,
        state: val?.providerBusinessPracticeLocationAddressStateName,
        telephoneNumber:
          val?.providerBusinessPracticeLocationAddressTelephoneNumber,
      };
      return new ProviderSearchResult(
        capitalizeOnlyFirstLetter(val?.providerFirstName),
        capitalizeOnlyFirstLetter(val?.providerLastName),
        val.primaryTaxonomyDisplayName,
        address,
        val.nPI
      );
    });

    return suggestionsData;
  };

  // API used to get data for search.
  const [searchProviders, { loading: searchLoading }] =
    useSearchProviderLazyQuery({
      onError: () => {
        setErrorToast(ERROR_MESSAGES.SEARCH_PROVIDER);
      },
    });

  // Implementation of API search function.
  const setResultsFromApi = async (searchTermDebounce: string) => {
    // Disable save after user has updated search term, the last action they take has to be selecting
    // the search term to populate
    clearFields();

    const result = await searchProviders({
      variables: { searchText: searchTermDebounce },
    });
    setDataResult(result?.data.providersSearch.result?.items);
  };

  // Set formik props used by search.
  const setFormik = (suggestion: ISuggestionItem | string) => {
    // Suggestion will return 'Other' if user clicks on the other option.
    // This acts as a manual entry for Provider name and info

    if (suggestion === OTHER_STRING) {
      clearFields();
      formik.setFieldValue("provider.other", true);
    } else {
      const typedSuggestion = suggestion as ProviderSearchResult;

      const address = typedSuggestion.getAddress();
      let newProviderDetails = {
        id: addNewText,
        nPI: typedSuggestion.getNPI(),
        firstName: typedSuggestion.getFirstName(),
        lastName: typedSuggestion.getLastName(),
        phone: formatPhoneNumber(typedSuggestion.getPhoneNumber()),
        address: {
          addressLine1: address.address1,
          city: address.city,
          state: address.state,
          zipCode: address.zipCode,
          displayAddress: typedSuggestion.getAddressText(),
        },
        providerSelected: true,
        primarySpecialty: typedSuggestion.getTaxonomy(),
        other: false,
      };
      formik.setFieldValue("provider", newProviderDetails);
    }
  };

  // Changing search field values without selecting a suggestion will result in save being disabled
  const clearFields = () => {
    formik.setFieldValue("provider.nPI", "");
    formik.setFieldValue("provider.firstName", "");
    formik.setFieldValue("provider.lastName", "");

    formik.setFieldValue("provider.phone", "");

    formik.setFieldValue("provider.address.addressLine1", "");
    formik.setFieldValue("provider.address.city", "");
    formik.setFieldValue("provider.address.country", "");
    formik.setFieldValue("provider.address.state", "");
    formik.setFieldValue("provider.address.zipCode", "");
    formik.setFieldValue("provider.address.displayAddress", "");

    formik.setFieldValue("provider.providerSelected", false);
    formik.setFieldValue("provider.primarySpecialty", "");
    formik.setFieldValue("provider.other", false);
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
      (suggestion: string | ProviderSearchResult, i: number) => {
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
            <ProviderListItem
              suggestion={suggestion}
              index={i}
              query={query}
              handleClickSearchBox={handleClickSearchBox}
              key={suggestion.getNPI()}
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

  interface IProviderListItemProps {
    suggestion: ProviderSearchResult;
    index: number;
    query: string;
    handleClickSearchBox: (suggestion) => void;
  }

  const ProviderListItem: React.FC<IProviderListItemProps> = ({
    suggestion,
    index,
    query,
    handleClickSearchBox,
  }) => {
    return (
      <Link
        key={`${suggestion.getSearchId()}, ${index}`}
        onClick={() => onSuggestionClicked(suggestion, handleClickSearchBox)}
        className={classNames["wc-ProviderSearch--oneSuggestion"]}
        role="listitem"
        data-testid={"route-medName"}
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
      ? "wc-ProviderSearch--defaultSuggestion-nonClickable"
      : `wc-ProviderSearch--defaultSuggestion`;

    return (
      <div className="oneSuggestion" role="listitem" key={index}>
        <Link
          data-testid={"route-providerName"}
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

export default ProviderSearch;
