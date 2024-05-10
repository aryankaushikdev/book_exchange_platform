import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Login from "./Login";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
function Signup() {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      fullname: data.fullname,
      email: data.email,
      password: data.password,
      role: data.role,
    };
    await axios
      .post("http://localhost:4001/user/signup", userInfo)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          toast.success("Signup Successfully");
          navigate(from, { replace: true });
        }
        localStorage.setItem("Users", JSON.stringify(res.data.user));
      })
      .catch((err) => {
        if (err.response) {
          console.log(err);
          toast.error("Error: " + err.response.data.message);
        }
      });
  };
  return (
    <>
      <div className="flex h-screen items-center justify-center">
        <div className=" w-[600px] ">
          <div className="modal-box" >
            <form onSubmit={handleSubmit(onSubmit)} method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <Link
                to="/"
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                style={{ borderRadius: "unset" }}
              >
                ✕
              </Link>

              <h3 className="font-bold text-lg">Signup</h3>
              <div className="mt-4 space-y-2">
                <span>Name</span>
                <br />
                <input
                  type="text"
                  placeholder="Enter your fullname"
                  className="w-80 px-3 py-1 border rounded-md outline-none"
                  {...register("fullname", { required: true })}
                />
                <br />
                {errors.fullname && (
                  <span className="text-sm text-red-500">
                    This field is required
                  </span>
                )}
              </div>
              {/* Email */}
              <div className="mt-4 space-y-2">
                <span>Email</span>
                <br />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-80 px-3 py-1 border rounded-md outline-none"
                  {...register("email", { required: true })}
                />
                <br />
                {errors.email && (
                  <span className="text-sm text-red-500">
                    This field is required
                  </span>
                )}
              </div>
              {/* Password */}
              <div className="mt-4 space-y-2">
                <span>Password</span>
                <br />
                <input
                  type="text"
                  placeholder="Enter your password"
                  className="w-80 px-3 py-1 border rounded-md outline-none"
                  {...register("password", { required: true })}
                />
                <br />
                {errors.password && (
                  <span className="text-sm text-red-500">
                    This field is required
                  </span>
                )}
              </div>
              {/* Role */}
              <div className="mt-4 space-y-2 text-black">
                <span>Role</span>
                <br />
                <select
                  id="role"
                  className="w-80 px-3 py-1 border rounded-md outline-none"
                  {...register("role", { required: true })}
                >
                  <option value="">Select Role</option>
                  <option value="reader">Reader</option>
                  <option value="book_owner_share">Book Owner to share book</option>
                  <option value="book_owner_reader">Book Owner and Reader</option>
                </select>
                <br />
                {errors.role && (
                  <span className="text-sm text-red-500">Please select a role</span>
                )}
              </div>
              {/* Button */}
              <div className="flex justify-around mt-4" style={{ gap: '20px', fontSize: 'inherit' }}>
                <button className="bg-pink-500 text-white rounded-md px-3 py-1 hover:bg-pink-500 duration-200" style={{ padding: '4px 20px', height: '40px' }}>
                  Signup
                </button>
                <p className="text-xl" style={{ fontSize: 'inherit' }}>
                  Have account?{" "}
                  <button
                    style={{ fontSize: 'inherit', border: 'none', background: 'none', outline: 'none' }}
                    className="underline text-blue-500 cursor-pointer"
                    onClick={() => document.getElementById("my_modal_3").showModal()}
                  >
                    Login
                  </button>{" "}
                  <Login />
                </p>
              </div>

            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
