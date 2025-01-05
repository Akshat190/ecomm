# Modern E-commerce Platform

A full-stack e-commerce platform built with React, Node.js, and MongoDB.

## 🌟 Features

### Customer Features
- 🛍️ Browse and search products by category
- 🛒 Shopping cart management
- 👤 User authentication and profiles
- 💳 Secure checkout with Stripe
- 📦 Order tracking
- ⭐ Product reviews and ratings
- 📱 Responsive design for all devices

### Admin Features
- 📊 Product management dashboard
- 📈 Order management
- 👥 User management
- 📝 Content management

## 🛠️ Tech Stack

### Frontend
- React 18
- TypeScript
- Tailwind CSS
- Vite
- React Router DOM
- Axios
- Stripe Integration
- Lucide React Icons

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Stripe API
- bcrypt.js

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- Stripe account

### Installation

1. Clone the repository:

2. Install dependencies:

3. Set up environment variables:

Frontend (.env):

REACT_APP_STRIPE_PUBLIC_KEY=your_stripe_publishable_key_here

Backend (.env):

MONGODB_URI=your_mongodb_connection_string

PORT=5000

4. Start the development servers:

## 📁 Project Structure
modern-ecommerce/
├── frontend/
│ ├── src/
│ │ ├── components/ # Reusable UI components
│ │ ├── context/ # React Context providers
│ │ ├── pages/ # Page components
│ │ ├── styles/ # CSS styles
│ │ └── types/ # TypeScript types
│ └── public/ # Static assets
│
├── backend/
│ ├── config/ # Database configuration
│ ├── controllers/ # Route controllers
│ ├── middleware/ # Custom middleware
│ ├── models/ # Mongoose models
│ ├── routes/ # API routes
│ └── scripts/ # Utility scripts

## 🔌 API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)
- `POST /api/products/:id/reviews` - Create product review

### Users
- `POST /api/users/login` - User login
- `POST /api/users/register` - User registration

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders/myorders` - Get user orders
- `GET /api/orders/:id` - Get order by ID
- `PUT /api/orders/:id/pay` - Update order to paid
- `POST /api/orders/track` - Track order status

### Payments
- `POST /api/payments/create-checkout-session` - Create Stripe checkout
- `POST /api/payments/webhook` - Handle Stripe webhooks

## 🛠️ Available Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Backend
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

## 🔐 Environment Variables

### Frontend
- `REACT_APP_STRIPE_PUBLIC_KEY` - Stripe publishable key

### Backend
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT
- `PORT` - Server port (default: 5000)

## 🤝 Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 👏 Acknowledgments

- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Stripe](https://stripe.com/)
