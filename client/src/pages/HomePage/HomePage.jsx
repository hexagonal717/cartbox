import styled from "styled-components";
import { allUserInfo } from "../../api.js";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { removeAccessToken } from "../../Redux/loginSlice.js";

const MainContainer = styled.div`
  display: flex;
  position: fixed;
  gap: 1rem;
`;

const HomePage = () => {
  const dispatch = useDispatch();

  const [showAllUser, setShowAllUser] = useState(null);

  function handleAllUserInfo() {
    allUserInfo().then((data) => {
      setShowAllUser(data);
    });
  }

  function handleLogout() {
    dispatch(removeAccessToken());
  }

  return (
    <MainContainer>
      <div>Home</div>

      <button onClick={handleAllUserInfo}>Show all user</button>
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
  );
};

export default HomePage;
