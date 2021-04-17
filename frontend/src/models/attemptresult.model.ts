import { BaseModel } from "./base.model";

export interface AttemptResult extends BaseModel
{
    id: number;
    quizId: number;
    answers;
    createdAt;
    updatedAt;
}
