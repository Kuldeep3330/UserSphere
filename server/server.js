import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import multer from "multer";
import path from "path";
import mongoose from 'mongoose';
import { User } from './models/user.js';


const app = express()

app.use(express.json())

//mongoDB connect
mongoose.connect("mongodb://127.0.0.1:27017/mini_project")
.then(()=>console.log("MongoDB Connected"))
.catch((err)=>console.log("connection failed", err));

// const users = []

app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password)
        return res.status(400).json({ message: "Username & password required" })

    const existing = await User.findOne({ username });
  if (existing)
    return res.status(400).json({ message: "Username already exists" });
    const hashedPassword = await bcrypt.hash(password, 10)
    // users.push({ id: users.length + 1, username, password: hashedPassword, avatart: null })

    await User.create({username, password:hashedPassword})
    res.status(200).json({ message: "user registered" })
})

app.post('/login', async (req, res) => {
    const { username, password } = req.body
    const user = await User.findOne({username})
    if (!user) return res.status(401).json({ message: "User not found" })

    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) return res.status(401).json({ message: "Wrong password" });

    //create token
    const token = jwt.sign({ id: user.id, username }, "merakhudkasecretkey", { expiresIn: "1h" })

    return res.json({ token })
})

//JWT middleware
const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]
    if (!token) return res.status(401).json({ message: "Token missing" });

    try {
        const decoded = jwt.verify(token, "merakhudkasecretkey");
        req.user = decoded;
        next();
    } catch {
        res.status(401).json({ message: "Invalid token" });
    }
}

//protected route

app.get('/', authenticateJWT,(req, res) => {
    res.status(200).json({ message: `Welcome ${req.user.username}` })
})

//multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {    
    cb(null, Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({ storage })

app.post('/upload', authenticateJWT, upload.single('image'), async (req, res)=>{
    await User.findByIdAndUpdate(req.user.id, {
      avatar: req.file.filename,
    });

    res.json({ message: "Profile image uploaded", file: req.file.filename });
  }
)

//pagination
app.get("/users", authenticateJWT, async(req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;

  const skip = (page - 1) * limit;

  const total = await User.countDocuments();
  const users = await User.find()
    .skip(skip)
    .limit(limit)
    .select("-password"); // hide password

  res.json({
    page,
    limit,
    total,
    data: users,
  });
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});