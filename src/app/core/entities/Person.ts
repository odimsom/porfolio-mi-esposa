import BaseEntity from "./base/BaseEntity";

export default interface Person extends BaseEntity {
    Name: string;
    Title: string; // Job Title
    Descriptions: string; // Bio
    PhotoUrl: string;
    Github: string;
    Linkedin: string;
    Email: string;
    Location: string;
}
