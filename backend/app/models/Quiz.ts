import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Difficulty, TDifficulty } from "../utils/types";
import Question from "./Question";
import QuizTheme from "./QuizTheme";

@Table
export default class Quiz extends Model
{
    @Column
    name!: string;

    @Column(Difficulty)
    difficulty!: TDifficulty;

    @Column
    @ForeignKey(() => QuizTheme)
    themeId!: number;

    @BelongsTo(() => QuizTheme)
    theme!: QuizTheme;

    @HasMany(() => Question)
    questions!: Question[];

    /*@Column(DataType.VIRTUAL)
    get themeName()
    {
        return this.getDataValue("theme").name;
    }*/
}
