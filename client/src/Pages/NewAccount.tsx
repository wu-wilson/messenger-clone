import { BsChatDots } from "react-icons/bs";
import { useHistory } from "react-router-dom";

const NewAccount = () => {
  // Use history instance.
  const history = useHistory();

  // When "here" is clicked, direct user to new account page.
  const directNewAccount = () => {
    history.push(`/`);
  };

  return (
    <div className="na-container">
      <BsChatDots className="chat-icon" />
      <div className="na-title">Messenger Clone</div>
      <div className="intro">
        New to messenger clone? You're in the right place.
      </div>
      <form className="na-form">
        <input className="na-input" type="input" placeholder="Username"></input>
        <input
          className="na-input na-password"
          type="input"
          placeholder="Password"
        ></input>
        <input
          className="submit na"
          type="submit"
          value="Create Account"
        ></input>
      </form>
      <div className="subtext">
        Already have an account? Click{" "}
        <span className="here" onClick={directNewAccount}>
          here.
        </span>
      </div>
    </div>
  );
};

export default NewAccount;
