import React, { useRef, useState } from "react";
import { BsCloudUpload } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getRefresh } from "../store/blogSlice";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
const CreateBlog = () => {
  const [data, setData] = useState({
    title: "",
    category: "",
  });
  const [description, setdescription] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const imageRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", description);
    formData.append("category", data.category);
    if (image) {
      formData.append("image", image);
    }

    try {
      const res = await fetch("/api/v2/Blog/upload", {
        method: "POST",
        body: formData,
      });
      const result = await res.json();

      if (res.ok) {
        setMessage(result.message || "Blog Created successful!");
        setData({
          title: "",
          description: "",
          category: "",
        });
        setImage(null);
        dispatch(getRefresh());
        navigate("/");
      } else {
        setMessage(result.error || "blog created failed!");
        return;
      }
    } catch (error) {
      console.log("blog create error", error);
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

  const genContent = async () => {
    try {
      const res = await axios.post("/api/v2/GenAI/gencontent", {
        prompt: data.title,
      });
      setdescription(`<pre>${res.data.text}</pre>`);
    } catch (error) {
      console.log("error while gen content", error);
    }
  };

  const handleChangedescription = (content) => {
    setdescription(content);
  };

  return (
    <div className="min-h-screen my-5 items-center flex-col w-full text-white flex">
      <h2 className="text-center mb-3 text-2xl text-zinc-600">Create Blog</h2>
      <form
        onSubmit={submitHandler}
        className="border-[1px] w-full border-zinc-800  flex md:flex-row flex-col md:p-10 rounded-lg p-1"
      >
        <div className="w-full my-2 md:w-1/2 md:px-11">
          <div>
            <input
              hidden
              ref={imageRef}
              className="ms-4"
              type="file"
              name="image"
              id="image"
              onChange={handleFileChange}
            />
            <div
              className=" text-zinc-400 border-2 my-2 border-zinc-800 p-2 flex items-center gap-2"
              onClick={() => imageRef.current.click()}
            >
              <BsCloudUpload /> Upload Image
            </div>
          </div>
          <div>
            <input
              className="w-full focus:bg-zinc-800 px-3 py-2 placeholder:text-lg my-3 rounded-lg bg-zinc-800 outline-none"
              type="text"
              name="title"
              placeholder="title"
              id="title"
              value={data.title}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              className="w-full focus:bg-zinc-800 px-3 py-2 placeholder:text-lg my-3 rounded-lg bg-zinc-800 outline-none"
              type="category"
              placeholder="category"
              name="category"
              id="category"
              value={data.category}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="w-full md:w-1/2">
          <div>
            <ReactQuill
              className="h-[30rem] p-2 overflow-y-scroll"
              theme="snow"
              name="description"
              value={description}
              onChange={handleChangedescription}
            />
          </div>
          <button
            type="button"
            onClick={genContent}
            className="py-2 w-full px-3 rounded-lg text-md mt-5 bg-blue-800"
          >
            Gen Content
          </button>
          <button
            type="submit"
            className="py-2 w-full px-3 rounded-lg text-md mt-5 bg-blue-500"
          >
            Create Blog
          </button>
        </div>

        {message && <p className="text-center my-2">{message}</p>}
      </form>
    </div>
  );
};

export default CreateBlog;
