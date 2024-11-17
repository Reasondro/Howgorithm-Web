// SignIn.tsx
import React, { useState } from "react";
import { supabase } from "@/utils/supabase/supabaseClient";
import { Link, useNavigate } from "react-router-dom";
import "@/pages/Auth/Auth.css";

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
    <div className="auth-container">
      <div className="auth-form">
        <h2>Welcome back</h2>
        <h3>Sign in to your account</h3>
        {errorMsg && <div className="error-message">{errorMsg}</div>}
        <form onSubmit={handleSignIn}>
          <div className="form-group">
            <label htmlFor="email-auth">Email Address</label>
            <input
              type="email"
              id="email-auth"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@email.com"
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
              placeholder="••••••••"
            />
          </div>
          <button type="submit" className="auth-button">
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
      <div id="auth-image">
        <img
          src="https://images.unsplash.com/photo-1598942314842-4cb79089e4d5?q=80&w=2673&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
      </div>
    </div>
  );
}
