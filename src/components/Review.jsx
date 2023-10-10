import { useState } from "react";
import StarRatings from "react-star-ratings";
import { AiFillDelete } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";
import {
  useDeleteReviewMutation,
  useUpdateReviewMutation,
} from "../store/apiSlice";
import { RotatingLines } from "react-loader-spinner";
const Review = ({ data }) => {
  const [deleteReview, { isLoading }] = useDeleteReviewMutation();
  const [updateReview, { isLoading: loadedit }] = useUpdateReviewMutation();
  const [errDelete, setErrDelete] = useState();
  const [showEdit, setShowEdit] = useState(false);
  const [loadDelete, setLoadDelete] = useState(false);
  const [inputValue, setInputValue] = useState(data?.comment);

  const birthDateObject = new Date(data?.createdAt);
  const day = birthDateObject.getUTCDate();
  const month = birthDateObject.getUTCMonth() + 1;
  const year = birthDateObject.getUTCFullYear();
  const formattedBirthDate = `${day}/${month}/${year}`;
  if (data?.createdAt) {
    const deathDateObject = new Date(data?.createdAt);

    const day = deathDateObject.getUTCDate();
    const month = deathDateObject.getUTCMonth() + 1;
    const year = deathDateObject.getUTCFullYear();

    var formattedDeathDate = `${day}/${month}/${year}`;
  }
  const deleteReviewF = () => {
    setErrDelete("");
    setLoadDelete(true);
    deleteReview(data.id)
      .unwrap()
      .then((fulfilled) => {
        console.log(fulfilled?.payload);
        setErrDelete("");
        setLoadDelete(false);
      })
      .catch((rejected) => {
        console.error(rejected);
        setErrDelete(rejected?.data?.message);
        setLoadDelete(false);
      });
  };
  const [userRating, setUserRating] = useState(0);
  const [review, setReview] = useState();
  const [loadReview, setLoadReview] = useState(false);
  const [errAddReview, setErrAddReview] = useState();
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrAddReview("");
    const body = {
      comment: e.target[0].value,
      rate: userRating,
    };
    const id = data?.id;
    setLoadReview(true);
    setErrAddReview("");
    updateReview({ id, body })
      .unwrap()
      .then((fulfilled) => {
        console.log(fulfilled?.payload);
        e.target[0].value = "";
        setErrAddReview("");
        setUserRating(0);
        setReview("");
        setLoadReview(false);
        setShowEdit(false);
      })
      .catch((rejected) => {
        console.error(rejected);
        setLoadReview(false);
        setErrAddReview(rejected?.data?.message);
      });
  };
  const showEditForm = (e) => {
    console.log(e);
    if (data?.user?.id == localStorage.getItem("dataUser")) {
      setShowEdit(!showEdit);
    } else {
      console.log(data?.user?.id);
      console.log(localStorage.getItem("dataUser"));
      setErrDelete("You can't edit this comment");
    }
  };
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  return (
    <>
      {" "}
      <div className=" mb-[5px] ani-show-hide flex flex-col sm:flex-row justify-start items-start gap-2 sm:gap-4">
        <div className="w-[45px] rounded-full overflow-hidden p-1">
          <img
            src={"https://avatars.githubusercontent.com/u/92646979?v=4"}
            alt=""
          />
        </div>
        <div className="bg-[#1b1b1b] rounded-md p-[15px] w-[100%] sm:w-[88%] text-sec">
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-[18px] font-medium capitalize text-sec textShadowReview">
                  {data?.user?.fullname}
                </h3>
                <p className="mt-[-8px]">
                  <StarRatings
                    rating={data?.rate}
                    starRatedColor="#EF5A5A"
                    starDimension="15px"
                    starSpacing="0px"
                    numberOfStars={5}
                    name="rating"
                  />
                </p>
              </div>
              <p className="text-[12px] text-main">{formattedDeathDate}</p>
            </div>
            <div>
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <p className="text-[17] text-sec capitalize">
                    {data?.comment}
                  </p>{" "}
                  <p className="cursor-pointer" onClick={showEditForm}>
                    <FiEdit2 className="text-[18px] text-main hover:text-sec" />
                  </p>
                </div>
                <div className="cursor-pointer" onClick={deleteReviewF}>
                  {loadDelete ? (
                    <RotatingLines
                      strokeColor="grey"
                      strokeWidth="4"
                      animationDuration=".75"
                      width="26"
                      visible={true}
                    />
                  ) : (
                    <AiFillDelete className="text-[20px] text-main hover:text-sec" />
                  )}
                </div>
              </div>
              {/* edit comnt */}
              <div className={`${showEdit ? "block" : "hidden"}`}>
                <form
                  className="flex md:justify-center items-start md:items-end flex-wrap flex-col md:flex-row"
                  action=""
                  onSubmit={handleSubmit}
                >
                  <input
                    value={inputValue}
                    type="text"
                    onChange={handleInputChange}
                    className="mb-[20px] md:mb-[0px]     h-[50px] text-[22px] font-medium sm:pl-[15px] pl-[4px] md:pl-[5px] lg:pl-[5px] placeholder:text-[18px] border-b-[2px] border-b-main w-[100%] md:w-[70%] lg:w-[75%] outline-none bg-transparent text-sec"
                    placeholder="Edit your Comment"
                  />
                  <div className="md:w-[30%] lg:w-[25%] text-center ml-[-2px] md:ml-[0px]">
                    <StarRatings
                      rating={userRating}
                      starRatedColor="#EF5A5A"
                      changeRating={setUserRating}
                      numberOfStars={5}
                      name="rating"
                      starDimension="20px"
                      starSpacing="0px"
                    />
                  </div>
                  <input
                    className="w-[85px] sm:w-[18%] md:w-[12%] lg:w-[6%] py-[5px] text-[18px] tracking-[1px] font-medium rounded-[5px] cursor-pointer mt-[15px] md:mt-[15px] bg-main text-sec"
                    type="submit"
                    value={loadReview ? "Loading" : "Edit"}
                  />
                </form>
                {errAddReview && (
                  <p className="text-[18px] pt-[10px] md:pt-[0px] capitalize font-medium text-main">
                    {errAddReview}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {errDelete && (
        <p className="text-main capitalize text-[18px] sm:ml-[65px] py-[10px]">
          {errDelete}
        </p>
      )}
    </>
  );
};

export default Review;
