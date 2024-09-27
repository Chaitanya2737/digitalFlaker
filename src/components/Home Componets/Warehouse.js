import React, { useEffect, useState } from 'react'
import Table from '../Table';
import { PiWarehouseLight } from 'react-icons/pi';
import CompNav from '../CompNav/CompNav';
import { FaLeftLong } from 'react-icons/fa6';
import { status , city } from "../../utils/support"
import { useDispatch, useSelector } from 'react-redux';
import { addWarehouse, editWarehouse, getWarehouse } from '../../api/api';
import Alert from '../Alert';


const Wearhouse = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [isRemoving, setIsRemoving] = useState(false);
    const [isAddingNew, setIsAddingNew] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [getId , setId] = useState(null)
  
    const dispatch = useDispatch();
    const select = useSelector((store) => store.Warehouse);
    const token = localStorage.getItem("token");
  
    console.log(select)
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          await dispatch(getWarehouse(token));
        } catch (err) {
          setError(err.message || "Failed to fetch states.");
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchData();
    }, [dispatch , token]);
  
    const handleToggleRemove = () => {
      setIsRemoving(!isRemoving);
    };
  
    const handleToggleEdit = () => {
      setIsEditing(!isEditing);
    };
  
    const handleToggleAdd = () => {
      setIsAddingNew(!isAddingNew);
    };
  
    if (isLoading) {
      return <div>Loading...</div>; 
    }
  
    if (error) {
      return <div className="alert alert-danger">{error}</div>; 
    }
    return (
      <>
        <CompNav components={<PiWarehouseLight  className="text-lg"/>} name={'Warehouse'} addNew ={handleToggleAdd} />
  
        {isAddingNew ? (
          <AddWareHouse addNew={handleToggleAdd} /> 
        ) : (
          isEditing ? (
            <EditWareHouse setEdit={ handleToggleEdit} warehouseId= {getId} />
          ) : (
            <Table remove={handleToggleRemove} edit={handleToggleEdit} data= {select.data} Id ={setId} />
          )
        )}
      </>
    );
}



