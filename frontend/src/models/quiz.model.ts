import { Question } from "./question.model";
import { QuizTheme } from "./quiztheme.model";
import { BaseModel } from "./base.model";

export interface Quiz extends BaseModel
{
    id: number;
    name: string;
    difficulty: 1 | 2 | 3 | 4 | 5;
    theme: QuizTheme;
    questions: Question[];
    questionCount: number;
}
