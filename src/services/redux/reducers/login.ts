import { LoggedInData, LOGIN, LoginAction } from "../types/login";

const initialState: LoggedInData = {
    accountDetails: {
        JWT: ""
    }
} 

export default function loginReducer(state = initialState, action: LoginAction): LoggedInData{
    switch(action.type) {
        case LOGIN:
            return {
                accountDetails: action.payload.accountDetails
            };
            default:
                return state;
    }
}
