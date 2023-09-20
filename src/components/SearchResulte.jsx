import React from "react";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import BookCard from "./BookCard";
import { useGetSearchBookQuery } from "../store/apiSlice";

const SearchResulte = ({ setCat, setPage }) => {
  let { name } = useParams();

  const { data: dataBooks } = useGetSearchBookQuery(name);
  console.log(dataBooks?.payload?.books);
  return (
    <div>
      <Navbar setCat={setCat} setPage={setPage} />
      <div className=" grid grid-cols-2  sm:grid-cols-3 md:grid-cols-4  lg:grid-cols-4 xl:grid-cols-5 gap-4  p-[25px]">
        <BookCard books={dataBooks?.payload?.books} />
      </div>
    </div>
  );
};

export default SearchResulte;
