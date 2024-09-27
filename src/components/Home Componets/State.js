import React, { useEffect, useState } from "react";
import { FaLeftLong } from "react-icons/fa6";
import Table from "../Table";
import CompNav from "../CompNav/CompNav";
import { PiMapPinSimpleAreaThin } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { addState, editState, getState } from "../../api/api";
import Alert from "../Alert";

const State = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [getId , setId] = useState(null)

  const dispatch = useDispatch();
  const select = useSelector((store) => store.State);
  const token = localStorage.getItem("token");

  console.log(select)

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getState(token));
      } catch (err) {
        console.log(err)
      } 
    };

    fetchData();
  }, []);

  const handleToggleRemove = () => {
    setIsRemoving(!isRemoving);
  };

  const handleToggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleToggleAdd = () => {
    setIsAddingNew(!isAddingNew);
  };


  console.log(getId)
  return (
    <>
      <CompNav
        components={<PiMapPinSimpleAreaThin  className="text-lg" />}
        name={"State"}
        addNew={handleToggleAdd}
      />

      {isAddingNew ? (
        <AddState addNew={handleToggleAdd} />
      ) : isEditing ? (
        <EditState setEdit={handleToggleEdit} stateId={getId} />
      ) : (
        <Table
          remove={handleToggleRemove}
          edit={handleToggleEdit}
          data={select.data}
          Id={setId}
        />
      )}
    </>
  );
};

const AddState = ({ addNew }) => {
  const dispatch = useDispatch();
  const select = useSelector((store) => store.state); 
  const [alertMessage, setAlertMessage] = useState("");

  const [data, setData] = useState({
    stateName: "",
    stateCode: "",
  });

  useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => {
        setAlertMessage(null);
      }, 2000);
  
      return () => clearTimeout(timer); 
    }
  }, [alertMessage]);
  


  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    const formatedData = {
      stateName: data.stateName, 
      stateCode: data.stateCode,  
    };


  const token =  localStorage.getItem("token")
    
    try {
      const result = await dispatch(addState({ data : formatedData , token})).unwrap();
      setAlertMessage("State added successfully!");
      setData({ stateName: "", stateCode: "" });
    } catch (error) {
      setAlertMessage("Failed to add state: " + error.message);
    }
  };

  return (
    <>
      <div>
        <div className="flex justify-start items-center p-9">
          <FaLeftLong onClick={addNew} className="text-md" />
          <h2 className="ps-3 text-md">Add State</h2>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="p-2 m-2 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="mb-4 md:col-span-1">
            <input
              id="state-input"
              type="text"
              placeholder="Enter the State"
              required
              name="stateName" 
              value={data.stateName}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-danger focus:border-danger p-2"
            />
          </div>
          <div className="mb-4 md:col-span-1">
            <input
              id="state-code-input"
              type="text"
              placeholder="Enter State Code"
              required
              name="stateCode"
              value={data.stateCode}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-danger focus:border-danger p-2"
            />
          </div>

          <div className="sx:m-5 md:absolute right-0 bottom-6 pb-3">
            <button
              type="button"
              onClick={addNew}
              className="border p-1 bg-secondary text-gray-500 rounded-lg hover:bg-danger focus:ring focus:ring-slate-400 mr-3"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="border p-1 bg-danger text-white rounded-lg hover:bg-gray-400 focus:ring focus:ring-slate-400"
            >
              Submit
            </button>
          </div>
        </div>
      </form>

      {alertMessage &&  (
        <Alert value={alertMessage} />)
      }
    </>
  );
};


const EditState = ({ setEdit, stateId }) => {
  const dispatch = useDispatch();
  const states = useSelector((store) => store.state);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedState, setSelectedState] = useState(false); 
  const [alertMessage, setAlertMessage] = useState("");
  const [data, setData] = useState({
    id: stateId,
    stateCode: "",
    stateName: "",
  });

  

  const token = localStorage.getItem("token");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectState = (state) => {
    setSelectedState(state); // state is a boolean
    setIsOpen(false);
  };

  useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => {
        setAlertMessage("");
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [alertMessage]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedData = {
      id: stateId,
      stateName: data.stateName,
      stateCode: data.stateCode,
      status: selectedState, 
    };

    try {
      const result = await dispatch(editState({ data: formattedData, token })).unwrap();
      setAlertMessage("State updated successfully!");
      setData({ stateCode: "", stateName: "" });
      setSelectedState(false); // Reset to default boolean
    } catch (error) {
      setAlertMessage("Failed to update state: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <>
      <div>
        <div className="flex justify-start items-center p-9">
          <FaLeftLong className="text-md" onClick={setEdit} />
          <h2 className="ps-3 text-md">Edit State</h2>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="p-2 m-2 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="mb-4 md:col-span-1">
          <input
            name="stateName"
            value={data.stateName}
            onChange={handleChange}
            placeholder="Enter the State"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-danger focus:border-danger p-2"
          />
        </div>
        <div className="mb-4 md:col-span-1">
          <input
            name="stateCode"
            value={data.stateCode}
            onChange={handleChange}
            placeholder="Enter State Code"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-danger focus:border-danger p-2"
          />
        </div>
        <div className="mb-4 md:col-span-1 relative">
          <input
            value={selectedState ? "Active" : "Inactive"} // Display Active or Inactive
            onClick={toggleDropdown}
            placeholder="Select or type a state"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 p-2 cursor-pointer"
            readOnly
          />
          {isOpen && (
            <div className="absolute left-0 right-0 z-10 mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
              <ul className="max-h-60 overflow-auto">
                {["Active", "Inactive"].map((status, index) => (
                  <li
                    key={index}
                    className="p-2 hover:bg-blue-100 cursor-pointer"
                    onClick={() => selectState(status === "Active" ? true : false)}
                  >
                    {status}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="sx:m-5 md:absolute right-0 bottom-6 pb-3">
          <button
            type="button"
            onClick={setEdit}
            className="border p-1 bg-secondary text-gray-500 rounded-lg hover:bg-danger focus:ring focus:ring-slate-400 mr-3"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="border p-1 bg-danger text-white rounded-lg hover:bg-gray-400 focus:ring focus:ring-slate-400"
          >
            Submit
          </button>
        </div>
      </form>
      {alertMessage && <div className="alert">{alertMessage}</div>}
    </>
  );
};

export default State;
