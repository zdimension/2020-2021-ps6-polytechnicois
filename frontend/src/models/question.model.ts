import { TDifficulty } from "../../../backend/app/utils/types";
import { TCorrectAnswer } from "../../../backend/app/models/Question";
import { BaseModel } from "./base.model";

export interface Question extends BaseModel
{
    id: number;
    label: string;
    image?: string;
    difficulty: TDifficulty;
    answers: string[];
    correctAnswer: TCorrectAnswer;
}
