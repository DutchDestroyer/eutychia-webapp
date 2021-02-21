import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { api } from "../../App";
import { AccountDetailsAccountTypeEnum, CreateProject } from "../../services/api";
import { getTestsAction } from "../../services/redux/actions/getTests";
import { AppState } from "../../services/redux/store";
import { TestForAccount } from "../../services/redux/types/getTests";
import nl from "../navigationlinks";
import { ParticipantAdder } from "./participantAdder";

interface IProjectTitle{
    projectTitle: string
  }

export interface INewParticipant{
  firstName: string,
  lastName: string,
  emailAddress: string,
  isCorrect: Boolean
}

export default function CreateNewProjectScreen(){
    const loginData = useSelector((state: AppState) => state.login)
    const allTests = useSelector((state: AppState) => state.getTests)
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

    const checkboxChange = (test: TestForAccount) => {
      let testIndex = allTests.backendSavedTests.map(t => t.testId).indexOf(test.testId)

      if(testIndex === -1){
        return;
      }
      allTests.backendSavedTests[testIndex].isChecked = !test.isChecked
      dispatch(getTestsAction(allTests)) 
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

    const isNotAuthorized = !loginData.isValid || loginData.accountDetails.accountType !== AccountDetailsAccountTypeEnum.Researcher

    const onSubmit = (data: IProjectTitle) => {
        if(isNotAuthorized){
            return;
        }

        let selectedTests = allTests.backendSavedTests.filter(test => test.isChecked)

        if(selectedTests.length === 0){
          setTestsSelected(false)
          return;
        }
        setTestsSelected(true)

        if(incorrectParticipants(participantState).length > 0){
          setParticipant(participantState)
          return;
        } 

        setParticipant(participantState)

        const createProject: CreateProject = {
          projectTitle: data.projectTitle,
          participants: participantState.filter(p => p.emailAddress),
          tests: selectedTests.map(s => s.testId)
        };

        (async () => {
    
          const projectData = await api.createsNewProject(loginData.accountDetails.accountID, createProject)
            .catch(e => {
              console.log(e)
              return e
            })
    
          if(projectData.status !== 200){
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

    if(allTests.backendSavedTests.length === 0){
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
                  {allTests.backendSavedTests.map(test => 
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

function incorrectParticipants(participants: INewParticipant[]): number[] {
  participants.forEach(p =>{
    p.isCorrect = !(!completeRowIsEmpty(p) && !completeRowCorrect(p))
  })

  return participants.map((p, index) => !p.isCorrect ? index : -1).filter(p => p > -1)
}

function completeRowIsEmpty(p: INewParticipant): Boolean {
  return p.emailAddress?.trim().length === 0 &&
   p.firstName?.trim().length === 0 &&
   p.lastName?.trim().length === 0
}

function completeRowCorrect(p: INewParticipant): Boolean {
  
  let isValidFirstName = p.firstName.trim().length !== 0 && !/[^a-zA-Z]/.test(p.firstName)
  let isValidLastName = p.lastName.trim().length !== 0  && !/[^a-zA-Z]/.test(p.lastName)
  let isValidEmailAddress = new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,253}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,253}[a-zA-Z0-9])?)*$").test(p.emailAddress)
  return isValidFirstName && isValidLastName && isValidEmailAddress
}

