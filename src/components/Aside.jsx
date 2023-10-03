import { Link, useNavigate } from "react-router-dom";
import { useGetCatQuery } from "../store/apiSlice";
import { RotatingLines } from "react-loader-spinner";

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
              // setCat(`getByCategoryId/${e?.id}`);
              navigate(`/category/${e?.id}`);
              setPage(1);
              setPageCat(1);
            }}
            key={e?.id}
            className="text-main capitalize text-[24px] font-[500] tracking-[0.5px] border-b-[0.5px] border-[#908f8f] w-[100%] py-[5px] cursor-pointer hover:bg-[#908f8f16]"
          >
            {e?.categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Aside;
