import { useState } from "react";
import { signUp } from "../../api.js";

const SignUp = () => {
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });

  function handleUserInfo(event) {
    const { name, value } = event.target;
    setUserInfo({ ...userInfo, [name]: value });
  }

  function handleSignUp() {
    console.log(userInfo);
    signUp(userInfo);
  }

  return (
    <div>
      <input
        type="text"
        placeholder={"First Name"}
        name="firstName"
        value={userInfo.firstName}
        onChange={handleUserInfo}
      />
      <input
        type="text"
        placeholder={"Last Name"}
        name="lastName"
        value={userInfo.lastName}
        onChange={handleUserInfo}
      />
      <input
        type="text"
        placeholder={"Email"}
        name="email"
        value={userInfo.email}
        onChange={handleUserInfo}
      />
      <input
        type="text"
        placeholder={"Phone"}
        name="phone"
        value={userInfo.phone}
        onChange={handleUserInfo}
      />
      <input
        type="text"
        placeholder={"Password"}
        name="password"
        value={userInfo.password}
        onChange={handleUserInfo}
      />
      <button onClick={handleSignUp}>Sign Up</button>
    </div>
  );
};

export default SignUp;
