// backend/index.js
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASS}@cluster0.h2pknmg.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true }
});

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json({ limit: '10mb' })); // large payloads for Base64 photos
app.use(cookieParser());

// Create uploads folder (for user profile photos)
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
app.use('/uploads', express.static(uploadDir));

// Multer setup for user profile photo
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// JWT middleware
function verifyToken(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "defaultsecret");
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

// Main function
async function run() {
  try {
    await client.connect();
    const usersCollection = client.db("zoomit").collection("users");
    const productsCollection = client.db("zoomit").collection("products");
    const cartsCollection = client.db("zoomit").collection("carts");
    const ordersCollection = client.db("zoomit").collection("orders");

    // USERS
    app.post('/signUp', upload.single('photo'), async (req, res) => {
      try {
        const { name, email, password } = req.body;
        const photo = req.file ? req.file.filename : "";
        if (!name || !email || !password) return res.status(400).json({ message: "Fill all fields." });

        const existUser = await usersCollection.findOne({ email });
        if (existUser) return res.status(400).json({ message: "Email already exists." });

        const hashedPassword = await bcrypt.hash(password, 10);
        await usersCollection.insertOne({ name, email, password: hashedPassword, photo });
        res.status(201).json({ message: "Registration successful!" });
      } catch (error) {
        res.status(500).json({ message: "Server error", error });
      }
    });

    app.post('/login', async (req, res) => {
      try {
        const { email, password } = req.body;
        const user = await usersCollection.findOne({ email });
        if (!user) return res.status(400).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Wrong password" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "defaultsecret", { expiresIn: '1h' });
        res.cookie("token", token, {
          httpOnly: true,
          sameSite: "strict",
          secure: process.env.NODE_ENV === "production",
          maxAge: 60 * 60 * 1000,
          path: "/"
        });

        const { password: _, ...userData } = user;
        res.json({ message: "Login successful", user: userData });
      } catch (error) {
        res.status(500).json({ message: "Server error", error });
      }
    });

    app.post("/logout", (req, res) => {
      res.clearCookie("token", { httpOnly: true, sameSite: "strict", secure: process.env.NODE_ENV === "production", path: "/" });
      res.json({ message: "Logged out successfully" });
    });

    app.get('/users', async (req, res) => {
      const result = await usersCollection.find().toArray();
      res.send(result);
    });

    // PRODUCTS
    app.get('/products', async (req, res) => {
      const result = await productsCollection.find().toArray();
      res.send(result);
    });

    // JSON-only POST for products (Base64 photos)
    app.post('/products', async (req, res) => {
      try {
        const { name, slug, description, price, discount, stock, status, categories, photos } = req.body;

        if (!name || !slug || !description || !price || stock === undefined || !status) {
          return res.status(400).json({ message: "Required fields missing" });
        }

        const product = {
          name,
          slug,
          description,
          price: Number(price),
          discount: Number(discount) || 0,
          stock: Number(stock),
          status,
          categories: Array.isArray(categories) ? categories : (categories ? categories.split(',').map(c => c.trim()) : []),
          photos: Array.isArray(photos) ? photos : [],
          createdAt: new Date(),
        };

        const result = await productsCollection.insertOne(product);
        res.status(201).json({ message: "Product added successfully", productId: result.insertedId });
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error", error: err.message });
      }
    });

    // CART
    app.post('/carts', async (req, res) => {
      const cartItem = req.body;
      const result = await cartsCollection.insertOne(cartItem);
      res.send(result);
    });

    app.get('/carts', async (req, res) => {
      const email = req.query.email;
      const query = { email };
      const result = await cartsCollection.find(query).toArray();
      res.send(result);
    });

    app.delete('/carts/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await cartsCollection.deleteOne(query);
      res.send(result);
    });

    // ORDERS
    app.post('/orders', async (req, res) => {
      const { email, items, total } = req.body;
      if (!email || !items || items.length === 0) return res.status(400).send({ message: "Invalid order data" });

      const order = { email, items, total, createdAt: new Date() };
      const result = await ordersCollection.insertOne(order);
      res.status(201).send(result);
    });

    app.get("/orders", async (req, res) => {
      const email = req.query.email;
      if (!email) return res.status(400).send({ message: "Email required" });
      const orders = await ordersCollection.find({ email }).toArray();
      res.send(orders);
    });

    console.log("Backend running...");
  } catch (err) {
    console.error(err);
  }
}

run().catch(console.error);

process.on("SIGINT", async () => {
  await client.close();
  console.log("MongoDB disconnected");
  process.exit(0);
});

app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () => console.log(`Server running on port ${port}`));
