import { AllowNull, BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Difficulty, TDifficulty } from "../utils/types";
import Quiz from "./Quiz";
import { ENUM } from "sequelize";

export const CorrectAnswer = ENUM("0", "1", "2", "3");
export type TCorrectAnswer = 0 | 1 | 2 | 3;

@Table
export default class Question extends Model
{
    @Column
    label!: string;

    @AllowNull
    @Column
    image?: string;

    @Column(Difficulty)
    difficulty!: TDifficulty;

    @Column(DataType.JSON)
    answers!: [string, string, string, string];

    @Column(CorrectAnswer)
    correctAnswer!: TCorrectAnswer;

    @ForeignKey(() => Quiz)
    @Column
    quizId: number;

    @BelongsTo(() => Quiz)
    quiz!: Quiz;
}
