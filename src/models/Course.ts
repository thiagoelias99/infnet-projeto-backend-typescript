import { IStudentSimplified } from "./Student";

export interface ICourse {
    uuid?: string,
    description: string,
    courseHours: number,
    startDate: Date,
    finishDate: Date,
    subscribersNumber?: number,
    students?: IStudentSimplified[]
}

export interface ICourseSimplified {
    uuid: string,
    description: string,
    finishDate: Date
}