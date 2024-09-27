import React from 'react';
import { CiEdit } from 'react-icons/ci';
import { MdDeleteOutline } from 'react-icons/md';
import PropTypes from 'prop-types';

const Table = ({ data=[], remove, edit, Id }) => {

  if (data.length === 0) {
    return "data empty"
  }
  const handleEdit = (id) => {
    Id(id); 
    edit();  
  };

  const statusMap = {
    true: "Active",
    false: "Inactive",
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 text-left">Id</th>
            {data.some(item => item.warehouseName) && <th className="p-2 text-left">Warehouse Name</th>}
            {data.some(item => item.cityName) && <th className="p-2 text-left">City Name</th>}
            {data.some(item => item.stateName) && <th className="p-2 text-left">State</th>}
            {data.some(item => item.stateCode) && <th className="p-2 text-left">State Code</th>}
            {data.some(item => item.cityCode) && <th className="p-2 text-left">City Code</th>}
            {data.some(item => item.status !== undefined) && <th className="p-2 text-left">Status</th>}
            <th className="p-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item._id || index}>
              <td className="p-2">{index + 1}</td>
              {item.warehouseName && <td className="p-2">{item.warehouseName}</td>}
              {item.stateName && <td className="p-2">{item.stateName}</td>}
              {item.stateCode && <td className="p-2">{item.stateCode}</td>}
              {item.cityName && <td className="p-2">{item.cityName}</td>}
              {item.cityCode && <td className="p-2">{item.cityCode}</td>}
              {item.status !== undefined && (
                <td className="p-2">{statusMap[item.status] || "Unknown"}</td>
              )}
              <td className="p-2">
                <div className="flex space-x-4 justify-start items-center">
                  <button
                    onClick={() => handleEdit(item._id)}
                    className="text-danger text-lg hover:underline"
                  >
                    <CiEdit />
                  </button>
                  <button
                    onClick={() => remove(item._id)}
                    className="text-danger text-lg hover:underline"
                  >
                    <MdDeleteOutline />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};



export default Table;
