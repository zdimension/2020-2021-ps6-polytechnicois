import { Column, HasMany, Model, Table, Unique } from "sequelize-typescript";
import Quiz from "./Quiz";

@Table({
    name: { singular: "theme" }
})
export default class QuizTheme extends Model
{
    @Unique
    @Column
    name!: string;

    @HasMany(() => Quiz)
    quizzes: Quiz[];

    public static async getByName(name: string): Promise<QuizTheme>
    {
        const existing = this.findOne({ where: { name: name } });
        return existing !== null ? existing : this.create({ name: name });
    }
}
