import { GETTESTSOFPROJECTOFPARTICIPANT, AllTestsOfProjectOfParticipant } from "../types/getTestsOfProjectParticipant";

export function getTestsOfProjectOfParticipantAction(allProjects: AllTestsOfProjectOfParticipant) {
    return {
        type: GETTESTSOFPROJECTOFPARTICIPANT,
        payload: allProjects
    };
}