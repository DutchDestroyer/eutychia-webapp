import { useHistory, useParams } from 'react-router-dom';
import nl from '../navigationlinks';

interface ParamTypes {
    projectUuid: string
  }

export default function ProjectOverviewParticipantScreen(){    
    const history = useHistory();
    const { projectUuid } = useParams<ParamTypes>();
    const goToTestClick = (testUUID: string) =>{
        history.push(nl.projectOverviewParticipantScreen + "/" + projectUuid + nl.genericTestScreen + "/" + testUUID);
    }

    return(
        <ul>
            <div><button onClick={() => goToTestClick("Test1")}>Test 1</button></div>
            <div><button onClick={() => goToTestClick("Test2")}>Test 2</button></div>
            <div><button onClick={() => goToTestClick("Test3")}>Test 3</button></div>
        </ul>
    );
}
