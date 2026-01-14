"use client";

import { useContext, useState } from "react";
import { X } from "lucide-react";
import "./authModal.css";
import { Button, message, Space } from "antd";
import useConfig from "antd/es/config-provider/hooks/useConfig";
import { AuthContext } from "./authContext/AuthContext";

const AuthModal = ({ isOpen, onClose }) => {
  const AuthData = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [messagee, setMessage] = useState("");

  const [messageApi, contextHolder] = message.useMessage();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  // console.log("running....");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const API_BASE = import.meta.env.VITE_BASE_URL;
  //  "http://localhost:8010/auth";

  const success = (msg) => {
    messageApi.open({
      type: "success",
      content: msg,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const endpoint = isLogin
        ? `${API_BASE}/auth/login`
        : `${API_BASE}/auth/register`;
      const body = isLogin
        ? { email: formData.email, password: formData.password }
        : formData;

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        setMessage(data.message || "Something went wrong!");
        return;
      }

      // ✅ Success handling
      setMessage(isLogin ? "Login successful!" : "Registration successful!");
      success("Login successful!");

      console.log("✅ Server response:", data);

      // You can store JWT token if returned
      if (data.data.token) {
        AuthData.login(data.data.user, data.data.token, data.data.refreshToken);
      }

      // Optionally close modal after delay
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (error) {
      console.error(error);
      setLoading(false);
      setMessage("Network error. Please try again.");
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`auth-backdrop ${isOpen ? "open" : ""}`}
        onClick={onClose}
      />

      {/* Modal */}
      <div className={`auth-modal ${isOpen ? "open" : ""}`}>
        {/* Header */}
        <div className="auth-header">
          <h2>{isLogin ? "Login" : "Register"}</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form className="auth-form" onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Enter your First Name"
                  required
                />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Enter your Last Name"
                  required
                />
              </div>
            </>
          )}

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>
          {messagee && <p className="message-text">{messagee}</p>}
          {contextHolder}
          <Space style={{ display: "block" }}>
            <button type="submit" disabled={loading} className="submit-btn">
              {isLogin ? "Login" : "Register"}
            </button>
          </Space>
        </form>

        {/* Switch mode */}
        <div className="switch-mode">
          {isLogin ? (
            <p>
              Don’t have an account?{" "}
              <span onClick={() => setIsLogin(false)}>Register</span>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <span onClick={() => setIsLogin(true)}>Login</span>
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default AuthModal;
