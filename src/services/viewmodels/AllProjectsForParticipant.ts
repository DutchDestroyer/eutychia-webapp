import { ProjectsAccountId } from "../api"
import { AllProjectsOfParticipant, ProjectOfParticipant } from "../redux/types/getProjectsOfParticipant"

export function TransformParticipantProjectData(projects:  ProjectsAccountId): AllProjectsOfParticipant {
    return { projects: projects.projects!.map(p => (
        {
            projectName: p.projectName!, 
            projectId: p.projectID!, 
        }))}
}