
import { QuestionOfTest, QuestionTypeEnum, TestToPerform } from "../../services/redux/types/dataForTestToPerform";
import { ChangeEvent, FormEventHandler } from "react";
import { MultipleChoiceView } from "./multipleChoice";
import { SliderView } from "./slider";
import { OpenQuestionView } from "./openQuestion";

interface Props{
    questionNumber: number,
    testData: TestToPerform,
    onRadioButtonChanged: (e: any) => FormEventHandler<HTMLDivElement> | undefined
    onOpenQuestionChanged: (e: ChangeEvent<HTMLInputElement>) => FormEventHandler<HTMLDivElement> | undefined
    onSliderChanged: (value: number) => void
    sliderValue: number
}

export function SetCorrectScreen(props: Props){
    if(props.questionNumber === -1){
        return( 
            <div>
                <h1>{props.testData.title}</h1>
                <h2>{props.testData.description}</h2>
            </div>
        );
    } else if(props.questionNumber < props.testData.questions.length){
        return <DisplayCorrectQuestion 
            question={props.testData.questions[props.questionNumber]}
            onRadioButtonChanged={props.onRadioButtonChanged}
            onOpenQuestionChanged={props.onOpenQuestionChanged}
            onSliderChanged={props.onSliderChanged}
            sliderValue={props.sliderValue}/>
    } else {
        return <h1>{props.testData.finalRemark}</h1>
    }
}

interface QuestionProps{
    question: QuestionOfTest
    onRadioButtonChanged: (e: any) => FormEventHandler<HTMLDivElement> | undefined
    onOpenQuestionChanged: (e: ChangeEvent<HTMLInputElement>) => FormEventHandler<HTMLDivElement> | undefined
    onSliderChanged: (value: number) => void
    sliderValue: number
}

function DisplayCorrectQuestion(props: QuestionProps): JSX.Element {
    switch(props.question.questionType){
        case QuestionTypeEnum.MultipleChoice:
            return (
                <MultipleChoiceView
                    question={props.question}
                    onRadioButtonChanged={props.onRadioButtonChanged}
                />
            );
        case QuestionTypeEnum.Slider:
            return ( 
                <SliderView
                question={props.question}
                onSliderChanged={props.onSliderChanged}
                sliderValue={props.sliderValue}/>
            )
        case QuestionTypeEnum.OpenQuestion:
            return (
            <OpenQuestionView
                question={props.question}
                onOpenQuestionChanged={props.onOpenQuestionChanged}
                />
            )
    }
}
