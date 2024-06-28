import {useState} from "react";
import {login} from "../../../api/api.js";
import {useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import styled from "styled-components";

const LogInPage = () => {
    const dispatch = useDispatch();

    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });

    function handleSubmit(event) {
        event.preventDefault();
        login(credentials, dispatch);
    }

    function handleCredentials(event) {
        const {name, value} = event.target;
        setCredentials({...credentials, [name]: value});
        console.log(credentials);
    }

    return (
        <MainContainer>
            <FormContainer onSubmit={handleSubmit}>
                <InputContainer
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleCredentials}
                />
                <InputContainer
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleCredentials}
                />
                <LogInButton type="submit">Log in</LogInButton>
                <div style={{color: "#dadada", fontSize: "0.8rem", fontWeight: 700}}>
                    Want to create an account?
                </div>
                <Link to={"/signup"}>
                    <SignUpButton>Sign up</SignUpButton>
                </Link>
            </FormContainer>
        </MainContainer>
    );
};

const MainContainer = styled.div`
    display: block;
    position: fixed;
    inset: 0;
    align-content: center;
    user-select: none;
`;

const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.8rem;
`;

const InputContainer = styled.input`
    padding: 0.7rem 0.6rem;
    border-radius: 0.4rem;
    border: none;
    outline: 0.1rem solid #424242;
    color: #e6e6e6;
    background: #212121ff;
    box-shadow: 0 0 0.2rem #d1d1d14c;
    font-size: 0.8rem;
    font-weight: 500;
    transition: outline 123ms ease-in-out,
    box-shadow 123ms ease-in-out,
    padding 123ms ease-in-out;

    &:hover {
        transition: 123ms ease-in-out;
        outline: 0.1rem solid #5e1eff;
        box-shadow: 0 0 0.5rem #5e1eff4c;
    }

    &:focus {
        transition: 332ms ease-in-out;
        outline: 0.1rem solid #5e1eff;
        padding: 1rem 0.9rem;
        box-shadow: 0 0 0.5rem #5e1eff4c;
    }

    &::-ms-reveal {
        filter: invert(100%);
    }

    //&:-webkit-autofill,
    //:-webkit-autofill:hover,
    //:-webkit-autofill:focus,
    //:-webkit-autofill:active {
    //  color: white !important;
    //  -webkit-text-fill-color: white !important;
    //  -webkit-box-shadow: 0 0 0 10rem #212121ff inset !important;
    //  -webkit-background-clip: text !important;
    //  background-clip: text !important;
    //}
`;

const LogInButton = styled.button`
    padding: 0.6rem 3rem;
    margin: 1rem;
    background: #5e1effdd;
    font-size: 0.8rem;
    color: #0d0057;
    border-radius: 0.4rem;
    border: none;
    font-weight: 700;
    transition: background 123ms ease-in-out,
    color 332ms ease-in-out;

    &:hover {
        background: #5e1eff;
        color: white;
        transition: 123ms ease-in-out;
    }
`;
const SignUpButton = styled.button`
    padding: 0.6rem 5rem;
    margin: 1rem;
    background: #00ff7615;
    font-size: 0.8rem;
    color: #00ff76;
    border-radius: 0.4rem;
    border: none;
    outline: 0.1rem solid #00ff7677;
    font-weight: 700;
    transition: background 123ms ease-in-out;

    &:hover {
        background: #00ff7625;
        color: #00ff76;
        transition: 123ms ease-in-out;
    }
`;

export default LogInPage;
