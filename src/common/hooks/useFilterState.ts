import { useEffect, useState } from 'react';
import { useQueryStringParams } from 'src/common/hooks/useQueryStringParams';

export const NoFilterKey = 'NONE';

// To help prevent changing of keys and pollution of our dear user's
// LocalStorage, we're going to attempt to be a bit disciplined and
// make sure each time we use a filter in a new view that it has a
// unique key defined for it. When adding a new filter, go aheand and
// add (register) a new key for it here.
export const enum FilterKeys {
    MedicationList = 'MEDICATION_LIST',
    Profile = 'profile',
    Documents = 'documents',
}

/*
// useFilterState is a hook to be used by views that are configurable by adding various types of
// filters. There are many responsibilities that need to be met in this scenario:
//
// - Filters should be put in the URL's querystring parameters as "filter=<some filter>" so that
//   the view with the selected filters can be copied and shared (as a deep-link).
// - Filters should be cached in the browser so that when someone navigates back to the filter page,
//   the cached value (a preference) is reloaded.
// - When changing filters, the browser history shouldn't be updated.
//
// This hook satisfies all of these responsibilities. Just import and declare it like this:
//
//   const { filter, setFilter } = useFilterState(FilterKeys.<a unique key>);
//
// Note: you need to register a new key (see note above) that will be used when caching the filter
// in LocalStorage.
//
// You can now use `filter` to configure your view, and you can use `setFilter` to update the filter.
// The filter value must be a string (or NoFilterKey).
*/
export const useFilterState = (uniqueFilterName: FilterKeys) => {
    const localStorageFilterKey: string = `filter-${uniqueFilterName}`;
    const { getSearchParam, addSearchParam, removeSearchParam } = useQueryStringParams();

    let paramsFilter = getSearchParam('filter');
    const [filter, setFilter] = useState<string>(NoFilterKey);

    // We need to keep three different pieces of state in sync here: local state, param state, and
    // cached state (in local storage). Querystring parameters are the most important because
    // we may be setting filters from a deep-link. Only if no param is set, do we look into our
    // local storage.

    // If a filter is set in the querystring params, make sure it is cached.
    useEffect(() => {
        const cachedFilter = localStorage.getItem(localStorageFilterKey);
        if (paramsFilter !== null) {
            // Cache this value if we need to.
            if (cachedFilter !== paramsFilter) {
                localStorage.setItem(localStorageFilterKey, paramsFilter);
            }
        }
    }, [localStorageFilterKey, paramsFilter]);

    // If no querystring params and a filter is cached, update the querystring to match.
    useEffect(() => {
        const cachedFilter = localStorage.getItem(localStorageFilterKey);
        if (paramsFilter === null && cachedFilter !== null) {
            addSearchParam({ filter: cachedFilter });
        }
    }, [addSearchParam, localStorageFilterKey, paramsFilter]);

    // Make sure the state matches the querystring and cache.
    useEffect(() => {
        const cachedFilter = localStorage.getItem(localStorageFilterKey);
        if (paramsFilter === cachedFilter && filter !== cachedFilter) {
            setFilter(cachedFilter ?? NoFilterKey);
        }
    }, [filter, localStorageFilterKey, paramsFilter]);

    // Set a new filter by persisting the choice in LocalStorage and
    // updating the querystring search params, but don't add to the
    // navigation stack.
    const onFilter = (newFilter: string) => {
        if (newFilter !== NoFilterKey) {
            localStorage.setItem(localStorageFilterKey, newFilter);
            addSearchParam({ filter: newFilter });
            setFilter(newFilter);
        } else {
            // Reset the filter back to default.
            localStorage.removeItem(localStorageFilterKey);
            removeSearchParam('filter');
            setFilter(NoFilterKey);
        }
    };

    return { filter, setFilter: onFilter };
};
