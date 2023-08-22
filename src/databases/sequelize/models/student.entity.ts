import { DataTypes, Model, Optional } from "sequelize";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
import { sequelize } from "../config";
import { IStudent } from "../../../models/Student";


export type StudentCreationAttributes = Optional<IStudent, "uuid">

export class Student extends Model<IStudent, StudentCreationAttributes> {
    declare uuid: string;
    declare name: string;
    declare email: string;
    declare password: string;
    declare birthDate: Date;
}

Student.init(
    {
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        birthDate: {
            type: DataTypes.DATEONLY,
            allowNull: true
        }
    },
    {
        sequelize,
        modelName: "Student",
        paranoid: true,
        defaultScope: {
            attributes: { exclude: ["createdAt", "updatedAt", "deletedAt", "password"] }
        },
        scopes: {
            withPassword: { attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] } },
        },
        timestamps: true
    });