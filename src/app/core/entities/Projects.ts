import ProjectsStatus from '../enums/projects_status';
import BaseEntity from "./base/BaseEntity";

export default interface Project extends BaseEntity {
    Descriptions: string;
    Repository: string;
    Demo: string | null;
    Status: ProjectsStatus;
    Labels: string[];
}