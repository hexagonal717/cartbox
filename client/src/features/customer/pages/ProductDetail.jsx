import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getProductDetailByParams } from '../../../api/customer/customerApi.js';
import Footer from '../../../components/common/Footer/Footer.jsx';

const ProductDetail = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        getProductDetailByParams(productId).then((data) => {
            setProduct(data.payload);
        });
    }, [productId]);

    if (!product) {
        return <LoadingMessage>Loading...</LoadingMessage>;
    }

    return (
        <>
            <MainContainer>
                <ImageContainer>
                    <ProductImage src={product.image} alt={product.name} />
                </ImageContainer>
                <InfoContainer>
                    <ProductName>{product.name}</ProductName>
                    <ProductDescription>{product.description}</ProductDescription>
                    <ProductPrice>${product.price.toFixed(2)}</ProductPrice>
                </InfoContainer>
            </MainContainer>
            <Footer />
        </>
    );
};

const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    min-height: 100vh;
`;

const ImageContainer = styled.div`
    width: 100%;
    max-width: 500px;
`;

const ProductImage = styled.img`
    width: 100%;
    height: auto;
`;

const InfoContainer = styled.div`
    width: 100%;
    max-width: 500px;
    margin-top: 2rem;
    text-align: center;
`;

const ProductName = styled.h1`
    font-size: 2rem;
    margin-bottom: 1rem;
`;

const ProductDescription = styled.p`
    font-size: 1.2rem;
    margin-bottom: 1rem;
`;

const ProductPrice = styled.p`
    font-size: 1.5rem;
    font-weight: bold;
`;

const LoadingMessage = styled.p`
    font-size: 1.5rem;
    text-align: center;
`;

export default ProductDetail;