const AddWareHouse = ({ addNew  }) => {
  const dispatch = useDispatch();
  const warehouse = useSelector((store) => store.warehouse); 

  const [alertMessage, setAlertMessage] = useState("");
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState("");
  const [data, setData] = useState({
    cityName :"", warehouseName : ""
  });

  const token = localStorage.getItem("token");

  const toggleCityDropdown = () => {
    setIsCityDropdownOpen(!isCityDropdownOpen);
  };

  const selectCity = (city) => {
    setSelectedCity(city);
    setIsCityDropdownOpen(false);
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
      stateName: selectedCity,
      warehouseName: data.warehouseName,
      cityName: data.cityName,
    };

    try {
      const result = await dispatch(addWarehouse({data:formattedData, token })).unwrap();
      setAlertMessage("City added successfully!");
      setData({ warehouseName: "", cityName: "" });
      setSelectedCity(""); 
    } catch (error) {
      setAlertMessage("Failed to add city: " + (error.response?.data || error.message));
    }
  };

  return (
    <>
      <div>
        <div className="flex justify-start items-center p-9">
          <FaLeftLong onClick={addNew} className="text-md" />
          <h2 className="ps-3 text-md">Add Warehouse</h2>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="p-2 m-2 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* warehouse Name Input */}
          <div className="mb-4 md:col-span-1">
            <input
              type="text"
              placeholder="Enter warehouse Name"
              required
              name="warehouseName"
              value={data.warehouseName}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-danger focus:border-danger p-2"
            />
          </div>

          {/* City   Input */}
          <div className="mb-4 md:col-span-1">
            <input
              id="city-code-input"
              type="text"
              placeholder="Enter City Code"
              required
              name="cityName"
              value={data.cityName}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-danger focus:border-danger p-2"
            />
          </div>

          {/* State (City) Dropdown */}
          <div className="mb-4 md:col-span-1 relative">
            <input
              value={selectedCity}
              name='stateName'
              onClick={toggleCityDropdown}
              placeholder="Select or type a state"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 p-2 cursor-pointer"
              readOnly
            />

            {/* Dropdown options */}
            {isCityDropdownOpen && (
              <div className="absolute left-0 right-0 z-10 mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                <ul className="max-h-60 overflow-auto">
                  {city.map((item, index) => ( // Ensure this uses the correct variable
                    <li
                      key={index}
                      className="p-2 hover:bg-blue-100 cursor-pointer"
                      onClick={() => selectCity(item)}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Submit and Cancel Buttons */}
        <div className="sx:m-5 md:absolute right-0 bottom-6 pb-3">
          <button
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
      </form>

      {alertMessage && <Alert value={alertMessage} />}
    </>
  );
};


const EditWareHouse = ({ setEdit , warehouseId }) => {
  const [isStateDropdownOpen, setIsStateDropdownOpen] = useState(false);
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const dispatch = useDispatch();
  const warehouse = useSelector((store) => store.Warehouse);
  const token = localStorage.getItem("token")
  const [alertMessage, setAlertMessage] = useState("");

  const [data , setData] = useState({
    warehouseName:"", cityName:"",
  })
  const toggleStateDropdown = () => {
    setIsStateDropdownOpen(!isStateDropdownOpen);
  };

  const toggleCityDropdown = () => {
    setIsCityDropdownOpen(!isCityDropdownOpen);
  };

  const selectState = (state) => {
    setSelectedState(state);
    setIsStateDropdownOpen(false);
  };

  const selectCity = (city) => {
    setSelectedCity(city);
    setIsCityDropdownOpen(false);
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
      id: warehouseId,
      warehouseName: data.warehouseName,
      cityName: data.cityName,
      status: selectedState  === "Active", 
      stateName: selectedCity,
    };

    try {
      const result = await dispatch(editWarehouse({ data: formattedData, token })).unwrap();
      setAlertMessage("State updated successfully!");
      setData({ cityName: "", warehouseName: "" });
      setSelectedState(false);
    } catch (error) {
      setAlertMessage("Failed to update state: " + (error.response?.data?.message || error.message));
    }
  };


  return (
    <>
      <div>
        <div className="flex justify-start items-center p-9">
          <FaLeftLong className="text-md" onClick={setEdit} />
          <h2 className="ps-3 text-md">Edit WareHouse</h2>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
      <div className="p-2 m-2 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="mb-4 md:col-span-1">
          <input
            name='warehouseName'
            value={data.warehouseName}
            onChange={handleChange}
            type="text"
            placeholder="Warehouse Name"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-danger focus:border-danger p-2"
          />
        </div>
        <div className="mb-4 md:col-span-1">
          <input
            name='cityName'
            type="text"
            onChange={handleChange}
            placeholder="city"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-danger focus:border-danger p-2"
          />
        </div>

        <div className="mb-4 md:col-span-1 relative">
          <input
            value={selectedCity}
            onClick={toggleCityDropdown}
            placeholder="Select or type a city"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 p-2 cursor-pointer"
            readOnly
          />

          {isCityDropdownOpen && (
            <div className="absolute left-0 right-0 z-10 mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
              <ul className="max-h-60 overflow-auto">
                {city.map((city, index) => (
                  <li
                    key={index}
                    className="p-2 hover:bg-blue-100 cursor-pointer"
                    onClick={() => selectCity(city)}
                  >
                    {city}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="mb-4 md:col-span-1 relative">
          <input
            value={selectedState}
            onClick={toggleStateDropdown}
            placeholder="Select or type a state"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 p-2 cursor-pointer"
            readOnly
          />

          {isStateDropdownOpen && (
            <div className="absolute left-0 right-0 z-10 mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
              <ul className="max-h-60 overflow-auto">
                {status.map((state, index) => (
                  <li
                    key={index}
                    className="p-2 hover:bg-blue-100 cursor-pointer"
                    onClick={() => selectState(state)}
                  >
                    {state}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="sx:m-5 md:absolute right-0 bottom-6 pb-3">
          <button
            onClick={setEdit}
            className="border p-1 bg-secondary text-gray-500 rounded-lg hover:bg-danger focus:ring focus:ring-slate-400 mr-3"
          >
            Cancel
          </button>
          <button type='submit' className="border p-1 bg-danger text-white rounded-lg hover:bg-gray-400 focus:ring focus:ring-slate-400">
            Submit
          </button>
        </div>
      </div>
      </form>
    </>
  );
};


export default Wearhouse