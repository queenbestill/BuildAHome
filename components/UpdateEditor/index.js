import React, { useState } from "react";
import Button from "../Button";
import DatePicker from "react-datepicker";
import TextareaAutosize from "react-textarea-autosize";
import { useTheme } from "next-themes";

import "react-datepicker/dist/react-datepicker.css";

const UpdateEditor = ({ post, close, refresh }) => {
  const { theme } = useTheme();
  const [currentTabs, setCurrentTabs] = useState("UPDATEDETAILS");
  const [updateContent, setUpdateContent] = useState(post.content);
  const [updateVariables, setUpdateVariables] = useState({
    date: post.date,
    title: post.title,
    tagline: post.tagline,
    preview: post.preview,
    image: post.image,
  });

  const savePost = async () => {
    if (process.env.NODE_ENV === "development") {
      await fetch("/api/update/edit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          slug: post.slug,
          content: updateContent,
          variables: updateVariables,
        }),
      }).then((data) => {
        if (data.status === 200) {
          close();
          refresh();
        }
      });
    } else {
      alert("This thing only works in development mode.");
    }
  };

  return (
    <div
      className={`fixed z-10 w-screen h-screen overflow-auto top-0 flex flex-col items-center ${
        theme === "dark" ? "bg-black" : "bg-white"
      }`}
    >
      <div className="container my-20">
        <div className="mt-10">
          <div className="z-10 sticky top-12">
            <div className="flex items-center justify-between">
              <h1 className="text-4xl">{updateVariables.title}</h1>
              <div className="flex items-center">
                <Button onClick={savePost} type="primary">
                  Save
                </Button>
                <Button onClick={close}>Close</Button>
              </div>
            </div>
            <div className="flex items-center">
              <Button
                onClick={() => setCurrentTabs("UPDATEDETAILS")}
                type={currentTabs === "UPDATEDETAILS" && "primary"}
              >
                Update Details
              </Button>
              <Button
                onClick={() => setCurrentTabs("CONTENT")}
                type={currentTabs === "CONTENT" && "primary"}
              >
                Content
              </Button>
            </div>
          </div>
        </div>
        {currentTabs === "UPDATEDETAILS" && (
          <div className="mt-10">
            <div className="mt-5 flex flex-col items-center">
              <label className="w-full text-sx opacity-50">Date</label>
              <DatePicker
                selected={new Date(UpdateVariables.date)}
                className="w-full mt-2 p-4 hover:border-blue-400 rounded-md shadow-lg border-2"
                onChange={(date) => {
                  setUpdateVariables({
                    ...UpdateVariables,
                    date: date.toISOString(),
                  });
                }}
              />
            </div>
            <div className="mt-5 flex flex-col items-center">
              <label className="w-full text-sx opacity-50">Title</label>
              <input
                value={updateVariables.title}
                onChange={(e) =>
                  setUpdateVariables({ ...UpdateVariables, title: e.target.value })
                }
                className="w-full mt-2 p-4 hover:border-blue-400 rounded-md shadow-lg border-2"
                type="text"
              ></input>
            </div>

            <div className="mt-5 flex flex-col items-center">
              <label className="w-full text-sx opacity-50">Tagline</label>
              <input
                value={updateVariables.tagline}
                onChange={(e) =>
                  setUpdateVariables({
                    ...updateVariables,
                    tagline: e.target.value,
                  })
                }
                className="w-full mt-2 p-4 hover:border-blue-400 rounded-md shadow-lg border-2"
                type="text"
              ></input>
            </div>
            <div className="mt-5 flex flex-col items-center">
              <label className="w-full text-sx opacity-50">preview (SEO)</label>
              <textarea
                value={updateVariables.preview}
                onChange={(e) =>
                  setUpdateVariables({
                    ...updateVariables,
                    preview: e.target.value,
                  })
                }
                className="w-full mt-2 p-4 hover:border-blue-400 rounded-md shadow-lg border-2"
                type="text"
              ></textarea>
            </div>
            <div className="mt-5 flex flex-col items-center">
              <label className="w-full text-sx opacity-50">Image</label>
              <input
                value={updateVariables.image}
                onChange={(e) =>
                  setUpdateVariables({
                    ...updateVariables,
                    image: e.target.value,
                  })
                }
                className="w-full mt-2 p-4 hover:border-blue-400 rounded-md shadow-lg border-2"
                type="text"
              ></input>
            </div>
          </div>
        )}

        {currentTabs === "CONTENT" && (
          <div className="mt-10">
            <div className="flex flex-col items-center">
              <label className="w-full text-sx opacity-50">Content</label>
              <TextareaAutosize
                className="w-full h-auto mt-5 p-4 border hover:border-blue-400 rounded-xl shadow-xl"
                value={updateContent}
                onChange={(e) => setUpdateContent(e.target.value)}
              ></TextareaAutosize>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdateEditor;
