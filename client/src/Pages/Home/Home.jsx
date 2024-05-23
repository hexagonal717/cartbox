import styled from "styled-components";
import { Link } from "react-router-dom";

const MainContainer = styled.div`
  display: flex;
  position: fixed;
  gap: 1rem;
`;

const Home = () => {
  return (
    <MainContainer>
      <div>Home</div>
      <Link to={"/signup"}>
        <button>Sign up Page</button>
      </Link>
      <Link to={"/login"}>
        <button>Log In Page</button>
      </Link>
    </MainContainer>
  );
};

export default Home;
