
export const GETPROJECTSOFPARTICIPANT = "GETPROJECTSOFPARTICIPANT"

export interface ProjectOfParticipant{
    projectName: string,
    projectId: string,
}

export interface AllProjectsOfParticipant{
    projects: ProjectOfParticipant[],
}

export interface GetProjectsOfParticipantAction{
    type: typeof GETPROJECTSOFPARTICIPANT,
    payload: AllProjectsOfParticipant
}