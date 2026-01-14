"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { message, Space } from "antd";

import "./addMovieModal.css";
import api from "../../common/axios/axios";

const AddMovieModal = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const [formData, setFormData] = useState({
    title: "",
    language: "",
    duration: "",
    rating: "",
    genres: [],
    releaseDate: "",
    description: "",
    isActive: true,
  });

  const API_BASE = import.meta.env.VITE_BASE_URL;
  // "http://localhost:8010/admin/addMovie";

  const genreOptions = [
    "Action",
    "Comedy",
    "Romance",
    "Thriller",
    "Horror",
    "Drama",
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleGenreChange = (genre) => {
    setFormData((prev) => ({
      ...prev,
      genres: prev.genres.includes(genre)
        ? prev.genres.filter((g) => g !== genre)
        : [...prev.genres, genre],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.language ||
      !formData.duration ||
      !formData.rating
    ) {
      messageApi.warning("Please fill all required fields");
      return;
    }

    setLoading(true);

    try {
      await api.post("/admin/addMovie", formData);

      messageApi.success("🎉 Movie added successfully");

      setFormData({
        title: "",
        language: "",
        duration: "",
        rating: "",
        genres: [],
        releaseDate: "",
        description: "",
        isActive: true,
      });

      setTimeout(onClose, 800);
    } catch (error) {
      messageApi.error(error.message || "Failed to add movie");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className={`add-backdrop ${isOpen ? "open" : ""}`}
        onClick={onClose}
      />
      <div className={`add-modal ${isOpen ? "open" : ""}`}>
        {contextHolder}
        <div className="add-header">
          <h2>Add Movie</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={22} />
          </button>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="modal-body">
            {/* Row 1: Title */}
            <div className="form-group full-width">
              <label>Movie Title *</label>
              <input
                name="title"
                style={{ width: "480px" }}
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter movie title"
                required
              />
            </div>

            {/* Row 2: Language & Rating */}
            <div className="form-row">
              <div className="form-group">
                <label>Language *</label>
                <select
                  name="language"
                  value={formData.language}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select</option>
                  <option value="Tamil">Tamil</option>
                  <option value="English">English</option>
                  <option value="Hindi">Hindi</option>
                </select>
              </div>
              <div className="form-group">
                <label>Rating *</label>
                <select
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select</option>
                  <option value="U">U</option>
                  <option value="UA">UA</option>
                  <option value="A">A</option>
                </select>
              </div>
            </div>

            {/* Row 3: Duration & Date */}
            <div className="form-row">
              <div className="form-group">
                <label>Duration (mins) *</label>
                <input
                  type="number"
                  style={{ width: "220px" }}
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="Enter duration"
                  required
                />
              </div>
              <div className="form-group">
                <label>Release Date</label>
                <input
                  type="date"
                  style={{ width: "220px" }}
                  name="releaseDate"
                  value={formData.releaseDate}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Genres */}
            {/* <div className="form-group full-width">
              <label>Genres *</label>
              <div className="genre-box">
                {genreOptions.map((genre) => (
                  <label key={genre} className="genre-item">
                    <input type="checkbox" checked={formData.genres.includes(genre)} onChange={() => handleGenreChange(genre)} />
                    {genre}
                  </label>
                ))}
              </div>
            </div> */}

            {/* Description */}
            <div className="form-group full-width">
              <label>Description</label>
              <textarea
                name="description"
                style={{ width: "480px" }}
                value={formData.description}
                onChange={handleChange}
                placeholder="Short movie description"
                rows="3"
              />
            </div>

            <div className="form-group-checkbox">
              <label className="flex-label">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleChange}
                />
                <span>Mark as Active</span>
              </label>
            </div>
          </div>

          <div className="modal-footer">
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Saving..." : "Add Movie"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddMovieModal;
