import { Link } from "react-router-dom";
import "@/components/Header/Header.css";

import { Session } from "@supabase/supabase-js";

export default function Header({ session }: { session: Session | null }) {
  return (
    <header id="main-header">
      {/* <nav id="hamburger-wrapper">
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
      </nav> */}
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
        {/* <li className="algo-type">
          <Link to="/quick-sort"> QUICK SORT </Link>
        </li> */}
        <li className="algo-type">
          <Link to="/quiz">QUIZ </Link>
        </li>
      </ul>
      <nav>
        {session === null ? (
          <ul className="standard-nav">
            <li>
              <Link id="sign-up" to="/sign-up">
                Sign up
              </Link>
            </li>
            <li>
              <Link id="sign-in" to="/sign-in">
                Sign in
              </Link>
            </li>
          </ul>
        ) : (
          <ul className="standard-nav">
            <li id="profile-wrapper">
              <Link to={`users/${session?.user.id}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              </Link>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
}
