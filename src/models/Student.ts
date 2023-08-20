import { ICourseSimplified } from "./Course";

export interface IStudent {
    uuid?: string,
    name: string,
    email: string,
    password: string,
    birthDate: Date,
    courses?: ICourseSimplified[]
}

export interface IStudentCreate{
    
}

export interface IStudentSimplified {
    uuid: string,
    name: string
}