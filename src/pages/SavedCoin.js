import React from "react";
import { Outlet } from "react-router-dom";

const SavedCoin = () => {
  return (
    <div>
      SavedCoin <Outlet />
    </div>
  );
};

export default SavedCoin;
