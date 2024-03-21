import React, { useEffect } from "react";
import { useState } from "react";
import { useFeedbackService } from "src/services/FeedbackService";

import { Stack, Link, Text } from "@fluentui/react";
import { FormikProps } from "formik";
import { getClassNames } from "./AddressSearch.classNames";
import CustomSearchBox, {
  ISuggestionItem,
} from "src/common/components/AutoCompleteSearch/CustomSearchBox/CustomSearchBox";
import {
  PointOfInterest,
  useSearchAddressLazyQuery,
} from "src/graphQL/serverMocks/graphQLGeneratedCode";
import { HighlightTextView } from "src/common/components/AutoCompleteSearch";

import { ERROR_MESSAGES } from "src/app/Strings";
import { Address, AddressResult } from "src/types/Address";

// When making a new search component, Search interface needs to accurately reflect props
interface AddressSearchProps {
  formik?: FormikProps<{
    provider?: {
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
        displayAddress?: string;
      };
    };
    pharmacy?: {
      location: {
        addressLine1: string;
        city: string;
        country: string;
        state: string;
        zipCode: string;
        freeTextAddress?: string;
      };
    };
    activity?: {
      address: {
        addressLine1: string;
        city: string;
        country: string;
        state: string;
        zipCode: string;
        freeTextAddress?: string;
      };
    };
    address?: {
      addressLine1: string;
      city: string;
      country: string;
      state: string;
      zipCode: string;
      displayAddress?: string;
    };
    appointment?: {
      address: {
        addressLine1: string;
        city: string;
        state: string;
        zipCode: string;
        displayAddress?: string;
      };
    };
  }>;
  defaultTerm?: string;
  placeholder?: string;
}
const AddressSearch: React.FC<AddressSearchProps> = ({
  formik,
  defaultTerm,
  placeholder,
}) => {
  const [term, setTerm] = useState(defaultTerm ?? "");
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      // `geolocation` is available
      navigator.geolocation.getCurrentPosition((position) => {
        // If authorized, set the user's current location
        setLocation(position.coords);
      });
    }
  }, []);

  useEffect(() => {
    setTerm(defaultTerm);
  }, [defaultTerm]);

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
    if (searchTermDebounce.length === 0) {
      setDataResult(null);
      return;
    }

    try {
      await setResultsFromApi(
        searchTermDebounce,
        location?.latitude,
        location?.longitude
      );
    } catch (error) {
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
  } = useSearchAddressHooks(formik, onSuggestionClicked);

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
          ariaLabel="Address Search"
          placeholder={placeholder}
          data-testid="address-search"
        />
      </Stack>
    </div>
  );
};

