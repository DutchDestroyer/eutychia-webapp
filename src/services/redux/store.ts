import { applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import loginReducer from "./reducers/login";
import getTestsReducer from "./reducers/getTests";
import getProjectsOfParticipantReducer from "./reducers/getProjectsOfParticipant";
import getTestsOfProjectOfParticipantReducer from "./reducers/getTestsOfProjectParticipant";
import testToPerformReducer from "./reducers/dataForTestToPerform";

const rootReducer = combineReducers({
    login: loginReducer,
    getTests: getTestsReducer,
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