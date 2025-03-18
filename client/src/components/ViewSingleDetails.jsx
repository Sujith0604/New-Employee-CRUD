import axios from "axios";
import { useEffect, useState } from "react";

const ViewSingleDetails = ({ id }) => {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/${id}`);
      setData(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Employee Details</h1>
      <div className="space-y-4">
        <div className=" w-full flex justify-center items-center">
          <img
            src={`https://new-employee-crud.onrender.com/${data?.imageUrl}`}
            alt={data?.name}
            className="w-10 h-10 rounded-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <p className="mt-1 p-2 border border-gray-300 rounded-md">
            {data.name}
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <p className="mt-1 p-2 border border-gray-300 rounded-md">
            {data.phoneNumber}
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Age</label>
          <p className="mt-1 p-2 border border-gray-300 rounded-md">
            {data.age}
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <p className="mt-1 p-2 border border-gray-300 rounded-md">
            {data.email}
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Department
          </label>
          <p className="mt-1 p-2 border border-gray-300 rounded-md">
            {data.department}
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Salary
          </label>
          <p className="mt-1 p-2 border border-gray-300 rounded-md">
            {data.salary}
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Gender
          </label>
          <p className="mt-1 p-2 border border-gray-300 rounded-md">
            {data.gender}
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <p className="mt-1 p-2 border border-gray-300 rounded-md">
            {data.status}
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <p className="mt-1 p-2 border border-gray-300 rounded-md">
            {data.address}
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Birthdate
          </label>
          <p className="mt-1 p-2 border border-gray-300 rounded-md">
            {data.birthDate}
          </p>
        </div>
        {data.image && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Image
            </label>
            <img
              src={data.image}
              alt="Employee"
              className="mt-1 w-32 h-32 object-cover rounded-md"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewSingleDetails;
