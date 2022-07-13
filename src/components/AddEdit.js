import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
      fireDB.child("Entries").push(state, (err) => {
        if (err) {
          toast.error(err);
        } else {
          toast.success("Entry added successfully");
        }
      });
      setTimeout(() => navigate("/mainpage"), 500);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter your name"
          value={name || ""}
          onChange={handleInputChange}
        />

        <label htmlFor="description">Description</label>
        <input
          type="text"
          id="description"
          name="description"
          placeholder="Enter the description of your job"
          value={description || ""}
          onChange={handleInputChange}
        />

        <label htmlFor="contact">Contact</label>
        <input
          type="number"
          id="contact"
          name="contact"
          placeholder="Enter your contact info"
          value={contact || ""}
          onChange={handleInputChange}
        />

        <input type="submit" value="Save" />
        {/* <button>Submit</button> */}
      </form>
    </div>
  );
};

export default AddEdit;
