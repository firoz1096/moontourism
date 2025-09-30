require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid"); 


// Routes
const flightEnquiryRoutes = require("./routes/flightEnquiryRoutes");
const hotelEnquiryRoutes = require("./routes/hotelEnquiryRoutes");
const holidayEnquiryRoutes = require("./routes/holidayEnquiryRoutes"); //for hioliday and umrah enquiry form using same model/route
const flightDealsRoutes = require("./routes/flightDealsRoutes");
const roundTripDealsRoutes = require("./routes/roundTripDealsRoutes");
const holidayDealsRoutes = require("./routes/holidayDealsRoutes");
const subscribeRoutes = require("./routes/subscribeRoutes");
const contactEnquiryRoutes = require("./routes/contactEnquiryRoutes");
const authRoutes = require("./routes/auth");
const umrahDealsRoutes = require("./routes/umrahDeals");
const contactRoutes = require("./routes/contactRoutes");
const termRoutes = require("./routes/termRoutes");
const aboutRoutes = require("./routes/aboutRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const blogRoutes = require("./routes/blogRoutes");


// Initialize app
const app = express();
// Middleware
app.use(cors());
app.use(express.json());

// Define port
const port = process.env.PORT || 5000;

// Database connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));


app.use("/api/auth", authRoutes);
app.use("/api/flight-enquiry", flightEnquiryRoutes);
app.use("/api/holiday-enquiry", holidayEnquiryRoutes);
app.use("/api/hotel-enquiry", hotelEnquiryRoutes);
app.use("/api/flight-deals", flightDealsRoutes);
app.use("/api/umrah-deals", umrahDealsRoutes);
app.use("/api/round-trip-deals", roundTripDealsRoutes);
app.use("/api/holiday-deals", holidayDealsRoutes);
app.use("/api/subscribe", subscribeRoutes);
app.use("/api/contact-enquiry", contactEnquiryRoutes);
app.use("/api", contactRoutes);
app.use("/api", termRoutes);
app.use("/api", aboutRoutes);
app.use("/api", categoryRoutes);
app.use("/api", blogRoutes);


// ================== MULTER CONFIG ==================
// Tell Express to serve static files from public folder:
app.use(express.static("public"));


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/");  
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${uuidv4()}-${file.originalname}`);
  }
});


const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Max 5MB
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif/;
    if (allowed.test(file.mimetype) && allowed.test(file.originalname.toLowerCase())) {
      cb(null, true);
    } else {
      cb(new Error("Only jpeg, jpg, png, and gif files are allowed"));
    }
  }
});



// --- upload single image ---
app.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  res.json({
    message: "File uploaded successfully",
    filename: req.file.filename,
    imagePath: `/uploads/${req.file.filename}`,  // match what frontend expects
  });
});


// ✅ Multiple Images
app.post("/upload-multiple", upload.array("images", 10), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: "No files uploaded" });
  }

  const imagePaths = req.files.map((file) => `/uploads/${file.filename}`);

  res.json({
    message: "Files uploaded successfully",
    count: req.files.length,
    imagePaths,
  });
});

// ================== ERROR HANDLER ==================
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({ error: err.message });
});



//If someone tries to call your API directly from another domain, they’ll get a CORS error 🚫.
const allowedOrigins = [
  "http://localhost:3000",             // for local dev
  "https://moontourism.netlify.app"    // your Netlify site
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);


// ================== START SERVER ==================
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
