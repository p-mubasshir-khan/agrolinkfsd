# 🌾 Agrolink - Direct-to-Customer Agri-Marketplace

## 📋 Project Overview

**Agrolink** is a comprehensive e-commerce platform designed to bridge the gap between farmers and customers, enabling direct sales of fresh agricultural products. The platform eliminates middlemen, ensuring better prices for farmers and fresh produce for customers.

### 🎯 Key Features

#### **For Customers:**
- **Browse Products**: View fresh produce from local farmers
- **Advanced Search & Filtering**: Search by name, filter by category and city
- **Product Details**: Detailed product information with farmer details
- **Shopping Cart**: Add products to cart with conditional delivery fee (Free > ₹500)
- **Order Management**: Track and manage orders
- **User Authentication**: Secure registration and login system
- **Responsive Design**: Mobile-friendly interface

#### **For Farmers:**
- **Product Management**: Add, edit, and manage product listings (Full CRUD)
- **Dashboard**: View statistics and recent orders
- **Order Management**: Update order status and cancel pending orders
- **Profile Management**: Update farm information and personal details
- **Approval System**: Admin approval for farmer accounts

#### **For Administrators:**
- **User Management**: View and manage all users
- **Product Management**: View and manage all products
- **Order Management**: View and manage all orders
- **Farmer Approval**: Approve/reject farmer registrations
- **Platform Oversight**: Monitor all activities and users

## 🛠️ Technology Stack

### **Frontend (React)**
- **React 18** - Modern UI library
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API calls
- **Tailwind CSS** - Utility-first CSS framework
- **React Icons** - Icon library
- **React Toastify** - Toast notifications
- **jsPDF** - PDF export functionality
- **Context API** - State management

### **Backend (JSON-Server)**
- **JSON-Server** - REST API with JSON file storage
- **db.json** - JSON database file

### **Development Tools**
- **Concurrently** - Run frontend and backend simultaneously

## 📁 Project Structure

```
agrolink/
├── src/                          # React Frontend
│   ├── components/               # Reusable UI components
│   │   ├── Navbar.js
│   │   └── ProtectedRoute.js
│   ├── pages/                    # Page components
│   │   ├── Home.js
│   │   ├── Products.js
│   │   ├── ProductDetail.js
│   │   ├── Login.js
│   │   ├── Register.js
│   │   ├── Dashboard.js
│   │   ├── Cart.js
│   │   ├── Orders.js
│   │   ├── AddProduct.js
│   │   ├── EditProduct.js
│   │   ├── AdminDashboard.js
│   │   ├── AdminUsers.js
│   │   ├── AdminProducts.js
│   │   ├── AdminOrders.js
│   │   └── AdminFarmers.js
│   ├── context/                  # React Context
│   │   └── AuthContext.js
│   ├── App.js                    # Main App component
│   ├── index.js                  # Entry point
│   └── index.css                 # Global styles
├── public/                       # Static files
│   ├── index.html
│   ├── favicon.ico
│   └── manifest.json
├── db.json                       # JSON-Server database
├── package.json                  # Dependencies and scripts
├── tailwind.config.js           # Tailwind configuration
├── postcss.config.js            # PostCSS configuration
└── README.md                    # This file
```

## 🚀 Installation & Setup

### **Prerequisites**
- Node.js (v14 or higher)
- npm or yarn

### **Step 1: Clone the Repository**
```bash
git clone <repository-url>
cd "Full stack"
```

### **Step 2: Install Dependencies**
```bash
npm install
```

