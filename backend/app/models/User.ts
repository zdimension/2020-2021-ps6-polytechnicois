import BcryptService from "../services/BcryptService";

import {
    BeforeBulkCreate,
    BeforeCreate,
    BeforeUpdate,
    Column,
    Default,
    Model,
    Table,
    Unique
} from "sequelize-typescript";

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

    @Default(1)
    @Column
    fontSize!: number;

    @Default(UserRole.Regular)
    @Column
    role!: UserRole;

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
