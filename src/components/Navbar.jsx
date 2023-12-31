import { useState } from "react";
import { AiFillSetting, AiOutlineSearch } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";

import {
  useGetCatQuery,
  useGetFavOrCartQuery,
  useGetMeQuery,
  useRenameMutation,
} from "../store/apiSlice";
import { AiFillCloseCircle } from "react-icons/ai";
import { MdFavoriteBorder, MdVerified } from "react-icons/md";
import { useForm } from "react-hook-form";
import { HiOutlineShoppingCart } from "react-icons/hi2";
const Navbar = ({ setCat, setPage, setPageCat }) => {
  const type = "carts";
  const name = "allCartBooks";
  const { data: numcrt } = useGetFavOrCartQuery({ type, name });
  // console.log(numcrt?.payload?.books.length);
  const rout = useNavigate();
  const [renamme] = useRenameMutation();
  const [reset, setReset] = useState("");
  const [errName, setErrName] = useState(false);
  const [loading, setLoading] = useState("");
  const [showInputPass, setShowInputPass] = useState(false);
  const [showInputName, setShowInputName] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });
  const handleRename = (data) => {
    setLoading(true);
    setErrName(false);
    renamme(data)
      .unwrap()
      .then((fulfilled) => {
        console.log(fulfilled?.payload);
        setLoading(false);
        setErrName(false);
      })
      .catch((rejected) => {
        setLoading(false);
        setErrName(true);

        console.error(rejected);
      });
  };
  const [show, setShow] = useState(false);
  const handelSearch = (e) => {
    e.preventDefault();
    const valSearch = document.querySelector("form .val");
    if (valSearch?.value !== "") {
      rout(`/searchresulte/${valSearch?.value}`);
      valSearch.value = "";
    }
  };
  const handelSearchSM = (e) => {
    e.preventDefault();
    const valSearch = document.querySelector("form .vall");
    if (valSearch?.value !== "") {
      rout(`/searchresulte/${valSearch?.value}`);
      valSearch.value = "";
    }
  };
  const navigate = useNavigate();

  const { data } = useGetCatQuery();
  const cats = data?.payload?.categories;
  const { data: tokendetails, error: errorGetMe } = useGetMeQuery();
  // console.log(tokendetails);
  const [showLinks, setShowLinks] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <div
        className={`bg-main flex justify-around   ${
          show ? "pb-[10px]" : "pb-[15px]"
        }  pt-[15px] md:py-[20px] items-center`}
      >
        <h1
          className="text-sec text-[26px] sm:text-[30px] font-medium tracking-[1px] cursor-pointer"
          onClick={() => {
            setCat("getRecentlyUploaded");
            setPage(1);
            setShow(false);
            setPageCat(1);
          }}
        >
          <Link to="/"> ReadMall</Link>
        </h1>
        <form className="hidden md:block" onSubmit={handelSearch}>
          <input
            placeholder="Search"
            type="text"
            className="h-[35px] w-[300px] border-0 outline-0 pl-[10px] text-[#374151] bg-sec val"
          />
          <input
            type="submit"
            value={"Search"}
            className="border-[1px] outline-none border-sec h-[35px] w-[65px] cursor-pointer text-sec bg-main"
          />
        </form>
        <div className="flex gap-[6px] sm:gap-3 items-center ">
          {errorGetMe?.data?.error ? (
            ""
          ) : (
            <div className="relative block md:hidden">
              <HiOutlineShoppingCart
                className="text-sec text-[33px] sm:text-[35px] cursor-pointer "
                onClick={() => {
                  navigate(`/carts/allCartBooks/books`);
                }}
              />
              <span
                onClick={() => {
                  navigate(`/carts/allCartBooks/books`);
                }}
                className="  cursor-pointer absolute h-[17px] font-semibold w-[17px] text-[13px]  bottom-[-12px] left-[-5px] rounded-full bg-sec text-main flex justify-center items-center leading-[10px]"
              >
                {numcrt?.payload?.books.length}
              </span>
            </div>
          )}
          <AiOutlineSearch
            className="text-sec text-[33px] sm:text-[35px] cursor-pointer block md:hidden"
            onClick={() => setShow(!show)}
          />{" "}
          <div
            className="hambars"
            onClick={() => {
              // navcat?.classList?.toggle("hidden");
              setShowLinks(!showLinks);
            }}
          >
            <GiHamburgerMenu className="text-sec text-[33px] sm:text-[35px] cursor-pointer block md:hidden" />
          </div>
          {errorGetMe?.data?.error ? (
            <>
              <span className="hidden md:flex text-main bg-sec h-[30px] sm:h-[35px] w-[45px] sm:w-[55px] rounded-[8px] sm:rounded-[10px]  justify-center items-center font-medium text-[14px] sm:text-[16px] cursor-pointer">
                <Link to="/login">Login</Link>
              </span>
            </>
          ) : (
            <>
              <div className="relative hidden md:block">
                <HiOutlineShoppingCart
                  className="text-sec text-[35px] cursor-pointer "
                  onClick={() => {
                    navigate(`/carts/allCartBooks/books`);
                  }}
                />
                <span
                  onClick={() => {
                    navigate(`/carts/allCartBooks/books`);
                  }}
                  className=" cursor-pointer absolute h-[20px] font-semibold w-[20px] text-[14px]  bottom-[-12px] left-[-5px] rounded-full bg-sec text-main flex justify-center items-center leading-[10px]"
                >
                  {numcrt?.payload?.books.length}
                </span>
              </div>
              <AiFillSetting
                onClick={() => {
                  setShowDetails(!showDetails);
                }}
                className="hidden md:block text-sec text-[28px] sm:text-[35px] cursor-pointer"
              />
              <span className="hidden md:flex text-main bg-sec h-[30px] sm:h-[35px] w-[45px] sm:w-[55px] rounded-[8px] sm:rounded-[10px]  justify-center items-center font-medium text-[14px] sm:text-[16px] cursor-pointer">
                <Link
                  to={""}
                  onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("dataUser");
                    navigate(`/`);

                    location.reload();
                  }}
                >
                  Log out
                </Link>
              </span>
            </>
          )}
          {showLinks && (
            <div className="navcat ani-show-hide z-40  md:hidden navcat w-[220px] shadowNavSet sm2:w-[240px] rounded-[15px]">
              <div
                onClick={() => {
                  // navcat?.classList?.toggle("hidden");
                  setShowLinks(false);
                }}
              ></div>
              <ul className="cats ani-show-hide text-center sticky top-[250px] w-[100%] rounded-[15px] shadowNavSet overflow-hidden">
                {/* links cats */}
                {cats?.map((e) => (
                  <li
                    onClick={() => {
                      navigate(`/category/${e?.id}`);
                      setPageCat(1);
                      setPage(1);
                      // navcat.classList.add("hidden");
                      setShowLinks(false);
                    }}
                    key={e?.id}
                    className="text-sec hover:bg-[#000000b3] py-[10px] sm2:py-[12px] bg-[#8a8a8a] capitalize text-[22px] font-[500] tracking-[1px] border-b-[0.5px] border-[#908f8f] w-[100%]   px-[28px] cursor-pointer "
                  >
                    {e?.categoryName}
                  </li>
                ))}
                {/* check login or not */}
                {errorGetMe?.data?.error ? (
                  <li
                    onClick={() => {
                      navigate(`/login`);
                      // navcat.classList.add("hidden");
                      setShowLinks(false);
                    }}
                    className="text-sec hover:bg-[#000000d5] py-[12px] flex justify-center items-center gap-1 bg-[#777] capitalize text-[21px] font-[500] tracking-[1px] border-b-[0.5px] border-[#908f8f] w-[100%]   px-[28px] cursor-pointer "
                  >
                    Sign in / Sign up
                  </li>
                ) : (
                  <>
                    <li
                      onClick={() => {
                        navigate(`/favorites/allFavorites/books`);
                        setPageCat(1);
                        setShowLinks(false);
                      }}
                      className="text-sec flex justify-center gap-1 hover:bg-[#000000b3] py-[10px] sm2:py-[12px] bg-[#8a8a8a] capitalize text-[22px] font-[500] tracking-[1px] border-b-[0.5px] border-[#908f8f] w-[100%]   px-[28px] cursor-pointer "
                    >
                      Favourite{" "}
                      <MdFavoriteBorder className="text-[26px] text-sec mt-[6px]" />
                    </li>
                    <li
                      onClick={() => {
                        navigate(`/carts/allCartBooks/books`);
                        setPageCat(1);
                        setShowLinks(false);
                      }}
                      className="text-sec flex justify-center gap-1 hover:bg-[#000000b3] py-[10px] sm2:py-[12px] bg-[#8a8a8a] capitalize text-[22px] font-[500] tracking-[1px] border-b-[0.5px] border-[#908f8f] w-[100%]   px-[28px] cursor-pointer "
                    >
                      Cart{" "}
                      <HiOutlineShoppingCart className="text-[26px] text-sec mt-[6px] " />
                    </li>
                    <li
                      onClick={() => {
                        setShowLinks(false);
                        setShowDetails(true);
                      }}
                      className="text-sec hover:bg-[#000000d5] py-[12px] flex justify-center items-center gap-1 bg-[#777] capitalize text-[22px] font-[500] tracking-[1px] border-b-[0.5px] border-[#908f8f] w-[100%]   px-[28px] cursor-pointer "
                    >
                      Setting
                    </li>
                    {/* <li
                      onClick={() => {
                        localStorage.removeItem("token");
                        localStorage.removeItem("userData");
                        location.reload();
                      }}
                      className="text-sec hover:bg-[#000000d5] py-[12px] flex justify-center items-center gap-1 bg-[#777] capitalize text-[22px] font-[500] tracking-[1px] border-b-[0.5px] border-[#908f8f] w-[100%]   px-[28px] cursor-pointer "
                    >
                      Log out
                    </li> */}
                  </>
                )}
              </ul>
            </div>
          )}
          {/* personal-details */}
          {showDetails && (
            <div className=" z-40 personal-details  ani-show-hide">
              <div
                onClick={() => {
                  setShowDetails(false);
                }}
                className="personal-details-overlay"
              ></div>
              <ul className="text-sec rounded-[15px] overflow-hidden w-[290px] sm2:w-[360px] z-[41] relative border-[2px] shadowNavSet border-sec  bg-main px-[20px] sm:pl-[30px] pt-[20px] sm:pt-[30px] pb-[15px] sm:pb-[20px]">
                <li className="flex gap-[15px] items-center mb-[15px]">
                  <img
                    className="w-[45px] h-[45px] sm2:w-[55px] sm2:h-[55px] rounded-[50%]"
                    src={tokendetails?.payload?.user?.avatarUrl}
                    alt=""
                  />
                  <span className=" flex items-center gap-[5px] text-[19px] sm2:text-[22px] font-medium capitalize tracking-[1px] text-center">
                    {tokendetails?.payload?.user?.fullname}{" "}
                    {tokendetails?.payload?.user?.verified && (
                      <span className="text-white text-[14px] mt-[5px]">
                        <MdVerified />
                      </span>
                    )}
                  </span>
                </li>
                <li className="mb-[8px] text-[18px] ">
                  Email : {tokendetails?.payload?.user?.email}
                </li>
                {/* btns for edit pass and name */}
                <li className="mt-[25px] flex gap-[15px] cursor-pointer">
                  <button
                    onClick={() => {
                      setShowInputPass(true);
                      setShowInputName(false);
                    }}
                    className="bg-sec text-main py-[5px] px-[8px] rounded-[6px] cursor-pointer"
                  >
                    Reset Password
                  </button>{" "}
                  <button
                    onClick={() => {
                      setReset("name");
                      setShowInputPass(false);
                      setShowInputName(true);
                    }}
                    className="bg-sec text-main py-[5px] px-[8px] rounded-[6px] cursor-pointer capitalize"
                  >
                    Edit your name
                  </button>
                </li>
                {/* edit password */}
                {showInputPass && (
                  <li>Working</li>
                  // <li className="pt-3">
                  //   <form action="" className="flex  items-center">
                  //     <input
                  //       className="border-none pl-[4px] placeholder:text-[14px] placeholder:text-main bg-sec text-main outline-none w-[65%] h-[30px]"
                  //       type="password"
                  //       placeholder={`Enter your new password`}
                  //     />
                  //     <input
                  //       className="border  border-sec  h-[30px] cursor-pointer outline-none w-[25%] py-[2px] px-[4px]"
                  //       type="submit"
                  //       value={"Submit"}
                  //     />
                  //     <span
                  //       className="pl-[5px] cursor-pointer text-sec"
                  //       onClick={() => {
                  //         setShowInputPass(false);
                  //         setShowInputName(false);
                  //       }}
                  //     >
                  //       <AiFillCloseCircle />
                  //     </span>
                  //   </form>
                  // </li>
                )}
                {/* edit name */}
                {showInputName && (
                  <li className="pt-3">
                    <form
                      action=""
                      className="flex  items-center"
                      onSubmit={handleSubmit(handleRename)}
                      noValidate
                    >
                      <input
                        {...register("fullname", {
                          required: "Name is required",
                        })}
                        className="border-none pl-[6px] text-[17px] capitalize font-medium placeholder:text-[14px] placeholder:text-main bg-sec text-main outline-none w-[65%] h-[30px]"
                        type="text"
                        name="fullname"
                        placeholder={`Enter your new name`}
                      />
                      <input
                        className="border  border-sec  h-[30px] cursor-pointer outline-none w-[25%] py-[2px] px-[4px]"
                        value={`${loading ? "Loading..." : "Submit"}`}
                        type={"Submit"}
                      />
                      <span
                        className="pl-[5px] cursor-pointer text-sec"
                        onClick={() => {
                          setShowInputPass(false);
                          setShowInputName(false);
                          setErrName(false);
                        }}
                      >
                        <AiFillCloseCircle />
                      </span>
                    </form>
                    {errName && (
                      <p className="text-sec capitalize text-[12px] pt-[10px] font-medium">
                        "fullname" length must be at least 4 characters long
                      </p>
                    )}
                  </li>
                )}
                <li
                  onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("userData");
                    rout("/");
                    location.reload();
                  }}
                  className=" cursor-pointer  block md:hidden text-[16px] font-medium mt-[10px] ml-[0px] py-[8px] bg-sec border border-sec text-main rounded-lg w-fit px-[5px]"
                >
                  Log out
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      {/* form for small screen */}
      {show && (
        <form
          onSubmit={handelSearchSM}
          className="flex md:hidden bg-main py-[10px] justify-center items-center"
        >
          <input
            placeholder="Search"
            type="text"
            className="h-[32px] w-[50%] border-0 outline-0 pl-[10px] text-[#374151] bg-sec vall"
          />
          <input
            type="submit"
            value={"Search"}
            className="border-[1px] border-sec h-[32px] w-[65px] cursor-pointer text-sec bg-main"
          />
        </form>
      )}
    </>
  );
};

export default Navbar;
