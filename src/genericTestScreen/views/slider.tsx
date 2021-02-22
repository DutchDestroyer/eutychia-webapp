import Slider from "rc-slider"

import 'rc-slider/assets/index.css'
import { QuestionOfTest } from "../../singleProjectOverviewParticipant/redux/types/dataForTestToPerform";

interface sliderProps{
    question: QuestionOfTest
    onSliderChanged: (value: number) => void
    sliderValue: number
}

export function SliderView(props: sliderProps): JSX.Element {
    return <div style={{ margin: 50 }}>
        <h1>{props.question.question}</h1>
        <label>{props.question.answers[props.sliderValue]}</label>
        <Slider
            min={0}
            max={props.question.answers.length - 1}
            value={props.sliderValue}
            onChange={props.onSliderChanged}
            railStyle={{
                height: 2
            }}
            handleStyle={{
                height: 28,
                width: 28,
                marginLeft: -14,
                marginTop: -14,
                backgroundColor: "red",
                border: 0
            }}
            trackStyle={{
                background: "none",
                transition: "0.3s ease background-color",
            }} />
    </div>;
}