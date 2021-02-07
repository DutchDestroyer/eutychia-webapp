import { useHistory } from 'react-router-dom';
import nl from '../navigationlinks';

export default function ProjectsOverviewScreen(){

    const history = useHistory();

    const goToProjectClick = (projectUUID: string) =>{
        history.push(nl.projectOverviewParticipantScreen + "/" + projectUUID);
    }

    return(
        <ul>
            <div><button onClick={() => goToProjectClick("project1")}>Project 1</button></div>
            <div><button onClick={() => goToProjectClick("project2")}>Project 2</button></div>
            <div><button onClick={() => goToProjectClick("project3")}>Project 3</button></div>
        </ul>
    );


}
