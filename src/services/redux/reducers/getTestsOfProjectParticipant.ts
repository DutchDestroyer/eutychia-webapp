import { AllTestsOfProjectOfParticipant, GETTESTSOFPROJECTOFPARTICIPANT, GetTestsOfProjectOfParticipantAction } from "../types/getTestsOfProjectParticipant";

const initialState: AllTestsOfProjectOfParticipant = {
    tests: [],
 } 
 
 export default function getTestsOfProjectOfParticipantReducer(state = initialState, action: GetTestsOfProjectOfParticipantAction): AllTestsOfProjectOfParticipant{
     switch(action.type) {
         case GETTESTSOFPROJECTOFPARTICIPANT:
             return action.payload;
             default:
                 return state;
     }
 }