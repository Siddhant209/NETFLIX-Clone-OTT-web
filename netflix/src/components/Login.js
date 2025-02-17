import { useForm } from "react-hook-form";
import { useState } from "react";
import backGround_img from "../data/images/Login_background_img.jpg";
import { apiEndPoints } from "../utils/constant";
import toast from "react-hot-toast";
import { useFormContext } from "../context/FormContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const FormComponent = () => {
  const {setFormData}=useFormContext();
  const navigate =useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm();
  const [Login, setLogin] = useState(true); // State for login or signup

  // Toggle Login and Signup Modes
  const toggleLogin = () => {
    setLogin(!Login);

    // Reset all fields and clear errors when toggling modes
    setValue("FullName", "");
    setValue("Email", "");
    setValue("Password", "");
    reset();
    clearErrors();
  };

  const onSubmit = (data) => {
    // Exclude unnecessary fields based on mode
    if (Login) {
      delete data.FullName;

      axios
        .post("http://localhost:3000/api/v1/users/Login",data,{
          headers:{
            'Content-Type':'application/json'
          },
          withCredentials:true
         })
        .then((response) => {
          toast.success(response.data.message)
          setFormData(response.data);
          setTimeout(() => {
           navigate("/Browse"); // ✅ Redirect to login after success
         }, 1000); // Delay navigation for better UX
         }) // ✅ This should be fine
        .catch((error) => {
          // ✅ Ensure error is a string before passing it to toast.error()
          const errorMessage =
            error.response?.data?.message ||
            JSON.stringify(error.response?.data) ||
            error.message;
          toast.error(errorMessage);
        });
    } else {
      axios
        .post(`http://localhost:3000/api/v1/users/Registration`, data)
        .then((response) =>{
           toast.success(response.data.message)
           setTimeout(() => {
           setLogin(true)// ✅ Redirect to login after success
          }, 2000); // Delay navigation for better UX
          }) // ✅ This should be fine
        .catch((error) => {
          // ✅ Ensure error is a string before passing it to toast.error()
          const errorMessage =
            error.response?.data?.message ||
            JSON.stringify(error.response?.data) ||
            error.message;
          toast.error(errorMessage);
        });
    } // Log the submitted data
    reset();
  };
  return (
    <>
      <div className="absolute top-0 left-0 w-full h-full">
        <img
          className="w-full h-full object-cover"
          src={backGround_img}
          alt="Background"
        />
      </div>
      <div className="flex items-center justify-center min-h-screen absolute top-0 left-0 w-full">
        <form
          className="flex flex-col w-3/12 p-12 opacity-90 bg-black rounded-md"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h3 className="text-3xl text-white text-center mb-5 font-bold">
            {Login ? "LOGIN" : "SIGNUP"}
          </h3>
          <div className="flex flex-col w-full">
            {/* FullName Field (Only for Signup) */}
            {!Login && (
              <div className="w-full">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="outline-none cursor-pointer p-3 my-2 w-full rounded-sm bg-gray-800 text-white"
                  {...register("FullName", {
                    required: !Login ? "Full Name is required." : false,
                  })}
                />
                {errors.FullName && (
                  <p className="text-red-500 text-sm">
                    {errors.FullName.message}
                  </p>
                )}
              </div>
            )}

            {/* Email Field */}
            <div className="w-full">
              <input
                type="email"
                placeholder="Email"
                className="outline-none p-3 my-2 w-full cursor-pointer rounded-sm bg-gray-800 text-white"
                {...register("Email", {
                  required: "Email is required.",
                })}
              />
              {errors.Email && (
                <p className="text-red-500 text-sm">{errors.Email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="w-full">
              <input
                type="password"
                placeholder="Password"
                className="outline-none cursor-pointer p-3 my-2 w-full rounded-sm bg-gray-800 text-white"
                {...register("Password", {
                  required: "Password is required.",
                })}
              />
              {errors.Password && (
                <p className="text-red-500 text-sm">
                  {errors.Password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="text-white mt-6 p-3 w-full rounded-sm font-medium"
              style={{ backgroundColor: "rgb(229, 9, 20)" }}
            >
              {Login ? "LOGIN" : "SIGNUP"}
            </button>

            {/* Toggle Login/Signup */}
            <p className="text-white mt-4 text-center">
              {Login ? "New to Netflix?" : "Already have an account?"}{" "}
              <span
                onClick={toggleLogin}
                className="ml-1 font-medium cursor-pointer"
                style={{ color: "rgb(229, 9, 20)" }}
              >
                {Login ? "Sign Up" : "Login"}
              </span>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};
export default FormComponent;
