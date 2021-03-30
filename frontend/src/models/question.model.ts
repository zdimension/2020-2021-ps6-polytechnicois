import { BaseModel } from "./base.model";

export interface Question extends BaseModel
{
    id: number;
    label: string;
    image?: string;
    difficulty: 1 | 2 | 3 | 4 | 5;
    answers: string[];
    correctAnswer: 0 | 1 | 2 | 3;
}
