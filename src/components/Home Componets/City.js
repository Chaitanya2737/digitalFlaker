import React, { useEffect, useState } from "react";
import CompNav from "../CompNav/CompNav";
import { PiCityLight } from "react-icons/pi";
import { FaLeftLong } from "react-icons/fa6";
import Table from "../Table";
import { status, city } from "../../utils/support";
import { useDispatch, useSelector } from "react-redux";
import { addCites, editCities, getCites } from "../../api/api";
import Alert from "../Alert";

const City = () => {
  const [edit, setEdit] = useState(false);
  const [addCity, setAddCity] = useState(false);
  const [cityId, setCityId] = useState(null);
  const [getId, setId] = useState(null);
  const [isRemoving, setIsRemoving] = useState(false);

  const dispatch = useDispatch();
  const select = useSelector((store) => store.Cites);
  const token = localStorage.getItem("token");
  useEffect(() => {
    try {
      dispatch(getCites(token));
    } catch (error) {}
  }, [dispatch, token]);

  const handleToggleAddCity = () => {
    setAddCity(!addCity);
    setEdit(false);
  };

  const handleToggleEdit = () => {
    setEdit(!edit);
  };
  const handleToggleRemove = () => {
    setIsRemoving(!isRemoving);
  };
  console.log(getId)

  return (
    <>
      <CompNav
        components={<PiCityLight className="text-lg" />}
        name={"City"}
        addNew={handleToggleAddCity}
      />

      {addCity ? (
        <AddCity addNew={handleToggleAddCity} />
      ) : edit ? (
        <EditCity setEdit={handleToggleEdit} stateId={getId} />
      ) : (
        <Table
          data={select.data}
          remove={handleToggleRemove}
          edit={handleToggleEdit}
          Id={setId}
        />
      )}
    </>
  );
};

const AddCity = ({ addNew }) => {
  const dispatch = useDispatch();
  const cities = useSelector((store) => store.Cities);

  const [alertMessage, setAlertMessage] = useState("");
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState("");
  const [data, setData] = useState({
    cityCode: "",
    cityName: "",
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
      cityCode: data.cityCode,
      cityName: data.cityName,
    };

    try {
      const result = await dispatch(
        addCites({ data: formattedData, token })
      ).unwrap();
      setAlertMessage("City added successfully!");
      setData({ cityCode: "", cityName: "" });
      setSelectedCity("");
    } catch (error) {
      setAlertMessage(
        "Failed to add city: " + (error.response?.data || error.message)
      );
    }
  };

  return (
    <>
      <div>
        <div className="flex justify-start items-center p-9">
          <FaLeftLong onClick={addNew} className="text-md" />
          <h2 className="ps-3 text-md">Add City</h2>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="p-2 m-2 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* City Name Input */}
          <div className="mb-4 md:col-span-1">
            <input
              type="text"
              placeholder="Enter City Name"
              required
              name="cityName"
              value={data.cityName}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-danger focus:border-danger p-2"
            />
          </div>

          {/* City Code Input */}
          <div className="mb-4 md:col-span-1">
            <input
              id="city-code-input"
              type="text"
              placeholder="Enter City Code"
              required
              name="cityCode"
              value={data.cityCode}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-danger focus:border-danger p-2"
            />
          </div>

          {/* State (City) Dropdown */}
          <div className="mb-4 md:col-span-1 relative">
            <input
              value={selectedCity}
              onClick={toggleCityDropdown}
              placeholder="Select or type a state"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 p-2 cursor-pointer"
              readOnly
            />

            {/* Dropdown options */}
            {isCityDropdownOpen && (
              <div className="absolute left-0 right-0 z-10 mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                <ul className="max-h-60 overflow-auto">
                  {city.map((item, index) => (
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

const EditCity = ({ setEdit, stateId }) => {
  const dispatch = useDispatch();
  const states = useSelector((store) => store.Cites); 
  const [isOpen, setIsOpen] = useState(false);
  const [selectedState, setSelectedState] = useState(false); 
  const [alertMessage, setAlertMessage] = useState("");
  const [Dropdown, setDropdown] = useState("");
  const [isCity, setIsCity] = useState(false);

  const [data, setData] = useState({
    cityCode: "",
    cityName: ""
  });

  const token = localStorage.getItem("token");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleCity = () => {
    setIsCity(!isCity);
  };

  const selectState = (state) => {
    setSelectedState(state); 
    setIsOpen(false);
  };

  useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => {
        setAlertMessage("");
      }, 5000);
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
      cityName: data.cityName,
      stateName: Dropdown,
      cityCode: data.cityCode,
      status: isCity,
    };

    try {
      const result = await dispatch(editCities({ data: formattedData, token })).unwrap();
      setAlertMessage("City updated successfully!");
      setData({ cityCode: "", cityName: "" });
      setSelectedState(false);
    } catch (error) {
      setAlertMessage("Failed to update city: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <>
      <div>
        <div className="flex justify-start items-center p-9">
          <FaLeftLong className="text-md" onClick={setEdit} />
          <h2 className="ps-3 text-md">Edit City</h2>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="p-2 m-2 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="mb-4 md:col-span-1">
          <input
            name="cityName"
            value={data.cityName}
            onChange={handleChange}
            placeholder="Enter the City"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-danger focus:border-danger p-2"
          />
        </div>
        <div className="mb-4 md:col-span-1">
          <input
            name="cityCode"
            value={data.cityCode}
            onChange={handleChange}
            placeholder="Enter City Code"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-danger focus:border-danger p-2"
          />
        </div>
        <div className="mb-4 md:col-span-1 relative">
          <input
            value={selectedState ? "Active" : "Inactive"}
            onClick={toggleDropdown}
            placeholder="Select City Status"
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

        <div className="mb-4 md:col-span-1 relative">
          <input
            value={Dropdown}
            onClick={toggleCity}
            placeholder="Select or type a city"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 p-2 cursor-pointer"
            readOnly
          />
          {isCity && (
            <div className="absolute left-0 right-0 z-10 mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
              <ul className="max-h-60 overflow-auto">
                {city.map((city, index) => ( // assuming states hold city info, change if required
                  <li
                    key={index}
                    className="p-2 hover:bg-blue-100 cursor-pointer"
                    onClick={() => setDropdown(city)} // assuming city has a name field
                  >
                    {city}
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


export default City;
