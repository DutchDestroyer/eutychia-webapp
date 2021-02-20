import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { api } from '../../App';
import { AppState } from '../../services/redux/store';
import nl from '../navigationlinks';

export default function ProjectsOverviewScreen(){

    const history = useHistory();
    const loginData = useSelector((state: AppState) => state.login)
    const projectsOfParticipant = useSelector((state: AppState) => state.getProjectsOfParticipant)

    const goToProjectClick = (projectUUID: string) =>{
        (async () => {

            const testsOfProject = await api.getTestsToPerformByAccount(projectUUID, loginData.accountDetails.accountID)
            .catch(e => {
                console.log(e)
                return e
              })
              
            if(testsOfProject.status != 200){
                return;
            }
            
            history.push(nl.projectOverviewParticipantScreen + "/" + projectUUID);
        })();
    }

    if(!loginData.isValid){
        return (
            <h1>Unauthorized</h1>
        );
    }

    if(projectsOfParticipant.projects.length === 0){
        return (
            <h1>No projects found</h1>
        );
    }

    return(
        <ul>
            {
                projectsOfParticipant.projects.map(p => {
                    return(
                        <div>
                            <button onClick={() => goToProjectClick(p.projectId)}>{p.projectName}</button>
                        </div>
                    )
                })
            }
        </ul>
    );
}
