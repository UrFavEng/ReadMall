import { useEffect, useRef, useState } from "react";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import { useGetFavOrCartQuery } from "../store/apiSlice";
import BookCard from "./BookCard";
import { RotatingLines } from "react-loader-spinner";
import ShoppingCrt from "./ShoppingCrt";
import axios from "axios";

// eslint-disable-next-line react/prop-types
const FavOrCrt = ({ setCat, setPage, setPageCat }) => {
  const [loadingCheck, setLoadingCheck] = useState(false);
  const iframeRef = useRef();

  const handleCheckoutClick = () => {
    setLoadingCheck(true);
    const checkoutUrl = "https://readmall.onrender.com/api/v1/orders/checkout";
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: "application/json, text/plain, */*",
      "Content-type": "application/json",
    };

    axios
      .get(checkoutUrl, { headers })
      .then((response) => {
        setLoadingCheck(false);
        iframeRef.current.src = checkoutUrl;

        console.log(response);
        // window.location.href = response?.data;
      })
      .catch((error) => {
        setLoadingCheck(false);

        console.error(error);
      });
  };

  let { type, name } = useParams();
  // const [pageBook, setPageBook] = useState(1);
  const [books, setBooks] = useState([]);
  const { data, isLoading } = useGetFavOrCartQuery({
    type,
    name,
  });
  useEffect(() => {
    setBooks(data?.payload?.books);
  }, [data?.payload?.books]);
  if (type === "carts") {
    let price = 0;
    for (let i = 0; i < books?.length; i++) {
      price += books[i].book.price;
    }
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
            {data?.payload?.books.length > 0 ? (
              <div className="flex  lg:items-center  flex-col lg:flex-row mt-[20px] lg:ml-[0px] justify-between  mb-[25px]">
                <div className="grid  sm:grid-cols-2 gap-[20px] sm:mx-[15px] lg:flex-[4] xl:flex-[3]">
                  {books?.map((book) => (
                    <ShoppingCrt key={book?.book?.id} book={book?.book} />
                  ))}
                </div>
                <iframe ref={iframeRef} title="إطار الدفع"></iframe>
                <div className=" text-main md:flex-1 text-center ">
                  <div>
                    <h1 className=" text-[35px] lg:text-[20px] xl:text-[30px] font-semibold mt-[20px] lg:mt-[0px]">
                      Total :{" "}
                      <span className="text-[40px] text-sec lg:text-[30px] xl:text-[40px]">
                        {price / 100} $
                      </span>
                    </h1>
                    {loadingCheck ? (
                      <div className=" flex justify-center">
                        {" "}
                        <RotatingLines
                          strokeColor="#EF5A5A"
                          strokeWidth="5"
                          animationDuration="0.75"
                          width="40"
                          visible={true}
                        />
                      </div>
                    ) : (
                      <button
                        onClick={() => handleCheckoutClick()}
                        className="text-sec bg-main text-[22px] sm:text-[30px] lg:text-[20px] xl:text-[24px]  leading-[20px] sm:leading-[30px] lg:leading-[20px]  border-sec border-[1px] rounded-xl py-[10px] px-[8px] mt-[20px] lg:mt-[10px] xl:mt-[20px]"
                      >
                        {loadingCheck ? "Loading" : "Check out"}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-main text-[40px] mt-[80px] font-semibold text-center">
                No Books
              </p>
            )}
          </>
        )}
      </div>
    );
  }
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
          {data?.payload?.books.length > 0 ? (
            <div className=" grid grid-cols-2  sm:grid-cols-3 md:grid-cols-4  lg:grid-cols-4 xl:grid-cols-5 gap-4 p-[15px] ">
              {books?.map((book) => (
                <BookCard key={book?.bookId} books={book?.book} />
              ))}
            </div>
          ) : (
            <p className="text-main text-[40px] mt-[80px] font-semibold text-center">
              No Books
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default FavOrCrt;
