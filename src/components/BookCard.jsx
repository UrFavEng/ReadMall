import { useNavigate } from "react-router-dom";

const BookCard = ({ books }) => {
  const navigate = useNavigate();

  return (
    <>
      {books?.map((e) => (
        <div
          onClick={() => {
            navigate(`/book/${e?.id}`);
          }}
          key={e?.id}
          className="w-[100%] mx-auto border-b border-sec p-[1px] pb-0 cursor-pointer hover:translate-y-[-11px] shadow-4xl hover:shadow-3xl "
        >
          <div>
            <img src={e?.coverUrl} alt={"cover book"} />
          </div>
          <div className="bg-[#1b1b1b]  min-h-[80px] flex flex-col justify-around  text-sec px-[8px] ">
            <h1
              className="text-[13px] md:text-[16px] xl:text-[17px] leading-[20px]  xl:leading-[22px] capitalize font-semibold pt-[5px] "
              dir={`${e?.lang === "ar" ? "rtl" : "ltr"}`}
            >
              {e?.title.split("").length < 50
                ? e?.title
                : `${e?.title.split("").slice(0, 50).join("")}...`}
            </h1>
            <p>{e?.price ? e?.price : "Free"}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default BookCard;