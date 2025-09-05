const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const JWT_SECRET = "your_jwt_secret";

const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASS}@cluster0.h2pknmg.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true },
});

// Create uploads folder if missing
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

async function run() {
  await client.connect();
  console.log("Connected to MongoDB!");


  // database inset name
  const usersCollection = client.db("zoomit").collection("users");
  const productsCollection = client.db("zoomit").collection("products");
  const cartsCollection = client.db("zoomit").collection("carts");
  const ordersCollection = client.db("zoomit").collection("orders");

  // ---------------- User Register ----------------
  app.post('/register', upload.single('profileImage'), async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password || !req.file) {
      return res.status(400).send({ message: "All fields are required" });
    }

    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) return res.status(400).send({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await usersCollection.insertOne({
      name,
      email,
      password: hashedPassword,
      profileImage: `/uploads/${req.file.filename}`,
      role: "user"
    });

    res.send({ message: "User registered successfully", userId: result.insertedId });
  });

  // ---------------- User/Admin Login ----------------
  app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).send({ message: "Email and password required" });

    const user = await usersCollection.findOne({ email });
    if (!user) return res.status(400).send({ message: "User not found" });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(400).send({ message: "Invalid password" });

    const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: "1d" });

    res.send({
      message: "Login successful",
      token,
      role: user.role,
      name: user.name,
      email: user.email,
      profileImage: user.profileImage
    });
  });

  // ---------------- Middleware for Admin ----------------
  const verifyAdmin = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).send({ message: "No token provided" });

    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      if (decoded.role !== "admin") return res.status(403).send({ message: "Forbidden: Not admin" });
      req.user = decoded;
      next();
    } catch (err) {
      return res.status(401).send({ message: "Invalid token" });
    }
  };

  // ---------------- Admin add another admin ----------------
  app.post('/add-admin', verifyAdmin, upload.single('profileImage'), async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password || !req.file) {
      return res.status(400).send({ message: "All fields are required" });
    }

    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) return res.status(400).send({ message: "Admin already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await usersCollection.insertOne({
      name,
      email,
      password: hashedPassword,
      profileImage: `/uploads/${req.file.filename}`,
      role: "admin"
    });

    res.send({ message: "New admin added", adminId: result.insertedId });
  });

  // ---------------- Get all users (admin only) ----------------
  app.get('/users', verifyAdmin, async (req, res) => {
    const users = await usersCollection.find({}).toArray();
    res.send(users);
  });

  // ---------------- Delete admin (admin only) ----------------
  app.delete('/delete-admin/:id', verifyAdmin, async (req, res) => {
    const { id } = req.params;

    try {
      const adminToDelete = await usersCollection.findOne({ _id: new ObjectId(id) });
      if (!adminToDelete) return res.status(404).send({ message: "Admin not found" });
      if (adminToDelete.role !== "admin") return res.status(400).send({ message: "Cannot delete a non-admin user" });

      // Optional: prevent deleting self
      // if (adminToDelete._id.toString() === req.user.userId) return res.status(400).send({ message: "Cannot delete yourself" });

      await usersCollection.deleteOne({ _id: new ObjectId(id) });
      res.send({ message: "Admin deleted successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: "Server error" });
    }
  });


  //productsss

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
}

run().catch(console.dir);

app.get('/', (req, res) => res.send('Backend running!'));

app.listen(port, () => console.log(`Server running on port ${port}`));
