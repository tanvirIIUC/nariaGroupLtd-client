# Task Management App

## 🚀 Project Overview
This is a **Task Management** application built with **MERN Stack**. The project includes:
- **Server:** Node.js, Express.js, MongoDB, JWT, and bcrypt for password hashing.
- **Client:** React (Vite), Tailwind CSS, Firebase Authentication, Redux for state management, React Hook Form, and React Router.
- **Deployment:**
  - **Backend:** Deployed on Vercel.
  - **Frontend:** Deployed on Firebase.

---

## 🛠️ Setup Instructions

### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/your-username/task-management-app.git
cd task-management-app
```

### **2️⃣ Server Setup**
```sh
cd server
npm install
```

#### **Create a `.env` file** in the `server/` directory and add:
```env
PORT=5000
ACCESS_DATABASE_URL=your_mongodb_uri
ACCESS_TOKEN=your_jwt_secret
```

#### **Run the Server**
```sh
node index.js
```

### **3️⃣ Client Setup**
```sh
cd ../client
npm install
```

#### **Create a `.env.local` file** in the `client/` directory and add:
```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_SERVER_API=https://naria-group-ltd-server.vercel.app
.....
.....
```

#### **Run the Client**
```sh
npm run dev
```

---

## 🔗 API Documentation

### **Authentication APIs**
- **Get JWT Token:** `GET /jwt`
- **Create User:** `POST /users`
- **Get All Users (Protected):** `GET /users`
- **Update User:** `PUT /users`

### **Task Management APIs**
- **Create Task:** `POST /tasks`
- **Get My Tasks (Protected):** `GET /tasks`
- **Update Task:** `PUT /tasks/:id`
- **Delete Task:** `DELETE /tasks/:id`
- **Get All Tasks (Protected):** `GET /allTasks`

🔒 **Protected routes require JWT authentication.**

---

## 🔐 Security Measures
- **JWT Authentication:** Protects user data and API endpoints.
- **Password Hashing:** Uses `bcrypt` to securely store user passwords.
- **Middleware Verification:** `verifyJWT` middleware ensures token validation before accessing protected routes.
- **Environment Variables:** Secrets like MongoDB URI and JWT secret are stored in `.env` files.

---

## 🏗️ Redux for API Integration & Global State
- **State Management:** Redux manages tasks globally for better performance and reactivity.
- **Redux Thunks:** Handles async API calls, ensuring efficient data fetching.
- **Reducers & Actions:** Task-related state changes are managed in Redux reducers.

---

## 📌 Conclusion
This project is a **full-stack task management app** with **secure authentication, Redux-powered state management, and a user-friendly UI**. Let me know if you have any questions! 😊

