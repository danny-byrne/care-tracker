import { WordIcon } from 'src/assets/Misc/WordIcon';
import { ExcelIcon } from 'src/assets/Misc/ExcelIcon';
import { PDFIcon } from 'src/assets/Misc/PDFIcon';
import { DefaultIcon } from 'src/assets/Misc/DefaultIcon';

const DUPLICATE_DOC_TEXT = '_copy_';

export const EXTENSIONS_WITH_EMBEDDINGS_ENABLED = ['.doc', '.docx', '.txt', '.pdf'];
export const getIcon = (extension: string) => {
    let icon = null;
    const normalizedExtension = extension.toLowerCase();
    switch (normalizedExtension) {
        case '.docx':
            icon = <WordIcon />;
            break;
        case '.doc':
            icon = <WordIcon />;
            break;
        case '.xls':
            icon = <ExcelIcon />;
            break;
        case '.xlsx':
            icon = <ExcelIcon />;
            break;
        case '.pdf':
            icon = <PDFIcon />;
            break;
        default:
            icon = <DefaultIcon />;
            break;
    }
    return icon;
};

//detect if a question/annotation inputs values are only line breaks, if so, do not submit
export const determineNewLineValuesWithinInput = (string: string): boolean => {
    var values = string.split('\n');
    var nonEmptyValues = values.filter(function (value) {
        return value !== '';
    });
    return nonEmptyValues.length > 0;
};

export const formatFileSize = (fileSize) => {
    if (fileSize === undefined) return '';
    const size = Math.trunc(fileSize);
    const stringedSize = size.toString();
    if (stringedSize.length <= 3) {
        return stringedSize + '0' + ' KB';
    } else {
        const decimalLocation = fileSize.toString().indexOf('.');
        return (fileSize / 1000).toString().substring(0, decimalLocation) + ' MB';
    }
};

export const removeExtension = (value) => {
    let deliniator;
    for (let i = value.length; i >= 0; i--) {
        if (value[i] === '.') {
            deliniator = i;
            break;
        }
    }
    const extension = value.substring(deliniator);
    const fileName = value.substring(0, deliniator);
    return { extension, fileName };
};

export const makeDuplicateFileName = (name) => {
    if (name.includes(DUPLICATE_DOC_TEXT)) {
        let docNumber = parseInt(name[name.length - 1]) + 1;

        let incrementedDocName = name.substring(0, name.length - 1) + docNumber.toString();
        return incrementedDocName;
    } else {
        return name + DUPLICATE_DOC_TEXT + '1';
    }
};
