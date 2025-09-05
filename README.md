Zoomit E-Commerce

An E-commerce Application built with MERN stack (MongoDB, Express, React, Node.js).
It has secure authentication, product management, order handling, and a responsive frontend with modern UI/UX.

🚀 Tech Stack
Backend

Node.js + Express.js → REST API

MongoDB → Database

JWT + bcrypt.js → Authentication & Security

Multer → File upload (e.g., product images)

dotenv → Environment configuration

Frontend

React 19 + Vite → Fast development build tool

React Router DOM → Routing system

Redux Toolkit + Redux Persist → State management with session persistence

React Query (TanStack) → Data fetching & caching

React Hook Form → Form handling & validation

TailwindCSS + DaisyUI → Styling & components

SweetAlert2 → Alert & notifications

Axios → API requests

2️⃣ Backend Setup
cd Backend
npm install


Create a .env file inside Backend/

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key


Run backend:

npm start

3️⃣ Frontend Setup
cd Frontend
npm install


Run frontend (Vite):

npm run dev

🔐 Features

✅ User Authentication (JWT, bcrypt.js)
✅ Admin Dashboard
✅ Product Management (Add, Edit, Delete)
✅ Secure File Upload (Multer)
✅ Responsive UI with Tailwind + DaisyUI
✅ State Management (Redux Toolkit + Persist)
✅ API Data Caching (React Query)
✅ Sweet Alerts for better UX
