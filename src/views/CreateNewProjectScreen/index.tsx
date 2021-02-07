import { useSelector } from "react-redux";
import { AccountDetailsAccountTypeEnum } from "../../services/api";
import { AppState } from "../../services/redux/store";

export default function CreateNewProjectScreen(){
    const loginData = useSelector((state: AppState) => state.login)
    const allTests = useSelector((state: AppState) => state.getTests)

    const isNotAuthorized = !loginData.isValid || loginData.accountDetails.accountType !== AccountDetailsAccountTypeEnum.Researcher

    if(isNotAuthorized){
        return(
            <h1>Unauthorized</h1>
        );    
    }

    if(allTests.tests.length === 0){
        return(
            <h1>Uh oh, something went wrong</h1>
        );
    } else {
        return(
            <h1>all good</h1>
        );
    }
}
