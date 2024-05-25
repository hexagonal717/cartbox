import {useState} from "react";
import {signUp} from "../../api.js";

const SignUp = () => {
    const [result, setResult] = useState();
    const [userInfo, setUserInfo] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: Number,
        password: "",
    });

    function handleUserInfo(event) {
        const {name, value} = event.target;
        setUserInfo({...userInfo, [name]: value});
    }

    function handleSignUp() {
        console.log(userInfo);
        signUp(userInfo).then((data) => {
            console.log("return in .............", data.success);
            setResult(data.success);
        });
    }

    return (
        <div>
            <input
                type="text"
                placeholder={"First Name"}
                name="firstName"
                onChange={handleUserInfo}
            />
            <input
                type="text"
                placeholder={"Last Name"}
                name="lastName"
                onChange={handleUserInfo}
            />
            <input
                type="text"
                placeholder={"Email"}
                name="email"
                onChange={handleUserInfo}
            />
            <input
                type="text"
                placeholder={"Phone"}
                name="phone"
                onChange={handleUserInfo}
            />
            <input
                type="text"
                placeholder={"Password"}
                name="password"
                onChange={handleUserInfo}
            />
            <button onClick={handleSignUp}>Sign Up</button>
            <h1>{result && result.firstName}</h1>
        </div>
    );
};

export default SignUp;
