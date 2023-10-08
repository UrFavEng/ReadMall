import React from "react";
import { useGetCatQuery } from "../store/apiSlice";
import { useNavigate } from "react-router-dom";

const NavCat = ({ setCat, setPage }) => {
  const navigate = useNavigate();

  const { data, isLoading, isError } = useGetCatQuery();
  const cats = data?.payload?.categories;
  // console.log(cats);
  return (
    <div className="absolute top-[163.9%] sm2:top-[156.5%] right-[0px] z-40 md:hidden ">
      {" "}
      <ul className="cats text-center sticky top-[250px] w-[100%]">
        {cats?.map((e) => (
          <li
            onClick={() => {
              setCat(`getByCategoryId/${e?.id}`);
              navigate(`/cat/${e?.id}`);
              setPage(1);
            }}
            key={e?.id}
            className="text-sec bg-[#777] capitalize text-[19px] font-[500] tracking-[1px] border-b-[0.5px] border-[#908f8f] w-[100%] py-[8px]  px-[28px] cursor-pointer "
          >
            {e?.categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NavCat;
