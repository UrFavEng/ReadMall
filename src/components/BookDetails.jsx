import StarRatings from "react-star-ratings";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import {
  useAddCartMutation,
  useAddFavMutation,
  useAddReviewMutation,
  useDeleteCartMutation,
  useDeleteFavMutation,
  useGetBookQuery,
  useGetReviewQuery,
} from "../store/apiSlice";
import BookCard from "./BookCard";
import { useNavigate } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import Review from "./Review";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { HiOutlineShoppingCart, HiShoppingCart } from "react-icons/hi2";
// eslint-disable-next-line react/prop-types
const BookDetails = ({ setCat, setPage, setPageCat }) => {
  const { id } = useParams();
  const [pageReview, setPageReview] = useState(1);
  const [errLogin, setErrLogin] = useState("");
  const [loadFav, setLoadFav] = useState(false);
  const [loadCrt, setLoadCrt] = useState(false);
  const { data, isLoading } = useGetBookQuery(id);
  console.log(data?.payload?.book?.isReviewed);
  const { data: dataReview, isLoading: loadingReview } = useGetReviewQuery({
    id,
    pageReview,
  });
  const details = data?.payload?.book;
  const rout = useNavigate();
  const [userRating, setUserRating] = useState(0);
  const [review, setReview] = useState();
  const [loadReview, setLoadReview] = useState(false);
  const [errAddReview, setErrAddReview] = useState();
  const [addReview] = useAddReviewMutation();
  const [deleteFav] = useDeleteFavMutation();
  const [addFav] = useAddFavMutation();
  const [addCart] = useAddCartMutation();
  const [deleteCart] = useDeleteCartMutation();
  const handleAddFav = () => {
    setLoadFav(true);
    setErrLogin("");
    const body = {
      bookId: id,
    };
    // console.log(loadFav);
    addFav(body)
      .unwrap()
      .then((fulfilled) => {
        setLoadFav(false);
        // console.log(loadFav);
        console.log(fulfilled);
        setErrLogin("");
      })
      .catch((rejected) => {
        console.error(rejected?.data?.message);
        setLoadFav(false);
        if (rejected?.status == 403) {
          setErrLogin(rejected?.data?.message);
          console.log(errLogin);
        }
      });
  };
  const deleteFavv = () => {
    setLoadFav(true);

    deleteFav(id)
      .unwrap()
      .then((fulfilled) => {
        setLoadFav(false);

        console.log(fulfilled);
      })
      .catch((rejected) => {
        console.error(rejected);
        setLoadFav(false);
      });
  };
  const handleAddCrt = () => {
    setLoadCrt(true);
    const body = {
      bookId: id,
    };
    addCart(body)
      .unwrap()
      .then((fulfilled) => {
        console.log(fulfilled);
        setLoadCrt(false);
      })
      .catch((rejected) => {
        console.error(rejected);
        setLoadCrt(false);
        if (rejected?.status == 403) {
          setErrLogin(rejected?.data?.message);
          console.log(errLogin);
        }
      });
  };
  const handleDeleteCart = () => {
    setLoadCrt(true);

    deleteCart(id)
      .unwrap()
      .then((fulfilled) => {
        console.log(fulfilled);
        setLoadCrt(false);
      })
      .catch((rejected) => {
        console.error(rejected);
        setLoadCrt(false);
      });
  };
  const nextPageReview = () => {
    if (dataReview?.payload?.numOfPages > pageReview) {
      setPageReview(pageReview + 1);
    }
  };
  const previousPageReview = () => {
    if (1 < pageReview) {
      setPageReview(pageReview - 1);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      bookId: id,
      rate: userRating,
      comment: e.target[0].value,
    };
    setLoadReview(true);
    setErrAddReview("");
    addReview(data)
      .unwrap()
      .then((fulfilled) => {
        console.log(fulfilled?.payload);
        e.target[0].value = "";
        setErrAddReview("");
        setUserRating(0);
        setReview("");
        setLoadReview(false);
      })
      .catch((rejected) => {
        console.error(rejected);
        setLoadReview(false);
        if (rejected?.status == 400) {
          setErrAddReview(rejected?.data?.message?.details[0]?.message);
        } else {
          setErrAddReview(rejected?.data?.message);
        }
      });
  };
  const handleBuy = () => {
    if (data?.payload?.book?.toBuy) {
      if (data?.payload?.book?.inCart) {
        if (loadCrt) {
          return (
            <div className="mt-[15px]">
              <RotatingLines
                strokeColor="#EF5A5A"
                strokeWidth="5"
                animationDuration="0.75"
                width="30"
                visible={true}
              />
            </div>
          );
        } else {
          return (
            <div
              className="mt-[15px]"
              onClick={() => {
                handleDeleteCart();
              }}
            >
              <HiShoppingCart className="text-[34px] text-main " />
            </div>
          );
        }
      } else {
        if (loadCrt) {
          return (
            <div className="mt-[15px]">
              <RotatingLines
                strokeColor="#EF5A5A"
                strokeWidth="5"
                animationDuration="0.75"
                width="30"
                visible={true}
              />
            </div>
          );
        } else {
          return (
            <div
              className="mt-[15px]"
              onClick={() => {
                handleAddCrt();
              }}
            >
              <HiOutlineShoppingCart className="text-[34px] text-main " />
            </div>
          );
        }
      }
    } else {
      return;
    }
  };
  const handleFav = () => {
    if (data?.payload?.book?.isFav) {
      if (loadFav) {
        return (
          <div className="mt-[15px]">
            <RotatingLines
              strokeColor="#EF5A5A"
              strokeWidth="5"
              animationDuration="0.75"
              width="30"
              visible={true}
            />
          </div>
        );
      } else {
        return (
          <div
            className="mt-[15px] ani-show-hide"
            onClick={() => {
              deleteFavv();
            }}
          >
            <MdFavorite className="text-[34px] text-main " />
          </div>
        );
      }
    } else {
      if (loadFav) {
        return (
          <div className="mt-[15px]">
            <RotatingLines
              strokeColor="#EF5A5A"
              strokeWidth="5"
              animationDuration="0.75"
              width="30"
              visible={true}
            />
          </div>
        );
      } else {
        return (
          <div
            className="mt-[15px] ani-show-hide"
            onClick={() => {
              handleAddFav();
            }}
          >
            <MdFavoriteBorder className="text-[34px] text-main " />
          </div>
        );
      }
    }
  };
  if (isLoading) {
    return (
      <>
        {" "}
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
    <div className="pb-[50px]">
      <Navbar setCat={setCat} setPage={setPage} setPageCat={setPageCat} />
      <div className="text-sec capitalize flex flex-col sm:flex-row sm:items-start  gap-[25px] px-[50px] py-[50px]">
        <div className="sm:w-[40%] ani-show-hide md:w-[38%] lg:w-[30%] xl:w-[22.5%] flex flex-col items-center sm:items-end">
          <img src={details?.coverUrl} alt="cover book" />
          <div className="flex gap-1 flex-row-reverse">
            {handleFav()}
            {handleBuy()}
          </div>{" "}
          {errLogin.length > 0 && (
            <p className=" text-main capitalize  font-medium">{errLogin}</p>
          )}
        </div>
        <div className="ani-show-hide sm:w-[45%] md:w-[58%] lg:w-[65%] xl:w-[78.5%] text-center sm:text-left">
          <h1 className="text-[28px] ani-show-hide text-main sm:text-[19px] md:text-[24px] lg:text-[28px] xl:text-[34px] tracking-[-1px] md:font-normal lg:font-medium leading-[31px] sm:leading-[23px] md:leading-[26px] lg:leading-[30px] xl:leading-[38px] lg:w-[95%] xl:w-[70%] ">
            {details?.title}
          </h1>
          <h4 className="sm:text-[16px] md:text-[18px] mt-[5px] md:mb-[10px] lg:mb-[30px] xl:mb-[20px] pl-[5px]">
            {details?.subTitle}
          </h4>
          <p className="text-[15px] font-light pl-[5px]">{details?.desc}</p>
          <p
            onClick={() => {
              rout(`/author/${details?.author?.id}`);
            }}
            className="mx-auto sm:mx-0 sm:text-[14px] md:text-[16px]  font-medium pl-[5px] cursor-pointer underline hover:text-main w-fit"
          >
            Author : {details?.author?.authorName}
          </p>
          <p className="text-[16px] font-light  pl-[5px]">
            Language : {details?.lang == "ar" ? "Arabic" : "English"}
          </p>
          <p className="text-[16px] font-light  pl-[5px]">
            {details?.pages} pages
          </p>
          <p className="text-[16px] font-light  pl-[5px]">
            price : {details?.price ? details?.price : "Free"}
          </p>
          <p
            onClick={() => {
              rout(`/publisher/${details?.publisher?.id}`);
            }}
            className="mx-auto sm:mx-0 sm:text-[14px] md:text-[16px]  font-medium pl-[5px] cursor-pointer underline w-fit hover:text-main"
          >
            Publisher : {details?.publisher?.publisherName}
          </p>
          <div className="flex gap-[8px] pl-[5px] pt-[10px] justify-center sm:justify-start">
            <a
              href={details?.bookUrl}
              download="Example-PDF-document"
              target="_blank"
              rel="noreferrer"
            >
              <button className="py-[5px] px-[8px] bg-main rounded-[8px] text-[14px]">
                Download
              </button>
            </a>
            <button className="py-[5px] px-[8px] bg-main rounded-[8px] text-[14px]">
              Read
            </button>
          </div>
        </div>
      </div>
      {/* add cmnts and rates */}
      <div className="mx-[20px] ani-show-hide md:mx-[50px] my-[20px] px-[10px] sm:px-[20px] md:px-[20px] pt-[20px] pb-[20px] sm:pb-[30px] md:pb-[20px] rounded-[5px] bg-sec">
        <h1 className="text-[28px] capitalize text-main font-medium mb-[10px]">
          reviews
        </h1>
        {data?.payload?.book?.isReviewed ? (
          <p className=" text-main ani-show-hide text-[22px] leading-[24px] font-medium">
            You have already posted a review for this book.
          </p>
        ) : (
          <div>
            <form
              className="flex ani-show-hide md:justify-center items-start md:items-end flex-wrap flex-col md:flex-row"
              action=""
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                className="mb-[20px] md:mb-[0px]     h-[50px] text-[22px] font-medium sm:pl-[15px] pl-[4px] md:pl-[5px] lg:pl-[5px] placeholder:text-[18px] border-b-[2px] border-b-main w-[100%] md:w-[70%] lg:w-[75%] outline-none bg-transparent text-[#1b1b1b]"
                placeholder="Enter a review"
              />
              <div className="md:w-[30%] lg:w-[25%] text-center ml-[-2px] md:ml-[0px]">
                <StarRatings
                  rating={userRating}
                  starRatedColor="#EF5A5A"
                  changeRating={setUserRating}
                  numberOfStars={5}
                  name="rating"
                  starDimension="30px"
                  starSpacing="0px"
                />
              </div>
              <input
                className="w-[85px] sm:w-[18%] md:w-[12%] lg:w-[8%] py-[8px] text-[18px] tracking-[1px] font-medium rounded-[5px] cursor-pointer mt-[15px] md:mt-[40px] bg-main text-sec"
                type="submit"
                value={loadReview ? "Loading" : "Submit"}
              />
            </form>
            {errAddReview && (
              <p className="text-[18px] ani-show-hide pt-[10px] md:pt-[0px] capitalize font-medium text-main">
                {errAddReview}
              </p>
            )}
          </div>
        )}

        {/* Reviews */}
        <div className="mt-[25px] ani-show-hide">
          {dataReview?.payload?.reviews?.map((review) => (
            <Review key={review.id} data={review} />
          ))}
        </div>
        {dataReview?.payload?.numOfPages > 1 && (
          <div className="mt-[20px] flex gap-3">
            <button
              onClick={previousPageReview}
              className="text-sec bg-main py-[5px] px-[12px] rounded-md  border-[1px] border-sec"
            >
              Previous
            </button>
            <button
              onClick={nextPageReview}
              className="bg-sec text-main py-[5px] px-[12px] rounded-md  border-[1px] border-main"
            >
              Next
            </button>
          </div>
        )}
      </div>
      {/* books reco */}
      <div className=" grid grid-cols-2 sm2:grid-cols-3 ani-show-hide  md:grid-cols-4 xl:grid-cols-5 gap-4 parentCards px-[20px] md:px-[50px]">
        <BookCard books={data?.payload?.recommendations} />
      </div>
    </div>
  );
};

export default BookDetails;
