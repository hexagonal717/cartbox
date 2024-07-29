// src/components/common/SkeletonProductCard/SkeletonProductCard.jsx
import styled from "styled-components";

const SkeletonProductCard = () => {
    return (
        <Card>
            <Image />
            <Content>
                <Title />
                <Price />
                <Description />
            </Content>
        </Card>
    );
};

const Card = styled.div`
    border: 0.0625rem solid #e0e0e0;
    border-radius: 0.5rem;
    overflow: hidden;
    width: 100%;
    height: 18rem; /* Adjust as needed */
    background-color: #f0f0f0;
    box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
`;

const Image = styled.div`
    width: 100%;
    height: 12.5rem;
    background-color: #e0e0e0;
`;

const Content = styled.div`
    padding: 1rem;
`;

const Title = styled.div`
    width: 60%;
    height: 1.5rem;
    background-color: #e0e0e0;
    margin-bottom: 0.5rem;
`;

const Price = styled.div`
    width: 40%;
    height: 1.2rem;
    background-color: #e0e0e0;
    margin-bottom: 0.5rem;
`;

const Description = styled.div`
    width: 80%;
    height: 1rem;
    background-color: #e0e0e0;
`;

export default SkeletonProductCard;
