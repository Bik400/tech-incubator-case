import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import fireDB from "../Firebase";
import Header from "./Header";
const ListPage = () => {
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

  return (
    <div>
      <Header />
      <div className="max-w={}600px mx-auto my-16 p-4 container">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold py-4">Get started on a task</h1>

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
                  <tr key={id} className="border border-slate-600">
                    <th scope="row">{index + 1}</th>
                    <td className="table-cell text-center">{data[id].name}</td>
                    <td className="table-cell text-center overflow-hidden">
                      {data[id].description}
                    </td>
                    <td className="table-cell text-center">
                      {data[id].contact}
                    </td>

                    <td className="table-cell text-center">
                      <Link to={`/view/${id}`}>
                        <button className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-2 py-1 text-center mr-2 mb-3 mt-2">
                          View
                        </button>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ListPage;
