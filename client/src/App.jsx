import React from "react";
import { Outlet } from "react-router-dom";
const App = () => {
  return (
    <div className="bg-zinc-800 text-zinc-50 min-h-screen">
      App
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default App;
