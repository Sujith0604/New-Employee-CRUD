import { useState, useContext } from "react";
import { detailContext } from "../context/DetailContext";
import ViewTable from "./ViewTable";
import AddDetails from "./AddDetails";
import { X } from "lucide-react";
import EditDetails from "./EditDetails";
import ViewSingleDetails from "./ViewSingleDetails";

const HomeDetails = () => {
  const { details, setDetails } = useContext(detailContext);
  const [isAdd, setIsAdd] = useState(false);
  const [editId, setEditId] = useState(null);
  const [viewId, setViewId] = useState(null);

  return (
    <div className=" p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Employee Details</h1>
        <button
          onClick={() => setIsAdd(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Add Employee
        </button>
      </div>
      <ViewTable
        details={details}
        setDetails={setDetails}
        editId={editId}
        setEditId={setEditId}
        setViewId={setViewId}
        viewId={viewId}
      />
      {isAdd && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Add Employee Details</h2>
              <button
                onClick={() => setIsAdd(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X />
              </button>
            </div>
            <div className="max-h-[80vh] overflow-y-auto">
              <AddDetails setIsAdd={setIsAdd} />
            </div>
          </div>
        </div>
      )}

      {editId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Edit Employee Details</h2>
              <button
                onClick={() => setEditId(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X />
              </button>
            </div>
            <div className="max-h-[80vh] overflow-y-auto">
              <EditDetails setEditId={setEditId} id={editId} />
            </div>
          </div>
        </div>
      )}

      {viewId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Employer Details</h2>
              <button
                onClick={() => setViewId(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X />
              </button>
            </div>
            <div className="max-h-[80vh] overflow-y-auto">
              <ViewSingleDetails setViewId={setViewId} id={viewId} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeDetails;
