export type AuthTokenPayload = {
    sub: string;
    email: string;
};
export declare function signAccessToken(payload: AuthTokenPayload): string;
export declare function signRefreshToken(payload: AuthTokenPayload): string;
//# sourceMappingURL=auth.utils.d.ts.map