### **Step 3: Start the Application**
```bash
# Development mode (both frontend and JSON-Server)
npm run dev

# Or run separately:
# JSON-Server only (runs on port 3001)
npm run server

# Frontend only (runs on port 3000)
npm start
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **JSON-Server API**: http://localhost:3001

## 📱 Available Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Start React development server |
| `npm run build` | Build React app for production |
| `npm run server` | Start JSON-Server on port 3001 |
| `npm run dev` | Run both frontend and JSON-Server concurrently |
| `npm test` | Run tests |

## 🔐 Authentication System

### **User Roles**
1. **Customer** - Can browse and purchase products
2. **Farmer** - Can list and manage products (requires admin approval)
3. **Admin** - Can manage users and platform

### **Default Accounts**
- **Admin**: 
  - Email: admin@agrolink.com
  - Password: admin123
- **Farmer**: 
  - Email: farmer@test.com
  - Password: farmer123
- **Customer**: 
  - Email: customer@test.com
  - Password: customer123

## 🛍️ Product Management (Full CRUD)

### **Create**
- Farmers can add new products with details (name, description, price, quantity, category, city, image)

### **Read**
- View all products with filtering and search
- View individual product details
- View farmer's own products (dashboard)

### **Update**
- Farmers can edit their own products
- Update product information, price, quantity, etc.

### **Delete**
- Products can be removed (functionality available in codebase)

### **Product Categories**
- Vegetables
- Fruits
- Grains
- Dairy
- Poultry
- Other

## 🌐 API Endpoints (JSON-Server)

### **Users**
```
GET    /users          # Get all users
GET    /users/:id      # Get single user
POST   /users          # Create new user
PUT    /users/:id      # Update user
DELETE /users/:id      # Delete user
GET    /users?role=farmer&isApproved=false  # Filter users
```

### **Products**
```
GET    /products       # Get all products
GET    /products/:id   # Get single product
POST   /products       # Create new product
PUT    /products/:id   # Update product
DELETE /products/:id   # Delete product
GET    /products?farmerId=2  # Filter by farmer
```

### **Orders**
```
GET    /orders         # Get all orders
GET    /orders/:id     # Get single order
POST   /orders         # Create new order
PUT    /orders/:id     # Update order
DELETE /orders/:id     # Delete order
GET    /orders?customerId=3  # Filter by customer
GET    /orders?farmerId=2    # Filter by farmer
```

## 🎨 UI/UX Features

### **Design System**
- **Color Scheme**: Royal Blue-based primary colors (Premium & Modern)
- **Typography**: Clean, readable fonts
- **Icons**: React Icons and Lucide React
- **Responsive**: Mobile-first design with Tailwind CSS
- **Notifications**: React Toastify for user feedback

### **Components**
- **Navbar**: Navigation and user menu
- **Product Cards**: Product display with actions
- **Forms**: Login, registration, product forms
- **Loading States**: Spinners and skeletons
- **Error Handling**: User-friendly error messages
- **Protected Routes**: Role-based access control

## 🗄️ Database Schema (db.json)

### **User Model**
```json
{
  "id": 1,
  "name": "String",
  "email": "String",
  "password": "String",
  "role": "customer|farmer|admin",
  "phone": "String",
  "address": "String",
  "city": "String",
  "isApproved": true|false,
  "farmDescription": "String (farmer only)"
}
```

### **Product Model**
```json
{
  "id": 1,
  "name": "String",
  "description": "String",
  "price": Number,
  "quantity": Number,
  "unit": "kg|dozen|piece|bundle|quintal|litre",
  "category": "vegetables|fruits|grains|dairy|poultry|other",
  "city": "String",
  "image": "String (URL)",
  "farmerId": Number,
  "farmer": {
    "id": Number,
    "name": "String"
  },
  "createdAt": "ISO Date String"
}
```

### **Order Model**
```json
{
  "id": 1,
  "customerId": Number,
  "customer": { "id": Number, "name": "String" },
  "farmerId": Number,
  "farmer": { "id": Number, "name": "String" },
  "products": [
    {
      "productId": Number,
      "product": { "id": Number, "name": "String", "price": Number, "unit": "String" },
      "quantity": Number,
      "price": Number
    }
  ],
  "totalAmount": Number,
  "status": "pending|confirmed|shipped|delivered|cancelled",
  "paymentStatus": "pending|paid",
  "deliveryAddress": {
    "street": "String",
    "city": "String",
    "state": "String",
    "pincode": "String"
  },
  "orderDate": "ISO Date String"
}
```

## 🔒 Security Features

### **Authentication & Authorization**
- Simple token-based authentication (localStorage)
- Role-based access control
- Protected routes for authenticated users
- Admin-only routes for administrative functions

### **Input Validation**
- Frontend form validation
- Required field checks
- Email format validation
- Password strength requirements

## 📊 Sample Data

The `db.json` file includes sample data:
- 3 sample users (admin, farmer, customer)
- 3 sample products
- 1 sample order

You can modify `db.json` directly or through the API to add more data.

## 🧪 Testing

### **Manual Testing Checklist**
- [x] User registration and login
- [x] Product browsing and filtering
- [x] Product detail viewing
- [x] Add product to cart
- [x] Place order
- [x] Admin user management
- [x] Farmer product management (CRUD)
- [x] Order status updates
- [x] Farmer approval system
- [x] Responsive design on mobile

## 🚀 Deployment

### **Frontend Deployment**
```bash
npm run build
# Deploy build folder to hosting service (Netlify, Vercel, etc.)
```

### **JSON-Server Deployment**
For production, consider migrating to a proper backend (Node.js/Express, etc.) as JSON-Server is intended for development/prototyping.

## 📈 Features Implemented

### **Full CRUD Operations**
- ✅ Create: Add new products, users, orders
- ✅ Read: View products, users, orders with filtering
- ✅ Update: Edit products, update order status, approve farmers
- ✅ Delete: Remove products, users, orders (functionality available)

### **Additional Features**
- ✅ Shopping cart functionality
- ✅ Order management system
- ✅ Admin dashboard with statistics
- ✅ Farmer approval system
- ✅ Product search and filtering
- ✅ Responsive design
- ✅ Toast notifications
- ✅ Protected routes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 👥 Team

**Agrolink Development Team**
- Frontend Development
- UI/UX Design
- Full Stack Implementation

## 📞 Support

For support and questions:
- Email: khan.srmap@gmail.com

---

**Built with ❤️ for the agricultural community**
