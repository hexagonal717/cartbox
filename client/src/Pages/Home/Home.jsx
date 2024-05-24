import styled from "styled-components";
import {Link} from "react-router-dom";
import {allUserInfo} from "../../api.js";
import {useState} from "react";

const MainContainer = styled.div`
    display: flex;
    position: fixed;
    gap: 1rem;
`;

const Home = () => {


    const [showAllUser, setShowAllUser] = useState(null);


    function handleAllUserInfo() {

        allUserInfo().then(data => {
            setShowAllUser(data)
        });

    }

    return (
        <MainContainer>
            <div>Home</div>
            <Link to={"/signup"}>
                <button>Sign up Page</button>
            </Link>
            <Link to={"/login"}>
                <button>Log In Page</button>
            </Link>
            <button onClick={handleAllUserInfo}>Show all user</button>
            {showAllUser && showAllUser.map((user) => (<>

                <h2 key={user._id}>{user.firstName} {user.lastName}</h2>

            </>))}
        </MainContainer>
    );
};

export default Home;
