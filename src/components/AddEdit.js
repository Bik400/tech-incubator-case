import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import fireDB from "../Firebase";
import { toast } from "react-toastify";

const initialState = {
  name: "",
  description: "",
  contact: "",
};

const AddEdit = () => {
  const [state, setState] = useState(initialState);
  const [data, setData] = useState({});

  const { name, description, contact } = state;

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    fireDB.child("Entries").on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        setData({ ...snapshot.val() });
      } else {
        setData({});
      }
    });

    return () => {
      setData({});
    };
  }, [id]);

  useEffect(() => {
    if (id) {
      setState({ ...data[id] });
    } else {
      setState({ ...initialState });
    }

    return () => {
      setState({ ...initialState });
    };
  }, [id, data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !description || !contact) {
      toast.error("Please fill out all input fields");
    } else {
      if (!id) {
        fireDB.child("Entries").push(state, (err) => {
          if (err) {
            toast.error(err);
          } else {
            toast.success("Entry added successfully");
          }
        });
      } else {
        fireDB.child(`Entries/${id}`).set(state, (err) => {
          if (err) {
            toast.error(err);
          } else {
            toast.success("Entry updated successfully");
          }
        });
      }

      setTimeout(() => navigate("/listpage"), 500);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  return (
    <div className="max-w-[700px] mx-auto my-16 p-4">
      <h1 className="text-2xl font-bold py-4 text-center mb-3">
        Create a Task
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
            value={name || ""}
            onChange={handleInputChange}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          />
        </div>
        <div className="mb-6">
          <textarea
            id="description"
            rows="4"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            name="description"
            placeholder="Enter the description..."
            value={description || ""}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-6">
          <input
            type="number"
            id="contact"
            name="contact"
            placeholder="Enter your contact info"
            value={contact || ""}
            onChange={handleInputChange}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          />
        </div>
        <div className="flex justify-between">
          <Link to="/listpage">
            <button className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
              Go Back
            </button>
          </Link>
          <button
            type="submit"
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            {id ? "Update" : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEdit;
