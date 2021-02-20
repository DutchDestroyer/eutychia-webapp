import { DATAFORTESTTOPERFORM, TestToPerform, TestToPerformAction } from "../types/dataForTestToPerform";

const initialState: TestToPerform = {
    title: "No data",
    description: "No data",
    displayAnswers: false,
    finalRemark: "No data",
    questions: []
 } 
 
 export default function testToPerformReducer(state = initialState, action: TestToPerformAction): TestToPerform{
     switch(action.type) {
         case DATAFORTESTTOPERFORM:
             return action.payload;
             default:
                 return state;
     }
 }