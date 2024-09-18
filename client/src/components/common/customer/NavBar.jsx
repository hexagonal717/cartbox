import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { getProductList } from '@/api/v1/customer/product/productApi.js';
import SearchBar from '../customer/SearchBar.jsx';
import { Button } from '@/components/ui-custom/button.jsx';
import {
  Moon,
  ShoppingBag,
  LogOut,
  Sun,
  User,
  X,
  ChevronRight,
  ScrollText,
} from 'lucide-react';
import { useDarkMode } from '@/context/DarkModeContext.jsx';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from '@/components/common/customer/ProfileButton.jsx';
import { ClearCart } from '@/features/customer/redux/cart/cartSlice.js';
import { clearAccessToken } from '@/features/customer/redux/customerAuthSlice.js';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui-custom/avatar.jsx';

const NavBar = ({ user }) => {
  const cartItems = useSelector((state) => state.cartSlice.cart?.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionWindow, setSuggestionWindow] = useState(false);
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileModalOpen, setMobileModalOpen] = useState(false);

  // Ref to track modal
  const modalRef = useRef(null);

  useEffect(() => {
    if (searchQuery) {
      getProductList(searchQuery)
        .then((data) => setSuggestions(data.payload))
        .catch((err) => console.error('Error fetching product suggestions:', err));
    } else {
      setSuggestions([]);
    }
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setMobileModalOpen(false);
        setProfileOpen(false);
      }
    };
    if (mobileModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileModalOpen]);

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
    setSuggestionWindow(true);
  };

  const handleSearchSubmit = (event) => {
    if (event.key === 'Enter') {
      setSuggestionWindow(false);
      navigate(`/product-search?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleSuggestionClick = (productId) => {
    setSuggestionWindow(false);
    navigate(`/product/${productId}`);
  };

  const handleBlur = () => {
    setTimeout(() => setSuggestionWindow(false), 500);
  };

  const toggleMobileModal = () => {
    setMobileModalOpen(!mobileModalOpen);
    setProfileOpen(!profileOpen);
  };

  const handleLogout = () => {
    dispatch(clearAccessToken());
    dispatch(ClearCart());
    navigate('/');
  };
  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setMobileModalOpen(false);
        setProfileOpen(false);
      }
    };
    if (mobileModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileModalOpen]);

  return (
    <>
      <div
        className="fixed z-40 h-28 w-full select-none flex-col items-center bg-neutral-50 p-3 px-6
          outline outline-1 outline-neutral-300 backdrop-blur-sm dark:bg-neutral-950
          dark:outline-neutral-800 sm:flex sm:h-16">
        <ul
          className="flex w-full list-none items-center justify-between sm:justify-center sm:gap-1
            md:gap-4">
          <li>
            <Link to={'/'} replace>
              <div className={'text text-lg font-bold dark:text-white'}>CartBox</div>
            </Link>
          </li>
          <li
            className="relative hidden sm:block"
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
                className={`absolute z-50 mt-1 max-h-48 w-full overflow-auto rounded-lg bg-neutral-100
                text-neutral-950 shadow-lg dark:bg-neutral-900 dark:text-white`}>
                {suggestions.map((product) => (
                  <li
                    key={product._id}
                    onClick={() => handleSuggestionClick(product._id)}
                    className={
                      'cursor-pointer px-4 py-2 text-sm hover:bg-neutral-200 dark:hover:bg-neutral-800'
                    }>
                    {product.name}
                  </li>
                ))}
              </ul>
            )}
          </li>

          <li className={'flex items-center justify-center gap-4'}>
            <div className="relative hidden sm:block">
              <ProfileButton userData={user} handleLogout={handleLogout} />
            </div>
          </li>
          <ul className={'flex gap-2'}>
            <Button className={'p-2'} variant={'ghost'}>
              <NavLink to={`/cart`}>
                <div className="relative">
                  <ShoppingBag className="text-neutral-950 hover:cursor-pointer dark:text-neutral-200" />
                  <div
                    className="absolute flex h-4 w-4 -translate-y-8 translate-x-4 items-center justify-center
                      rounded-full bg-yellow-300 text-center text-xs font-semibold text-black">
                    {cartItems?.length ?? 0}
                  </div>
                </div>
              </NavLink>
            </Button>
            <div className="relative sm:hidden">
              <Button
                variant="ghost"
                onClick={toggleMobileModal}
                className="rounded-lg p-2 dark:text-white">
                <Avatar className="h-7 w-7">
                  {user?.image ? (
                    <AvatarImage src={user.image} alt={user.name || 'User avatar'} />
                  ) : (
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  )}
                </Avatar>
              </Button>
            </div>
            <li className="relative">
              <Button
                variant={'outline'}
                onClick={toggleDarkMode}
                className={'rounded-lg p-2'}>
                {darkMode ? (
                  <Moon className={'scale-75'} />
                ) : (
                  <Sun className={'scale-75'} />
                )}
              </Button>
            </li>
          </ul>
        </ul>
        <ul>
          <li
            className="relative mt-2.5 flex sm:hidden"
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
                className={`absolute z-50 mt-11 max-h-48 w-full overflow-auto rounded-lg bg-neutral-100
                text-neutral-950 shadow-lg dark:bg-neutral-900 dark:text-white`}>
                {suggestions.map((product) => (
                  <li
                    key={product._id}
                    onClick={() => handleSuggestionClick(product._id)}
                    className={
                      'cursor-pointer px-4 py-2 text-sm hover:bg-neutral-200 dark:hover:bg-neutral-800'
                    }>
                    {product.name}
                  </li>
                ))}
              </ul>
            )}
          </li>
        </ul>
      </div>

      {mobileModalOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 backdrop-blur-sm"
          onClick={toggleMobileModal}></div>
      )}

      {mobileModalOpen && (
        <div
          ref={modalRef}
          className="fixed bottom-0 left-0 right-0 z-50 transform rounded-t-2xl bg-neutral-100 px-6 pb-10
            pt-8 shadow-lg transition-transform duration-300 ease-in-out dark:bg-neutral-900">
          <Button
            variant={'ghost'}
            onClick={toggleMobileModal}
            className="absolute right-2 top-2 scale-90 rounded-full p-2 dark:text-white">
            <X className="h-6 w-6" />
          </Button>
          <div className="mt-8 flex flex-col space-y-4">
            <Button onClick={() => navigate('/login')} className="w-full">
              Log In
            </Button>
            <Button
              variant={'outline'}
              onClick={() => navigate('/signup')}
              className="w-full">
              Sign Up
            </Button>
          </div>
        </div>
      )}

      {mobileModalOpen ? (
        <div
          ref={modalRef}
          className="fixed bottom-0 left-0 right-0 z-50 transform rounded-t-2xl bg-neutral-100 px-2 pb-10
            pt-8 shadow-lg transition-transform duration-300 ease-in-out dark:bg-neutral-900">
          <Button
            variant="ghost"
            onClick={toggleMobileModal}
            className="absolute right-2 top-2 scale-90 rounded-full p-2 dark:text-white">
            <X className="h-6 w-6" />
          </Button>

          <div className="mb-10 flex flex-col items-center">
            <Avatar className="h-16 w-16">
              {user?.image ? (
                <AvatarImage
                  src={user.image}
                  alt={user.firstName || 'User avatar'}
                />
              ) : (
                <AvatarFallback>
                  <User className="h-8 w-8" />
                </AvatarFallback>
              )}
            </Avatar>
            <h2 className="text-lg font-semibold">
              {`${user?.firstName} ${user?.lastName}` || 'Welcome'}
            </h2>
          </div>

          <nav>
            <ul className="space-y-1">
              <li>
                <Button
                  variant="ghost"
                  className="w-full justify-between text-left hover:bg-neutral-200 dark:hover:bg-neutral-800"
                  onClick={() => navigate('/settings/profile')}>
                  <div className={'flex items-center justify-center'}>
                    <User className="mr-2 h-4 w-4" />
                    <div>Profile</div>
                  </div>

                  <ChevronRight/>
                </Button>
              </li>
              <li>
                <Button
                  variant="ghost"
                  className="w-full justify-between text-left hover:bg-neutral-200 dark:hover:bg-neutral-800"
                  onClick={() => navigate('/orders')}>
                  <div
                    className={'flex items-center justify-center'}>
                    <ScrollText
                      className="mr-2 h-4 w-4" />
                    <div>Orders</div>
                  </div>

                  <ChevronRight />
                </Button>
              </li>
              <li>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-left text-red-500 hover:bg-neutral-200 hover:text-red-600
                    dark:text-red-400 dark:hover:bg-neutral-800 dark:hover:text-red-300"
                  onClick={handleLogout}>
                  <LogOut
                    className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </li>
            </ul>
          </nav>
        </div>
      ) : null}
    </>
  );
};
export default NavBar;
