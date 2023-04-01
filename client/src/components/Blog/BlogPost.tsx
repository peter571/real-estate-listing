import React from "react";
import pic from "../../assets/images/home_1.jpg";
import { FaShare } from "react-icons/fa";
import { Tooltip } from "flowbite-react";

export default function BlogPost() {
  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  return (
    <div className="max-w-sm h-[448px] border">
      {/* <img src={pic} className="h-56 object-cover cursor-pointer" alt="" /> */}
      <div
        className="h-56 w-full flex justify-center items-center"
        style={{ backgroundColor: getRandomColor() }}
      >
        <p
          className="font-semibold overflow-hidden text-ellipsis text-white text-center px-7 text-2xl"
          style={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 3,
          }}
        >
          {" "}
          What does the rise of AI mean for the future of creativity? This
          article was written by a human.
        </p>
      </div>
      <div className="p-5">
        <div className="flex justify-between align-middle text-center">
          <h4>
            <small>Feb 7.</small> <small>6 min</small>
          </h4>
          <Tooltip content="Share content">
            <FaShare className="cursor-pointer" />
          </Tooltip>
        </div>
        <div className="py-2">
          <h5
            className="font-semibold overflow-hidden text-ellipsis hover:text-blue-500 cursor-pointer"
            style={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 3,
            }}
          >
            What does the rise of AI mean for the future of creativity? This
            article was written by a human.
          </h5>
          <p
            className="overflow-hidden text-ellipsis mt-2 hover:text-blue-500 cursor-pointer"
            style={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 3,
            }}
          >
            Take OpenAIs language model ChatGPT as an example. Launched in
            November 2022, the AI-based chatbot system uses Natural Language
            Processing (NLP) to generate conversations, responding to questions
            with relevant, human-like answers. When prompted to produce an
            introductory paragraph for an article that questions what AI means
            for the future of creativity, it provided the following:
          </p>
        </div>
      </div>
    </div>
  );
}
