import { AccountDetailsAccountTypeEnum } from "../../api";
import { LoggedInData, LOGIN, LoginAction } from "../types/login";

const initialState: LoggedInData = {
    accountDetails: {
        accountID: "",
        refreshToken: "",
        accessToken: "",
        accountType: AccountDetailsAccountTypeEnum.Participant
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
