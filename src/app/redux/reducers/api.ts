import { DefaultApi } from "../../../services/api";
import { API, APIData, apiAction } from "../types/api";

const initialState: APIData = {
    api: new DefaultApi()
}

export default function apiReducer(state = initialState, action: apiAction): APIData{
    switch(action.type) {
        case API:
            return {
                api: action.payload.api,
            };
            default:
                return state;
    }
}