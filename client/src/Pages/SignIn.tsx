import { BsChatDots } from "react-icons/bs";
import { useHistory } from "react-router-dom";

const SignIn = () => {
  // Set up history
  const history = useHistory();

  // When "here" is clicked, direct user to new account page.
  const directNewAccount = () => {
    history.push(`/create_account`);
  };

  return (
    <div className="si-container">
      <BsChatDots className="chat-icon" />
      <div className="si-title">Messenger Clone</div>
      <form className="si-form">
        <input className="si-input" type="input" placeholder="Username"></input>
        <input
          className="si-input si-password"
          type="input"
          placeholder="Password"
        ></input>
        <input className="submit" type="submit" value="Log In"></input>
      </form>
      <div className="subtext">
        Don't have an account? Click{" "}
        <span className="here" onClick={directNewAccount}>
          here.
        </span>
      </div>
    </div>
  );
};

export default SignIn;
