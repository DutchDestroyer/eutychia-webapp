import { APIData } from "../../app/redux/types/api";
import { AccountDetails, Configuration, ConfigurationParameters, DefaultApi } from "../../services/api";

export function createApiData(accountData: AccountDetails): APIData {
    const configParams: ConfigurationParameters = {
        username: "Mark",
        basePath: "http://localhost:8080/api",
        //accessToken: accountData.accessToken
    }
        
    const config = new Configuration(configParams)

    return {
        api: new DefaultApi(config)
    }
  }