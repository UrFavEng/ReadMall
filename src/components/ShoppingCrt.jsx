import { useNavigate } from "react-router-dom";

const ShoppingCrt = ({ book }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        navigate(`/book/${book?.id}`);
      }}
      className="flex gap-5  text-sec w-[95%] sm:w-[100%] lg:w-[400px] xl:w-[470px] border-b border-sec mx-auto   cursor-pointer hover:translate-y-[-11px] shadow-4xl hover:shadow-3xl"
    >
      <div className="w-[95px]">
        <img src={book?.coverUrl} alt="" className="max-w-[105px] h-full" />
      </div>
      <div className="flex flex-col justify-between py-[5px] pr-[5px]">
        <h1 className="  md:text-[18px] md:tracking-[-0.5px] font-medium capitalize leading-[20px]">
          {book?.title}
        </h1>
        <p>{book?.price / 100} $</p>
      </div>
    </div>
  );
};

export default ShoppingCrt;
