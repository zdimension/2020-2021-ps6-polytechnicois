import { BaseModel } from "./base.model";

export interface User extends BaseModel
{
    id: number;
    name: string;
    highContrast: boolean;
    fontSize: number;
    font: string;
    maxDifficulty: 1 | 2 | 3 | 4 | 5;
    forceRecap: boolean;
    maxQuestions: number;
    role: number;
    token: string;
    ignoredQuestions: number[];
}
