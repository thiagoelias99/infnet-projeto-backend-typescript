/* eslint-disable @typescript-eslint/no-explicit-any */
import { ActionRequest, ValidationError } from "adminjs";
import { Student } from "./models";
import { Course } from "./models";

export function studentValidation(request: ActionRequest) {
    if(request.method != "post"){
        return request;
    }
    const { error } = Student.validate(request.payload);
    if (error) {
        const errors: any = {};
        errors[(error.details[0].path) as unknown as string] = {message: error.details[0].message};
        throw new ValidationError(errors);
    }
    return request;
}

export function courseValidation(request: ActionRequest) {
    if(request.method != "post"){
        return request;
    }
    const { error } = Course.validate(request.payload);
    if (error) {
        const errors: any = {};
        errors[(error.details[0].path) as unknown as string] = {message: error.details[0].message};
        throw new ValidationError(errors);
    }
    return request;
}