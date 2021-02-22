import { SelectableTestsForProject, SELECTABLETESTSFORPROJECT, SelectableTestsForProjectAction } from "../types/selectableTestsForProject";

const initialState: SelectableTestsForProject = {
   selectableTests: [],
} 

export default function selectableTestsForProjectReducer(state = initialState, action: SelectableTestsForProjectAction): SelectableTestsForProject{
    switch(action.type) {
        case SELECTABLETESTSFORPROJECT:
            return action.payload;
            default:
                return state;
    }
}