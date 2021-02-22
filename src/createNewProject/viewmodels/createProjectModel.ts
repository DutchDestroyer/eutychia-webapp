import { SelectableTestForProject } from "../../overviewScreen/redux/types/selectableTestsForProject";
import { CreateProject } from "../../services/api";
import { INewParticipant } from "../contracts/iNewParticipant";
import { IProjectTitle } from "../contracts/iProjectTitle";

export function getProjectData(projectTitle: IProjectTitle, participantState: INewParticipant[], selectedTests: SelectableTestForProject[]): CreateProject {
    return {
      projectTitle: projectTitle.projectTitle,
      participants: participantState.filter(p => p.emailAddress),
      tests: selectedTests.map(s => s.testId)
    };
  }