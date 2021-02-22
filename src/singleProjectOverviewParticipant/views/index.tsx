import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { api } from '../../App';
import { GenericTest } from '../../services/api';
import { testToPerformAction } from '../redux/actions/dataForTestToPerform';
import { AppState } from '../../services/redux/store';
import { TestOfProjectOfParticipant } from '../../allProjectsOverviewParticipant/redux/types/getTestsOfProjectParticipant';
import { TransformTestToPerformData } from '../viewmodels/testToPerform';
import nl from '../../services/navigationlinks';
import { isGenericTest } from '../viewmodels/typeOfTestChecker';

interface ParamTypes {
    projectUuid: string
  }

export default function ProjectOverviewParticipantScreen(){    
    const history = useHistory();
    const dispatch = useDispatch();
    const loginData = useSelector((state: AppState) => state.login)
    const testsOfProject = useSelector((state: AppState) => state.testsOfProjectOfParticipant)

    const { projectUuid } = useParams<ParamTypes>();
    const goToTestClick = (test: TestOfProjectOfParticipant) => {
        (async () => {
            if(!loginData.isValid){
                return;
            }

            const dataForTest = await api.getGenericTestOfProject(projectUuid, test.testId)
            .catch(e => {
                console.log(e)
                return e
              })

              if(dataForTest.status !== 200){
                  return;
              }

            if(isGenericTest(test)){
                dispatch(
                    testToPerformAction(TransformTestToPerformData(dataForTest.data as GenericTest))
                );
                history.push(nl.projectOverviewParticipantScreen + "/" + projectUuid + nl.genericTestScreen + "/" + test.testId);
            }
        })();
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
                    <div><button onClick={() => goToTestClick(t)}>{t.testName}</button></div>
                )
            }
        </ul>
    );
}
