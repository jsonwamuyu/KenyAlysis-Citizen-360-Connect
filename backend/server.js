require("dotenv").config(); // Load environment variables
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routers/authRoutes");
const userRoutes = require("./routers/userRoutes");
const pollRoutes = require("./routers/pollRoutes");
const incidentRoutes = require("./routers/incidentRoutes"); 
const feedbackRoutes = require("./routers/feedbackRoutes"); 
const documentRoutes = require("./routers/documentRoutes"); 

const app = express();

const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:8080", credentials: true }));
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/polls', pollRoutes);
app.use('/api/incidents', incidentRoutes);  
app.use('/api/feedback', feedbackRoutes);  
app.use('/api/documents', documentRoutes); 

// Default route
app.get('/', (req, res) => {
    res.send('CitizenConnect API is running...');
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
