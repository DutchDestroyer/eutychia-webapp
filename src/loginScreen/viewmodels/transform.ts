import { AccountDetails } from "../../services/api"
import { LoggedInData } from "../redux/types/login"

export function transformLoginData (loginDetails: AccountDetails, status: number): LoggedInData {
    return {
        accountDetails: loginDetails,
        isValid: status === 200
    } 
  }