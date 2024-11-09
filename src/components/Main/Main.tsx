import { Routes, Route } from "react-router-dom";
import "@/App.css";

import Home from "@/pages/Home/Home";
import BinarySearch from "@/pages/BinarySearch/BinarySearch";

export default function Main() {
  return (
    <Routes>
      <Route>
        <Route path="/" element={<Home></Home>}></Route>
        <Route
          path="/binary-search"
          element={<BinarySearch></BinarySearch>}
        ></Route>
        <Route path="/bubble-sort"></Route>
        <Route path="/quick-sort"></Route>
        <Route path="/quiz"></Route>
      </Route>
    </Routes>
  );
}
