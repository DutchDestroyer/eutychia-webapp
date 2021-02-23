import { Configuration, ConfigurationParameters, DefaultApi } from "../../services/api";
import { APIData } from "../redux/types/api";


export function createApiData(): APIData {
    const configParams: ConfigurationParameters = {
        username: "Mark",
        basePath: "http://localhost:8080/api"
        }
        
    const config = new Configuration(configParams)

    return {
        api: new DefaultApi(config)
    }
}