import React, { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { RiSendPlaneFill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
const Comment = ({ BlogId }) => {
  const [comments, setComment] = useState([]);
  const [commentValue, setcommentValue] = useState("");
  const user = useSelector((user) => user.user.user);

  useEffect(() => {
    const getComment = async () => {
      const res = await fetch(`/api/v2/comment/get-comment/${BlogId}`);
      const data = await res.json();
      setComment(data.comment);
    };
    getComment();
  }, [comments, commentValue]);

  const submitCommentHandler = async () => {
    const res = await fetch(`/api/v2/comment/create/${BlogId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: commentValue }),
    });
    const comment = await res.json();
    setComment((prev) => [...prev, comment.newComment]);
    setcommentValue("");
  };

  const commentDeleteHandler = async (commentID) => {
    await fetch(`/api/v2/comment/delete-comment/${commentID}`, {
      method: "DELETE",
    });
  };

  return (
    <div className="h-auto">
      <h1 className="text-2xl font-semibold px-2">{`comments (${comments.length})`}</h1>
      <div className="border-[1px] border-zinc-700 m-2 p-2 flex rounded-lg gap-2">
        <textarea
          value={commentValue}
          onChange={(e) => setcommentValue(e.target.value)}
          className="w-[90%] md:w-[90%] px-3 md:pt-2 outline-none rounded-lg resize-none text-zinc-300 bg-zinc-800"
          placeholder="Write your thought..."
        />
        <button
          onClick={submitCommentHandler}
          className="bg-blue-500 md:w-[10%] text-2xl flex items-center justify-center rounded-lg py-2 px-3"
        >
          <RiSendPlaneFill />
        </button>
      </div>
      {comments?.map((comment) => (
        <div
          key={comment._id}
          className="py-2 px-2 border-[1px] border-zinc-700 rounded-lg m-2"
        >
          <div className="flex items-center justify-between">
            <div className="flex gap-2 md:gap-3 items-center">
              <img
                className="h-8 w-8 md:h-10 md:w-10 object-cover p-[2px] border-[1px]  border-zinc-700 rounded-full"
                src={comment.owner?.avatar}
                alt={comment._id}
              />
              <h2 className="text-xs md:text-sm text-zinc-200">
                {comment.owner?.username}
              </h2>
            </div>
            <p className="text-end text-xs md:text-sm text-zinc-400">
              {formatDistanceToNow(new Date(comment.createdAt), {
                addSuffix: true,
              })}
            </p>
          </div>
          <div className="flex justify-between items-center">
            <h2 className="ps-9 md:ps-[3.5rem]">{comment.content}</h2>

            {user._id === comment.owner?._id && (
              <button
                onClick={() => commentDeleteHandler(comment._id)}
                className="py-[5px] px-2 bg-zinc-700 rounded-lg"
              >
                <MdDelete />
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Comment;
