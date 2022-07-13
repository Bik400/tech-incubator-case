import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import fireDB from "../Firebase";
const MainPage = () => {
  const { user, logout } = UserAuth();

  const [data, setData] = useState({});

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
  }, []);

  const onDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      fireDB.child(`Entries/${id}`).remove((err) => {
        if (err) {
          console.log(err);
        }
      });
    }
  };

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
      console.log("You are logged out");
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div className="max-w={}600px mx-auto my-16 p-4">
      <h1 className="text-2xl font-bold py-4">Main Page</h1>
      <p>User email: {user && user.email}</p>

      <button onClick={handleLogout} className="border px-6 py-2 my-4">
        Logout
      </button>

      <table className="table-auto border border-separate border-slate-500">
        <thead>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Description</th>
            <th>Contact</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {Object.keys(data).map((id, index) => {
            return (
              <tr key={id}>
                <th scope="row">{index + 1}</th>
                <td>{data[id].name}</td>
                <td>{data[id].description}</td>
                <td>{data[id].contact}</td>

                <td>
                  <Link to={`/view/${id}`}>
                    <button>View</button>
                  </Link>

                  <Link to={`/update/${id}`}>
                    <button>Edit</button>
                  </Link>

                  <button onClick={() => onDelete(id)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MainPage;
