import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import BookCard from "./BookCard";
import { useGetSearchBookQuery } from "../store/apiSlice";
import { RotatingLines } from "react-loader-spinner";

const SearchResulte = ({ setCat, setPage, setPageCat }) => {
  let { name } = useParams();

  const { data: dataBooks, isLoading } = useGetSearchBookQuery(name);
  console.log(dataBooks?.payload?.books);
  console.log(isLoading);
  if (isLoading) {
    return (
      <>
        <Navbar setCat={setCat} setPage={setPage} setPageCat={setPageCat} />
        <div className="flex justify-center items-center h-[92vh]">
          <RotatingLines
            strokeColor="grey"
            strokeWidth="4"
            animationDuration="0.75"
            width="90"
            visible={true}
          />
        </div>
      </>
    );
  }
  return (
    <div>
      <Navbar setCat={setCat} setPage={setPage} />
      {dataBooks?.payload?.books.length > 0 ? (
        <div className=" grid grid-cols-2  sm:grid-cols-3 md:grid-cols-4  lg:grid-cols-4 xl:grid-cols-5 gap-4  p-[25px]">
          <BookCard books={dataBooks?.payload?.books} />
        </div>
      ) : (
        <h1 className="text-sec text-[40px] font-semibold text-center mt-[60px]">
          Not Found
        </h1>
      )}
    </div>
  );
};

export default SearchResulte;
