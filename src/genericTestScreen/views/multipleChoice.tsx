import { FormEventHandler } from "react";
import { QuestionOfTest } from "../../singleProjectOverviewParticipant/redux/types/dataForTestToPerform";

interface multipleChoiceProps{
    question: QuestionOfTest
    onRadioButtonChanged: (e: any) => FormEventHandler<HTMLDivElement> | undefined
}

export function MultipleChoiceView(props: multipleChoiceProps): JSX.Element {
    return <div>
        <h1>{props.question.question}</h1>
        <div onChange={props.onRadioButtonChanged}>
            {props.question.answers.map(answer => {
                return (
                    <div>
                        <label>{answer}</label>
                        <input type="radio" value={answer} name="answer" />
                    </div>
                );
            })}
        </div>
    </div>;
}