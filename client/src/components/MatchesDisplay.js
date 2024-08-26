import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import VideoChat from "./VideoChat";
import { GoDeviceCameraVideo } from "react-icons/go";

const MatchesDisplay = ({ matches, setClickedUser }) => {
  const [matchedProfiles, setMatchedProfiles] = useState([]);
  const [cookies] = useCookies(["UserId"]);
  const userId = cookies.UserId;

  const getMatches = async () => {
    const matchedUserIds = matches
      .map((match) => match.user_id)
      .filter((id) => id);
    if (matchedUserIds.length === 0) {
      console.log("No matches IDs to fetch.");
      return;
    }

    console.log("Fetching matches for user IDs:", matchedUserIds);
    try {
      const response = await axios.get("http://localhost:8000/users", {
        params: { userIds: JSON.stringify(matchedUserIds) },
      });
      console.log("Received matched profiles:", response.data);
      setMatchedProfiles(response.data);
    } catch (error) {
      console.error("Error fetching matches:", error);
    }
  };

  useEffect(() => {
    getMatches();
  }, [JSON.stringify(matches)]); // ensure effect runs when matches change

  // Filter profiles to find mutual matches
  const filteredMatchedProfiles = matchedProfiles.filter(
    (profile) =>
      profile.matches &&
      Array.isArray(profile.matches) &&
      profile.matches.some((match) => match.user_id === userId)
  );

  // Display message if no matches are found or if the list is still loading
  if (matchedProfiles.length === 0) {
    return <p>No matches found or waiting for matches to load...</p>;
  }

  return (
    <div className="matches-display min-h-screen">
      {filteredMatchedProfiles.map((match, index) => (
        <div
          key={index}
          className="match-card"
          onClick={() => setClickedUser(match)}
        >
          <div className="img-container">
            <img src={match.url} alt={`${match.first_name} profile`} />
          </div>
          <h3>{match.first_name}</h3>
          <div className="actions-container">
            <Link
              to={`/profile/${match.user_id}`}
              className="action-link bg-transparent w-1/2 border border-gray-600 p-1 rounded-lg m-2 text-black flex items-center justify-center"
            >
              View Profile
            </Link>
            <Link
              to={"/chat-video"}
              className="border border-gray-600 p-1 w-1/2 rounded-lg text-black items-center flex justify-center"
            >
              Play Video Chat
              <GoDeviceCameraVideo size={18} className="m-2" />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};
export default MatchesDisplay;
