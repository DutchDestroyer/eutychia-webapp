import { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import nl from './views/navigationlinks';
import LoginScreen from './views/LoginScreen/index';
import OverviewScreen from './views/OverviewScreen';
import CreateNewProjectScreen from './views/CreateNewProjectScreen';
import ModifyExistingProjectScreen from './views/ModifyExistingProjectScreen';
import ProjectsOverviewScreen from './views/ProjectsOverviewScreen';
import ProjectOverviewParticipantScreen from './views/ProjectOverviewParticipantScreen';
import GenericTestScreen from './views/GenericTestScreen';

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

export default App;
