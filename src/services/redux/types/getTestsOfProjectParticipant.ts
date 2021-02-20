
export const GETTESTSOFPROJECTOFPARTICIPANT = "GETTESTSOFPROJECTOFPARTICIPANT"

export enum ETestType {
    Generic = 'generic',
    StroopDirection = 'stroopDirection',
    StroopColor = 'stroopColor'
}

export interface GetTestsOfProjectOfParticipant{
    testName: string,
    testId: string,
    testType: ETestType
}

export interface AllTestsOfProjectOfParticipant{
    tests: GetTestsOfProjectOfParticipant[],
}

export interface GetTestsOfProjectOfParticipantAction{
    type: typeof GETTESTSOFPROJECTOFPARTICIPANT,
    payload: AllTestsOfProjectOfParticipant
}