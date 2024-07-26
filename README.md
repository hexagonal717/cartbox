# React e-Commerce

## Description

This is a full-stack eCommerce website built with React for the frontend and Express for the backend. It includes features such as product listings, user authentication, shopping cart functionality, and more. The website is designed to provide a seamless shopping experience for users.

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
    git clone https://github.com/hexagonal717/react-ecommerce.git
    cd react-ecommerce
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
    - index.html
    - public/
        - vite.svg
    - src/
        - api/
            - admin/
                - adminApi.js
                - adminAxios.js
            - customer/
                - customerApi.js
                - customerAxios.js
            - superAdmin/
        - App.jsx
        - assets/
            - react.svg
        - components/
            - common/
                - index.js
                - Layout/
                    - Layout.jsx
                - NavBar/
                    - NavBar.jsx
                - SidePanel/
                    - SidePanel.jsx
        - features/
            - admin/
                - index.js
                - pages/
                    - AdminHomePage.jsx
                    - AdminLogInPage.jsx
                - redux/
                    - adminAuthSlice.js
                    - adminOtpSlice.js
                    - adminProfileSlice.js
            - customer/
                - index.js
                - pages/
                    - AccountSettings.jsx
                    - ChangePasswordPage.jsx
                    - ForgotPasswordPage.jsx
                    - HomePage.jsx
                    - LogInPage.jsx
                    - LogInRedirectPage.jsx
                    - ProfilePage.jsx
                    - SettingsPage.jsx
                    - SignUpPage.jsx
                    - VerifyCodePage.jsx
                - redux/
                    - customerAuthSlice.js
                    - customerOtpSlice.js
                    - customerProfileSlice.js
            - superAdmin/
                - pages/
                    - SuperAdminHomePage.jsx
                    - SuperAdminLogInPage.jsx
                - redux/
                    - superAdminAuthSlice.js
                    - superAdminOtpSlice.js
                    - superAdminProfileSlice.js
        - index.css
        - main.jsx
        - redux/
            - store.js
    - vite.config.js


### Backend

- server/
    - controllers/
        - admin/
            - adminAuthController.js
            - adminProfileController.js
        - customer/
            - customerAuthController.js
            - customerProfileController.js
        - superAdmin/
            - superAdminAuthController.js
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
        - customerSchema.js
        - otpSchema.js
        - superAdminSchema.js
    - router/
        - v1/
            - admin/
                - adminAuthRouter.js
                - adminProfileRouter.js
            - customer/
                - customerAuthRouter.js
                - customerProfileRouter.js
            - superAdmin/
                - superAdminAuthRouter.js
                - superAdminProfileRouter.js

## Data Flow Diagram
####
![Data Flow Diagram](/dfd/react-ecommerce.drawio.svg)

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

