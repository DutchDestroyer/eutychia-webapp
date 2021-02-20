
export const GETTESTS = "GETTESTS"

export interface TestForAccount{
    testName: string,
    testId: string,
    isChecked: boolean
}

export interface AllTests{
    backendSavedTests: TestForAccount[],
}

export interface GetTestsAction{
    type: typeof GETTESTS,
    payload: AllTests
}
