# CartBox

## Description

CartBox is a full-stack e-commerce website built with React for the frontend and Express for the backend. It includes features such as product listings, user authentication, shopping cart functionality, and more. The website is designed to provide a seamless shopping experience for users.

## Features

- **Product Listings:** Browse through a variety of products with detailed descriptions and images.
- **User Authentication:** Secure user login and registration.
- **Shopping Cart:** Add, remove, and update products in your shopping cart.
- **Checkout:** Complete your purchase with a streamlined checkout process.
- **Responsive Design:** Optimized for both desktop and mobile devices.

## Technologies Used

### Frontend

- **React**
- **React DOM**
- **React Router DOM**
- **Redux Toolkit**
- **React Redux**
- **Redux Persist**
- **Axios**
- **Emotion React**
- **Emotion Styled**
- **MUI (Material UI)**
- **Styled Components**
- **Tanstack React Query**
- **Million**
- **Vite**

### Backend

- **Express**
- **Mongoose**
- **Cors**
- **Dotenv**
- **Argon2**
- **Cloudinary**
- **Jsonwebtoken**
- **Multer**
- **Nodemailer**
- **Nodemon**

## Installation

### Frontend

1. **Clone the repository:**
    ```bash
    git clone https://github.com/hexagonal717/cartbox.git
    cd cartbox
    ```
2. **Navigate to the client directory**
    ```bash
    cd client
    ```  

3. **Install dependencies:**
    ```bash
    npm install
    ```

4. **Start the development server:**
    ```bash
    npm run dev
    ```

   The application will be available at `http://localhost:3000`.

### Backend

1. **Navigate to the server directory:**
    ```bash
    cd server
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Start the server:**
    ```bash
    npm start
    ```

   The server will be running on `http://localhost:3000`.

## Usage

1. **Browse Products:** Navigate through the available products on the homepage.
2. **Product Details:** Click on a product to view its details.
3. **Add to Cart:** Add desired products to your shopping cart.
4. **Checkout:** Proceed to checkout to complete your purchase.

## Project Structure

### Frontend

