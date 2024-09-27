import React, { useState } from 'react';
import { IoHomeOutline } from 'react-icons/io5';
import { PiCityLight, PiMapPinSimpleAreaThin, PiWarehouseLight } from 'react-icons/pi';
import { RiMenuFill } from 'react-icons/ri';
import { FaCaretRight } from "react-icons/fa6";

import { Link, useLocation } from 'react-router-dom';

const SideNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); 

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    if (isOpen) {
      toggleSidebar(); 
    }
  };

  return (
    <>
      <div className="md:hidden p-4 ">
        <button onClick={toggleSidebar}>
          <RiMenuFill className="text-3xl" />
        </button>
      </div>
      
      <div className={`w-full h-screen transition-transform duration-500 ${isOpen ? 'block' : 'hidden'} md:block`}>
        <ul>
          <Link to="/dash/home" onClick={handleLinkClick}>
            <li className={`pt-1 ${location.pathname === '/dash/home' ? 'bg-gray-200' : ''}`}>
              <div className='flex justify-between items-center p-2 text-sm md:text-md lg:text-md'>
                <div className='flex justify-start items-center'>
                  <IoHomeOutline />
                  <h3 className='ps-2 '>Home</h3> 
                </div>
                <FaCaretRight  className={` ${location.pathname === '/dash/home'? 'text-black' :"text-gray-400"}`}  />
              </div>
            </li>
          </Link>

          <Link to="/dash/state" onClick={handleLinkClick}>
            <li className={` ${location.pathname === '/dash/state' ? 'bg-gray-200' : ''}`}>
              <div className='flex justify-between items-center p-2 text-sm md:text-md lg:text-md'>
                <div className='flex justify-start items-center'>
                  <PiMapPinSimpleAreaThin />
                  <h3 className='ps-2'>State</h3>
                </div>
                <FaCaretRight  className={`${location.pathname=== '/dash/state'? 'text-black' :"text-gray-400"}`}   />
              </div>
            </li>
          </Link>

          <Link to="/dash/city" onClick={handleLinkClick}>
            <li className={` ${location.pathname === '/dash/city' ? 'bg-gray-200' : ''}`}>
              <div className='flex justify-between items-center p-2 text-sm md:text-md lg:text-md'>
                <div className='flex justify-start items-center'>
                  <PiCityLight />
                  <h3 className='ps-2'>City</h3>
                </div>
                <FaCaretRight   className={`${location.pathname=== '/dash/city'? 'text-black' :"text-gray-400"}`}  />
              </div>
            </li>
          </Link>

          <Link to="/dash/warehouse" onClick={handleLinkClick}>
            <li className={` ${location.pathname === '/dash/warehouse' ? 'bg-gray-200' : ''}`}>
              <div className='flex justify-between items-center p-2 text-sm md:text-md lg:text-md'>
                <div className='flex justify-start items-center'>
                  <PiWarehouseLight  />
                  <h3 className='ps-2'>Warehouse</h3>
                </div>
                <FaCaretRight   className={`${location.pathname=== '/dash/warehouse'? 'text-black' :"text-gray-400"}`}  />
              </div>
            </li>
          </Link>
        </ul>
      </div>
    </>
  );
};

export default SideNav;
