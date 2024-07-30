import {useParams} from 'react-router-dom';
import styled from 'styled-components';
import {getProductDetailByParams} from '../../../api/customer/customerApi.js';
import Footer from '../../../components/common/Footer/Footer.jsx';
import {useQuery} from "@tanstack/react-query";

const ProductDetailPage = () => {
    const {productId} = useParams();

    const {
        status,
        error,
        data: product,
    } = useQuery({
        queryKey: ["productDetail", productId],
        queryFn: () =>
            getProductDetailByParams(productId).then((data) => data.payload[0]),
        enabled: !!productId,
    });

    if (status === "loading") return <LoadingMessage>Loading...</LoadingMessage>;
    if (status === "error") return <LoadingMessage>{JSON.stringify(error)}</LoadingMessage>;

    if (!product) {
        return <LoadingMessage>Product not found</LoadingMessage>;
    }


    return (
        <>
            <MainContainer>
                <ImageContainer>
                    <ProductImage src={product.image} alt={product.name}/>
                </ImageContainer>
                <InfoContainer>
                    <ProductName>{product.name}</ProductName>
                    <ProductDescription>{product.description}</ProductDescription>
                    <ProductPrice>${product.price}</ProductPrice>
                </InfoContainer>
            </MainContainer>
            <Footer/>
        </>
    );
};

const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 3rem;
    padding: 2rem;
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

export default ProductDetailPage;
