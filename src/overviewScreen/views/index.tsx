import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { api } from '../../App';
import { AccountDetailsAccountTypeEnum, ProjectsAccountId, TestsForAccount } from '../../services/api';
import { selectableTestsForProjectAction } from '../redux/actions/selectableTestsForProject';
import { getProjectsOfParticipantAction } from '../redux/actions/getProjectsOfParticipant';
import { AppState } from '../../services/redux/store';
import nl from '../../services/navigationlinks';
import { TransformParticipantProjectData } from '../viewmodels/allProjectsForParticipant';
import { TransformResearcherTestsData } from '../viewmodels/allTestsForResearcher';

export default function OverviewScreen() {
    const history = useHistory();
    const loginData = useSelector((state: AppState) => state.login)
    const dispatch = useDispatch()

    const createNewProjectClick = () =>{
        (async () => {

            const allTests = await api.getAllTests(loginData.accountDetails.accountID)
            .catch(e => {
                console.log(e)
                return e
              })

            if(allTests.status !== 200){
                return;
            }
            dispatch(
              selectableTestsForProjectAction(TransformResearcherTestsData(allTests.data as TestsForAccount[]))
            );

            history.push(nl.createNewProjectScreen);
        })();
    }

    const modifyExistingProjectClick = () =>{
        history.push(nl.modifyExistingProjectScreen);
    }

    const performTestsClick = () =>{
        (async() => {
            const projectsOfParticipant = await api.getProjectsOfAccount(loginData.accountDetails.accountID)
            .catch(e => {
                console.log(e)
                return e
              })

            if(projectsOfParticipant.status !== 200){
                return;
            }

            dispatch(
                getProjectsOfParticipantAction(TransformParticipantProjectData(projectsOfParticipant.data as ProjectsAccountId))
            );

            history.push(nl.projectsOverviewScreen);
        })();
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
