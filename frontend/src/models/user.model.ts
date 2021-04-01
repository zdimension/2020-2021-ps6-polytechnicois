import { BaseModel } from "./base.model";

export interface User extends BaseModel
{
    id: string;
    name: string;
    highcontrast: boolean;
    fontSize: number;
    role: number;
}
