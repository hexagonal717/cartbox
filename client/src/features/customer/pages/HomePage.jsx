import styled from "styled-components";

const HomePage = () => {
  return (
    <>
      <MainContainer>
        <h1>Home</h1>
      </MainContainer>
    </>
  );
};

const MainContainer = styled.div`
  display: flex;
  font-size: 4rem;
  justify-content: center;
  align-items: center;
  color: white;
  height: 100vh;
  position: relative;
`;

export default HomePage;
