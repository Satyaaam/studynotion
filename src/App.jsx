import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./Components/common/Navbar";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducer";
import { Toaster } from "react-hot-toast";

const store = configureStore({
  reducer:rootReducer,
})

const App = () => {
  return (
    <Provider store={store}>
      <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
          <Toaster/>
        </BrowserRouter>
      </div>
    </Provider>
  );
};

export default App;
