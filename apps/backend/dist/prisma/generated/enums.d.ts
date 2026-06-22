export declare const WorkspaceRole: {
    readonly OWNER: "OWNER";
    readonly ADMIN: "ADMIN";
    readonly MEMBER: "MEMBER";
};
export type WorkspaceRole = (typeof WorkspaceRole)[keyof typeof WorkspaceRole];
export declare const ProjectStatus: {
    readonly PLANNING: "PLANNING";
    readonly ACTIVE: "ACTIVE";
    readonly COMPLETED: "COMPLETED";
    readonly ARCHIVED: "ARCHIVED";
};
export type ProjectStatus = (typeof ProjectStatus)[keyof typeof ProjectStatus];
export declare const TaskPriority: {
    readonly LOW: "LOW";
    readonly MEDIUM: "MEDIUM";
    readonly HIGH: "HIGH";
    readonly URGENT: "URGENT";
};
export type TaskPriority = (typeof TaskPriority)[keyof typeof TaskPriority];
export declare const ActivityType: {
    readonly CREATE: "CREATE";
    readonly UPDATE: "UPDATE";
    readonly DELETE: "DELETE";
    readonly MOVE: "MOVE";
    readonly COMMENT: "COMMENT";
};
export type ActivityType = (typeof ActivityType)[keyof typeof ActivityType];
//# sourceMappingURL=enums.d.ts.map