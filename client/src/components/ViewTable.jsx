import { useContext, useState } from "react";
import axios from "axios";
import EditDetails from "./EditDetails";
import { detailContext } from "../context/DetailContext";

const ViewTable = ({ editId, setEditId, viewId, setViewId }) => {
  const { details, setDetails } = useContext(detailContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");

  const filteredDetails = details?.filter(
    (detail) =>
      detail?.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (departmentFilter === "" || detail?.department === departmentFilter)
  );

  const uniqueDepartments = [
    ...new Set(details?.map((detail) => detail?.department)),
  ];

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://new-employee-crud.onrender.com/${id}`);
      setDetails(details?.filter((detail) => detail?._id !== id));
    } catch (error) {
      console.error("Error deleting detail:", error);
    }
  };

  const handleEdit = (id) => {
    setEditId(id);
  };

  const handleView = (id) => {
    setViewId(id);
  };

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "2-digit" };
    return new Date(dateString).toLocaleDateString("en-GB", options);
  };

  const truncateAddress = (address) => {
    const words = address.split(" ");
    return words.length > 2 ? words.slice(0, 2).join(" ") + "..." : address;
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Employee Details</h1>

      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <input
              type="text"
              placeholder="Search by name..."
              className="p-2 border rounded-md w-1/3"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="p-2 border rounded-md"
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
            >
              <option value="">All Departments</option>
              {uniqueDepartments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white shadow-md rounded-md">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="p-3">S.NO</th>
                  <th className="p-3">Image</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Phone</th>
                  <th className="p-3">Age</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Department</th>
                  <th className="p-3">Salary</th>
                  <th className="p-3">Gender</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Address</th>
                  <th className="p-3">Birthdate</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredDetails?.map((detail, i) => (
                  <tr key={detail._id} className="border-b hover:bg-gray-100">
                    <td className="p-3 text-center">{i + 1}</td>
                    <td className="p-3">
                      <img
                        src={`https://new-employee-crud.onrender.com/${detail?.imageUrl}`}
                        alt={detail?.name}
                        className="w-10 h-10 rounded-full"
                      />
                    </td>
                    <td className="p-3">{detail?.name}</td>
                    <td className="p-3">{detail?.phoneNumber}</td>
                    <td className="p-3 text-center">{detail?.age}</td>
                    <td className="p-3">{detail?.email}</td>
                    <td className="p-3 text-center">{detail?.department}</td>
                    <td className="p-3 text-center">{detail?.salary}</td>
                    <td className="p-3 text-center">{detail?.gender}</td>
                    <td className="p-3 text-center">{detail?.status}</td>
                    <td className="p-3">{truncateAddress(detail?.address)}</td>
                    <td className="p-3 text-center">
                      {formatDate(detail?.birthDate)}
                    </td>
                    <td className="p-3 flex space-x-2">
                      <button
                        onClick={() => handleView(detail?._id)}
                        className="px-3 py-1 bg-yellow-600 text-white rounded hover:bg-blue-700"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleEdit(detail?._id)}
                        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(detail?._id)}
                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewTable;
