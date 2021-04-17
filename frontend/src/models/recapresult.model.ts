import { BaseModel } from "./base.model";

export interface RecapResult extends BaseModel
{
    id: number;
    quizId: number;
    answers;
    createdAt;
    updatedAt;
}
