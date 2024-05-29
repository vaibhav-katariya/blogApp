import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setUser } from "../store/userSlice";
import { getRefresh } from "../store/blogSlice";
const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/v2/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      dispatch(setUser(result));
      if (res.ok) {
        setMessage(result.message || "Login successful!");
        navigate("/");
        setData({
          email: "",
          password: "",
        });
        dispatch(getRefresh())
      } else {
        setMessage(result.error || "Login failed!");
      }
    } catch (error) {
      console.log("log error", error.error);
      setMessage("An error occurred. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="h-screen w-full bg-zinc-900 text-white flex flex-col justify-center items-center">
      <form
        onSubmit={submitHandler}
        className="border-[1px] md:w-1/2 border-zinc-800 md:p-10 rounded-lg p-5"
      >
        <h2 className="text-center mb-3 text-2xl text-zinc-600">Login</h2>
        <div>
          <input
            className="w-full px-3 focus:bg-zinc-800 py-2 placeholder:text-lg my-3 rounded-lg bg-zinc-800 outline-none"
            type="email"
            name="email"
            placeholder="Email"
            id="email"
            value={data.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            className="w-full focus:bg-zinc-800 px-3 py-2 placeholder:text-lg my-3 rounded-lg bg-zinc-800 outline-none"
            type="password"
            placeholder="Password"
            name="password"
            id="password"
            value={data.password}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="py-2 w-full px-3 rounded-lg text-md mt-5 bg-blue-500"
        >
          Submit
        </button>
        <p className="my-2 text-center">
          Already have account?{" "}
          <Link to="/sign-up" className="text-blue-500 underline">
            Sign-up
          </Link>
        </p>
        {message && <p className="text-center my-2">{message}</p>}
      </form>
    </div>
  );
};

export default Login;
