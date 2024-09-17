import { useQueries } from '@tanstack/react-query';
import { getCart, getProductList } from '@/api/v1/customer/customerApi.js';
import CategoryBar from '../../../components/common/customer/CategoryBar.jsx';
import ProductCard from '../../../components/common/customer/ProductCard.jsx';
import { useSelector } from 'react-redux';
import { Separator } from '@/components/ui-custom/separator.jsx';
import { NavLink } from 'react-router-dom';
import { Button } from '@/components/ui-custom/button.jsx';
import { Input } from '@/components/ui-custom/input.jsx';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui-custom/card.jsx';
import HomePageCarousel
  from '@/components/common/customer/HomePageCarousel.jsx';
const HomePage = () => {
  const customerId = useSelector(
    (state) => state.customerAuthSlice.accessToken?.customerId,
  );

  const paymentIcons = {
    mastercard: {
      src: 'https://raw.githubusercontent.com/webkadabra/payment-methods-svg-pack/main/src/assets/mastercard.svg',
      alt: 'Mastercard icon',
    },
    visa: {
      src: 'https://raw.githubusercontent.com/webkadabra/payment-methods-svg-pack/main/src/assets/visa.svg',
      alt: 'Visa icon',
    },
    paypal: {
      src: 'https://raw.githubusercontent.com/webkadabra/payment-methods-svg-pack/main/src/assets/paypal.svg',
      alt: 'PayPal icon',
    },
    googlePay: {
      src: 'https://raw.githubusercontent.com/webkadabra/payment-methods-svg-pack/main/src/assets/googlepay.svg',
      alt: 'Google Pay icon',
    },
    applePay: {
      src: 'https://raw.githubusercontent.com/webkadabra/payment-methods-svg-pack/main/src/assets/applepay.svg',
      alt: 'Apple Pay icon',
    },
  };

  // Run multiple queries in parallel
  const queries = useQueries({
    queries: [
      {
        queryKey: ['homePageProductList'],
        queryFn: () => getProductList().then((data) => data.payload),
      },
      {
        queryKey: ['homePageCart', customerId],
        queryFn: () => getCart(customerId).then((data) => data.payload.cart),
        enabled: !!customerId,
      },
    ],
  });

  const [productQuery, cartQuery] = queries;

  if (productQuery.isLoading || cartQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (productQuery.error || cartQuery.error) {
    return (
      <div>
        Error loading data: {productQuery.error?.message || cartQuery.error?.message}
      </div>
    );
  }

  const productList = productQuery.data;
  const cartList = cartQuery.data;

  return (
    <div>
      <div
        className="flex w-full flex-col items-center pt-[7rem] dark:bg-neutral-900 sm:pt-[10rem]
          lg:py-[8rem]">
        <div className="block">
          <HomePageCarousel/>
        </div>
        <CategoryBar />
        <div
          className="grid w-full max-w-screen-2xl grid-flow-row-dense grid-cols-2 gap-1 px-2
            sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 lg:gap-3 lg:p-10 xl:grid-cols-6">
          {productList && productList.length > 0 ? (
            productList.map((product) => (
              <ProductCard key={product._id} product={product} cart={cartList} />
            ))
          ) : (
            <h1 className="col-span-full text-center">No products available</h1>
          )}
        </div>
      </div>

      <footer className="w-full border-t border-t-neutral-800 bg-white dark:bg-neutral-950">
        <div className="w-full px-4 py-8 md:px-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            {/* About Us Section */}
            <Card className={'border-0'}>
              <CardHeader>
                <CardTitle>About Us</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  CartBox is your one-stop shop for sleek and modern products. We
                  offer a curated selection of the best gadgets, apparel, and more.
                </p>
              </CardContent>
            </Card>

            {/* Quick Links Section */}
            <Card className={'border-0'}>
              <CardHeader>
                <CardTitle>Quick Links</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  {[
                    'Home',
                    'Products',
                    'About',
                    'Contact',
                    'FAQs',
                    'Privacy Policy',
                    'Terms & Conditions',
                  ].map((link) => (
                    <li key={link}>
                      <NavLink
                        to={'#'}
                        className="text-muted-foreground hover:text-foreground">
                        {link}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Contact Us Section */}
            <Card className={'border-0'}>
              <CardHeader>
                <CardTitle>Contact Us</CardTitle>
              </CardHeader>
              <CardContent>
                <address className="text-muted-foreground text-sm not-italic">
                  <p>123 Cart Street, Neon City, 12345</p>
                  <p>Email: info@cartbox.com</p>
                  <p>Phone: (123) 456-7890</p>
                </address>
                <Separator className="my-4" />
                <CardTitle className="mb-2">Follow Us</CardTitle>
                <div className="grid">
                  {['Facebook', 'Twitter', 'Instagram', 'LinkedIn'].map((social) => (
                    <NavLink
                      key={social}
                      to={'#'}
                      className="text-muted-foreground hover:text-foreground">
                      <div>{social}</div>
                    </NavLink>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Newsletter Subscription Section */}
            <Card className={'border-0'}>
              <CardHeader>
                <CardTitle>Subscribe to Our Newsletter</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 text-sm">
                  Stay updated with our latest offers, products, and more. Sign up
                  for our newsletter.
                </p>
                <form className="flex flex-col space-y-2">
                  <Input type="email" placeholder="Your email address" />
                  <Button variant="secondary" className="w-full">
                    Subscribe
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <Separator className="my-8" />

          <div className="flex flex-col items-center justify-between md:flex-row">
            <p className="text-muted-foreground mb-4 text-center text-sm md:mb-0">
              &copy; 2024 CartBox. All rights reserved.
            </p>
            <div className="flex space-x-4">
              {Object.entries(paymentIcons).map(([key, { src, alt }]) => (
                <div key={key} className="drop-shadow-md text-center">
                  <img src={src} alt={alt} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
