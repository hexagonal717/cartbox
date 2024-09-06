import { ShoppingBagOutlined } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { clearAccessToken } from '../../../features/customer/redux/customerAuthSlice.js';
import ProfileButton from './ProfileButton.jsx';
import { useEffect, useState } from 'react';
import { getProductList } from '../../../api/v1/customer/customerApi.js';
import SearchBar from './SearchBar.jsx';
const NavBar = ({ user, cart }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionWindow, setSuggestionWindow] = useState(false);

  const handleLogout = () => {
    dispatch(clearAccessToken());
    navigate('/');
  };

  useEffect(() => {
    if (searchQuery) {
      getProductList(searchQuery)
        .then((data) => setSuggestions(data.payload))
        .catch((err) => console.error('Error fetching product suggestions:', err));
    } else {
      setSuggestions([]);
    }
  }, [searchQuery]);

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
    setSuggestionWindow(true); // Show suggestions when typing
  };

  const handleSearchSubmit = (event) => {
    if (event.key === 'Enter') {
      setSuggestionWindow(false); // Hide suggestions when search is submitted
      navigate(`/product-search?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleSuggestionClick = (productId) => {
    setSuggestionWindow(false); // Hide suggestions when a suggestion is clicked
    navigate(`/product/${productId}`);
  };

  const handleBlur = () => {
    setTimeout(() => setSuggestionWindow(false), 500);
  };

  return (
    <div
      className="h-max-content fixed z-40 flex h-16 w-full select-none items-center bg-neutral-950
        px-6 outline outline-1 outline-neutral-800 backdrop-blur-sm">
      <ul className="flex w-full list-none items-center justify-center gap-4">
        <li>
          <Link to={'/'} replace>
            <div className={'text-lg font-bold'}>CartBox</div>
          </Link>
        </li>
        <li
          className="relative"
          onBlur={(event) => {
            handleBlur(event);
          }}>
          <SearchBar
            searchQuery={searchQuery}
            handleSearchQueryChange={handleSearchQueryChange}
            handleSearchSubmit={handleSearchSubmit}
            setSuggestionWindow={setSuggestionWindow}
          />
          {suggestions.length > 0 && suggestionWindow && (
            <ul
              className={`absolute z-50 mt-1 max-h-48 w-full overflow-auto rounded-lg bg-neutral-900 text-white
              shadow-lg`}>
              {suggestions.map((product) => (
                <li
                  key={product._id}
                  onClick={() => handleSuggestionClick(product._id)}
                  className={'cursor-pointer px-4 py-2 hover:bg-neutral-800'}>
                  {product.name}
                </li>
              ))}
            </ul>
          )}
        </li>
        <li className="relative">
          <ProfileButton userData={user} handleLogout={handleLogout} />
        </li>
        <li>
          <NavLink to={`/cart`}>
            <div className="relative">
              <ShoppingBagOutlined className="text-neutral-200 hover:cursor-pointer" />
              <div
                className="absolute flex h-4 w-4 -translate-y-8 translate-x-4 items-center justify-center
                  rounded-full bg-yellow-300 text-center text-xs font-semibold text-black">
                {cart?.length ?? 0}
              </div>
            </div>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
