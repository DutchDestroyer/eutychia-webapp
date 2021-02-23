import { DefaultApi } from "../../../services/api";

export const API = "API"

export interface APIData{
    api: DefaultApi,
}

export interface apiAction{
    type: typeof API,
    payload: APIData
}