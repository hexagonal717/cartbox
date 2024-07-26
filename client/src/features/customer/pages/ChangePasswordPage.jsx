import { useState } from "react";
import styled from "styled-components";
import { changePassword } from "../../../api/customer/customerApi.js";
import { useNavigate } from "react-router-dom";
import { clearEmailState, setOtpVerify } from "../redux/customerOtpSlice.js";
import { useDispatch, useSelector } from "react-redux";

const ChangePasswordPage = () => {
  const navigate = useNavigate();
  const email = useSelector((state) => state.customerOtpSlice.email);
  const dispatch = useDispatch();
  const [passwords, setPasswords] = useState({
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    if (passwords.password !== passwords.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const response = await changePassword(email, {
      password: passwords.password,
    });

    if (response?.success) {
      dispatch(setOtpVerify(false));
      dispatch(clearEmailState());
      navigate("/loginredirectpage");
    } else {
      setError("Failed to change password");
    }
  }

  function handleCredentials(event) {
    const { name, value } = event.target;
    setPasswords({ ...passwords, [name]: value });
    setError(""); // Clear error when user starts typing
  }

  return (
    <>
      <MainContainer>
        <FormContainer onSubmit={handleSubmit}>
          <InputContainer
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleCredentials}
            value={passwords.password}
          />
          <InputContainer
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            onChange={handleCredentials}
            value={passwords.confirmPassword}
          />
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <LogInButton type="submit">Change Password</LogInButton>
        </FormContainer>
      </MainContainer>
    </>
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
  caret-color: white;
  color-scheme: dark;
  transition:
    outline 123ms ease-in-out,
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

  &:-webkit-autofill,
  :-webkit-autofill:hover,
  :-webkit-autofill:focus,
  :-webkit-autofill:active {
    color: white !important;
    -webkit-text-fill-color: white !important;
    -webkit-box-shadow: 0 0 0 10rem #2a3240ff inset !important;
    -webkit-background-clip: text !important;
    background-clip: text !important;
  }
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
  transition:
    background 123ms ease-in-out,
    color 332ms ease-in-out;

  &:hover {
    background: #5e1eff;
    color: white;
    transition: 123ms ease-in-out;
    cursor: pointer;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: -0.5rem;
`;

export default ChangePasswordPage;
