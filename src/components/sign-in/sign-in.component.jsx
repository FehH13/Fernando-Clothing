import { useState } from "react";
import {
  signInWithGooglePopup
} from "../../utils/firebase/firebase.utils";

import { signInUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import "./sign-in.scss";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const logGoogleUser = async () => {
    await signInWithGooglePopup();
    
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email && !password) {
      alert("Email or password is missing");
      return;
    }

    try {
      const { user } = await signInUserWithEmailAndPassword(email, password);    
      resetFormFields();
    } catch (err) {
        switch (err.code){
            case "auth/wrong-password":
                alert("Password or Email Invalid");
                break;
            case "auth/user-not-found":
                alert("Email not Registered");
                break;
            default:
                console.log(err)
        }

    }

    return signInUserWithEmailAndPassword();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-in-container">
      <h2>Already Have an Account?</h2>
      <span>Sign In With Your Email and Password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />
        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button type='button' buttonType="google" onClick={logGoogleUser}>
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
