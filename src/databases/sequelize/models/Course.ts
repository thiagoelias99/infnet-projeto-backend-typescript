import { InferAttributes, InferCreationAttributes, Model, Sequelize } from "sequelize";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export = (sequelize: Sequelize, DataTypes: any) => {
    class Course extends Model<InferAttributes<Course>, InferCreationAttributes<Course>> {
        declare uuid: string;
        declare description: string;
        declare courseHours: string;
        declare startDate: Date;
        declare finishDate: Date;
    }
    Course.init(
        {
            uuid: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false
            },
            courseHours: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            startDate: {
                type: DataTypes.DATEONLY,
                allowNull: false,
            },
            finishDate: {
                type: DataTypes.DATEONLY,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: "Course",
            defaultScope: {
                attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
            }
        }
    );
    return Course;
};