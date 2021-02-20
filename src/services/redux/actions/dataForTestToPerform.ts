import { DATAFORTESTTOPERFORM, TestToPerform } from "../types/dataForTestToPerform";

export function testToPerformAction(test: TestToPerform) {
    return {
        type: DATAFORTESTTOPERFORM,
        payload: test
    };
}