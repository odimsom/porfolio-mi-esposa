import { ProjectsStatus } from "../enums";
import BaseEntity from "./base/BaseEntity";

export default interface Project extends BaseEntity {
    Descriptions: string;
    Repository: string;
    Demo: string | null;
    Status: ProjectsStatus;
    Labels: string[];
}