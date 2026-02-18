import BaseEntity from "./base/BaseEntity";

export default interface Studies extends BaseEntity {
    Start: string;
    End: string | null;
    Labels: string[];
    University: string;
    states: "current" | "past";
}