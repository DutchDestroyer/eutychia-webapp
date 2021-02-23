import { ChangeEvent, FormEventHandler, MouseEventHandler, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { AppState } from "../../services/redux/store";
import { SetCorrectScreen } from "./viewManager"
import nl from '../../services/navigationlinks';
import { createGenericTestAnswers } from "../viewmodels/generateApiTestData";
import { ButtonToDisplay } from "./buttonToDisplay";

interface ParamTypes {
    projectUuid: string
    testUuid: string
  }

export default function GenericTestScreen(){
    const history = useHistory();
    const dispatch = useDispatch();
    const loginData = useSelector((state: AppState) => state.login)
    const testData = useSelector((state: AppState) => state.testToPerform)
    const [questionNumber, setQuestionNumber] = useState<number>(-1);
    const [isAnswerGiven, setIsAnswerGiven] = useState<boolean>(true);
    const [sliderValue, setSliderValue] = useState<number>(0)
    const { projectUuid, testUuid } = useParams<ParamTypes>();
    const api = useSelector((state: AppState) => state.api.api)

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

    function onNextButtonClicked(): MouseEventHandler<HTMLButtonElement> | undefined {
        (async () => {
        // Check that a answer has been submitted
        if(questionNumber > -1 && 
            questionNumber < testData.questions.length &&
            testData.questions[questionNumber].selectedAnswer === "") {
                setIsAnswerGiven(false)
                return;
            }

            setSliderValue(0)
            setIsAnswerGiven(true)

            if(questionNumber === testData.questions.length - 1) {
                if(!loginData.isValid) {
                    return;
                }

                const genericTestAnswers = createGenericTestAnswers(testData, loginData.accountDetails.accountID)
                const submittedTestData = await api.submitAnswerToTest(projectUuid, testUuid, genericTestAnswers)

                if(submittedTestData.status !== 200){
                    return;
                }
            }
            setQuestionNumber(questionNumber + 1)
            return;
        })();

        return;
    }

    function onFinishedButtonClicked(): MouseEventHandler<HTMLButtonElement> | undefined {
        history.push(nl.projectOverviewParticipantScreen + "/" + projectUuid );
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
                sliderValue={sliderValue}
            />            
            <ButtonToDisplay 
                questionNumber={questionNumber}
                numberOfQuestions={testData.questions.length}
                onFinishedButtonClicked={onFinishedButtonClicked}
                onNextButtonClicked={onNextButtonClicked}
            />
        </div>
    );
}
