import { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import nl from './services/navigationlinks';
import LoginScreen from './loginScreen/views/index';
import OverviewScreen from './overviewScreen/views';
import CreateNewProjectScreen from './createNewProject/views';
import ModifyExistingProjectScreen from './modifyExistingProject/views';
import ProjectsOverviewScreen from './allProjectsOverviewParticipant/view';
import ProjectOverviewParticipantScreen from './singleProjectOverviewParticipant/views';
import GenericTestScreen from './genericTestScreen/views';
import { Configuration, ConfigurationParameters } from './services/api/configuration';
import { DefaultApi } from './services/api';

function App(){

  const[isUserAuthenticated] = useState<boolean>(false);

  return (
    <Router>
        <Switch>
        <Route
                exact
                path="/"
                render={() => {
                    return (
                      !isUserAuthenticated ?
                      <Redirect to={nl.loginScreen}/> :
                      <Redirect to={nl.overviewScreen} /> 
                    )
                }}
              />
          <Route exact path={nl.loginScreen} component={LoginScreen} />
          <Route exact path={nl.overviewScreen} component={OverviewScreen} />
          <Route exact path={nl.createNewProjectScreen} component={CreateNewProjectScreen} />
          <Route exact path={nl.modifyExistingProjectScreen} component={ModifyExistingProjectScreen} />
          <Route exact path={nl.projectsOverviewScreen} component={ProjectsOverviewScreen} />
          <Route exact path={nl.projectOverviewParticipantScreen + "/:projectUuid"} component={ProjectOverviewParticipantScreen} />
          <Route exact path={nl.projectOverviewParticipantScreen + "/:projectUuid" + nl.genericTestScreen + "/:testUuid"} component={GenericTestScreen} />
        </Switch>
    </Router>
  );
}


let configParams: ConfigurationParameters = {
  username: "Mark",
  basePath: "http://localhost:8080/api"
}

let config = new Configuration(configParams)

export const api: DefaultApi = new DefaultApi(config);

export default App;
