import { useHistory } from 'react-router-dom';
import nl from '../navigationlinks';

function OverviewScreen() {
    const history = useHistory();

    const createNewProjectClick = () =>{
        history.push(nl.createNewProjectScreen);
    }

    const modifyExistingProjectClick = () =>{
        history.push(nl.modifyExistingProjectScreen);
    }

    const performTestsClick = () =>{
        history.push(nl.projectsOverviewScreen);
    }

    return(
        <ul>
            <div><button onClick={createNewProjectClick}>Create new project</button></div>
            <div><button onClick={modifyExistingProjectClick}>Modify existing project</button></div>
            <div><button onClick={performTestsClick}>Perform tests</button></div>
        </ul>
    );

}

export default OverviewScreen;