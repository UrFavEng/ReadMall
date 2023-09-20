import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSigninMutation } from "../store/apiSlice";
import { DevTool } from "@hookform/devtools";

const Signin = () => {
  const rout = useNavigate();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });
  const [signin, result] = useSigninMutation();

  const OnSubmit = async (data) => {
    await signin(data);
    console.log(result);
    if (result?.status == "fulfilled") {
      rout("/");
      result?.data?.payload?.token &&
        localStorage.setItem("token", `${result?.data?.payload?.token}`);
    }
  };
  return (
    <div className="flex justify-center items-center relative h-[100vh] flex-col bg-sec text-main">
      <div
        onClick={() => {
          rout("/");
        }}
        className="absolute top-4 left-4 tracking-[1px] text-[25px] cursor-pointer font-medium"
      >
        ReadMall
      </div>
      <h1 className="tracking-[1px] md:tracking-[1.5px] text-[90px] md:text-[120px] mb-[30px]">
        ReadMall
      </h1>
      <form
        noValidate
        onSubmit={handleSubmit(OnSubmit)}
        className="flex items-center justify-center flex-col gap-[15px] mb-[10px]"
      >
        <input
          {...register("email", { required: "Email is required" })}
          placeholder="Enter Your Email"
          type="text"
          className="border-0 outline-0 bg-white text-black pl-[10px]  w-[280px] md:w-[350px] h-[45px] focus:border-b-[1px] focus:border-black"
        />
        <input
          {...register("password")}
          placeholder="Enter Your Password"
          type="password"
          className="border-0 outline-0 bg-white text-black pl-[10px] w-[280px]  md:w-[350px] h-[45px] focus:border-b-[1px] focus:border-black"
        />
        <input
          type="submit"
          value="Log In"
          className="bg-main outline-none text-sec border-sec border-[1px] w-[180px] md:w-[300px] h-[40px] rounded-[10px] text-[20px] font-[600] mb-[10px]"
        />
      </form>
      <DevTool control={control} />
      <p className="text-[#777]">
        Don't have an account yet?
        <span
          className="text-black cursor-pointer"
          onClick={() => {
            rout("/signup");
          }}
        >
          Sign up here
        </span>
      </p>
    </div>
  );
};

export default Signin;
