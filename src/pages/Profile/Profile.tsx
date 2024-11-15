import { Session } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";

import "@/pages/Profile/Profile.css"; // We'll create this CSS file for styling
import { supabase } from "@/utils/supabase/supabaseClient";

export default function Profile({ session }: { session: Session | null }) {
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
      <div className="profile-page-container">
        <div className="profile-header">
          <div className="profile-info">
            <p className="profile-email">Email: {session.user.email}</p>
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
