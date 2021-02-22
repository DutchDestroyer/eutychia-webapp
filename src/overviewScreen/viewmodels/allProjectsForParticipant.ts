import { ProjectsAccountId } from "../../services/api"
import { AllProjectsOfParticipant } from "../redux/types/getProjectsOfParticipant"

export function TransformParticipantProjectData(projects:  ProjectsAccountId): AllProjectsOfParticipant {
    return {projects: projects.projects!.map(p => (
        {
            projectName: p.projectName!, 
            projectId: p.projectID!, 
        }))}
}