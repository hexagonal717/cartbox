import styled from "styled-components";
import {AccountCircleOutlined, ArrowBackIosOutlined, ExitToAppOutlined, SettingsOutlined,} from "@mui/icons-material";
import {useState} from "react";
import {clearAccessToken} from "../../../features/customer/redux/customerAuthSlice.js";
import {useDispatch, useSelector} from "react-redux";
import {getCustomerInfoByParams} from "../../../api/customer/customerApi.js";
import {NavLink} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";

const NavBar = () => {
    const token = useSelector((state) => state.customerAuthSlice.accessToken);
    const dispatch = useDispatch();
    const [dropdownVisible, setDropdownVisible] = useState(false);
    console.log("55555555555555", token.customerId);

    function handleLogout() {
        dispatch(clearAccessToken());
    }

    const {
        status,
        error,
        data: userData,
    } = useQuery({
        queryKey: ["customerData", token.customerId],
        queryFn: () =>
            getCustomerInfoByParams(token.customerId).then((data) => {
                console.log("last checking", data);
                return data;
            }),

    });

    if (status === "loading") return <h1>Loading...</h1>;
    if (status === "error") return <h1>{JSON.stringify(error)}</h1>;
    console.log("okokok", userData);
    return (
        <NavBarContainer>
            <NavBarList>
                <NavBarListItem onClick={() => setDropdownVisible(!dropdownVisible)}>
                    <ProfileMenuButton>
                        <div style={{color: "#3b82f6dd"}}>
                            {userData?.firstName ?? "..."}
                        </div>
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
                                    color: "#3b82f6dd",
                                }}
                            />
                            <ArrowBackIosOutlined
                                style={{
                                    marginLeft: "0.5rem",
                                    fontSize: "0.8rem",
                                    color: "#3b82f6dd",
                                    rotate: "270deg",
                                }}
                            />
                        </div>
                    </ProfileMenuButton>
                    {dropdownVisible && (
                        <DropdownMenu>
                            <NavLink
                                style={{textDecoration: "none"}}
                                to={`/settings/profile`}
                            >
                                <DropdownItem
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-evenly",
                                        alignItems: "center",
                                        gap: "0.8rem",
                                    }}
                                >
                                    <div>
                                        <SettingsOutlined
                                            style={{
                                                fontSize: "1.2rem",
                                                color: "white",
                                            }}
                                        />
                                    </div>
                                    <div>Settings</div>
                                </DropdownItem>
                            </NavLink>
                            <DropdownItem
                                onClick={handleLogout}
                                style={{
                                    display: "flex",
                                    justifyContent: "space-evenly",
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
    backdrop-filter: blur(1rem);
    height: max-content;
    width: calc(100%);
    /*margin: 1rem;*/
    padding: 0.6rem;
    z-index: 5;
    justify-content: end;
    align-items: center;
    /*border-radius: 0.5rem;*/
    outline: 0.1rem solid #3a3a3a;
    user-select: none;
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
    outline: 0.1rem solid #3b82f658;

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
