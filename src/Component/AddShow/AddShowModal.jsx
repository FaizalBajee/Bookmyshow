"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { message, Space } from "antd";
import "./addShowModel.css";

const AddShowModal = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([
    { _id: "m1", title: "Jana Nayakan" },
    { _id: "m2", title: "Leo" },
    { _id: "m3", title: "Jailer" },
    { _id: "m4", title: "Vikram" },
  ]);

  const [screens, setScreens] = useState([
    { _id: "s1", name: "Screen 1", capacity: 120 },
    { _id: "s2", name: "Screen 2", capacity: 150 },
    { _id: "s3", name: "IMAX", capacity: 250 },
  ]);

  const [messageApi, contextHolder] = message.useMessage();

  const [formData, setFormData] = useState({
    movieID: "",
    screenID: "",
    startTime: "",
    price: "",
  });

  const API_BASE = import.meta.env.VITE_BASE_URL;

  /* ---------------- FETCH DROPDOWN DATA ---------------- */
  // useEffect(() => {
  //   if (!isOpen) return;

  //   const fetchDropdownData = async () => {
  //     try {
  //       const [movieRes, screenRes] = await Promise.all([
  //         fetch(`${API_BASE}/admin/movies`),
  //         fetch(`${API_BASE}/admin/screens`),
  //       ]);

  //       const movieData = await movieRes.json();
  //       const screenData = await screenRes.json();

  //       setMovies(movieData.data || []);
  //       setScreens(screenData.data || []);
  //     } catch (err) {
  //       messageApi.error("Failed to load dropdown data");
  //     }
  //   };

  //   fetchDropdownData();
  // }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/admin/addShow`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        messageApi.error(data.message || "Failed to add show");
        return;
      }

      messageApi.success("Show added successfully ✅");

      setFormData({
        movieID: "",
        screenID: "",
        startTime: "",
        price: "",
      });

      setTimeout(onClose, 800);
    } catch (err) {
      setLoading(false);
      messageApi.error("Network error. Try again.");
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`show-backdrop ${isOpen ? "open" : ""}`}
        onClick={onClose}
      />

      {/* Modal */}
      <div className={`show-modal ${isOpen ? "open" : ""}`}>
        <div className="show-header">
          <h2>Add Show</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <form className="show-form" onSubmit={handleSubmit}>
          {/* MOVIE DROPDOWN */}
          <div className="form-group">
            <label>Movie</label>
            <select
              name="movieID"
              value={formData.movieID}
              onChange={handleChange}
              required
            >
              <option value="">Select Movie</option>
              {movies.map((movie) => (
                <option key={movie._id} value={movie._id}>
                  {movie.title}
                </option>
              ))}
            </select>
          </div>

          {/* SCREEN DROPDOWN */}
          <div className="form-group">
            <label>Screen</label>
            <select
              name="screenID"
              value={formData.screenID}
              onChange={handleChange}
              required
            >
              <option value="">Select Screen</option>
              {screens.map((screen) => (
                <option key={screen._id} value={screen._id}>
                  {screen.name} ({screen.capacity} seats)
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Start Time</label>
            <input
              type="datetime-local"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Price (₹)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>

          {contextHolder}

          <Space style={{ display: "block" }}>
            <button type="submit" disabled={loading} className="submit-btn">
              {loading ? "Saving..." : "Add Show"}
            </button>
          </Space>
        </form>
      </div>
    </>
  );
};

export default AddShowModal;
