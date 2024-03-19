export const removeValueFromFormikArray = (formik, valueName, paramName, id) => {
    const selectedIndex = formik.values[valueName].findIndex((value) => value[paramName] === id);

    const temp = formik.values[valueName];
    temp.splice(selectedIndex, 1);
    formik.setFieldValue(valueName, temp);
};
