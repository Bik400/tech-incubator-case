import React from "react";
import { Link } from "react-router-dom";

const SubmitTask = () => {
  return (
    <div className="max-w-[700px] mx-auto my-16 p-4">
      <div className="p-6 text-center bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Upload File
        </h5>
        <input type="file" className="p-3" />
      </div>
      <Link to="/mainpage">
        <button className="mt-4 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
          Go Back
        </button>
      </Link>
    </div>
  );
};

export default SubmitTask;
