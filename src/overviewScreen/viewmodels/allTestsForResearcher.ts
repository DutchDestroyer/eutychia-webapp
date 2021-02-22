import { TestsForAccount } from "../../services/api"
import { SelectableTestsForProject } from "../redux/types/selectableTestsForProject"

export function TransformResearcherTestsData(tests:  TestsForAccount[]): SelectableTestsForProject {
    return {selectableTests: tests.map(t => (
        {
            testName: t.testName!, 
            testId: t.testID!, 
            isSelected: false
        }))}
}