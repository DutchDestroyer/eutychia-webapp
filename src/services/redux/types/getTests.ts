import { TestsForAccount } from "../../api";

export const GETTESTS = "GETTESTS"

export interface AllTests{
    tests: TestsForAccount[],
}

export interface GetTestsAction{
    type: typeof GETTESTS,
    payload: AllTests
}
