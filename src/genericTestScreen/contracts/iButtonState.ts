import { MouseEventHandler } from "react";

export interface IButtonState{
    questionNumber: number,
    numberOfQuestions: number,
    onFinishedButtonClicked: () => MouseEventHandler<HTMLButtonElement> | undefined
    onNextButtonClicked: () => MouseEventHandler<HTMLButtonElement> | undefined
}