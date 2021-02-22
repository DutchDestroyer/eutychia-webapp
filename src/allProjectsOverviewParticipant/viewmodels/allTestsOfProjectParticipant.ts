import { TestsProject, TestTestTypeEnum } from "../../services/api";
import { AllTestsOfProjectOfParticipant, ETestType } from "../redux/types/getTestsOfProjectParticipant";

export function TransformTestsOfParticipantData(testsOfProject: TestsProject) : AllTestsOfProjectOfParticipant{
    return { tests:  testsOfProject.testsToPerform!.map(t => (
    {
        testId: t.testID!,
        testName: t.testName!,
        testType: transformEnum(t.testType!)
    }))}

}

function transformEnum(type: TestTestTypeEnum): ETestType {
    switch(type) {
        case TestTestTypeEnum.Generic:
            return ETestType.Generic;
        case TestTestTypeEnum.StroopColor:
            return ETestType.StroopColor;
        case TestTestTypeEnum.StroopDirection:
            return ETestType.StroopDirection;
    }
}
