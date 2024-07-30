import styled from 'styled-components';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <NavLink style={{ textDecoration: 'none' }} to={`/product/${product._id}`}>
      <Card>
        <ImageContainer>
          <Image src={product.image} alt={product.name} />
        </ImageContainer>
        <Content>
          <Title>{product.name}</Title>
          <Price>${product.price}</Price>
          <Description>{product.description}</Description>
        </Content>
      </Card>
    </NavLink>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    category: PropTypes.string.isRequired,
    subCategory: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

const Card = styled.div`
  display: flex;
  border: 0.0625rem solid #e0e0e0;
  border-radius: 0.5rem;
  overflow: hidden;
  width: 100%;
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  cursor: pointer;
  margin: 1rem 0;
  &:hover {
    transform: scale(1.02);
  }
`;

const ImageContainer = styled.div`
  flex: 0 0 12.5rem; /* Set a fixed width for the image container */
  height: 12.5rem; /* Maintain the height of the image container */
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Content = styled.div`
  flex: 1;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled.h2`
  font-size: 1.2rem;
  margin: 0;
  color: #e6e6e6;
`;

const Price = styled.p`
  font-size: 1.2rem;
  color: #40ff6d;
  margin: 0.5rem 0;
`;

const Description = styled.p`
  font-size: 1rem;
  color: #b1b1b1;
`;

export default ProductCard;