// All variable logic for custom search components is encapsulated in hook. Can be replaced with new hook
// for a different component.
const useSearchAddressHooks = (formik, onSuggestionClicked) => {
  const classNames = getClassNames();

  const { setErrorToast } = useFeedbackService();

  const [dataResult, setDataResult] = useState<any>();
  const [suggestions, setSuggestions] = useState<
    string[] | AddressSearchResult[]
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

  // Search result defines attributes used by search box.
  class AddressSearchResult implements ISuggestionItem {
    constructor(
      private id: string,
      private freeTextDisplayAddress: string,
      private address: Address,
      private poi: PointOfInterest
    ) {}
    getSearchText: () => string = () => {
      return this.freeTextDisplayAddress;
    };
    getSearchId: () => string = () => {
      return this.id;
    };
    getAddress: () => Address = () => {
      return this.address;
    };
    getAddressName: () => string = () => {
      return this.poi?.name ?? "";
    };
  }

  // Pull in data from API and map to new SearchResult class.
  const mapSuggestionsToSearchResults = (dataResult) => {
    const suggestionsData = dataResult?.map((val: AddressResult) => {
      return new AddressSearchResult(
        val.id,
        val.address.freeTextDisplayAddress,
        val.address,
        val.poi
      );
    });

    return suggestionsData;
  };

  // API used to get data for search.
  const [searchAddress, { loading: searchLoading }] = useSearchAddressLazyQuery(
    {
      onError: () => {
        setErrorToast(ERROR_MESSAGES.SEARCH_ADDRESS);
      },
    }
  );

  // Implementation of API search function.
  const setResultsFromApi = async (
    searchTermDebounce: string,
    latitude?: number,
    longitude?: number
  ) => {
    // Disable save after user has updated search term, the last action they take has to be selecting
    // the search term to populate
    clearFields();

    var variables = {
      searchText: searchTermDebounce,
    };

    if (latitude != null && longitude != null) {
      variables["location"] = { latitude: latitude, longitude: longitude };
    }

    const result = await searchAddress({
      variables: variables,
    });
    setDataResult(result?.data.addressSearch.result?.results);
  };

  const setAddress = (prefix, addressValues, formik) => {
    let addressLine1 = [];

    if (addressValues.streetNumber) {
      addressLine1.push(addressValues.streetNumber);
    }

    if (addressValues.streetName) {
      addressLine1.push(addressValues.streetName);
    }

    if (addressLine1.length > 0) {
      formik.setFieldValue(
        `${prefix}address.addressLine1`,
        addressLine1.join(" ")
      );
    }

    formik.setFieldValue(`${prefix}address.city`, addressValues.city);
    formik.setFieldValue(`${prefix}address.country`, addressValues.country);
    formik.setFieldValue(`${prefix}address.state`, addressValues.state);

    if (addressValues.extendedZipCode) {
      formik.setFieldValue(
        `${prefix}address.zipCode`,
        addressValues.extendedZipCode
      );
    } else if (addressValues.zipCode) {
      formik.setFieldValue(`${prefix}address.zipCode`, addressValues.zipCode);
    }

    formik.setFieldValue(
      `${prefix}address.displayAddress`,
      addressValues.freeTextDisplayAddress
    );
  };

  const clearAddress = (prefix, formik) => {
    formik.setFieldValue(`${prefix}address.addressLine1`, "");
    formik.setFieldValue(`${prefix}address.city`, "");
    formik.setFieldValue(`${prefix}address.country`, "");
    formik.setFieldValue(`${prefix}address.state`, "");
    formik.setFieldValue(`${prefix}address.zipCode`, "");
    formik.setFieldValue(`${prefix}address.displayAddress`, "");
  };

  // Set formik props used by search.
  const setFormik = (suggestion: ISuggestionItem) => {
    const typedSuggestion = suggestion as AddressSearchResult;
    let addressValues = typedSuggestion.getAddress();

    if (formik.values.provider) {
      setAddress("provider.", addressValues, formik);
    }
    if (formik.values.address) {
      setAddress("", addressValues, formik);
    }
    if (formik.values.pharmacy) {
      setAddress("pharmacy.", addressValues, formik);
    }
    if (formik.values.activity) {
      formik.setFieldValue(
        "activity.address.addressLine1",
        `${addressValues.streetNumber} ${addressValues.streetName}`
      );
      formik.setFieldValue("activity.address.city", addressValues.city);
      formik.setFieldValue("activity.address.country", addressValues.country);
      formik.setFieldValue("activity.address.state", addressValues.state);
      formik.setFieldValue(
        "activity.address.zipCode",
        `${addressValues.zipCode}${addressValues.extendedZipCode}`
      );
      formik.setFieldValue(
        "activity.address.freeTextAddress",
        addressValues.freeTextDisplayAddress
      );
    }
    if (formik.values.appointment) {
      setAddress("appointment.", addressValues, formik);
    }
  };

  // Changing search field values without selecting a suggestion will result in save being disabled
  const clearFields = () => {
    if (formik.values.provider) {
      clearAddress("provider.", formik);
    }
    if (formik.values.address) {
      clearAddress("", formik);
    }
    if (formik.values.pharmacy) {
      clearAddress("pharmacy.", formik);
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
    suggestions.forEach(
      (suggestion: string | AddressSearchResult, i: number) => {
        if (typeof suggestion === "string") {
          views.push(
            <DefaultListItem
              suggestion={suggestion}
              index={i}
              query={query}
              handleClickSearchBox={handleClickSearchBox}
              key={suggestion}
            />
          );
        } else {
          views.push(
            <AddressListItem
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

    return views;
  };

  interface IProviderListItemProps {
    suggestion: AddressSearchResult;
    index: number;
    query: string;
    handleClickSearchBox: (suggestion) => void;
  }

  const AddressListItem: React.FC<IProviderListItemProps> = ({
    suggestion,
    index,
    query,
    handleClickSearchBox,
  }) => {
    return (
      <Link
        key={`${suggestion.getSearchId()}, ${index}`}
        onClick={() => onSuggestionClicked(suggestion, handleClickSearchBox)}
        className={classNames["wc-AddressSearch--oneSuggestion"]}
        role="listitem"
        data-testid={"route-medName"}
      >
        <Stack>
          <HighlightTextView
            text={suggestion.getSearchText()}
            filter={query || ""}
          />
          <Text>{suggestion.getAddressName()}</Text>
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
    query: string;
    handleClickSearchBox: (suggestion) => void;
  }

  const DefaultListItem: React.FC<IDefaultListItemProps> = ({
    suggestion,
    index,
    query,
    handleClickSearchBox,
  }) => {
    return (
      <div className="oneSuggestion" role="listitem" key={index}>
        <Link
          data-testid={"route-providerName"}
          onClick={() => onSuggestionClicked(suggestion, handleClickSearchBox)}
          style={defaultSuggestionItem}
        >
          <HighlightTextView text={suggestion} filter={query} />
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
    clearFields,
  };
};

export default AddressSearch;
