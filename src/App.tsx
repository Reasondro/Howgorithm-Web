import "@/App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import DefaultLayout from "@/Layout/DefaultLayout";
import AuthLayout from "@/Layout/AuthLayout";

import SignIn from "@/pages/Auth/SignIn";
import SignUp from "@/pages/Auth/SignUp";

import Home from "@/pages/Home/Home";
import BinarySearch from "@/pages/BinarySearch/BinarySearch";
import BubbleSort from "@/pages/BubbleSort/BubbleSort";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Route>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/binary-search" element={<BinarySearch />} />
          <Route path="/bubble-sort" element={<BubbleSort />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
