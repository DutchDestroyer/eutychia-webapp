
export const SELECTABLETESTSFORPROJECT = "SELECTABLETESTSFORPROJECT"

export interface SelectableTestForProject{
    testName: string,
    testId: string,
    isSelected: boolean
}

export interface SelectableTestsForProject{
    selectableTests: SelectableTestForProject[],
}

export interface SelectableTestsForProjectAction{
    type: typeof SELECTABLETESTSFORPROJECT,
    payload: SelectableTestsForProject
}
