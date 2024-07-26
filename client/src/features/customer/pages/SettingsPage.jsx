import {Outlet} from "react-router-dom";
import styled from "styled-components";
import SidePanel from "../../../components/common/SidePanel/SidePanel.jsx";

const SettingsPage = () => {
    return (
        <MainContainer>
            <SidePanel/>
            <Outlet/>
        </MainContainer>
    );
};

const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
`;

export default SettingsPage;
