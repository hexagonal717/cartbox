import { useState } from 'react';
import { login } from '../../../api/customer/customerApi.js';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const SuperAdminLogInPage = () => {
  const dispatch = useDispatch();
  const userToken = useSelector((state) => state.userLoginSlice.accessToken);
  const navigate = useNavigate();

  /*useEffect(() => {
        if (userToken) {

            navigate("/login")
            console.log('dsadas')

        }
    }, [userToken]);
*/

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  function handleSubmit(event) {
    event.preventDefault();
    login(credentials, dispatch);
  }

  function handleCredentials(event) {
    const { name, value } = event.target;
    setCredentials({ ...credentials, [name]: value });
    console.log(credentials);
  }

  return (
    <>
      <Header>
        <Link to="/">
          <AdminButton>For Users</AdminButton>
        </Link>
      </Header>

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
          <div
            style={{ color: '#dadada', fontSize: '0.8rem', fontWeight: 700 }}
          >
            Want to create an account?
          </div>
          <Link to={'/signup'}>
            <SignUpButton>Sign up</SignUpButton>
          </Link>
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

const Header = styled.div`
  position: relative;
  display: flex;
  justify-content: right;
  align-items: center;
  z-index: 5;
  height: 4rem;
  width: 100%;
  outline: 0.1rem solid #3a3a3a;
`;

const AdminButton = styled.button`
  padding: 0.6rem 3rem;
  margin: 1rem;
  background: #5e1eff15;
  font-size: 0.8rem;
  color: #5e1eff;
  border-radius: 0.4rem;
  border: none;
  outline: 0.1rem solid #5e1effaa;
  font-weight: 700;
  transition: background 123ms ease-in-out;

  &:hover {
    background: #5e1eff28;
    color: #5e1eff;
    transition: 123ms ease-in-out;
  }
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
  outline: 0.1rem solid #ff7f50dd; /* Orange outline */
  color: #e6e6e6;
  background: #212121ff;
  box-shadow: 0 0 0.2rem #ff7f504c; /* Orange box-shadow */
  font-size: 0.8rem;
  font-weight: 500;
  transition:
    outline 123ms ease-in-out,
    box-shadow 123ms ease-in-out,
    padding 123ms ease-in-out;

  &:hover {
    transition: 123ms ease-in-out;
    outline: 0.1rem solid #ff7f50; /* Brighter orange outline on hover */
    box-shadow: 0 0 0.5rem #ff7f504c; /* Larger orange box-shadow on hover */
  }

  &:focus {
    transition: 332ms ease-in-out;
    outline: 0.1rem solid #ff7f50; /* Brighter orange outline on focus */
    padding: 1rem 0.9rem;
    box-shadow: 0 0 0.5rem #ff7f504c; /* Larger orange box-shadow on focus */
  }

  &::-ms-reveal {
    filter: invert(100%);
  }
`;

const LogInButton = styled.button`
  padding: 0.6rem 3rem;
  margin: 1rem;
  background: #ff7f50dd;
  font-size: 0.8rem;
  color: #662200;
  border-radius: 0.4rem;
  border: none;
  font-weight: 700;
  transition:
    background 123ms ease-in-out,
    color 332ms ease-in-out;

  &:hover {
    background: #ff7f50;
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

export default SuperAdminLogInPage;
