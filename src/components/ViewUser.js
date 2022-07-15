import React, { useState, useEffect } from "react";
import fireDB from "../Firebase";
import { useParams, Link } from "react-router-dom";

const ViewUser = () => {
  const [user, setUser] = useState({});
  const [submitTask, setSubmitTask] = useState(false);

  const { id } = useParams();

  const handleSubmitTask = () => {
    setSubmitTask(!submitTask);
  };

  useEffect(() => {
    fireDB
      .child(`Entries/${id}`)
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          setUser({ ...snapshot.val() });
        } else {
          setUser({});
        }
      });
  }, [id]);
  console.log(user);
  return (
    <div className="max-w-[700px] mx-auto my-16 p-4">
      <div className="p-6 text-center bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {user.name}
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {user.description}
        </p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {user.contact}
        </p>
        <Link to="/submit">
          <button
            onClick={handleSubmitTask}
            className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit Task
          </button>
        </Link>
      </div>
      <Link to="/mainpage">
        <button className="mt-4 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
          Go Back
        </button>
      </Link>
    </div>
  );
};

export default ViewUser;
