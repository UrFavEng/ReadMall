import { Link, useParams } from "react-router-dom";
import BookCard from "./BookCard";
import { RotatingLines } from "react-loader-spinner";
const Home = ({ books, maxPage, setPage, page, setCat, loadingHomePage }) => {
  const { id } = useParams();
  const nextPage = () => {
    if (page < maxPage) {
      setPage(page + 1);
    }
  };
  const previousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  if (loadingHomePage) {
    return (
      <div className="flex-1 md:flex-[3] lg:flex-[4] xl:flex-[5] flex justify-center items-center">
        <RotatingLines
          strokeColor="grey"
          strokeWidth="4"
          animationDuration="0.75"
          width="90"
          visible={true}
        />
      </div>
    );
  }
  return (
    <div className="bg-[#1b1b1b] p-[20px] md:flex-[3] lg:flex-[4] xl:flex-[5]  pt-[15px]">
      {!id && (
        <div className="text-sec flex gap-3 justify-center items-center pb-[15px]">
          <button
            className="p-[10px] bg-main  tracking-[1px] font-medium"
            onClick={() => {
              setCat("getRecentlyUploaded");
              setPage(1);
            }}
          >
            <Link to="/">Recently Uploaded</Link>
          </button>
          <button
            className="p-[10px] bg-main  tracking-[1px] font-medium"
            onClick={() => {
              setCat("getByViews");
              setPage(1);
            }}
          >
            <Link to={"/"}>Most View</Link>
          </button>
        </div>
      )}

      <div className=" grid grid-cols-2 sm2:grid-cols-3 sm:grid-cols-4 md:grid-cols-3  lg:grid-cols-4 xl:grid-cols-5 gap-4 parentCards">
        <BookCard books={books} />
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
  );
};

export default Home;
