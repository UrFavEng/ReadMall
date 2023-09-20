import {
  useGetBookByAuthorQuery,
  useGetDetailAuthorQuery,
} from "../store/apiSlice";
import BookCard from "./BookCard";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";

const AuthorDetails = ({ setCat, setPage }) => {
  const { id } = useParams();
  const { data } = useGetDetailAuthorQuery(id);
  const { data: bookAuthor } = useGetBookByAuthorQuery(id);
  const details = data?.payload?.author;
  //   const formattedDate = new Date(details?.deathDate);
  const birthDateObject = new Date(details?.deathDate);

  // استخراج اليوم والشهر والسنة من الكائن Date
  const day = birthDateObject.getUTCDate();
  const month = birthDateObject.getUTCMonth() + 1; // تبدأ الشهور من 0
  const year = birthDateObject.getUTCFullYear();

  // قم بتنسيق التاريخ بناءً على القيم المستخرجة
  const formattedBirthDate = `${day}/${month}/${year}`;
  if (details?.deathDate) {
    const deathDateObject = new Date(details?.deathDate);

    // استخراج اليوم والشهر والسنة من الكائن Date
    const day = deathDateObject.getUTCDate();
    const month = deathDateObject.getUTCMonth() + 1; // تبدأ الشهور من 0
    const year = deathDateObject.getUTCFullYear();

    // قم بتنسيق التاريخ بناءً على القيم المستخرجة
    var formattedDeathDate = `${day}/${month}/${year}`;
  }
  return (
    <div>
      <Navbar setCat={setCat} setPage={setPage} />
      <div className="text-sec capitalize flex flex-col sm:flex-row items-center sm:items-start  gap-[25px] px-[50px] py-[50px]">
        <div className="sm:w-[40%] md:w-[38%] lg:w-[30%] xl:w-[22.5%]">
          <img src={details?.authorAvatarUrl} alt="cover book" />
        </div>
        <div className=" sm:w-[45%] md:w-[58%] lg:w-[65%] xl:w-[78.5%] text-center sm:text-left">
          <h1 className="text-[30px] sm:text-[22px] md:text-[26px] lg:text-[30px] xl:text-[36px] tracking-[-1px] md:font-normal lg:font-medium leading-[31px] sm:leading-[23px] md:leading-[26px] lg:leading-[30px] xl:leading-[38px] lg:w-[95%] xl:w-[70%] sm:mt-[40px] ">
            {details?.authorName}
          </h1>
          <p className="text-[15px] font-light pl-[5px] my-[10px]">
            {details?.bio ? details?.bio : "No bio"}
          </p>
          <p className="text-[15px] font-light pl-[5px]  mb-[10px]">
            BirthDate : {formattedBirthDate}
          </p>
          {details?.deathDate && (
            <p className="text-[15px] font-light pl-[5px]  ">
              DeathDate : {formattedDeathDate}
            </p>
          )}
        </div>
      </div>
      <h1 className="text-[40px] text-sec text-center my-[20px]">
        Some Books By The Author
      </h1>
      <div className="px-[20px] grid grid-cols-2 sm2:grid-cols-3 sm:grid-cols-4 md:grid-cols-3  lg:grid-cols-4 xl:grid-cols-5 gap-4 parentCards">
        <BookCard books={bookAuthor?.payload?.books} />
      </div>
    </div>
  );
};

export default AuthorDetails;
