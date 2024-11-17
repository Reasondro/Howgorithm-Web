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

  const [username, setUsername] = useState<string | null>(null);
  const [avatar_url, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchUserProgress();
      fetchUserProfile();
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

  async function fetchUserProfile() {
    if (!user) return;
    const { data, error } = await supabase
      .from("profiles")
      .select("username, avatar_url")
      .eq("id", user.id)
      .single();

    if (error) {
      console.error("Error fetching user s data:", error);
    } else {
      setUsername(data.username);
      setAvatarUrl(data.avatar_url);
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

  async function updateProfile(e: React.FormEvent) {
    e.preventDefault();

    const { data: updateData, error: updateError } = await supabase
      .from("profiles")
      .update({ username: username, avatar_url: avatar_url })
      .eq("id", user?.id);

    if (updateError) {
      console.error("Error updating profile:", updateError);
    } else {
      console.log("Profile updated successfully:", updateData);
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
        <h1 id="info-text">Account Information</h1>
        <div className="profile-header">
          <div className="profile-info">
            <div>
              <p className="profile-personal">Email</p>
              <div id="email-container">
                <p id="email">{session.user.email}</p>
              </div>
            </div>

            <div>
              <label htmlFor="username">
                <p className="profile-personal">Username</p>
              </label>

              <input
                id="username"
                type="text"
                value={username || ""}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <p className="profile-score">Bubble Sort Score: {bubbleScore}</p>
            <p className="profile-score">Binary Search Score: {binaryScore}</p>
            <p className="profile-score">Total Score: {totalScore}</p>
          </div>
        </div>

        <div className="profile-actions">
          <button className="update-button" onClick={updateProfile}>
            Update
          </button>
          <button className="sign-out-button" onClick={signOut}>
            Sign out
          </button>
        </div>
      </div>
    </main>
  );
}
