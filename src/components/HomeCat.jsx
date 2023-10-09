import { useState } from "react";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import { useGetBooksByCatQuery } from "../store/apiSlice";
import Aside from "./Aside";
import BookCard from "./BookCard";
import { RotatingLines } from "react-loader-spinner";

const HomeCat = ({ setCat, setPage, pageCat, setPageCat }) => {
  const { id } = useParams();
  // const [pageCat, setPageCat] = useState(1);

  const { data, isLoading } = useGetBooksByCatQuery({ id, pageCat });
  console.log(data?.payload, isLoading);

  const nextPage = () => {
    if (pageCat < data?.payload?.numOfPages) {
      setPageCat(pageCat + 1);
      console.log(data?.payload?.books);
    }
  };
  const previousPage = () => {
    if (pageCat > 1) {
      setPageCat(pageCat - 1);
    }
  };
  return (
    <div className="h-[auto] ">
      <Navbar setCat={setCat} setPage={setPage} setPageCat={setPageCat} />
      <div className="flex min-h-[90vh]">
        <Aside setPageCat={setPageCat} />
        {isLoading ? (
          <div className="flex-1 md:flex-[3] lg:flex-[4] xl:flex-[5] flex justify-center items-center">
            <RotatingLines
              strokeColor="grey"
              strokeWidth="4"
              animationDuration="0.75"
              width="90"
              visible={true}
            />
          </div>
        ) : (
          <div className="bg-[#1b1b1b] p-[20px] md:flex-[3] lg:flex-[4] xl:flex-[5]  pt-[15px]">
            <div className=" grid grid-cols-2 sm2:grid-cols-3 sm:grid-cols-4 md:grid-cols-3  lg:grid-cols-4 xl:grid-cols-5 gap-4 parentCards">
              <BookCard books={data?.payload?.books} />
            </div>
            <div className="text-sec flex gap-3 justify-center items-center pt-[35px] pb-[10px]">
              <button
                className="p-[10px] bg-main rounded-[10px] "
                onClick={() => {
                  previousPage();
                }}
              >
                Previous
              </button>
              <button
                className="p-[10px] bg-main rounded-[10px]"
                onClick={() => {
                  nextPage();
                }}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeCat;
