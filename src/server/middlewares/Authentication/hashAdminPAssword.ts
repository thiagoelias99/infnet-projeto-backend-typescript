import { ActionRequest } from "adminjs";
import { CryptServices } from "../../services";

export async function hashAdminPAssword(request: ActionRequest) {
    if (request.payload && request.method == "post") {
        request.payload = {
            ...request.payload,
            password: await CryptServices.hashPassword(request.payload.password)
        };
    }
    return request;
}