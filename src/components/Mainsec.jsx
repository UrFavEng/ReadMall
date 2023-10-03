import { useEffect, useState } from "react";
import { useGetBooksQuery } from "../store/apiSlice";
import Aside from "./Aside";
import Home from "./Home";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const Mainsec = ({ setId, setCat, setPage }) => {
  //   if (isLoading) {
  //     return "Loading";
  //   }

  return (
    <div className="h-[auto] ">
      <Navbar setCat={setCat} setPage={setPage} />
      <div className="flex min-h-[90vh]">
        <Aside setId={setId} setCat={setCat} setPage={setPage} />
        <Outlet />
      </div>
    </div>
  );
};

export default Mainsec;
