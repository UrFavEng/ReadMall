import React from "react";
import Navbar from "./Navbar";
import {
  useGetBooksPublisherQuery,
  useGetDetailPublisherQuery,
} from "../store/apiSlice";
import { useParams } from "react-router-dom";
import BookCard from "./BookCard";
import { RotatingLines } from "react-loader-spinner";

const PublisherDetails = ({ setCat, setPage }) => {
  const { id } = useParams();
  const { data, isLoading } = useGetDetailPublisherQuery(id);
  const { data: books } = useGetBooksPublisherQuery(id);
  const details = data?.payload?.publisher;
  console.log(details);
  if (isLoading) {
    return (
      <>
        <Navbar setCat={setCat} setPage={setPage} />
        <div className="flex justify-center items-center h-[91vh]">
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="76"
            visible={true}
          />
        </div>
      </>
    );
  }
  return (
    <div>
      {" "}
      <Navbar setCat={setCat} setPage={setPage} />
      <div className="py-[20px]">
        <h1 className="text-sec text-[45px] capitalize text-center tracking-[1px] font-medium">
          {details?.publisherName}
        </h1>
        <p className="text-sec text-[20px]  text-center tracking-[1px] ">
          {" "}
          {details?.license}
        </p>
      </div>
      <h1 className="text-[40px] text-sec text-center mb-[20px]">
        Some Books By The Publiser
      </h1>
      <div className="px-[20px] grid grid-cols-2 sm2:grid-cols-3 sm:grid-cols-4 md:grid-cols-3  lg:grid-cols-4 xl:grid-cols-5 gap-4 parentCards pb-[20px]">
        <BookCard books={books?.payload?.books} />
      </div>
    </div>
  );
};

export default PublisherDetails;
