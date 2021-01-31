import { LoggedInData, LOGIN } from "../types/login";

export function loginAction(loggedInData: LoggedInData) {
    return {
        type: LOGIN,
        payload: loggedInData
    };
}