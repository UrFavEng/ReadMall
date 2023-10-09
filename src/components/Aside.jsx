import { useNavigate } from "react-router-dom";
import { useGetCatQuery } from "../store/apiSlice";
import { MdFavoriteBorder } from "react-icons/md";
import { HiOutlineShoppingCart } from "react-icons/hi2";

const Aside = ({ setCat, setPage, setPageCat }) => {
  const navigate = useNavigate();

  const { data, isLoading, isError } = useGetCatQuery();
  if (isLoading) {
    return;
    // <div>
    //   <RotatingLines
    //     strokeColor="grey"
    //     strokeWidth="5"
    //     animationDuration="0.75"
    //     width="36"
    //     visible={true}
    //   />
    // </div>
  }
  const cats = data?.payload?.categories;
  return (
    <div className="bg-sec h-[auto]  sticky flex-[1] hidden md:block ">
      <ul className="cats text-center sticky top-[250px] w-[100%]">
        {cats?.map((e) => (
          <li
            onClick={() => {
              navigate(`/category/${e?.id}`);
              setPageCat(1);
            }}
            key={e?.id}
            className="text-main capitalize text-[24px] font-[500] tracking-[0.5px] border-b-[0.5px] border-[#908f8f] w-[100%] py-[5px] cursor-pointer hover:bg-[#908f8f16]"
          >
            {e?.categoryName}
          </li>
        ))}
        {localStorage.getItem("token") && (
          <>
            <li
              onClick={() => {
                navigate(`/favorites/allFavorites/books`);
                setPageCat(1);
              }}
              className="text-main flex  gap-1 justify-center items-center capitalize text-[24px] font-[500] tracking-[0.5px] border-b-[0.5px] border-[#908f8f] w-[100%] py-[5px] cursor-pointer hover:bg-[#908f8f16]"
            >
              Favourite{" "}
              <MdFavoriteBorder className="text-[26px] text-main mt-[6px]" />
            </li>
            <li
              onClick={() => {
                navigate(`/carts/allCartBooks/books`);
                setPageCat(1);
              }}
              className="text-main flex  gap-1 justify-center items-center capitalize text-[24px] font-[500] tracking-[0.5px] border-b-[0.5px] border-[#908f8f] w-[100%] py-[5px] cursor-pointer hover:bg-[#908f8f16]"
            >
              Cart{" "}
              <HiOutlineShoppingCart className="text-[26px] text-main mt-[6px] " />
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Aside;
