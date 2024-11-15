import "@/App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import DefaultLayout from "@/Layout/DefaultLayout";
import AuthLayout from "@/Layout/AuthLayout";

import SignIn from "@/pages/Auth/SignIn";
import SignUp from "@/pages/Auth/SignUp";

import Home from "@/pages/Home/Home";
import BinarySearch from "@/pages/BinarySearch/BinarySearch";
import BubbleSort from "@/pages/BubbleSort/BubbleSort";
import QuickSort from "./pages/QuickSort/QuickSort";

import Quiz from "./pages/Quiz/Quiz";
import Profile from "./pages/Profile/Profile";
import { useEffect, useState } from "react";
import { supabase } from "./utils/supabase/supabaseClient";
import { Session } from "@supabase/supabase-js";

function App() {
  const [session, setSession] = useState<Session | null>(null);
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);
  return (
    <Router>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Route>
        <Route element={<DefaultLayout session={session} />}>
          <Route path="/" element={<Home />} />
          <Route path="/binary-search" element={<BinarySearch />} />
          <Route path="/bubble-sort" element={<BubbleSort />} />
          <Route path="/quick-sort" element={<QuickSort />} />
          <Route path="/quiz" element={<Quiz session={session} />} />
          <Route
            path={`users/${session?.user.id}`}
            // path="/dynamic-user"
            element={<Profile session={session} />}
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
