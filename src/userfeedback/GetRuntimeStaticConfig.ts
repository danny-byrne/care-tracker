/* eslint-disable max-len */
import { IRuntimeHvcStaticConfig } from '@ms/centro-hvc-loader/dist/runtime/configuration/runtimeDataSources';
export function getRuntimeStaticConfig(appName: string, language: string): IRuntimeHvcStaticConfig {
    // This configures some static aspects of the Centro runtime.
    const runtimeStaticConfig = {
        // The hosting app name, if you don't have a name, contact centro to add.
        hostName: appName,

        // The locale of the HVC to be load, in BCP-47 format
        locale: language,

        // The AppId is not authentication related, it is a GUID that should be changed on every page reload for logging purpose.
        // You can generate it on your server-side, or in browser. Here we are generating it from server-side.
        appId: '',

        // All perf log will be prefixed with this string. This is so that when we analysis perf logs,we know that those logs are coming
        // from HVC running in your environment.
        perfPrefix: `OcvFeedback${appName}`,
    };
    return runtimeStaticConfig;
}
