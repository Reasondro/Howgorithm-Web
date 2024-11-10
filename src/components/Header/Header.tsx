import { Link } from "react-router-dom";
import "@/components/Header/Header.css";

import { supabase } from "@/utils/supabase/supabaseClient";

export default function Header() {
  async function checkUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      alert(user.email);
    } else {
      alert("no user here");
    }
  }
  async function signOut() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      alert("Signing out " + user.email);
      await supabase.auth.signOut();
    } else {
      alert("no user here");
    }
  }

  return (
    <header id="main-header">
      <nav id="hamburger-wrapper">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
          />
        </svg>
      </nav>
      <Link id="logo" to="/">
        HOWGORITHM
      </Link>

      <ul id="algo-categories">
        <li className="algo-type">
          <Link to="/binary-search">BINARY SEARCH</Link>
        </li>
        <li className="algo-type">
          <Link to="/bubble-sort"> BUBBLE SORT </Link>
        </li>
        <li className="algo-type">
          <Link to="/quick-sort"> QUICK SORT </Link>
        </li>
        <li className="algo-type">
          <Link to="/"> QUIZ </Link>
        </li>
      </ul>
      <nav>
        <ul id="standard-nav">
          <li>
            <Link to="/sign-in">SIGN IN</Link>
          </li>
          <li>
            <Link to="/binary-search" id="action-btn">
              PLAY
            </Link>
          </li>
          <li>
            <button id="action-btn" onClick={checkUser}>
              Check user
            </button>
          </li>
          <li>
            <button id="action-btn" onClick={signOut}>
              Sign Out
            </button>
          </li>
          <li id="search-wrapper">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 7.5-2.25-1.313M21 7.5v2.25m0-2.25-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3 2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75 2.25-1.313M12 21.75V19.5m0 2.25-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25"
              />
            </svg>
          </li>
        </ul>
      </nav>
    </header>
  );
}
