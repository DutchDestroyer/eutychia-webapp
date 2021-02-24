import { LoginAccount, LoginAccountGrantTypeEnum } from "../../services/api";
import { IState } from "../contracts/iLoginState";

export function createLoginData(data: IState): LoginAccount {
    return {
      grantType: LoginAccountGrantTypeEnum.Password,
      emailAddress: data.emailaddress,
      password: data.password
    };
  }