import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { AppState } from '../../services/redux/store';
import nl from '../navigationlinks';

interface ParamTypes {
    projectUuid: string
  }

export default function ProjectOverviewParticipantScreen(){    
    const history = useHistory();
    const loginData = useSelector((state: AppState) => state.login)
    const testsOfProject = useSelector((state: AppState) => state.testsOfProjectOfParticipant)

    const { projectUuid } = useParams<ParamTypes>();
    const goToTestClick = (testUUID: string) =>{
        history.push(nl.projectOverviewParticipantScreen + "/" + projectUuid + nl.genericTestScreen + "/" + testUUID);
    }

    if(!loginData.isValid){
        return (
            <h1>Unauthorized</h1>
        );
    }

    if(testsOfProject.tests.length === 0){
        return (
            <h1>No tests found</h1>
        );
    }


    return(
        <ul>
            {
                testsOfProject.tests.map( t =>
                    <div><button onClick={() => goToTestClick(t.testId)}>{t.testName}</button></div>
                )
            }
        </ul>
    );
}
