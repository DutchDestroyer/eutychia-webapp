import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { AccountDetailsAccountTypeEnum } from '../../services/api';
import { AppState } from '../../services/redux/store';
import nl from '../navigationlinks';

export default function OverviewScreen() {
    const history = useHistory();
    const loginData = useSelector((state: AppState) => state.login)

    const createNewProjectClick = () =>{
        history.push(nl.createNewProjectScreen);
    }

    const modifyExistingProjectClick = () =>{
        history.push(nl.modifyExistingProjectScreen);
    }

    const performTestsClick = () =>{
        history.push(nl.projectsOverviewScreen);
    }

    if(!loginData.isValid) {
        return (
            <h1>Unauthorized</h1>
        );
    }

    if(loginData.accountDetails.accountType === AccountDetailsAccountTypeEnum.Researcher){
        return(
            <ul>
                <div><button onClick={createNewProjectClick}>Create new project</button></div>
                <div><button onClick={modifyExistingProjectClick}>Modify existing project</button></div>
                <div><button onClick={performTestsClick}>Perform tests</button></div>
            </ul>
        );
    } else {
        return(
            <ul>
                <div><button onClick={performTestsClick}>Perform tests</button></div>
            </ul>
        );
    }
}
