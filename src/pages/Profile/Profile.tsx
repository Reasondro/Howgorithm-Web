import { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "@/pages/Profile/Profile.css"; // We'll create this CSS file for styling
import { supabase } from "@/utils/supabase/supabaseClient";

export default function Profile({ session }: { session: Session | null }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [profileData, setProfileData] = useState<any>(null);

  const navigate = useNavigate();

  async function signOut() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      await supabase.auth.signOut();
      navigate("/");
    } else {
      alert("no user here");
    }
  }

  useEffect(() => {
    const fetchProfileData = async () => {
      // TODO: Replace with actual data fetching logic
      const data = {
        username: "JohnDoe",
        fullName: "John Doe",
        email: session?.user.email,
        avatarUrl: "https://via.placeholder.com/150",
        bio: "I love exploring algorithms and data structures.",
        achievements: [
          "Completed Bubble Sort Quiz",
          "Explored Lab 1",
          "Badge: Algorithm Enthusiast",
        ],
      };
      setProfileData(data);
    };

    if (session) {
      fetchProfileData();
    }
  }, [session]);

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

  return (
    <main id="main-wrapper">
      {profileData ? (
        <div className="profile-page-container">
          <div className="profile-header">
            <img
              src={profileData.avatarUrl}
              alt="User Avatar"
              className="profile-avatar"
            />
            <div className="profile-info">
              <h1 className="profile-username">@{profileData.username}</h1>
              <h2 className="profile-fullname">{profileData.fullName}</h2>
              <p className="profile-email">{profileData.email}</p>
            </div>
          </div>

          <div className="profile-bio">
            <h3>Bio:</h3>
            <p>{profileData.bio}</p>
          </div>

          <div className="profile-achievements">
            <h3>Achievements:</h3>
            <ul>
              {profileData.achievements.map(
                (achievement: string, index: number) => (
                  <li key={index}>{achievement}</li>
                )
              )}
            </ul>
          </div>

          <div className="profile-actions">
            <button className="edit-profile-button">Edit Profile</button>
            <button className="sign-out-button" onClick={signOut}>
              Sign out
            </button>
          </div>
        </div>
      ) : (
        <div className="profile-page-container">
          <h2>Loading profile data...</h2>
        </div>
      )}
    </main>
  );
}
