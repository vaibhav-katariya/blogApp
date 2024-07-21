import React, { useRef, useState } from "react";
import { BsCloudUpload } from "react-icons/bs";
import { Link } from "react-router-dom";
import Gauth from "../components/Gauth";

const Signup = () => {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const imageRef = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("password", data.password);
    if (image) {
      formData.append("avatar", image);
    }

    try {
      const res = await fetch("https://blogapp-backend-6xke.onrender.com/api/v2/users/register", {
        method: "POST",
        body: formData,
      });
      const result = await res.json();
      console.log("Response status:", res.status);
      console.log("Response data:", result);

      if (res.ok) {
        setMessage("Registration successful!");
        setData({
          username: "",
          email: "",
          password: "",
        });
      } else {
        setMessage(result.error || "Registration failed!");
      }
    } catch (error) {
      console.log("log error", error);
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

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className="h-screen w-full text-white flex flex-col justify-center items-center">
      <form
        onSubmit={submitHandler}
        className="border-[1px] w-full md:w-1/2 border-zinc-800 md:p-10 rounded-lg p-1"
      >
        <h2 className="text-center mb-3 text-2xl text-zinc-600">Sign up</h2>
        <div>
          <input
            className="w-full focus:bg-zinc-800 px-3 py-2 placeholder:text-lg my-3 rounded-lg bg-zinc-800 outline-none"
            type="text"
            name="username"
            placeholder="Name"
            id="name"
            value={data.username}
            onChange={handleChange}
          />
        </div>
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
        <div>
          <input
            hidden
            ref={imageRef}
            className="ms-4"
            type="file"
            name="avatar"
            id="image"
            onChange={handleFileChange}
          />
          <div
            className=" text-zinc-400 border-2 my-2 border-zinc-800 p-2 flex items-center gap-2"
            onClick={() => imageRef.current.click()}
          >
            <BsCloudUpload /> Upload Profile Pic
          </div>
        </div>
        <button
          type="submit"
          className="py-2 w-full px-3 rounded-lg text-md mt-5 bg-blue-500"
        >
          Submit
        </button>
        <Gauth />
        <p className="my-2 text-center">
          Already a user?{" "}
          <Link to="/login" className="text-blue-500 underline">
            Login
          </Link>
        </p>
        {message && <p className="text-center my-2">{message}</p>}
      </form>
    </div>
  );
};

export default Signup;
