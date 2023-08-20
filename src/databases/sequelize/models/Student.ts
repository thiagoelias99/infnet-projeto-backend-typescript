import { InferAttributes, InferCreationAttributes, Model } from "sequelize";

export = (sequelize, DataTypes) => {
    class Student extends Model<InferAttributes<Student>, InferCreationAttributes<Student>> {
        declare uuid: string;
        declare name: string;
        declare email: string;
        declare password: string;
        declare birthDate: Date;


    // static associate(models) {
    //   Student.belongsToMany(models.Course, { through: "StudentsCourses" })
    // }
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
            }
        });
    return Student;
};