- client/
    - .env.local
    - components.json
    - index.html
    - jsconfig.json
    - netlify.toml
    - public/
        - vite.svg
    - src/
        - api/
            - v1/
                - admin/
                    - adminApi.js
                    - adminAxios.js
                - customer/
                    - auth/
                        - authApi.js
                    - cart/
                        - cartActions.js
                        - cartApi.js
                    - customerAxios.js
                    - order/
                        - orderApi.js
                    - product/
                        - productApi.js
                    - profile/
                        - profileApi.js
                - superAdmin/
                    - superAdminApi.js
                    - superAdminAxios.js
        - App.jsx
        - assets/
            - payment/
                - affirm.svg
                - alipay.svg
                - amazon.svg
                - amex.svg
                - applepay.svg
                - bancontact.svg
                - bitcoin.svg
                - bitcoincash.svg
                - bitpay.svg
                - discover.svg
                - etherium.svg
                - facebookpay.svg
                - facepay.svg
                - forbrugsforeningen.svg
                - googlepay.svg
                - jcb.svg
                - lightcoin.svg
                - liqpay.svg
                - maestro.svg
                - mastercard.svg
                - monobank.svg
                - payoneer.svg
                - paypal.svg
                - paysafe.svg
                - privatpay.svg
                - qiwi.svg
                - sepa.svg
                - shoppay.svg
                - skrill.svg
                - stripe.svg
                - unionpay.svg
                - venmo.svg
                - visa.svg
                - webmoney.svg
                - wechat.svg
            - react.svg
        - components/
            - common/
                - admin/
                    - AdminNavBar.jsx
                    - AdminProfileButton.jsx
                    - DashboardSidePanel.jsx
                    - SettingsSidePanel.jsx
                - customer/
                    - AddAddressModal.jsx
                    - CartEmpty.jsx
                    - CartItemCard.jsx
                    - CategoryBar.jsx
                    - EditAddressModal.jsx
                    - Footer.jsx
                    - HomePageCarousel.jsx
                    - LoadingPage.jsx
                    - MarginTop.jsx
                    - NavBar.jsx
                    - OrderEmpty.jsx
                    - ProductCard.jsx
                    - ProfileButton.jsx
                    - SearchBar.jsx
                    - SettingsSidePanel.jsx
                - guest/
                    - GuestNavBar.jsx
                - superAdmin/
                    - DashboardSidePanel.jsx
                    - SettingsSidePanel.jsx
                    - SuperAdminNavBar.jsx
                    - SuperAdminProfileButton.jsx
            - layouts/
                - AdminLayout.jsx
                - CustomerLayout.jsx
                - GuestLayout.jsx
                - SuperAdminLayout.jsx
            - ui/
                - alert.jsx
                - avatar.jsx
                - button.jsx
                - card.jsx
                - carousel.jsx
                - checkbox.jsx
                - dialog.jsx
                - dropdown-menu.jsx
                - input-otp.jsx
                - input.jsx
                - label.jsx
                - progress.jsx
                - scroll-area.jsx
                - select.jsx
                - separator.jsx
                - table.jsx
                - toast.jsx
                - toaster.jsx
            - ui-custom/
                - admin/
                    - button.jsx
                    - dropdown-menu.jsx
                - alert.jsx
                - avatar.jsx
                - button.jsx
                - card.jsx
                - carousel.jsx
                - checkbox.jsx
                - customer/
                    - button.jsx
                    - Cara.jsx
                - dialog.jsx
                - dropdown-menu.jsx
                - input-otp.jsx
                - input.jsx
                - label.jsx
                - progress.jsx
                - scroll-area.jsx
                - select.jsx
                - separator.jsx
                - super-admin/
                    - button.jsx
                    - dropdown-menu.jsx
                    - SuperAdminProfileButton.jsx
                - table.jsx
        - context/
            - DarkModeContext.jsx
            - themeSlice.js
        - features/
            - admin/
                - pages/
                    - AdminAccountSettings.jsx
                    - AdminHomePage.jsx
                    - AdminLogInPage.jsx
                    - AdminProfilePage.jsx
                    - AdminSettingsPage.jsx
                    - AdminSignUpPage.jsx
                    - OldProductManagement.jsx
                    - OverviewPage.jsx
                    - ProductManagementPage.jsx
                - redux/
                    - adminAuthSlice.js
                    - adminOtpSlice.js
                    - adminProfileSlice.js
            - customer/
                - pages/
                    - AccountSettings.jsx
                    - AddressPage.jsx
                    - CartPage.jsx
                    - CategoryPage.jsx
                    - ChangePasswordPage.jsx
                    - ChangePasswordSuccessRedirect.jsx
                    - DemoPage.jsx
                    - ForgotPasswordPage.jsx
                    - GuestRedirectModal.jsx
                    - HomePage.jsx
                    - LogInPage.jsx
                    - OrderDetailPage.jsx
                    - OrdersPage.jsx
                    - OrderSuccessPage.jsx
                    - PaymentPage.jsx
                    - ProductDetailPage.jsx
                    - ProfilePage.jsx
                    - SearchResultPage.jsx
                    - SettingsPage.jsx
                    - SignUpPage.jsx
                    - SkeletonProductCard.jsx
                    - VerifyOtpPage.jsx
                - redux/
                    - auth/
                    - cart/
                        - cartSlice.js
                        - cartTypes.js
                        - guestCartSlice.js
                    - customerAuthSlice.js
                    - customerOtpSlice.js
                    - customerProfileSlice.js
                    - otp/
                    - product/
                    - profile/
            - superAdmin/
                - pages/
                    - ClientManagementPage.jsx
                    - ProductManagementPage.jsx
                    - SuperAdminAccountSettings.jsx
                    - SuperAdminHomePage.jsx
                    - SuperAdminLogInPage.jsx
                    - SuperAdminOverviewPage.jsx
                    - SuperAdminProfilePage.jsx
                    - SuperAdminSettingsPage.jsx
                - redux/
                    - superAdminAuthSlice.js
                    - superAdminOtpSlice.js
                    - superAdminProfileSlice.js
        - hooks/
            - use-toast.js
        - index.css
        - lib/
            - utils.js
        - main.jsx
        - redux/
            - store.js
        - routes/
            - GuestRoutes.jsx
            - ProtectedAdminRoutes.jsx
            - ProtectedCustomerRoutes.jsx
            - ProtectedRedirectedRoutes.jsx
            - ProtectedRoutes.jsx
            - ProtectedSuperAdminRoutes.jsx


### Backend

- server/
    - .env.local
    - controllers/
        - admin/
            - adminAuthController.js
            - adminProductController.js
            - adminProfileController.js
        - customer/
            - customerAuthController.js
            - customerCartController.js
            - customerOrderController.js
            - customerProductController.js
            - customerProfileController.js
        - superAdmin/
            - superAdminAuthController.js
            - superAdminClientController.js
            - superAdminEmployeeController.js
            - superAdminProductController.js
            - superAdminProfileController.js
    - index.js
    - middleware/
        - admin/
            - adminAuthMiddleware.js
        - customer/
            - customerAuthMiddleware.js
        - superAdmin/
            - superAdminAuthMiddleware.js
    - model/
        - adminSchema.js
        - cartSchema.js
        - customerSchema.js
        - orderSchema.js
        - otpSchema.js
        - paymentSchema.js
        - productSchema.js
        - superAdminSchema.js
    - router/
        - v1/
            - admin/
                - adminAuthRouter.js
                - adminProductRouter.js
                - adminProfileRouter.js
            - customer/
                - customerAuthRouter.js
                - customerCartRouter.js
                - customerOrderRouter.js
                - customerProductRouter.js
                - customerProfileRouter.js
            - superAdmin/
                - superAdminAuthRouter.js
                - superAdminClientRouter.js
                - superAdminProductRouter.js
                - superAdminProfileRouter.js

## Data Flow Diagram

### Level 0
![Data Flow Diagram](/dfd/level0-cartbox.drawio.svg)

### Level 1 - Super Admin
![Data Flow Diagram](/dfd/level1-superadmin.drawio.svg)

### Level 1 - Admin
![Data Flow Diagram](/dfd/level1-admin.drawio.svg)

### Level 1 - Customer
![Data Flow Diagram](/dfd/level1-customer.drawio.svg)

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature-name`.
3. Make your changes and commit them: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature/your-feature-name`.
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any inquiries, please contact [Calvin Paiva](mailto:calvinpaivaa@gmail.com).

