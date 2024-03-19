import { bootstrapFeature, DataSourceSetter, initialize, preloadFeature, RequestFunction } from '@ms/centro-hvc-loader';

import { InAppFeedbackInit } from './InAppFeedbackInit';
import { CentroEnvType, getCentroURl } from './GetCentroBaseUrl';
import { getRuntimeStaticConfig } from './GetRuntimeStaticConfig';

import { FeedbackUiType } from 'src/userfeedback/FeedbackTypes';
import { InitialFeedbackData as defaultFeedbackData } from 'src/userfeedback/InitParameters';

const hvcName = 'ocv-inapp-feedback';

// setting an unmount funtion
/* eslint-disable @typescript-eslint/no-unused-vars */
let unmountFunction = () => {};

/**
 * This is function you call from outside
 * You can change the signature to include appName and language dynamically
 *
 * Details of the data objects and functions can be found here
 * https://projectcentro.azurewebsites.net/docs/#/consume/adapter
 */
export function initializeCentro() {
    (async () => {
        const clientName = 'ConnectedCare'; // Name of your product registed with Centro, OCV and ODS.
        const language = 'en';

        const dataSources = (sd: DataSourceSetter) => {
            sd('centro.hvc.feedback.initOptions', InAppFeedbackInit as any);
        };

        // Set RuntimeConfig
        const runtimeStaticConfig = await getRuntimeStaticConfig(clientName, language);

        const InitializationParameters = {
            centroEnvironmentBaseUrl: getCentroURl(
                CentroEnvType.Prod, // Use CentroEnvType.CI if you want to use latest unreleased version
            ),
            centroAdapters: {
                // This configures some static aspects of the Centro runtime.
                runtimeStaticConfig,
                request: (() => {}) as unknown as RequestFunction,
            },
            centroHvcData: '',

            forHostVersion: 'v2',
        };

        await initialize(InitializationParameters);

        await preloadFeature({ featureName: hvcName });

        const bootstrapper = await bootstrapFeature({
            featureName: hvcName,
            setAdditionalDataSource: dataSources,
        });

        // use the main bootstrapper as only main is provided
        unmountFunction = await bootstrapper.main(document.getElementById('centroRef') as HTMLDivElement);

        // eslint-disable-next-line no-console
        console.log('Inapp Feedback Initialization Completed');
    })();
}

let feedbackData = defaultFeedbackData;

export function showFeedbackPanel() {
    feedbackData.feedbackConfig!.feedbackUiType = FeedbackUiType.SidePane;
    feedbackData.feedbackConfig!.isDisplayed = true;
    InAppFeedbackInit.updateFeedbackObject(feedbackData);
}
