export enum CentroEnvType {
    Prod,
    CI,
    Local,
}

export const CentroUrl = {
    Prod: 'https://admin.microsoft.com',
    CI: 'https://admin-ignite.microsoft.com',
};

export function getCentroURl(env?: CentroEnvType): string {
    switch (env) {
        case CentroEnvType.CI: {
            return CentroUrl.CI;
        }
        case CentroEnvType.Prod:
        default: {
            return CentroUrl.Prod;
        }
    }
}
