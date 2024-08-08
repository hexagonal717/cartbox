import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const SettingsPage = () => {
  return (
    <MainContainer>
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
