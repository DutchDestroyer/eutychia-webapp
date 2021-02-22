import { ChangeEvent, FormEventHandler, MouseEventHandler, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { AppState } from "../../services/redux/store";
import { SetCorrectScreen } from "./viewManager"

export default function GenericTestScreen(){
    const history = useHistory();
    const dispatch = useDispatch();
    const loginData = useSelector((state: AppState) => state.login)
    const testData = useSelector((state: AppState) => state.testToPerform)
    const [questionNumber, setQuestionNumber] = useState<number>(-1);
    const [isAnswerGiven, setIsAnswerGiven] = useState<boolean>(true);
    const [sliderValue, setSliderValue] = useState<number>(0)

    if(!loginData.isValid){
        return (
            <h1>Unauthorized</h1>
        );
    }

    if(testData.questions.length === 0){
        return (
            <h1>No questions found</h1>
        );
    }

    function nextButtonClicked(): MouseEventHandler<HTMLButtonElement> | undefined {
        // Check that a answer has been submitted
        if(questionNumber > -1 && 
            questionNumber < testData.questions.length &&
            testData.questions[questionNumber].selectedAnswer === "") {
                setIsAnswerGiven(false)
                return;
            }

        setIsAnswerGiven(true)
        setSliderValue(0)
        setQuestionNumber(questionNumber + 1)

        return;
    }

    function onSliderChanged(value: number){
        setSliderValue(value)
        testData.questions[questionNumber].selectedAnswer = testData.questions[questionNumber].answers[value]
    }

    function onRadioButtonChanged(e: ChangeEvent<HTMLInputElement>): FormEventHandler<HTMLDivElement> | undefined {
        testData.questions[questionNumber].selectedAnswer = e.target.value
        return;
    }

    function onOpenQuestionChanged(e: ChangeEvent<HTMLInputElement>): FormEventHandler<HTMLDivElement> | undefined {
        testData.questions[questionNumber].selectedAnswer = e.target.value
        return;
    }

    return(
        <div>
            {isAnswerGiven ? null : <h1>Please provide an answer</h1>}
            <SetCorrectScreen 
                questionNumber={questionNumber} 
                testData={testData}
                onRadioButtonChanged={onRadioButtonChanged}
                onOpenQuestionChanged={onOpenQuestionChanged}
                onSliderChanged={onSliderChanged}
                sliderValue={sliderValue}/>            
            <button onClick={nextButtonClicked}>Next</button>
        </div>
    );
}
