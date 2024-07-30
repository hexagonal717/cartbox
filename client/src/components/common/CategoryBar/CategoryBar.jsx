import styled from 'styled-components';

const CategoryBar = () => {
  return (
    <>
      <MainContainer>
        <ul>
          <li>Electronics</li>
          <li>Grocery</li>
          <li>Fashion</li>
          <li>Mobiles</li>
          <li>Home Appliances</li>
          <li>Books</li>
        </ul>
      </MainContainer>
    </>
  );
};

const MainContainer = styled.div`
  position: absolute;
  top: 3rem;
  width: 100%;
  background-color: #1f1f1f;
  padding: 1.5rem 0;

  ul {
    display: flex;
    justify-content: center;
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      margin: 0 1rem;
      cursor: pointer;
      color: white;
      font-weight: bold;

      &:hover {
        color: #ddd;
      }
    }
  }
`;

export default CategoryBar;
