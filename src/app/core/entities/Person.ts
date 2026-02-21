import BaseEntity from "./base/BaseEntity";

export default interface Person extends BaseEntity {
    Name: string;
    Title: string;
    Descriptions: string;
    PhotoUrl: string;
    CVUrl: string;
    Github: string;
    Linkedin: string;
    Email: string;
    Location: string;
}
