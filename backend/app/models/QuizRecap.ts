import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import Quiz from "./Quiz";
import User from "./User";

@Table
export default class QuizRecap extends Model
{
    @ForeignKey(() => Quiz)
    @Column
    quizId: number;

    @BelongsTo(() => Quiz)
    quiz!: Quiz;

    @ForeignKey(() => User)
    @Column
    userId: number;

    @BelongsTo(() => User)
    user!: User;

    @Column(DataType.JSON)
    answers: { [id: number]: boolean };
}
