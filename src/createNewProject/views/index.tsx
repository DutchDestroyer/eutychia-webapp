import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { api } from "../../App";
import { AppState } from "../../services/redux/store";
import nl from "../../services/navigationlinks";
import { ParticipantAdder } from "./participantAdder";
import { INewParticipant } from "../contracts/iNewParticipant";
import { incorrectParticipants } from "../viewmodels/participantValidation";
import { obtainSelectedTests } from "../viewmodels/testValidation";
import { isValid } from "../viewmodels/authorizationValidator";
import { getProjectData } from "../viewmodels/createProjectModel";
import { IProjectTitle } from "../contracts/iProjectTitle";
import { SelectableTestForProject } from "../../overviewScreen/redux/types/selectableTestsForProject";
import { selectableTestsForProjectAction } from "../../overviewScreen/redux/actions/selectableTestsForProject";

export default function CreateNewProjectScreen(){
    const loginData = useSelector((state: AppState) => state.login)
    const allTests = useSelector((state: AppState) => state.selectableTestsForProject)
    const history = useHistory();
    const dispatch = useDispatch()
    const {register, handleSubmit, errors, reset} = useForm<IProjectTitle>();
    const [hasTestsSeleted, setTestsSelected] = useState<Boolean>(true);
    
    const blankParticipant: INewParticipant = {
        firstName: '',
        lastName: '',
        emailAddress: '',
        isCorrect: true,
    }
    const [participantState, setParticipant] = useState<INewParticipant[]>([
        {...blankParticipant}
    ]);

    const checkboxChange = (test: SelectableTestForProject) => {
      let testIndex = allTests.selectableTests.map(t => t.testId).indexOf(test.testId)

      if(testIndex === -1){
        return;
      }
      allTests.selectableTests[testIndex].isSelected = !test.isSelected
      dispatch(selectableTestsForProjectAction(allTests)) 
    }

    const addParticipant = () => {
        setParticipant([...participantState, {...blankParticipant}]);
      };

    const participantFirstNameUpdated = (index: number, firstName: string) => {
        participantState[index].firstName = firstName;
        setParticipant(participantState)
      };

    const participantLastNameUpdated = (index: number, lastName: string) => {
        participantState[index].lastName = lastName;
        setParticipant(participantState)
      };

    const participantEmailAddressUpdated = (index: number, emailAddress: string) => {
        participantState[index].emailAddress = emailAddress;
        setParticipant(participantState)
      };

    const isNotAuthorized = !isValid(loginData)

    const onSubmit = (data: IProjectTitle) => {
        if(isNotAuthorized){
            return;
        }

        let selectedTests = obtainSelectedTests(allTests)
        setTestsSelected(true)

        if(selectedTests.length === 0){
          setTestsSelected(false)
          return;
        }

        setParticipant(participantState)
        if(incorrectParticipants(participantState).length > 0){
          setParticipant(participantState)
          return;
        } 

        const projectData = getProjectData(data, participantState, selectedTests);

        (async () => {
    
          const projectDataResult = await api.createsNewProject(loginData.accountDetails.accountID, projectData)
            .catch(e => {
              console.log(e)
              return e
            })
    
          if(projectDataResult.status !== 200){
            return;
          }
    
          history.push(nl.overviewScreen);      
          reset();
        })();
        
    }    

    if(isNotAuthorized){
        return(
            <h1>Unauthorized</h1>
        );    
    }

    if(allTests.selectableTests.length === 0){
        return(
            <h1>Uh oh, something went wrong</h1>
        );
    } else {
        return(
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label>Project title:</label>
                <input
                  type="text"
                  id="projectTitle"
                  name="projectTitle"
                  ref={register({required: true})}
                />
                {errors.projectTitle && errors.projectTitle.type === "required" && (
                <div className="error">You must enter the title of the project.</div>)}
              </div>
              <div>
                <input type="button" value="Add Participant" onClick={addParticipant} /> 
                <ParticipantAdder
                  participantState={participantState}
                  participantFirstNameUpdated={participantFirstNameUpdated}
                  participantLastNameUpdated={participantLastNameUpdated}
                  participantEmailAddressUpdated={participantEmailAddressUpdated}
                />     
              </div>
              <div>
                  {allTests.selectableTests.map(test => 
                  <label>{test.testName} 
                    <input 
                      type="checkbox" 
                      name={test.testName} 
                      onChange={() => checkboxChange(test)}
                      key={test.testId}/>
                  </label>)}
                  {hasTestsSeleted ? null : <label>Select at least one test</label>}                      
              </div>
              <button type="submit">Submit</button>
            </form>
          );
    }
}


