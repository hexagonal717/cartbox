import { useState } from 'react';
import { signUp } from '../../../api/customer/customerApi.js';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const SignUpPage = () => {
  const [previewImage, setPreviewImage] = useState(null);
  const [customerInfo, setCustomerInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: Number,
    age: Number,
    password: '',
    image: '',
  });

  function handleUserInfo(event) {
    let { name, value } = event.target;
    if (event.target.type === 'file') {
      value = event.target.files[0];
      setPreviewImage(URL.createObjectURL(event.target.files[0]));
    }
    setCustomerInfo({ ...customerInfo, [name]: value });
  }

  function handleSignUp(event) {
    event.preventDefault();
    console.log(customerInfo);
    signUp(customerInfo).then((data) => {
      console.log('User created successfully.', data.success);
    });
  }

  return (
    <MainContainer>
      <FormContainer
        action="/"
        onSubmit={handleSignUp}
        method="post"
        encType="multipart/form-data"
      >
        <ProfileImgLabel htmlFor="upload-photo">
          {previewImage ? null : (
            <div
              style={{ color: 'white', fontSize: '0.8rem', fontWeight: '400' }}
            >
              Upload an image
            </div>
          )}
          <ProfileImage
            style={!previewImage ? { display: 'none' } : { display: 'block' }}
            src={previewImage}
            alt=""
          />
        </ProfileImgLabel>

        <ProfileImgUploader
          type="file"
          name="image"
          id="upload-photo"
          onChange={handleUserInfo}
        />

        <InputContainer
          type="text"
          placeholder="First Name"
          name="firstName"
          onChange={handleUserInfo}
        />
        <InputContainer
          type="text"
          placeholder="Last Name"
          name="lastName"
          onChange={handleUserInfo}
        />
        <InputContainer
          aria-autocomplete="none"
          type="email"
          placeholder="Email"
          name="email"
          onChange={handleUserInfo}
        />
        <InputContainer
          type="tel"
          placeholder="Phone"
          name="phone"
          onChange={handleUserInfo}
        />
        <InputContainer
          type="number"
          placeholder="Age"
          name="age"
          onChange={handleUserInfo}
        />
        <InputContainer
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleUserInfo}
        />

        <SignUpButton type="submit">Sign Up</SignUpButton>
        <div style={{ color: '#dadada', fontSize: '0.8rem', fontWeight: 700 }}>
          Already have an account?
        </div>
        <Link to={'/'}>
          <LogInButton>Log In</LogInButton>
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

const ProfileImage = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  border-radius: 50%;
`;

const ProfileImgUploader = styled.input`
  display: none;
  text-decoration: none;
`;

const ProfileImgLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 12rem;
  width: 12rem;
  text-align: center;
  border-radius: 25rem;
  outline: 0.15rem solid #ffffff44;
  text-decoration: none;
  margin-bottom: 2rem;

  &:hover {
    cursor: pointer;
  }
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
    outline: 0.1rem solid #00ff76;
    box-shadow: 0 0 0.5rem #00ff764c;
  }

  &:focus {
    transition: 332ms ease-in-out;
    outline: 0.1rem solid #00ff76;
    padding: 1rem 0.9rem;
    box-shadow: 0 0 0.5rem #00ff764c;
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

const SignUpButton = styled.button`
  padding: 0.6rem 3rem;
  margin: 1rem;
  background: #00ae4edd;
  font-size: 0.8rem;
  color: #003c1c;
  border-radius: 0.4rem;
  border: none;
  font-weight: 700;
  transition:
    background 123ms ease-in-out,
    color 332ms ease-in-out;

  &:hover {
    background: #00ae4e;
    color: white;
    transition: 123ms ease-in-out;
  }
`;
const LogInButton = styled.button`
  padding: 0.6rem 5rem;
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

export default SignUpPage;
