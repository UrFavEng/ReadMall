import { DevTool } from "@hookform/devtools";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSignUpMutation } from "../store/apiSlice";
import { useState } from "react";
import { RotatingLines } from "react-loader-spinner";
const Signup = () => {
  const rout = useNavigate();
  const [loading, setLoading] = useState(false);
  const [longPass, setLongPass] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });
  const [signUp, result] = useSignUpMutation();

  const OnSubmit = (data) => {
    setLongPass(false);

    setLoading(true);
    signUp(data)
      .unwrap()
      .then((fulfilled) => {
        console.log(fulfilled?.payload);
        setLoading(false);
        setLongPass(false);

        // rout("/");
        localStorage.setItem("token", `${fulfilled?.payload?.token}`);
        rout("/");
      })
      .catch((rejected) => {
        setLoading(false);
        console.error(rejected?.status);
        if (rejected?.status == 404) {
          console.log(404);
          setLongPass(true);
        }
      });
  };
  // console.log(result?.payload);
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
        onSubmit={handleSubmit(OnSubmit)}
        noValidate
        className="flex items-center justify-center flex-col gap-[15px] mb-[10px]"
      >
        <input
          {...register("fullname", { required: "Name is required" })}
          placeholder="Enter Your Name"
          type="text"
          className="border-0 outline-0 bg-white text-black pl-[10px]  w-[280px] md:w-[350px] h-[45px] focus:border-b-[1px] focus:border-black"
        />
        {errors.name?.message && (
          <p className="w-[100%] tracking-[1px] leading-[5px] text-[17] font-medium text-main py-[5px]">
            {errors.name?.message}
          </p>
        )}
        <input
          {...register("email", {
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "invalid email address",
            },
            validate: {
              notAdmin: (fieldValue) => {
                return (
                  fieldValue !== "admin@example.com" ||
                  "Enter a different email address"
                );
              },
              notBlackListed: (fieldValue) => {
                return (
                  !fieldValue.endsWith("baddomain.com") ||
                  "This domain is not supported"
                );
              },
            },
          })}
          placeholder="Enter Your Email"
          type="text"
          className="border-0 outline-0 bg-white text-black pl-[10px]  w-[280px] md:w-[350px] h-[45px] focus:border-b-[1px] focus:border-black"
        />
        {errors.email?.message && (
          <p className="w-[100%] tracking-[1px] leading-[5px] text-[17] font-medium text-main py-[5px]">
            {errors.email?.message}
          </p>
        )}
        <input
          {...register("password")}
          placeholder="Enter Your Password"
          type="password"
          className="border-0 outline-0 bg-white text-black pl-[10px] w-[280px]  md:w-[350px] h-[45px] focus:border-b-[1px] focus:border-black"
        />
        {longPass && <p>password length must be at least 8 characters long</p>}
        {loading ? (
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="36"
            visible={true}
          />
        ) : (
          <input
            type="submit"
            value="Create Account"
            className="bg-main text-sec border-sec border-[1px] w-[180px] md:w-[300px] h-[40px] rounded-[10px] text-[20px] font-[600] mb-[10px]"
          />
        )}
      </form>
      <DevTool control={control} />
      <p className="text-[#777]">
        Already have an account ?{" "}
        <span
          onClick={() => {
            rout("/signin");
          }}
          className="text-black cursor-pointer"
        >
          Log in here
        </span>
      </p>
    </div>
  );
};

export default Signup;
