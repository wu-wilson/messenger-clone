import { FormEvent, useState } from "react";
import { BsChatDots } from "react-icons/bs";
import { useHistory } from "react-router-dom";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

/* Define type count. This will be used to check if the 
user enters a taken username. */
type count = {
  count: number;
};

const NewAccount = () => {
  // Use history instance.
  const history = useHistory();

  // When "here" is clicked, direct user to sign in page.
  const directNewAccount = () => {
    history.push(`/`);
  };

  // Store the input username/password
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // Store message to user here.
  const [msg, setMsg] = useState<string>("");

  // Check if the username is already taken or less than 5 characters.
  const checkUsername = async (e: FormEvent) => {
    e.preventDefault();
    if (username.length < 5) {
      return "short";
    }
    const { data }: { data: count[] } = await axios.get(
      `${process.env.REACT_APP_API_URL}/check_usernames/${username}`
    );
    if (data[0].count !== 0) {
      console.log(data);
      return "taken";
    } else {
      return "unique";
    }
  };

  /* Checks if the password is less than 10 characters and if 
  it contains any non-alphanumeric characters. */
  const checkPassword = () => {
    if (password.length < 10) {
      return "short";
    } else {
      for (let i = 0; i < password.length; i++) {
        if (!/[a-zA-Z0-9]/.test(password[i])) {
          return "special characters";
        }
      }
      return "matches";
    }
  };

  // When the user submits their username and password, create the account.
  const createAccount = async (e: FormEvent) => {
    e.preventDefault();
    const usernameCheck = await checkUsername(e);
    const passwordCheck = checkPassword();
    // If the user's username/password produce no errors, create the account.
    if (usernameCheck === "unique" && passwordCheck === "matches") {
      setMsg("Your account has been created.");
      await axios.post(`${process.env.REACT_APP_API_URL}/create_account`, {
        username: username,
        password: password,
      });
    } else {
      if (usernameCheck === "taken") {
        setMsg("That username is already taken.");
      } else if (usernameCheck === "short") {
        setMsg("Your username must be at least 5 characters.");
      } else if (passwordCheck === "short") {
        setMsg("Your password must be at least 10 characters.");
      } else {
        setMsg("Your password may only contain letters and numbers.");
      }
    }
  };

  return (
    <div className="na-container">
      <BsChatDots className="chat-icon" />
      <div className="na-title">Messenger Clone</div>
      <div className="intro">
        New to messenger clone? You're in the right place.
      </div>
      <div
        className={`msg ${msg !== "" ? "show" : null}`}
        style={{
          color: `${
            msg === "Your account has been created."
              ? "#54cc49"
              : "rgb(218, 5, 5)"
          }`,
        }}
      >
        {msg !== "Your account has been created." ? (
          msg
        ) : (
          <div>
            {msg + " "}To sign in, click <span className="here-msg">here</span>
          </div>
        )}
      </div>
      <form className="na-form" onSubmit={createAccount}>
        <input
          className="na-input"
          type="input"
          placeholder="Username"
          value={username}
          onChange={(e: FormEvent<HTMLInputElement>) =>
            setUsername(e.currentTarget.value)
          }
        ></input>
        <input
          className="na-input na-password"
          type="input"
          placeholder="Password"
          value={password}
          onChange={(e: FormEvent<HTMLInputElement>) =>
            setPassword(e.currentTarget.value)
          }
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
