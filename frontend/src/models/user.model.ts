import { BaseModel } from "./base.model";

export interface User extends BaseModel
{
    id: number;
    name: string;
    highContrast: boolean;
    fontSize: number;
    font: string;
    role: number;
    token: string;
}
