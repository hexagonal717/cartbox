import { AccountCircleOutlined } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const SidePanel = () => {
  return (
    <SidePanelListContainer>
      <Link
        to={'profile'}
        replace
        style={{
          textDecoration: 'none',
        }}
      >
        <SidePanelListItem
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <AccountCircleOutlined
            style={{
              fontSize: '1.2rem',
            }}
          />
          <div
            style={{
              fontSize: '1rem',
            }}
          >
            Profile
          </div>
        </SidePanelListItem>
      </Link>

      <Link
        to={'account'}
        replace
        style={{
          textDecoration: 'none',
        }}
      >
        <SidePanelListItem
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <AccountCircleOutlined
            style={{
              fontSize: '1.2rem',
            }}
          />
          <div
            style={{
              fontSize: '1rem',
            }}
          >
            Account
          </div>
        </SidePanelListItem>
      </Link>
    </SidePanelListContainer>
  );
};

const SidePanelListContainer = styled.ul`
  display: flex;
  background: #0c0c0c;
  outline: 0.1rem solid #505050;
  padding: 0.5rem;
  height: min-content;

  list-style-type: none;
  text-align: center;
`;
const SidePanelListItem = styled.li`
  padding: 0.5rem 1rem;
  color: #a3a3a3;
  border-radius: 0.2rem;
  cursor: pointer;
  gap: 1rem;

  &:hover {
    background: #232323;
    color: #e1e1e1;
  }
`;

export default SidePanel;
