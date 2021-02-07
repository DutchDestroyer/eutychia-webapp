import { AccountDetails } from "../../api";

export const LOGIN = "LOGIN"

export interface LoggedInData{
    accountDetails: AccountDetails,
    isValid: boolean
}

export interface LoginAction{
    type: typeof LOGIN,
    payload: LoggedInData
}