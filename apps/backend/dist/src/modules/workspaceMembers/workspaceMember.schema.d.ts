import z from "zod";
export declare const addWorkspaceMemberSchema: z.ZodObject<{
    userId: z.ZodString;
    role: z.ZodEnum<{
        ADMIN: "ADMIN";
        MEMBER: "MEMBER";
    }>;
}, z.core.$strip>;
export declare const updateWorkspaceMemberSchema: z.ZodObject<{
    role: z.ZodEnum<{
        ADMIN: "ADMIN";
        MEMBER: "MEMBER";
    }>;
}, z.core.$strip>;
//# sourceMappingURL=workspaceMember.schema.d.ts.map