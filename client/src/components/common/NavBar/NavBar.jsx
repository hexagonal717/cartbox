import styled from "styled-components";
import {
    AccountCircleOutlined,
    ArrowBackIosOutlined,
    ExitToAppOutlined, ListAltOutlined,
} from "@mui/icons-material";
import {useState} from "react";
import {clearAccessToken} from "../../../features/customer/redux/customerAuthSlice.js";
import {useDispatch, useSelector} from "react-redux";
import {getCustomerInfoByParams} from "../../../api/customer/customerApi.js";
import {NavLink, useNavigate} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";


const NavBar = () => {
    const token = useSelector((state) => state.customerAuthSlice.accessToken);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [dropdownVisible, setDropdownVisible] = useState(false);

    function handleLogout() {
        dispatch(clearAccessToken());
        navigate("/");
    }

    const {
        status,
        error,
        data: userData,
    } = useQuery({
        queryKey: ["customerData", token?.customerId],
        queryFn: () =>
            getCustomerInfoByParams(token.customerId).then((data) => {
                console.log("last checking", data);
                return data;
            }),
        enabled: !!token, // Only run the query if the token is present
    });

    if (status === "loading") return <h1>Loading...</h1>;
    if (status === "error") return <h1>{JSON.stringify(error)}</h1>;

    return (
        <NavBarContainer>
            <NavBarList>
                {token ? (
                    <NavBarListItem onClick={() => setDropdownVisible(!dropdownVisible)}>
                        <ProfileMenuButton>
                            <div style={{color: "#3b82f6dd"}}>
                                {userData?.firstName || "Profile"}
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
                                        <div>My Profile</div>
                                    </DropdownItem>
                                </NavLink>
                                <NavLink
                                    style={{textDecoration: "none"}}
                                    to={`/settings/profile`}
                                >
                                    <DropdownItem
                                        style={{
                                            display: "flex",
                                            gap: "0.8rem",
                                        }}
                                    >
                                        <div>
                                            <ListAltOutlined
                                                style={{
                                                    fontSize: "1.2rem",
                                                    color: "white",
                                                }}
                                            />
                                        </div>
                                        <div>Orders</div>
                                    </DropdownItem>
                                </NavLink>
                                <DropdownItem
                                    onClick={handleLogout}
                                    style={{
                                        display: "flex",

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
                ) : (
                    <NavBarListItem>
                        <SignInButton onClick={() => navigate("/login")}>
                            Log In
                        </SignInButton>
                    </NavBarListItem>
                )}
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
    padding: 0.6rem;
    z-index: 5;
    justify-content: end;
    align-items: center;
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

const SignInButton = styled.button`
    display: flex;
    align-items: center;
    font-weight: 700;
    background: #3b82f618;
    border: none;
    padding: 0.3rem 1rem;
    border-radius: 0.4rem;
    outline: 0.1rem solid #3b82f658;
    color: #3b82f6dd;

    &:hover {
        background: #3b82f626;
        cursor: pointer;
    }
`;

export default NavBar;
