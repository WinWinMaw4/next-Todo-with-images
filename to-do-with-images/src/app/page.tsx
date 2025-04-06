"use client";
import { useGetEndpointQuery } from "@/services/apiSlice";
import { endpoints } from "@/services/endpoints";
import { useEffect, useState } from "react";

// Adjust this type to match your data shape
type ToDoItem = {
  id: number;
  projectTitle: string;
  title: string;
  description: string;
  assignedBy: string;
  assignedTo: string;
  createdAt: string;
  dueDate?: string;
  priority?: "High" | "Medium" | "Low";
  status?: "Pending" | "In Progress" | "Completed";
};

export default function Home() {
  const [todos, setTodos] = useState<ToDoItem[]>([]);
  const [view, setView] = useState<"grid" | "list">("list");
  const getToDos = `${endpoints.todos}`;
  const { data, isLoading, isError, error } = useGetEndpointQuery(getToDos);

  useEffect(() => {
    console.log("data", data);
    setTodos(data || null); // adjust if your actual structure is different
  }, [data]);

  return (
    <div className="flex flex-col max-w-7xl mx-auto py-10">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl py-2">To Do List By A Win</h1>
        <div className="flex divide-x border rounded overflow-hidden">
          <button
            className={`p-2 ${view === "grid" ? "bg-gray-700" : "bg-gray-800"}`}
            onClick={() => setView("grid")}
          >
            Show Grid
          </button>
          <button
            className={`p-2 ${view === "list" ? "bg-gray-700" : "bg-gray-800"}`}
            onClick={() => setView("list")}
          >
            Show List
          </button>
        </div>
      </div>

      {
        isLoading && (
          <div className="animate-pulse ">Loading...</div>
        )
      }

      <div className={view === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 mt-4" : "flex flex-col mt-4 space-y-2"}>
        {todos?.map((item, index) => (

          <div key={index}
            className="bg-gray-800 rounded-xl p-5 shadow-md hover:shadow-lg transition space-y-2">
            <div className="flex justify-between items-start">
              <h2 className="text-xl font-bold text-white">{item.title}</h2>
              <div className="text-sm text-gray-400">{item.createdAt || "12-Apr-2000 14:29"}</div>
            </div>

            <div className="text-sm text-gray-300 space-y-1">
              <p>
                <span className="font-medium text-white">Assigned By:</span> {item.assignedBy || "Senior Leader"}
              </p>
              <p>
                <span className="font-medium text-white">Assigned To:</span> {item.assignedTo || "Team Member"}
              </p>
              {item.dueDate && (
                <p>
                  <span className="font-medium text-white">Due Date:</span> {item.dueDate || "12-Apr-2000 14:29"}
                </p>
              )}
              {item.priority && (
                <p>
                  <span className="font-medium text-white">Priority:</span>{" "}
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${item.priority === "High"
                      ? "bg-red-600 text-white"
                      : item.priority === "Medium"
                        ? "bg-yellow-500 text-black"
                        : "bg-green-600 text-white"
                      }`}
                  >
                    {item.priority}
                  </span>
                </p>
              )}
              {item.status && (
                <p>
                  <span className="font-medium text-white">Status:</span>{" "}
                  <span className="italic">{item.status}</span>
                </p>
              )}
              <p>
                <span className="font-medium text-white">Description:</span> {item.description}
              </p>
            </div>

            <div className="flex gap-2 pt-2">
              <button className="text-sm px-3 py-1 bg-blue-600 rounded hover:bg-blue-500 transition">Edit</button>
              <button className="text-sm px-3 py-1 bg-green-600 rounded hover:bg-green-500 transition">Mark Done</button>
            </div>
          </div>

        ))}
      </div>
    </div>
  );
}
