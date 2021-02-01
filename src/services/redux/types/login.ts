import { AccountDetails } from "../../api";

export const LOGIN = "LOGIN"

export interface LoggedInData{
    accountDetails: AccountDetails
}

export interface LoginAction{
    type: typeof LOGIN,
    payload: LoggedInData
}