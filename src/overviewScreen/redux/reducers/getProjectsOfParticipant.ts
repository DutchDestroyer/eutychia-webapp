import { AllProjectsOfParticipant, GETPROJECTSOFPARTICIPANT, GetProjectsOfParticipantAction } from "../types/getProjectsOfParticipant";

const initialState: AllProjectsOfParticipant = {
   projects: [],
} 

export default function getProjectsOfParticipantReducer(state = initialState, action: GetProjectsOfParticipantAction): AllProjectsOfParticipant{
    switch(action.type) {
        case GETPROJECTSOFPARTICIPANT:
            return action.payload;
            default:
                return state;
    }
}