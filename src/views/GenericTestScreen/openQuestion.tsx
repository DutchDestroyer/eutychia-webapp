import { ChangeEvent, FormEventHandler } from "react";
import { QuestionOfTest } from "../../services/redux/types/dataForTestToPerform";

interface openQuestionProps{
    question: QuestionOfTest
    onOpenQuestionChanged: (e: ChangeEvent<HTMLInputElement>) => FormEventHandler<HTMLDivElement> | undefined
}

export function OpenQuestionView(props: openQuestionProps): JSX.Element {
    return <div>
        <h1>{props.question.question}</h1>
        <input
            type="textarea"
            name="answer"
            onChange={props.onOpenQuestionChanged} />
    </div>;
}