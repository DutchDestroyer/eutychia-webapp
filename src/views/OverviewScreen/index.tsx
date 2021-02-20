import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { api } from '../../App';
import { AccountDetailsAccountTypeEnum, TestsForAccount } from '../../services/api';
import { getTestsAction } from '../../services/redux/actions/getTests';
import { AppState } from '../../services/redux/store';
import { AllTests, TestForAccount } from '../../services/redux/types/getTests';
import nl from '../navigationlinks';

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
              getTestsAction(TransformData(allTests.data as TestsForAccount[]))
            );

            history.push(nl.createNewProjectScreen);
        })();
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

function TransformData(tests:  TestsForAccount[]): AllTests {
    let a: TestForAccount[] = tests.map(t => (
        {
            testName: t.testName!, 
            testId: t.testID!, 
            isChecked: false
        }))

    return {backendSavedTests: a}
}
