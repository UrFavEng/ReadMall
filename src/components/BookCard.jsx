import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const BookCard = ({ books }) => {
  const navigate = useNavigate();
  useEffect(() => {
    window.addEventListener("scroll", () => {});

    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };
  return (
    <>
      {Array.isArray(books) ? (
        books?.map((e) => (
          <a onClick={scrollToTop} key={e?.id} className="ani-show-hide">
            <div
              onClick={() => {
                navigate(`/book/${e?.id}`);
              }}
              className="w-[100%] mx-auto border-b border-sec p-[1px] pb-0 cursor-pointer hover:translate-y-[-11px] shadow-4xl hover:shadow-3xl "
            >
              <div>
                <img loading="lazy" src={e?.coverUrl} alt={"cover book"} />
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
                <p>{e?.price ? `${e?.price / 100} $` : "Free"}</p>
              </div>
            </div>
          </a>
        ))
      ) : (
        <a onClick={scrollToTop} className="ani-show-hide">
          <div
            onClick={() => {
              navigate(`/book/${books?.id}`);
            }}
            className="w-[100%] mx-auto border-b border-sec p-[1px] pb-0 cursor-pointer hover:translate-y-[-11px] shadow-4xl hover:shadow-3xl "
          >
            <div>
              <img src={books?.coverUrl} alt={"cover book"} />
            </div>
            <div className="bg-[#1b1b1b]  min-h-[80px] flex flex-col justify-around  text-sec px-[8px] ">
              <h1
                className="text-[13px] md:text-[16px] xl:text-[17px] leading-[20px]  xl:leading-[22px] capitalize font-semibold pt-[5px] "
                dir={`${books?.lang === "ar" ? "rtl" : "ltr"}`}
              >
                {books?.title.split("").length < 50
                  ? books?.title
                  : `${books?.title.split("").slice(0, 50).join("")}...`}
              </h1>
              <p>{books?.price ? `${books?.price / 100} $` : "Free"}</p>
            </div>
          </div>
        </a>
      )}
    </>
  );
};

export default BookCard;
