import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Difficulty, TDifficulty } from "../utils/types";
import Quiz from "./Quiz";

@Table
export default class Question extends Model
{
    @Column
    label!: string;

    @Column
    isImage!: boolean;

    @Column(Difficulty)
    difficulty!: TDifficulty;

    @Column(DataType.JSON)
    answers!: [string, string, string, string];

    @ForeignKey(() => Quiz)
    @Column
    quizId: number;

    @BelongsTo(() => Quiz)
    quiz!: Quiz;
}
