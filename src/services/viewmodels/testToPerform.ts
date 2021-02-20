import { GenericTest, GenericTestQuestionsQuestionTypeEnum } from "../api";
import { QuestionsOfTest, QuestionTypeEnum, TestToPerform } from "../redux/types/dataForTestToPerform";

export function TransformTestToPerformData(genericTest: GenericTest): TestToPerform {
    return {
        title: genericTest.title,
        description: genericTest.description,
        displayAnswers: genericTest.displayAnswers,
        finalRemark: genericTest.finalRemark,
        questions: genericTest.questions.map(q => {
            return<QuestionsOfTest>{
                question: q.question!,
                questionType: transformEnum(q.questionType!),
                answers: q.answers!
            }
        })
    }

}

function transformEnum(enumType: GenericTestQuestionsQuestionTypeEnum): QuestionTypeEnum {
    switch(enumType){
        case GenericTestQuestionsQuestionTypeEnum.MultipleChoice:
            return QuestionTypeEnum.MultipleChoice;
        case GenericTestQuestionsQuestionTypeEnum.OpenQuestion:
            return QuestionTypeEnum.OpenQuestion;
        case GenericTestQuestionsQuestionTypeEnum.Slider:
            return QuestionTypeEnum.Slider;     
    }
}
