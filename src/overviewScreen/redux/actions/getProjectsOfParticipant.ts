import { AllProjectsOfParticipant, GETPROJECTSOFPARTICIPANT } from "../types/getProjectsOfParticipant";

export function getProjectsOfParticipantAction(allProjects: AllProjectsOfParticipant) {
    return {
        type: GETPROJECTSOFPARTICIPANT,
        payload: allProjects
    };
}