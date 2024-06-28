import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {deleteUserInfoById} from "../../../api/api.js";
import {clearAccessToken} from "../../../redux/userLoginSlice.js";

const AccountSettings = () => {
    const token = useSelector((state) => state.userLoginSlice.accessToken);
    const dispatch = useDispatch();

    function handleDeleteAccount() {
        deleteUserInfoById(token.userId).then((response) => {
            console.log("delete response *******************", response);
            response.type === "success" && dispatch(clearAccessToken());
        });
    }

    return (
        <MainContainer>
            <h1>Account Settings</h1>
            <DeleteButton onClick={handleDeleteAccount}>Delete account</DeleteButton>
        </MainContainer>
    );
};

const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    justify-content: center;
    align-items: center;
    color: white;
    height: 100%;
    width: 100%;
`;

const DeleteButton = styled.button`
    padding: 0.6rem 5rem;
    margin: 1rem;
    background: #ff000015;
    font-size: 0.8rem;
    color: #ff0000;
    border-radius: 0.4rem;
    border: none;
    outline: 0.1rem solid #ff000077;
    font-weight: 700;
    transition: background 123ms ease-in-out;

    &:hover {
        background: #ff000025;
        color: #ff0000;
        cursor: pointer;
        transition: 123ms ease-in-out;
    }
`;

export default AccountSettings;
