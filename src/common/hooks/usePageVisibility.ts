import React from 'react';

function getBrowserVisibilityProp() {
    if (typeof document.hidden !== 'undefined') {
        // Opera 12.10 and Firefox 18 and later support
        return 'visibilitychange';
    }
}

function getBrowserDocumentHiddenProp() {
    if (typeof document.hidden !== 'undefined') {
        return 'hidden';
    }
}

function getIsDocumentHidden() {
    return !document[getBrowserDocumentHiddenProp()];
}

export const usePageVisibility = () => {
    const [isVisible, setIsVisible] = React.useState(getIsDocumentHidden());
    const onVisibilityChange = () => setIsVisible(getIsDocumentHidden());

    React.useEffect(() => {
        const visibilityChange = getBrowserVisibilityProp();

        document.addEventListener(visibilityChange, onVisibilityChange, false);

        return () => {
            document.removeEventListener(visibilityChange, onVisibilityChange);
        };
    });

    return isVisible;
};
