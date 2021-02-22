import { SelectableTestsForProject, SELECTABLETESTSFORPROJECT } from "../types/selectableTestsForProject";

export function selectableTestsForProjectAction(allTests: SelectableTestsForProject) {
    return {
        type: SELECTABLETESTSFORPROJECT,
        payload: allTests
    };
}