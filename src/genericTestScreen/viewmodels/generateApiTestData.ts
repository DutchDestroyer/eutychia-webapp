import { AnswerToQuestion, GenericTestAnswers } from "../../services/api";
import { TestToPerform } from "../../singleProjectOverviewParticipant/redux/types/dataForTestToPerform";

export function createGenericTestAnswers(testData: TestToPerform, accountId: string): GenericTestAnswers {
    return {
        accountID: accountId,
        answers: testData.questions.map((question, index) => {
            return {
                question: index,
                answer: question.selectedAnswer
            } as AnswerToQuestion
        }) 
    } as GenericTestAnswers
}