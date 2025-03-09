# Blog App

A backend blog application built with Node.js, Express, and MongoDB. This app allows users to create, read, update, and delete blog posts, as well as manage comments and user authentication. It also includes features like OTP-based email verification, profile management, and secure file uploads.

---

## Features

- **User Authentication**: Secure user registration, login, and logout functionality.
- **OTP Verification**: Email-based OTP verification for secure account creation.
- **Profile Management**: Users can update their profile, including profile pictures and bio.
- **Blog Management**: Create, read, update, and delete blog posts with support for multiple image uploads.
- **Comment System**: Add, update, and delete comments on blog posts.
- **File Uploads**: Upload images for blog posts and profile pictures using Multer.
- **JSON Web Tokens (JWT)**: The app uses **JSON Web Tokens (JWT)** for secure user authentication. When a user logs in, a JWT is generated and sent to the client, which is then used to authenticate subsequent requests. This ensures that only authorized users can access protected routes, such as creating or updating blog posts. JWTs are stateless, making them scalable and efficient for handling user sessions without storing session data on the server.
- **Bcrypt for Password Security**: To ensure user passwords are securely stored, the app uses **Bcrypt**, a robust password-hashing library. Passwords are hashed before being saved to the database, making it nearly impossible for attackers to retrieve the original password even if the database is compromised. Bcrypt also includes a salt mechanism, which adds an extra layer of security by generating unique hashes for identical passwords. This ensures that user credentials remain safe and secure.

---

## Tools and Technologies Used

### Backend

- **Node.js**: JavaScript runtime environment.
- **Express**: Web framework for Node.js.
- **MongoDB**: NoSQL database for storing data.
- **Mongoose**: MongoDB object modeling for Node.js.
- **JSON Web Tokens (JWT)**: For secure user authentication.
- **Bcrypt**: For password hashing.
- **Multer**: For handling file uploads.
- **OTP Generator**: For generating one-time passwords.
- **Validator**: For input validation.

### Development Tools

- **env-cmd**: For managing environment variables.
- **Nodemon**: For automatic server restarts during development.

---

## Installation and Setup

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- SendGrid API key (for email functionality)

### Steps

1. **Clone the Repository**

   ```bash
   git clone git@github.com:ravan-muradzada/blog-app.git
   cd blog-app
   ```
2. **Install Dependencies**

   ```bash
   npm install
   ```
3. **Set Up Environment Variables**
   Create a `.env` file in the root directory and add the following variables:

   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/blog-app
   JWT_SECRET=your_jwt_secret_key
   SENDGRID_API_KEY=your_sendgrid_api_key
   ```
4. **Start the Server**

   ```bash
   npm start
   ```

   For development with automatic restarts:

   ```bash
   npm run dev
   ```
5. **Access the App**
   The app will be running at `http://localhost:3000`.

---

## API Documentation

### Authentication

- **Register a New User**

  ```
  POST /api/auth/register
  ```

  Request Body:

  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Verify OTP**

  ```
  POST /api/auth/verify-otp
  ```

  Request Body:

  ```json
  {
    "otp": "123456"
  }
  ```
- **Complete Sign-Up (Additional Credentials)**

  ```
  POST /api/auth/sign-up-more-credentials
  ```

  Request Body (form-data):

  ```
  profile-picture: <file>,
  bio: "I love blogging!"
  ```
- **Login**

  ```
  POST /api/auth/login
  ```

  Request Body:

  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Logout**

  ```
  POST /api/auth/logout
  ```
- **Delete My Account**

  ```
  DELETE /api/auth/delete-my-account
  ```

---

### User Profile

- **Get My Profile**

  ```
  GET /api/user/get-my-profile
  ```
- **Update My Profile**

  ```
  PATCH /api/user/update-my-profile
  ```

  Request Body (form-data):

  ```
  profile-picture: <file>,
  bio: "Updated bio"
  ```

---

### Blog Posts

- **Create a Post**

  ```
  POST /api/post/create-post
  ```

  Request Body (form-data):

  ```
  title: "My First Blog Post",
  content: "This is the content of my first blog post.",
  images: <file1>, <file2>, ... (up to 10 files)
  ```
- **Read All Posts**

  ```
  GET /api/post/read-posts
  ```
- **Update a Post**

  ```
  PATCH /api/post/update-post/:id
  ```

  Request Body (form-data):

  ```
  title: "Updated Title",
  content: "Updated content.",
  images: <file1>, <file2>, ... (up to 10 files)
  ```
- **Delete a Post**

  ```
  DELETE /api/post/delete-post/:id
  ```

---

### Comments

- **Create a Comment**

  ```
  POST /api/comment/create-comment
  ```

  Request Body:

  ```json
  {
    "postId": "post_id",
    "text": "This is a comment."
  }
  ```
- **Get All Comments for a Post**

  ```
  GET /api/comment/get-comments/:postId
  ```
- **Update a Comment**

  ```
  PATCH /api/comment/update-comment/:commentId
  ```

  Request Body:

  ```json
  {
    "text": "Updated comment text."
  }
  ```
- **Delete a Comment**

  ```
  DELETE /api/comment/delete-comment/:commentId
  ```

---

## Dependencies

Here are the key dependencies used in this project:

```json
"dependencies": {
  "@sendgrid/mail": "^8.1.4",
  "bcrypt": "^5.1.1",
  "connect-mongo": "^5.1.0",
  "env-cmd": "^10.1.0",
  "express": "^4.21.2",
  "express-session": "^1.18.1",
  "install": "^0.13.0",
  "jsonwebtoken": "^9.0.2",
  "mongoose": "^8.12.1",
  "multer": "^1.4.5-lts.1",
  "otp-generator": "^4.0.1",
  "validator": "^13.12.0"
}
```


---
