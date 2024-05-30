import styled from "styled-components";
import { getAllUserInfo } from "../../api.js";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { removeAccessToken } from "../../redux/loginSlice.js";
import NavBar from "../../components/NavBar/NavBar.jsx";

const MainContainer = styled.div`
  display: flex;
  padding: 15rem;
  position: relative;
  gap: 1rem;
`;

const HomePage = () => {
  const dispatch = useDispatch();

  const [showAllUser, setShowAllUser] = useState(null);

  function handleGetAllUserInfo() {
    getAllUserInfo().then((data) => {
      setShowAllUser(data);
    });
  }

  function handleLogout() {
    dispatch(removeAccessToken());
  }

  return (
    <>
      <NavBar />
      <MainContainer>
        <div>Home</div>

        <button onClick={handleGetAllUserInfo}>Show all user</button>
        <button onClick={handleLogout}>Log Out</button>

        {showAllUser &&
          showAllUser.map((user) => (
            <>
              <h2 key={user._id}>
                {user.firstName} {user.lastName}
              </h2>
            </>
          ))}
      </MainContainer>
    </>
  );
};

export default HomePage;
