import BaseEntity from "./base/BaseEntity";

export default interface Blog extends BaseEntity {
    ImgesUrls: string[];
    Tags: string[];
    Date: string;
    Location: string;
}