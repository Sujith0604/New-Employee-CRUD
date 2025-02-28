import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    name: { type: String },
    phoneNumber: { type: String },
    age: { type: Number },
    email: { type: String },
    imageUrl: { type: String },
    department: { type: String },
    salary: { type: Number },
    gender: { type: String },
    status: { type: String },
    address: { type: String },
    birthDate: { type: Date },
  },
  {
    timestamps: true,
  }
);

const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;
