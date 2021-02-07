import { AllTests, GETTESTS, GetTestsAction } from "../types/getTests";

const initialState: AllTests = {
   tests: [],
} 

export default function getTestsReducer(state = initialState, action: GetTestsAction): AllTests{
    switch(action.type) {
        case GETTESTS:
            return action.payload;
            default:
                return state;
    }
}