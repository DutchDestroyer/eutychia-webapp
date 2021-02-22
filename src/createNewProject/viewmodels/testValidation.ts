import { SelectableTestsForProject } from "../../overviewScreen/redux/types/selectableTestsForProject";

export function obtainSelectedTests(allTests: SelectableTestsForProject) {
    return allTests.selectableTests.filter(test => test.isSelected);
  }