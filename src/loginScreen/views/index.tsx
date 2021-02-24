import { useHistory } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from '../redux/actions/login';
import nl from '../../services/navigationlinks';
import { transformLoginData } from '../viewmodels/transform';
import { IState as ILoginState } from '../contracts/iLoginState';
import { createLoginData } from '../viewmodels/createLoginData';
import { AppState } from '../../services/redux/store';
import { apiAction } from '../../app/redux/actions/api';
import { createApiData } from '../viewmodels/createApiData';

export default function LoginScreen(): JSX.Element{
  const {register, handleSubmit, errors, reset} = useForm<ILoginState>();
  const history = useHistory();
  const dispatch = useDispatch()
  const api = useSelector((state: AppState) => state.api.api)

  const onSubmit = (data: ILoginState) => {

    (async () => {
      const loginAccount = createLoginData(data);

      const loggedInData = await api.logInWithAccount(loginAccount)
        .catch(e => {
          console.log(e)
          return e
        })

      if(loggedInData.status !== 200){
        reset();
        return;
      }

      dispatch(
        loginAction(transformLoginData(loggedInData.data, loggedInData.status))
      );
      dispatch(
        apiAction(createApiData(loggedInData.data))
      );

      history.push(nl.overviewScreen);      
      reset();
    })();    
}

  return(
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Email address:</label>
        <input
          type="text"
          id="emailaddress"
          name="emailaddress"
          ref={register({required: true})}
        />
        {errors.emailaddress && errors.emailaddress.type === "required" && (
        <div className="error">Your must enter your emailaddress.</div>)}
      </div>
      <div>
        <label>Password: </label>
        <input
          type="text"
          id="password"
          name="password"
          ref={register({required: true})}
        />
        {errors.password && errors.password.type === "required" && (
        <div className="error">Your must enter your password.</div>
        )}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
 