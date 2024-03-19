// Refills are present in Prescription as a list, but @graphql-tools/mock does not support
// custom nested lists. This custom mock will be applied to all values of the Refill type to
// make sure that the date value matches the expected format

export const Refill = () => ({
    refillDate: '2020-05-01',
    id: '1',
});
