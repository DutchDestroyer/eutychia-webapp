import { ETestType, TestOfProjectOfParticipant } from "../../allProjectsOverviewParticipant/redux/types/getTestsOfProjectParticipant";

export function isGenericTest(test: TestOfProjectOfParticipant) {
    return test.testType === ETestType.Generic;
}