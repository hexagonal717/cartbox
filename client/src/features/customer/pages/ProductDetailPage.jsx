import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getProductDetailByParams } from '../../../api/customer/customerApi.js';
import Footer from '../../../components/common/Footer/Footer.jsx';
import { useQuery } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const cartData = useSelector((state) => state.cartSlice.cartInfo);
  const dispatch = useDispatch();

  const {
    status,
    error,
    data: product,
  } = useQuery({
    queryKey: ['productDetail', productId],
    queryFn: () =>
      getProductDetailByParams(productId).then((data) => data.payload[0]),
    enabled: !!productId,
  });

  if (status === 'loading') return <LoadingMessage>Loading...</LoadingMessage>;
  if (status === 'error')
    return <LoadingMessage>{JSON.stringify(error)}</LoadingMessage>;

  if (!product) {
    return <LoadingMessage>Product not found</LoadingMessage>;
  }

  function addToCart() {}

  const findData = cartData.some((li) => {
    return li.id === productId;
  });

  return (
    <>
      <MainContainer>
        <ImageContainer>
          <ProductImage src={product.image} alt={product.name} />
        </ImageContainer>
        <InfoContainer>
          <ProductName>{product.name}</ProductName>
          <ProductDescription>{product.description}</ProductDescription>
          <ProductPrice>${product.price}</ProductPrice>

          <div>
            {findData === true ? (
              <BtnInCart>In Cart</BtnInCart>
            ) : (
              <BtnAddToCart onClick={() => addToCart()}>
                Add to Cart
              </BtnAddToCart>
            )}
          </div>
        </InfoContainer>
      </MainContainer>
      {/*<Footer/>*/}
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

const BtnAddToCart = styled.button`
  border: 0.1rem solid #595959;
  background: #0c0c0c;
  color: #ffffff;
  height: 3rem;
  width: 8rem;
  backdrop-filter: blur(2rem);
  font-size: 1rem;
  font-weight: bold;
  border-radius: 0.5rem;
  box-shadow: 0 0 0.2rem 0 #30303044;

  &:hover {
    transition: 100ms ease-in-out;
    background: #ffc142;
    box-shadow: 0 0 0.6rem 0 #ffc14266;
    color: black;
    cursor: pointer;
  }
`;

const BtnInCart = styled.button`
  border: 0.1rem solid #595959;
  background: #ffc142;
  color: black;
  height: 3rem;
  width: 8rem;
  backdrop-filter: blur(2rem);
  font-size: 1rem;
  font-weight: bold;
  border-radius: 0.5rem;
  box-shadow: 0 0 0.6rem 0 #ffc14266;
`;

export default ProductDetailPage;
