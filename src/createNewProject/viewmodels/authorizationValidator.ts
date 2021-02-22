import { AccountDetailsAccountTypeEnum } from "../../services/api";
import { LoggedInData } from "../../loginScreen/redux/types/login";

export function isValid(loginData: LoggedInData) {
    return loginData.isValid && loginData.accountDetails.accountType === AccountDetailsAccountTypeEnum.Researcher;
  }