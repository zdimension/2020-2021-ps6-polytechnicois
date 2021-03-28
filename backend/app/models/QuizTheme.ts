import { Column, Model, Table } from "sequelize-typescript";

@Table
export default class QuizTheme extends Model
{
    @Column
    name!: string;
}
