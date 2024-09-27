import React from "react";
import SideNav from "./components/SideNav";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import State from "./components/Home Componets/State";

import City from "./components/Home Componets/City";
import Warehouse from "./components/Home Componets/Warehouse";
import Home from "./components/Home Componets/home";
import Auth from "./components/Auth/Auth";

const App = () => {

  return (
    <>
    
    <Router>
      <Routes>
      <Route path="/" element={<Auth />} />
    
        <Route path="/dash/*" element={<DashBoardLayout />} />
      </Routes>
    </Router>
    </>
  );
};

const DashBoardLayout = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="md:col-span-1 lg:col-span-1">
        <div className="rounded-2xl bg-gray-100">
          <SideNav />
        </div>
      </div>
      <div className="col-span-1 md:col-span-3 lg:col-span-3 relative">
        <div className="rounded-2xl bg-gray-100 lg:h-screen">
          <DashRoutes />
        </div>
      </div>
    </div>
  );
};

const DashRoutes = () => {
  return (
    <Routes>
      <Route path="home" element={<Home />} />
      <Route path="state" element={<State />} />
      <Route path="city" element={<City />} />
      <Route path="warehouse" element={<Warehouse />} />
    </Routes>
  );
};

export default App;
