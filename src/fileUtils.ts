// eslint-disable-next-line max-len
// Taken from: https://office.visualstudio.com/CLE/_git/Mercury?path=/Osiris/src/areas/common/utils/fileUtils.ts&_a=contents&version=GBdev
/**
 * Loads an external file from the given location via a script tag
 * Promise will resolve when the file has finished loading
 */
export async function loadScript(scriptLocation: string): Promise<void> {
    // Ensure the file hasn't already been loaded
    if (document.querySelectorAll(`[src="${scriptLocation}"]`)?.length > 0) {
        return new Promise((resolve: any): void => {
            resolve();
        });
    }

    const script: any = document.createElement('script');
    script.src = scriptLocation;
    script.async = true;
    document.body.appendChild(script);

    return new Promise((resolve: any): void => {
        script.onload = script.onreadystatechange = function onScriptLoad(): void {
            const rdyState = script.readyState;
            if (!rdyState || /complete|loaded/.test(script.readyState)) {
                resolve();

                script.onload = null;
                script.onreadystatechange = null;
            }
        };
    });
}
