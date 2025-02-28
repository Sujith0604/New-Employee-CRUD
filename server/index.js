import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import multer from "multer";
import path from "path";
import Employee from "./model/employeeSchema.js";

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use("/uploads", express.static("uploads")); // Serve static files from the 'uploads' directory

mongoose
  .connect("mongodb://localhost:27017/NewEmployeeDetails")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

app.get("/", async (req, res) => {
  try {
    const employee = await Employee.find();
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/", upload.single("image"), async (req, res) => {
  const {
    name,
    phoneNumber,
    age,
    email,
    department,
    salary,
    gender,
    status,
    address,
    birthDate,
  } = req.body;

  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
  console.log(imageUrl);

  try {
    const employee = await Employee.create({
      name,
      phoneNumber,
      age,
      email,
      imageUrl,
      department,
      salary,
      gender,
      status,
      address,
      birthDate,
    });
    res.status(201).json(employee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get("/:id", async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (employee) {
      res.json(employee);
    } else {
      res.status(404).json({ message: "Employee not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put("/:id", upload.single("image"), async (req, res) => {
  const { id } = req.params;
  const {
    name,
    phoneNumber,
    age,
    email,
    department,
    salary,
    gender,
    status,
    address,
    birthDate,
  } = req.body;

  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    const employee = await Employee.findByIdAndUpdate(
      id,
      {
        name,
        phoneNumber,
        age,
        email,
        department,
        salary,
        gender,
        status,
        imageUrl,
        address,
        birthDate,
      },
      { new: true }
    );

    if (!employee)
      return res.status(404).json({ message: "Employee not found" });
    res.json(employee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Employee.findByIdAndDelete(id);
    res.status(204).json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
