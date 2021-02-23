import { API, APIData } from "../types/api";

export function apiAction(apiData: APIData) {
    return {
        type: API,
        payload: apiData
    };
}