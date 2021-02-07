import { AllTests, GETTESTS } from "../types/getTests";

export function getTestsAction(allTests: AllTests) {
    return {
        type: GETTESTS,
        payload: allTests
    };
}