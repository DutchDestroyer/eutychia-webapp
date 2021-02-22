import { applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import loginReducer from "../../loginScreen/redux/reducers/login";
import selectableTestsForProjectReducer from "../../overviewScreen/redux/reducers/selectableTestsForProject";
import getProjectsOfParticipantReducer from "../../overviewScreen/redux/reducers/getProjectsOfParticipant";
import getTestsOfProjectOfParticipantReducer from "../../allProjectsOverviewParticipant/redux/reducers/getTestsOfProjectParticipant";
import testToPerformReducer from "../../singleProjectOverviewParticipant/redux/reducers/dataForTestToPerform";

const rootReducer = combineReducers({
    login: loginReducer,
    selectableTestsForProject: selectableTestsForProjectReducer,
    getProjectsOfParticipant: getProjectsOfParticipantReducer,
    testsOfProjectOfParticipant: getTestsOfProjectOfParticipantReducer,
    testToPerform: testToPerformReducer
  });

export type AppState = ReturnType<typeof rootReducer>;
  
export default function configureStore() {
    const middlewares = [thunkMiddleware];
    const middleWareEnhancer = applyMiddleware(...middlewares);
  
    const store = createStore(
      rootReducer,
      composeWithDevTools(middleWareEnhancer)
    );
  
    return store;
  }