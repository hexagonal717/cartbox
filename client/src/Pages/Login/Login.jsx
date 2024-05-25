import {useState} from "react";
import {login} from "../../api.js";
import {Navigate} from "react-router-dom";

const Login = () => {
    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });
    const [isPasswordValid, setIsPasswordValid] = useState(false);

    function handleSubmit() {
        login(credentials).then((data) => setIsPasswordValid(data))
    }

    function handleCredentials(event) {
        const {name, value} = event.target;
        setCredentials({...credentials, [name]: value});
        console.log(credentials);
    }

    return (<>

        {isPasswordValid ? <Navigate to="/"></Navigate>
            : (
                <div>
                    <input
                        type="email"
                        name="email"
                        placeholder="email"
                        onChange={handleCredentials}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="password"
                        onChange={handleCredentials}
                    />
                    <button onClick={() => handleSubmit()}>Log in</button>
                </div>
            )}


    </>)
};

export default Login;
