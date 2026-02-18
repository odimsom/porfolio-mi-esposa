import { TypeWorks } from "../enums";
import BaseEntity from "./base/BaseEntity";

export default interface Experience extends BaseEntity {
    Start: string;
    End: string | null;
    Labels: string[];
    Company: string;
    types: TypeWorks[]; 
    states: "current" | "past";
}