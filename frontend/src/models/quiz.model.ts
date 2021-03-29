import { Question } from "./question.model";
import { TDifficulty } from "../../../backend/app/utils/types";
import { QuizTheme } from "./quiztheme.model";
import { BaseModel } from "./base.model";

export interface Quiz extends BaseModel
{
    id: number;
    name: string;
    difficulty: TDifficulty;
    theme: QuizTheme;
    questions: Question[];
}
