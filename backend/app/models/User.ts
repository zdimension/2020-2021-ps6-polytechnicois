import BcryptService from "../services/BcryptService";

import {
    BeforeBulkCreate,
    BeforeCreate,
    BeforeUpdate,
    Column, DataType,
    Default, HasMany,
    Model,
    Table,
    Unique
} from "sequelize-typescript";
import { Difficulty, TDifficulty } from "../utils/types";
import Question from "./Question";
import QuizHistory from "./QuizHistory";
import QuizRecap from "./QuizRecap";

export enum UserRole
{
    Regular,
    NonAutonomous,
    Admin
}

@Table
export default class User extends Model
{
    @Unique
    @Column
    name!: string;

    @Column
    password!: string;

    @Default(false)
    @Column
    highContrast!: boolean;

    @Default(0)
    @Column
    fontSize!: number;

    @Default('Arial')
    @Column
    font!: string;

    @Default(5)
    @Column(Difficulty)
    maxDifficulty!: TDifficulty;

    @Default(false)
    @Column
    forceRecap!: boolean;

    @Default(null)
    @Column
    maxQuestions?: number;

    @Default(UserRole.Regular)
    @Column
    role!: UserRole;

    @HasMany(() => QuizHistory)
    attempts!: QuizHistory[];

    @HasMany(() => QuizRecap)
    recaps!: QuizRecap[];

    @Column(DataType.JSON)
    ignoredQuestions!: number[];

    @BeforeBulkCreate
    static beforeBulkCreateHook(instances: User[]): void
    {
        instances.forEach(this.beforeCreateHook);
    }

    @BeforeUpdate
    @BeforeCreate
    static beforeCreateHook(instance: User): void
    {
        if (instance.changed("password"))
            instance.password = new BcryptService().password(instance.password);
    }

    toJSON(): object
    {
        const values = Object.assign({}, this.get());

        delete values.password;

        return values;
    }
}
