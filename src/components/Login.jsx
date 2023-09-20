import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const rout = useNavigate();
  return (
    <div className="flex justify-center items-center relative h-[100vh] flex-col bg-main text-sec">
      <div
        onClick={() => {
          rout("/");
        }}
        className="absolute top-4 left-4 tracking-[1px] text-[25px] cursor-pointer font-medium"
      >
        ReadMall
      </div>
      <h1 className="tracking-[1px] md:tracking-[1.5px] text-[90px] md:text-[120px]">
        ReadMall
      </h1>
      <p className="tracking-[1.5px] text-[18px] mt-[25px] md:mt-[10px] font-[500] mb-[16px] md:mb-[20px]">
        Read Without Limits{" "}
      </p>
      <button
        onClick={() => {
          rout("/signin");
        }}
        className="bg-sec text-main w-[250px] md:w-[300px] h-[40px] rounded-[10px] text-[20px] font-[600] mb-[15px]"
      >
        Sign in
      </button>
      <button
        onClick={() => {
          rout("/signup");
        }}
        className="bg-main text-sec border-sec border-[1px] w-[250px] md:w-[300px] h-[40px] rounded-[10px] text-[20px] font-[600] mb-[10px]"
      >
        Sign up
      </button>
    </div>
  );
};

export default Login;
