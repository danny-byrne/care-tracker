import React, { createContext, useState } from 'react';
import { AnnotationType } from 'src/graphQL/serverMocks/graphQLGeneratedCode';

/**
 * Use `SessionDataContext` and `SessionDataProvider` to store and update state data
 * that will persists  within the same session across component and page refreshes.
 */

export const SessionDataContext = createContext({
    annotationType: AnnotationType.Question,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateAnnotationType: (value: AnnotationType) => {},
    annotationSelectedCondition: undefined,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateAnnotationSelectedCondition: (value: string) => {},
});

export const SessionDataProvider = ({ children }: { children: React.ReactNode }) => {
    const [annotationType, setAnnotationType] = useState<AnnotationType>(AnnotationType.Question);
    const [annotationSelectedCondition, setAnnotationSelectedCondition] = useState<string>(undefined);

    const updateAnnotationType = (value: AnnotationType) => {
        setAnnotationType(value);
    };

    const updateAnnotationSelectedCondition = (value: string) => {
        setAnnotationSelectedCondition(value);
    };

    return (
        <SessionDataContext.Provider
            value={{
                annotationType,
                updateAnnotationType,
                annotationSelectedCondition,
                updateAnnotationSelectedCondition,
            }}
        >
            {children}
        </SessionDataContext.Provider>
    );
};
