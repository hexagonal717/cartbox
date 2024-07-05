import styled from "styled-components";
import {useSelector} from "react-redux";
import {getUserInfoByParams, putUserInfoById} from "../../../api/api.js";
import {useQuery} from "@tanstack/react-query";
import {useState} from "react";

const ProfilePage = () => {
    const token = useSelector((state) => state.userLoginSlice.accessToken);

    const [isDisabled, setIsDisabled] = useState(true);
    const [userInfo, setUserInfo] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
    });

    const {
        status,
        error,
        refetch,
        data: dbUserInfo,
    } = useQuery({
        queryKey: ["dbUserInfo", token.userId],
        queryFn: () =>
            getUserInfoByParams(token.userId).then((data) => {
                setUserInfo(data)
                return data;
            }),
        enabled: !!token.userId,


    });

    if (status === "loading") return <h1>Loading...</h1>;
    if (status === "error") return <h1>{JSON.stringify(error)}</h1>;

    function handleEdit() {
        if (!isDisabled) {
            setUserInfo(dbUserInfo);
        }
        setIsDisabled(!isDisabled);
    }

    function handleOnChange(event) {
        const {name, value} = event.target;
        setUserInfo({...userInfo, [name]: value});
    }

    console.log("first check in error", userInfo, token.userId);

    const handleSave = async () => {
        try {
            const updatedUserInfo = await putUserInfoById(token.userId, userInfo);
            setIsDisabled(true);
            await refetch()
            console.log("User Info Saved:", updatedUserInfo);

        } catch (err) {
            console.error("Error saving user info:", err);
        }
    };

    const disabledInput = {
        color: "#909090",
        outline: "0.1rem solid #424242",
        boxShadow: "0 0 0 transparent",
    };

    const enabledInput = {
        color: "#e6e6e6",
    };

    const disabledSaveButton = {
        userSelect: "none",
        cursor: "auto",
        background: "#00ff7610",
        color: "#00ff7688",
        outline: "0.1rem solid #00ff7650",
    };

    const enabledSaveButton = {
        userSelect: "none",
    };

    return (
        dbUserInfo && (
            <MainContainer>
                <FormContainer>
                    <InputContainer
                        name="firstName"
                        style={isDisabled ? disabledInput : enabledInput}
                        readOnly={isDisabled}
                        disabled={isDisabled}
                        value={userInfo.firstName}
                        onChange={handleOnChange}
                    />
                    <InputContainer
                        name="lastName"
                        style={isDisabled ? disabledInput : enabledInput}
                        readOnly={isDisabled}
                        disabled={isDisabled}
                        value={userInfo.lastName}
                        onChange={handleOnChange}
                    />
                    <InputContainer
                        name="email"
                        style={isDisabled ? disabledInput : enabledInput}
                        readOnly={isDisabled}
                        disabled={isDisabled}
                        value={userInfo.email}
                        onChange={handleOnChange}
                    />
                    <InputContainer
                        name="phone"
                        style={isDisabled ? disabledInput : enabledInput}
                        readOnly={isDisabled}
                        disabled={isDisabled}
                        value={userInfo.phone}
                        onChange={handleOnChange}
                    />
                    <EditButton onClick={handleEdit}>
                        {isDisabled ? "Edit" : "Cancel"}
                    </EditButton>
                    <SaveButton
                        style={isDisabled ? disabledSaveButton : enabledSaveButton}
                        onClick={isDisabled ? null : handleSave}
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

const FormContainer = styled.div`
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

const EditButton = styled.button`
    padding: 0.6rem 5rem;
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
