import { IButtonState } from "../contracts/iButtonState"

export function ButtonToDisplay(props: IButtonState): JSX.Element{
    if(props.questionNumber === props.numberOfQuestions) {
        return <button onClick={props.onFinishedButtonClicked}>Finished</button>
    } else {
        return <button onClick={props.onNextButtonClicked}>Next</button>
    }
}
