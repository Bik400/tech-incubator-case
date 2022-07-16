import React from "react";
import { Routes, Route } from "react-router-dom";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import MainPage from "./components/MainPage";
import "./App.css";
import { AuthContextProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AddEdit from "./components/AddEdit";
import ViewUser from "./components/ViewUser";
import SubmitTask from "./components/SubmitTask";
import ListPage from "./components/ListPage";

function App() {
  return (
    <div>
      {/* <h1 className="text-center text-3xl font-bold">Firebase Auth</h1> */}
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/mainpage"
            element={
              <ProtectedRoute>
                <MainPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add"
            element={
              <ProtectedRoute>
                <AddEdit />
              </ProtectedRoute>
            }
          />
          <Route
            path="/update/:id"
            element={
              <ProtectedRoute>
                <AddEdit />
              </ProtectedRoute>
            }
          />
          <Route
            path="/view/:id"
            element={
              <ProtectedRoute>
                <ViewUser />
              </ProtectedRoute>
            }
          />
          <Route
            path="/submit"
            element={
              <ProtectedRoute>
                <SubmitTask />
              </ProtectedRoute>
            }
          />
          <Route
            path="/listpage"
            element={
              <ProtectedRoute>
                <ListPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
