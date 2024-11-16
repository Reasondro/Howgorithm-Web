import { useState, useEffect } from "react";
import { Session } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import "@/pages/Profile/Profile.css";
import { supabase } from "@/utils/supabase/supabaseClient";

export default function Profile({ session }: { session: Session | null }) {
  const navigate = useNavigate();
  const user = session?.user;

  const [progress, setProgress] = useState<{
    bubble_score: number | null;
    binary_score: number | null;
    total_score: number | null;
  } | null>(null);

  useEffect(() => {
    if (user) {
      fetchUserProgress();
    }
  }, [user]);

  async function fetchUserProgress() {
    if (!user) return;
    const { data, error } = await supabase
      .from("progress")
      .select("bubble_score, binary_score, total_score")
      .eq("id", user.id)
      .single();

    if (error) {
      console.error("Error fetching user progress data:", error);
    } else {
      setProgress(data);
    }
  }

  async function signOut() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      await supabase.auth.signOut();
      navigate("/");
    } else {
      alert("No user is currently logged in.");
    }
  }

  if (!session) {
    return (
      <main id="main-wrapper">
        <div className="profile-page-container">
          <h1 className="title">User is not logged in</h1>
          <p>Please log in to view your profile information.</p>
        </div>
      </main>
    );
  }

  //? exxtract scores progress  or default to 0 (kalo noull)
  const bubbleScore = progress?.bubble_score ?? 0;
  const binaryScore = progress?.binary_score ?? 0;
  const totalScore = progress?.total_score ?? 0;

  return (
    <main id="main-wrapper">
      <div className="profile-page-container">
        <h1 id="info-text">Your Info</h1>
        <div className="profile-header">
          <div className="profile-info">
            <p className="profile-email">Email: {session.user.email}</p>
            <p className="profile-score">Bubble Sort Score: {bubbleScore}</p>
            <p className="profile-score">Binary Search Score: {binaryScore}</p>
            <p className="profile-score">Total Score: {totalScore}</p>
          </div>
        </div>

        <div className="profile-actions">
          <button className="sign-out-button" onClick={signOut}>
            Sign out
          </button>
        </div>
      </div>
    </main>
  );
}
