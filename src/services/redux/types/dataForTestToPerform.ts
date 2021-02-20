export const DATAFORTESTTOPERFORM = "DATAFORTESTTOPERFORM"

export interface TestToPerform{
    title: string,
    description: string,
    displayAnswers: boolean,
    finalRemark: string,
    questions: QuestionsOfTest[]
}

export interface QuestionsOfTest{
    question: string,
    questionType: QuestionTypeEnum,
    answers: string[];
}

export enum QuestionTypeEnum {
    OpenQuestion = 'openQuestion',
    MultipleChoice = 'multipleChoice',
    Slider = 'slider'
}

export interface TestToPerformAction{
    type: typeof DATAFORTESTTOPERFORM,
    payload: TestToPerform
}