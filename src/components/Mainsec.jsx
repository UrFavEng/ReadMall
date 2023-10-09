import Aside from "./Aside";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const Mainsec = ({ setId, setCat, setPage, setPageCat }) => {
  //   if (isLoading) {
  //     return "Loading";
  //   }

  return (
    <div className="h-[auto] ">
      <Navbar setCat={setCat} setPage={setPage} setPageCat={setPageCat} />
      <div className="flex min-h-[90vh]">
        <Aside
          setId={setId}
          setCat={setCat}
          setPage={setPage}
          setPageCat={setPageCat}
        />
        <Outlet />
      </div>
    </div>
  );
};

export default Mainsec;
