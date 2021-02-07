import { useHistory } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { LoggedInData } from '../../services/redux/types/login';
import { AccountDetails, LoginAccount, LoginAccountGrantTypeEnum } from '../../services/api';
import { api } from '../../App';
import { loginAction } from '../../services/redux/actions/login';
import nl from '../navigationlinks';

interface IState{
  emailaddress: string,
  password: string
}

const transformData = (loginDetails: AccountDetails, status: number): LoggedInData => {
  const loggedInData: LoggedInData = {
      accountDetails: loginDetails,
      isValid: status === 200
  };
  return loggedInData;
}

export default function LoginScreen(): JSX.Element{
  const {register, handleSubmit, errors, reset} = useForm<IState>();
  const history = useHistory();
  const dispatch = useDispatch()

  const onSubmit = (data: IState) => {

    (async () => {
      const loginAccount: LoginAccount = {
        grantType: LoginAccountGrantTypeEnum.Password,
        emailAddress: data.emailaddress,
        password: data.password
      };

      const loggedInData = await api.logInWithAccount(loginAccount)
      dispatch(
        loginAction(transformData(loggedInData.data, loggedInData.status))
      );

      if(loggedInData.status === 200){
        history.push(nl.overviewScreen);
      }
      
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
  