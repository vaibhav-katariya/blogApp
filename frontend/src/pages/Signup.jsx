import React, { useState } from "react";

const Signup = () => {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

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
      const res = await fetch("http://localhost:8000/api/v2/users/register", {
        method: "POST",
        body: formData,
      });
      const result = await res.json();

      if (res.ok) {
        localStorage.setItem("user", JSON.stringify(result));
        setMessage("Registration successful!");
      } else {
        setMessage(result.message || "Registration failed!");
      }
    } catch (error) {
      console.log("log error", error.message);
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
    <div className="m-10">
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="username">Name</label>
          <input
            className="ms-4"
            type="text"
            name="username"
            placeholder="Name"
            id="name"
            value={data.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            className="ms-4"
            type="email"
            name="email"
            placeholder="Email"
            id="email"
            value={data.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            className="ms-4"
            type="password"
            placeholder="Password"
            name="password"
            id="password"
            value={data.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="avatar">Profile Image</label>
          <input
            className="ms-4"
            type="file"
            name="avatar"
            id="image"
            onChange={handleFileChange}
          />
        </div>
        <button
          type="submit"
          className="py-2 px-3 rounded-md mt-5 bg-blue-400"
        >
          Submit
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Signup;
