import { JWTAccountDetails } from "../../api";

export const LOGIN = "LOGIN"

export interface LoggedInData{
    accountDetails: JWTAccountDetails
}

export interface LoginAction{
    type: typeof LOGIN,
    payload: LoggedInData
}