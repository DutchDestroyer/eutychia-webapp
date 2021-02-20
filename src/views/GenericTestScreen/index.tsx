import { MouseEventHandler, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { AppState } from "../../services/redux/store";
import { QuestionTypeEnum } from "../../services/redux/types/dataForTestToPerform";

export default function GenericTestScreen(){
    const history = useHistory();
    const dispatch = useDispatch();
    const loginData = useSelector((state: AppState) => state.login)
    const testData = useSelector((state: AppState) => state.testToPerform)
    const [questionNumber, setQuestionNumber] = useState<number>(-1);

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
        setQuestionNumber(questionNumber + 1)
        return;
    }

    return(
        <div>
            <SetCorrectScreen/>
            <button onClick={nextButtonClicked}>Next</button>
        </div>
    );

    function SetCorrectScreen(){
        if(questionNumber === -1){
            return( 
                <div>
                    <h1>{testData.title}</h1>
                    <h2>{testData.description}</h2>
                </div>
            );
        } else if(questionNumber < testData.questions.length){
            return displayCorrectQuestion();
        } else {
            return <h1>{testData.finalRemark}</h1>
        }
    }

    function displayCorrectQuestion() {
        switch(testData.questions[questionNumber].questionType){
            case QuestionTypeEnum.MultipleChoice:
                return <h1>multiple choice</h1>;
            case QuestionTypeEnum.Slider:
                return <h1>slider</h1>;
            case QuestionTypeEnum.OpenQuestion:
                return <h1>open question</h1>;
        }
    }
}
