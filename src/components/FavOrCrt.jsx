import { useState } from "react";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import { useGetFavOrCartQuery } from "../store/apiSlice";
import BookCard from "./BookCard";
import { RotatingLines } from "react-loader-spinner";

const FavOrCrt = ({ setCat, setPage, setPageCat }) => {
  let { type, name } = useParams();
  const [pageBook, setPageBook] = useState(1);

  const { data, isLoading } = useGetFavOrCartQuery({
    type,
    name,
    pageBook,
  });
  console.log(data?.payload?.numOfPages);
  const nextPage = () => {
    if (pageBook < data?.payload?.numOfPages) {
      setPageBook(pageBook + 1);
    }
  };
  const previousPage = () => {
    if (pageBook > 1) {
      setPageBook(pageBook - 1);
    }
  };
  return (
    <div>
      <Navbar setCat={setCat} setPage={setPage} setPageCat={setPageCat} />
      {isLoading ? (
        <div className=" flex justify-center items-center h-[90vh]">
          <RotatingLines
            strokeColor="grey"
            strokeWidth="4"
            animationDuration="0.75"
            width="90"
            visible={true}
          />
        </div>
      ) : (
        <>
          <div className=" grid grid-cols-2  sm:grid-cols-3 md:grid-cols-4  lg:grid-cols-4 xl:grid-cols-5 gap-4 p-[15px] parentFavCrt">
            {data?.payload?.books?.map((book) => (
              <BookCard key={book?.bookId} books={book?.book} />
            ))}
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
        </>
      )}
    </div>
  );
};

export default FavOrCrt;
