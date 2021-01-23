import { useHistory } from 'react-router-dom';
import { useForm } from "react-hook-form";

interface IState{
  emailaddress: string,
  password: string
}

function LoginScreen(): JSX.Element{
  const {register, handleSubmit, errors, reset} = useForm<IState>();
  const history = useHistory();

  const onSubmit = (data: IState) => {
    console.log("data", data);
    reset();
    history.push("/Overview");
  };


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

export default LoginScreen;
  