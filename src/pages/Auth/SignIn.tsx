// SignIn.tsx
import React, { useState } from "react";
import { supabase } from "@/utils/supabase/supabaseClient";
import { Link, useNavigate } from "react-router-dom";
import "@/pages/Auth/SignIn.css";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setErrorMsg(error.message);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-form">
        <h2>Sign In</h2>
        {errorMsg && <div className="error-message">{errorMsg}</div>}
        <form onSubmit={handleSignIn}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">
              Password
              {/* <Link to="/forgot-password" className="forgot-password">
                Forgot?
              </Link> */}
            </label>
            <input
              type="password"
              id="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" className="submit-button">
            Sign In
          </button>
        </form>
        <p className="redirect-message">
          Don't have an account?{" "}
          <Link to="/sign-up" className="redirect-link">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
