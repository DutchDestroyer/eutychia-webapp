import { TestsForAccount } from "../api"
import { AllTests, TestForAccount } from "../redux/types/getTests"

export function TransformResearcherTestsData(tests:  TestsForAccount[]): AllTests {
    return {backendSavedTests: tests.map(t => (
        {
            testName: t.testName!, 
            testId: t.testID!, 
            isChecked: false
        }))}
}