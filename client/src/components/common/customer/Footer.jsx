import styled from 'styled-components';

const Footer = () => {
  return (
    <FooterContainer>
      <p>&copy; 2024 eCommerce. All rights reserved.</p>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  text-align: center;
  padding: 1rem;
  background-color: #333;
  color: white;
  position: absolute;
  bottom: 0;
  width: 100%;
`;

export default Footer;
