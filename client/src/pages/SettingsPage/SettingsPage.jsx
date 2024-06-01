import { Outlet } from "react-router-dom";
import SidePanel from "../../components/SidePanel/SidePanel.jsx";
import styled from "styled-components";

const SettingsPage = () => {
  return (
    <MainContainer>
      <SidePanel />
      <Outlet />
    </MainContainer>
  );
};

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

export default SettingsPage;
