import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AuthModal from "../auth/AuthModal";
import { FloatButton } from "antd";
import {
  ArrowUpOutlined,
  CommentOutlined,
  CustomerServiceOutlined,
  UpCircleOutlined,
  VideoCameraAddOutlined,
} from "@ant-design/icons";

import "./Layout.css";
import { FolderAddOutlined } from "@ant-design/icons";
import AddMovieModal from "../AddMovie/AddMovieModel";

const Layout = () => {
  const [openAuthModel, setOpenAuthModel] = useState(false);
  const [openAddMovieModel, setOpenAddMovieModel] = useState(false);
  const [openAddShowModel, setOpenAddShowModel] = useState(false);

  const handleAuthModel = () => {
    setOpenAuthModel(!openAuthModel);
  };

  const handleAddMovie = () => {
    setOpenAddMovieModel(!openAddMovieModel);
  };
  const handleAddShow = () => {
    setOpenAddShowModel(!openAddShowModel);
  };

  return (
    <div style={{ margin: 0 }}>
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-left">
          🎬 <span className="logo-text">MovieBook</span>
        </div>

        <div className="navbar-center">
          <input
            type="text"
            placeholder="Search movies, theatres..."
            className="search-input"
          />
        </div>

        {/* <div className="navbar-right" style={{ marginRight: "10px" }}>
          <button className="signup-btn">Sign up</button>
        </div> */}

        <div className="navbar-right">
          <button className="login-btn" onClick={handleAuthModel}>
            Login
          </button>
        </div>
      </nav>

      {/* Page Content */}
      <main className="page-content">
        <Outlet />
      </main>

      <FloatButton.Group
        trigger="click"
        type="primary"
        style={{ insetInlineEnd: 24 }}
        icon={<ArrowUpOutlined />}
      >
        <FloatButton
          icon={<FolderAddOutlined />}
          tooltip="Add Movie"
          onClick={handleAddMovie}
        />
        <FloatButton
          icon={<VideoCameraAddOutlined />}
          tooltip="Add Show"
          onClick={handleAddShow}
        />
      </FloatButton.Group>

      {openAuthModel && (
        <AuthModal isOpen={openAuthModel} onClose={handleAuthModel} />
      )}

      {openAddMovieModel && (
        <AddMovieModal isOpen={openAddMovieModel} onClose={handleAddMovie} />
      )}
    </div>
  );
};

export default Layout;
