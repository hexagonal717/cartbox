import { useQuery } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { getUser, putUser } from '../../../api/customer/customerApi.js';

const ProfilePage = () => {
  const token = useSelector((state) => state.customerAuthSlice.accessToken);

  const [previewImage, setPreviewImage] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const profileImageInputRef = useRef(null);
  const [customerInfo, setCustomerInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    age: '',
    password: '',
    image: '',
  });

  const {
    status,
    error,
    refetch,
    data: dbCustomerInfo,
  } = useQuery({
    queryKey: ['dbCustomerInfo', token.customerId],
    queryFn: () =>
      getUser(token.customerId).then((data) => {
        setCustomerInfo(data);
        return data;
      }),
    enabled: !!token.customerId,
  });

  if (status === 'loading') return <h1>Loading...</h1>;
  if (status === 'error') return <h1>{JSON.stringify(error)}</h1>;

  function handleEdit(event) {
    event.preventDefault();
    if (!isDisabled) {
      setCustomerInfo(dbCustomerInfo);
    }
    setIsDisabled(!isDisabled);
  }

  function handleEditImage() {
    if (previewImage) {
      profileImageInputRef.current.value = null;
    }
    setPreviewImage('');
    if (!previewImage) {
      profileImageInputRef.current.click();
    }
  }

  function handleOnChange(event) {
    const { name, value, files, type } = event.target;
    if (type === 'file' && files[0]) {
      event.preventDefault();
      setPreviewImage(URL.createObjectURL(files[0]));
      setCustomerInfo({
        ...customerInfo,
        [name]: files[0],
      });
    } else {
      event.preventDefault();
      setCustomerInfo({
        ...customerInfo,
        [name]: value,
      });
    }
  }

  async function handleSave(event) {
    try {
      event.preventDefault();
      const updatedUserInfo = await putUser(token.customerId, customerInfo);
      setIsDisabled(true);
      await refetch();
      setPreviewImage(null);

      console.log('User Info Saved:', updatedUserInfo);
    } catch (err) {
      console.error('Error saving user info:', err);
    }
  }

  const disabledInput = {
    color: '#909090',
    outline: '0.1rem solid #424242',
    boxShadow: '0 0 0 transparent',
  };

  const enabledInput = {
    color: '#e6e6e6',
  };

  const disabledSaveButton = {
    userSelect: 'none',
    cursor: 'auto',
    background: '#00ff7610',
    color: '#00ff7688',
    outline: '0.1rem solid #00ff7650',
  };

  const enabledSaveButton = {
    userSelect: 'none',
  };

  return (
    dbCustomerInfo && (
      <MainContainer>
        <FormContainer
          action="/"
          onSubmit={handleSave}
          method="post"
          encType="multipart/form-data"
        >
          <ProfileCircle>
            {previewImage ? (
              <ProfileImage src={previewImage} alt="Profile" />
            ) : dbCustomerInfo.image ? (
              <ProfileImage src={dbCustomerInfo.image} alt="Profile" />
            ) : (
              <div
                style={{
                  color: 'white',
                  fontSize: '0.8rem',
                  fontWeight: '400',
                }}
              >
                Upload an image
              </div>
            )}
          </ProfileCircle>

          <ProfileImageButtonGroup>
            <EditProfileImageButton onClick={handleEditImage}>
              {!previewImage ? 'Edit picture' : 'Cancel'}
            </EditProfileImageButton>

            <SaveProfileImageButton
              style={
                previewImage
                  ? {
                      display: 'block',
                    }
                  : {
                      display: 'none',
                    }
              }
              type="submit"
            >
              <span>Save</span>
            </SaveProfileImageButton>
          </ProfileImageButtonGroup>

          <ProfileImgUploader
            type="file"
            name="image"
            id="upload-photo"
            ref={profileImageInputRef}
            onChange={handleOnChange}
          />

          <InputContainer
            name="firstName"
            style={isDisabled ? disabledInput : enabledInput}
            readOnly={isDisabled}
            disabled={isDisabled}
            value={customerInfo.firstName}
            onChange={handleOnChange}
          />
          <InputContainer
            name="lastName"
            style={isDisabled ? disabledInput : enabledInput}
            readOnly={isDisabled}
            disabled={isDisabled}
            value={customerInfo.lastName}
            onChange={handleOnChange}
          />
          <InputContainer
            name="email"
            style={isDisabled ? disabledInput : enabledInput}
            readOnly={isDisabled}
            disabled={isDisabled}
            value={customerInfo.email}
            onChange={handleOnChange}
          />
          <InputContainer
            name="phone"
            style={isDisabled ? disabledInput : enabledInput}
            readOnly={isDisabled}
            disabled={isDisabled}
            value={customerInfo.phone}
            onChange={handleOnChange}
          />
          <EditButton onClick={handleEdit}>
            {isDisabled ? 'Edit profile' : 'Cancel'}
          </EditButton>
          <SaveButton
            style={isDisabled ? disabledSaveButton : enabledSaveButton}
            type="submit"
            // onClick={isDisabled ? null : handleSave}
          >
            Save
          </SaveButton>
        </FormContainer>
      </MainContainer>
    )
  );
};

const MainContainer = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
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
        outline: 0.1rem solid #ffffff;
        box-shadow: 0 0 0.5rem #ffffff4c;
    }

    &:focus {
        transition: 332ms ease-in-out;
        outline: 0.1rem solid #ffffff;
        padding: 1rem 0.9rem;
        box-shadow: 0 0 0.5rem #ffffff4c;
    }

    &::-ms-reveal {
        filter: invert(100%);

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

const ProfileCircle = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 12rem;
  width: 12rem;
  text-align: center;
  border-radius: 25rem;
  outline: 0.15rem solid #ffffff44;
  text-decoration: none;

  &:hover {
    cursor: pointer;
  }
`;

const EditButton = styled.button`
  height: 2rem;
  width: 6rem;
  margin: 1rem;
  background: #ffffff15;
  font-size: 0.8rem;
  color: #ffffff;
  border-radius: 0.4rem;
  border: none;
  outline: 0.1rem solid #ffffff77;
  font-weight: 700;
  transition: background 123ms ease-in-out;

  &:hover {
    background: #ffffff25;
    color: #ffffff;
    cursor: pointer;
    transition: 123ms ease-in-out;
  }
`;

const EditProfileImageButton = styled.button`
  height: 2rem;
  width: 6rem;
  background: #ffffff15;
  font-size: 0.8rem;
  color: #ffffff;
  border-radius: 0.4rem;
  border: none;
  outline: 0.1rem solid #ffffff77;
  font-weight: 700;
  transition: background 123ms ease-in-out;

  &:hover {
    background: #ffffff25;
    color: #ffffff;
    cursor: pointer;
    transition: 123ms ease-in-out;
  }
`;

const ProfileImageButtonGroup = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const SaveProfileImageButton = styled.button`
  height: 2rem;
  width: 6rem;
  background: #ffffff15;
  font-size: 0.8rem;
  color: #ffffff;
  border-radius: 0.4rem;
  border: none;
  outline: 0.1rem solid #ffffff77;
  font-weight: 700;
  transition: background 123ms ease-in-out;

  &:hover {
    background: #ffffff25;
    color: #ffffff;
    cursor: pointer;
    transition: 123ms ease-in-out;
  }
`;

const SaveButton = styled.button`
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
    cursor: pointer;
    transition: 123ms ease-in-out;
  }
`;

export default ProfilePage;
