import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import axios from "axios";
import { detailContext } from "../context/DetailContext";

const AddDetails = ({ setIsAdd }) => {
  const { details, setDetails } = useContext(detailContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const onSubmit = async (data) => {
    // Handle form submission
    console.log("Form data:", data);
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("phoneNumber", data.phoneNumber);
      formData.append("email", data.email);
      formData.append("age", data.age);
      formData.append("gender", data.gender);
      formData.append("department", data.department);
      formData.append("salary", data.salary);
      formData.append("status", data.status);
      formData.append("address", data.address);
      formData.append("birthDate", data.birthDate);
      if (imageFile) {
        formData.append("image", imageFile);
      }

      const res = await axios.post("http://localhost:3000", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setIsAdd(false);
      setDetails([...details, res.data]);
    } catch (error) {
      console.error("Error adding details:", error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        console.log(reader.result);
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setImageFile(file);
    } else {
      setImagePreview(null);
      setImageFile(null);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setImageFile(null);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Enter your details here</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <fieldset className="border p-4 rounded-md">
          <legend className="text-lg font-semibold">
            Personal Information
          </legend>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Employee Name
              </label>
              <input
                {...register("name", {
                  required: "The Employee Name is required",
                  maxLength: {
                    value: 50,
                    message: "The Employee Name cannot exceed 50 characters",
                  },
                })}
                className={`mt-1 block w-full p-2 border ${
                  errors.name ? "border-red-500" : "border-gray-300"
                } rounded-md`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Employee Phone Number
              </label>
              <input
                {...register("phoneNumber", {
                  required: "The Employee Phone Number is required",
                  pattern: {
                    value: /^\+[1-9]\d{1,14}$/,
                    message: "Invalid phone number format",
                  },
                })}
                className={`mt-1 block w-full p-2 border ${
                  errors.phoneNumber ? "border-red-500" : "border-gray-300"
                } rounded-md`}
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Employee Age
              </label>
              <input
                {...register("age", {
                  required: "The Employee Age is required",
                  min: {
                    value: 18,
                    message: "The Employee Age must be at least 18",
                  },
                  max: {
                    value: 65,
                    message:
                      "The Employee Age must be less than or equal to 65",
                  },
                })}
                className={`mt-1 block w-full p-2 border ${
                  errors.age ? "border-red-500" : "border-gray-300"
                } rounded-md`}
              />
              {errors.age && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.age.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Employee Email
              </label>
              <input
                {...register("email", {
                  required: "The Employee Email is required",
                })}
                className={`mt-1 block w-full p-2 border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } rounded-md`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Employee Image
              </label>
              <input
                type="file"
                accept="image/*"
                {...register("image", {
                  required: "The Employee Image is required",
                })}
                className={`mt-1 block w-full p-2 border ${
                  errors.image ? "border-red-500" : "border-gray-300"
                } rounded-md`}
                onChange={handleImageChange}
              />
              {errors.image && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.image.message}
                </p>
              )}
              {imagePreview && (
                <div className="mt-2">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="mt-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          </div>
        </fieldset>

        <fieldset className="border p-4 rounded-md">
          <legend className="text-lg font-semibold">Job Information</legend>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Employee Department
              </label>
              <select
                {...register("department")}
                className={`mt-1 block w-full p-2 border ${
                  errors.department ? "border-red-500" : "border-gray-300"
                } rounded-md`}
              >
                <option value="">Select Department</option>
                <option value="HR">HR</option>
                <option value="IT">IT</option>
                <option value="Finance">Finance</option>
              </select>
              {errors.department && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.department.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Employee Salary
              </label>
              <input
                {...register("salary", {
                  required: "The Employee Salary is required",
                  min: {
                    value: 50000,
                    message: "The Employee Salary must be at least 50,000",
                  },
                })}
                className={`mt-1 block w-full p-2 border ${
                  errors.salary ? "border-red-500" : "border-gray-300"
                } rounded-md`}
              />
              {errors.salary && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.salary.message}
                </p>
              )}
            </div>
          </div>
        </fieldset>

        <fieldset className="border p-4 rounded-md">
          <legend className="text-lg font-semibold">
            Additional Information
          </legend>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Gender
              </label>
              <div className="flex items-center space-x-4">
                <div>
                  <input
                    type="radio"
                    {...register("gender", {
                      required: "The Gender is required",
                    })}
                    value="male"
                    id="male"
                    className="mr-2"
                  />
                  <label htmlFor="male">Male</label>
                </div>
                <div>
                  <input
                    type="radio"
                    {...register("gender", {
                      required: "The Gender is required",
                    })}
                    value="female"
                    id="female"
                    className="mr-2"
                  />
                  <label htmlFor="female">Female</label>
                </div>
              </div>
              {errors.gender && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.gender.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Employee Status
              </label>
              <div className="flex items-center space-x-4">
                <div>
                  <input
                    type="radio"
                    {...register("status", {
                      required: "The Status is required",
                    })}
                    value="active"
                    id="active"
                    className="mr-2"
                  />
                  <label htmlFor="active">Active</label>
                </div>
                <div>
                  <input
                    type="radio"
                    {...register("status", {
                      required: "The Status is required",
                    })}
                    value="inactive"
                    id="inactive"
                    className="mr-2"
                  />
                  <label htmlFor="inactive">Inactive</label>
                </div>
              </div>
              {errors.status && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.status.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Employee Address
              </label>
              <textarea
                {...register("address", {
                  required: "The Employee Address is required",
                  minLength: {
                    value: 10,
                    message:
                      "The Employee Address must be at least 10 characters long",
                  },
                  maxLength: {
                    value: 200,
                    message:
                      "The Employee Address cannot exceed 200 characters",
                  },
                })}
                className={`mt-1 block w-full p-2 border ${
                  errors.address ? "border-red-500" : "border-gray-300"
                } rounded-md`}
              />
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.address.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Employee Birthdate
              </label>
              <input
                type="date"
                {...register("birthDate", {
                  required: "The Employee Birthdate is required",
                })}
                className={`mt-1 block w-full p-2 border ${
                  errors.birthDate ? "border-red-500" : "border-gray-300"
                } rounded-md`}
              />
              {errors.birthDate && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.birthDate.message}
                </p>
              )}
            </div>
          </div>
        </fieldset>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDetails;
