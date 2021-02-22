import { AccountDetailsAccountTypeEnum } from "../../../services/api";
import { LoggedInData, LOGIN, LoginAction } from "../types/login";

const initialState: LoggedInData = {
    accountDetails: {
        accountID: "",
        refreshToken: "",
        accessToken: "",
        accountType: AccountDetailsAccountTypeEnum.Participant
    },
    isValid: false
} 

export default function loginReducer(state = initialState, action: LoginAction): LoggedInData{
    switch(action.type) {
        case LOGIN:
            return {
                accountDetails: action.payload.accountDetails,
                isValid: action.payload.isValid
            };
            default:
                return state;
    }
}
