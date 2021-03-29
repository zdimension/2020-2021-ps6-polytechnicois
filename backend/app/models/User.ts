import BcryptService from "../services/BcryptService";

import { BeforeCreate, Column, Model, Table, Unique } from "sequelize-typescript";

@Table
export default class User extends Model
{
    @Unique
    @Column
    name!: string;

    @Column
    password!: string;

    @BeforeCreate
    static beforeCreateHook(instance: User, options: any): void
    {
        instance.password = new BcryptService().password(instance.password);
    }

    toJSON(): object
    {
        const values = Object.assign({}, this.get());

        delete values.password;

        return values;
    }
}
