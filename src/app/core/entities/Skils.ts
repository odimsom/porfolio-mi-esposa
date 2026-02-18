import SkillsTypes from '../enums/skills_types';
import BaseEntity from "./base/BaseEntity";
import CertificateAndCourse from "./CertificatesAndCources";

export default interface Skill extends BaseEntity {
    Type: SkillsTypes;
    Hover: [CertificateAndCourse, CertificateAndCourse | null];
}