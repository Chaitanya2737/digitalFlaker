import React from 'react';
import { CiSearch } from 'react-icons/ci';

const CompNav = ({ components, name ,  addNew}) => {
  return (
    <nav className="flex items-center justify-between px-6 bg-gray-100">
      <div className="flex items-center p-4">
        {components  }
        <h3 className="px-3 text-md font-bold">{name}</h3>
      </div>

      <div className="flex items-center bg-white rounded-lg w-1/2">
        <CiSearch className="mx-3 text-lg" />
        <input 
          type="text" 
          placeholder="Search..." 
          className="w-full h-90 rounded-lg text-md border-0 focus:outline-none focus:ring-0 "
        />
      </div>

      <div>
        <button onClick={addNew} className="border p-1 bg-danger text-white rounded-lg hover:bg-gray-400 focus:ring focus:ring-slate-400">
          Add New
        </button>
      </div>
    </nav>
  );
};

export default CompNav;
