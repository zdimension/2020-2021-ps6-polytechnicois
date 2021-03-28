import { BelongsTo, Column, ForeignKey, HasMany, HasOne, Model, Table } from "sequelize-typescript";
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
    themeId!: number;

    @BelongsTo(() => QuizTheme, "themeId")
    theme!: QuizTheme;

    @HasMany(() => Question)
    questions!: Question[];
}
