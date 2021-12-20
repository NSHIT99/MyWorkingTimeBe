"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberType = exports.ProjectType = exports.ProjectStatus = void 0;
var ProjectStatus;
(function (ProjectStatus) {
    ProjectStatus[ProjectStatus["Active"] = 0] = "Active";
    ProjectStatus[ProjectStatus["Deactive"] = 1] = "Deactive";
})(ProjectStatus = exports.ProjectStatus || (exports.ProjectStatus = {}));
var ProjectType;
(function (ProjectType) {
    ProjectType[ProjectType["Internship project"] = 0] = "Internship project";
    ProjectType[ProjectType["Specialized projects"] = 1] = "Specialized projects";
    ProjectType[ProjectType["Final project"] = 2] = "Final project";
})(ProjectType = exports.ProjectType || (exports.ProjectType = {}));
var MemberType;
(function (MemberType) {
    MemberType[MemberType["Member"] = 0] = "Member";
    MemberType[MemberType["Project Manager"] = 1] = "Project Manager";
    MemberType[MemberType["Deactive"] = 2] = "Deactive";
})(MemberType = exports.MemberType || (exports.MemberType = {}));
//# sourceMappingURL=projectType.js.map