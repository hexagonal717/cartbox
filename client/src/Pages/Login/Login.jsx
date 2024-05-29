import {useState} from "react";
import {login} from "../../api.js";
import {useDispatch} from "react-redux";
import {Link} from "react-router-dom";

const Login = () => {

    const dispatch = useDispatch();

    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });

    function handleSubmit() {

        login(credentials, dispatch)
    }

    function handleCredentials(event) {
        const {name, value} = event.target;
        setCredentials({...credentials, [name]: value});
        console.log(credentials);
    }

    return (<>


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
            <button onClick={handleSubmit}>Log in</button>
        </div>
        <Link to={"/signup"}>
            <button>Sign up Page</button>
        </Link>

    </>)
};

export default Login;
