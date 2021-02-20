
export const GETTESTSOFPROJECTOFPARTICIPANT = "GETTESTSOFPROJECTOFPARTICIPANT"

export enum ETestType {
    Generic = 'generic',
    StroopDirection = 'stroopDirection',
    StroopColor = 'stroopColor'
}

export interface TestOfProjectOfParticipant{
    testName: string,
    testId: string,
    testType: ETestType
}

export interface AllTestsOfProjectOfParticipant{
    tests: TestOfProjectOfParticipant[],
}

export interface GetTestsOfProjectOfParticipantAction{
    type: typeof GETTESTSOFPROJECTOFPARTICIPANT,
    payload: AllTestsOfProjectOfParticipant
}