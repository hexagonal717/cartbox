import styled from "styled-components";
import {
  AccountCircleOutlined,
  ArrowBackIosOutlined,
  ExitToAppOutlined,
} from "@mui/icons-material";
import { useState } from "react";

const NavBar = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  return (
    <NavBarContainer>
      <NavBarList>
        <NavBarListItem
          onClick={() => setDropdownVisible(true)}
          onMouseLeave={() => setDropdownVisible(false)}
        >
          <ProfileMenuButton>
            <div style={{ color: "#3b82f6ff" }}>Jacob</div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <AccountCircleOutlined
                style={{
                  fontSize: "1.5rem",
                  color: "#3b82f6ff",
                }}
              />
              <ArrowBackIosOutlined
                style={{
                  marginLeft: "0.5rem",
                  fontSize: "0.8rem",
                  color: "#3b82f6ff",
                  rotate: "270deg",
                }}
              />
            </div>
          </ProfileMenuButton>
          {dropdownVisible && (
            <DropdownMenu>
              <DropdownItem
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "0.8rem",
                }}
              >
                <div>
                  <AccountCircleOutlined
                    style={{
                      fontSize: "1.2rem",
                      color: "white",
                    }}
                  />
                </div>
                <div>Profile</div>
              </DropdownItem>
              <DropdownItem
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "0.8rem",
                }}
              >
                <div>
                  <ExitToAppOutlined
                    style={{
                      fontSize: "1.2rem",
                      color: "white",
                    }}
                  />
                </div>
                <div>Logout</div>
              </DropdownItem>
            </DropdownMenu>
          )}
        </NavBarListItem>
      </NavBarList>
    </NavBarContainer>
  );
};

const NavBarContainer = styled.div`
  display: flex;
  position: fixed;
  justify-self: center;
  inset: 0;
  background-color: #00000044;
  height: max-content;
  width: calc(100%);
  /*margin: 1rem;*/
  padding: 0.6rem;
  z-index: 5;
  justify-content: end;
  align-items: center;
  /*border-radius: 0.5rem;*/
  outline: 0.1rem solid #3a3a3a;
`;

const NavBarList = styled.ul`
  list-style-type: none;
`;

const NavBarListItem = styled.li``;

const ProfileMenuButton = styled.button`
  display: flex;
  gap: 1rem;
  font-weight: 700;
  align-items: center;
  background: #3b82f618;
  border: none;
  padding: 0.3rem 1rem;
  border-radius: 0.4rem;
  outline: 0.1rem solid #3b82f6aa;

  &:hover {
    background: #3b82f626;
    cursor: pointer;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  padding: 0.3rem;
  top: 3rem;
  right: 1rem;
  font-size: 0.8rem;
  font-weight: 700;
  background: black;
  border-radius: 0.4rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
  z-index: 10;
  overflow: clip;
  outline: 0.1rem solid #ffffff22;
`;

const DropdownItem = styled.div`
  padding: 0.5rem 1rem;
  color: #a3a3a3;
  border-radius: 0.2rem;
  cursor: pointer;

  &:hover {
    background: #111111;
    color: #e1e1e1;
  }
`;

export default NavBar;
