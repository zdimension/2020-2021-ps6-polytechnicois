import { BaseModel } from "./base.model";

export interface QuizHistory extends BaseModel
{
    id: number;
    name:string;
    stats:{
        correct:number;
        total: number;
    }
    recap:{
        correct:number;
        total:number;
    }
}
