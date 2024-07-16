import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import VideoChat from "./VideoChat";

const MatchesDisplay = ({ matches, setClickedUser }) => {
  const [matchedProfiles, setMatchedProfiles] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(null);

  const matchedUserIds = matches.map(({ user_id }) => user_id);
  const userId = cookies.UserId;

  const getMatches = async () => {
    try {
      const response = await axios.get("http://localhost:8000/users", {
        params: { userIds: JSON.stringify(matchedUserIds) },
      });
      setMatchedProfiles(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMatches();
  }, [matches]);

  const filteredMatchedProfiles = matchedProfiles?.filter(
    (matchedProfile) =>
      matchedProfile.matches.filter((profile) => profile.user_id == userId)
        .length > 0
  );

  return (
    <div className="matches-display">
      {filteredMatchedProfiles?.map((match, _index) => (
        <div
          key={_index}
          className="match-card"
          onClick={() => setClickedUser(match)}
        >
          <div className="img-container">
            <img src={match?.url} alt={match?.first_name + " profile"} />
          </div>
          <h3>{match?.first_name}</h3>
        </div>
      ))}
    </div>
  );
};

export default MatchesDisplay;

//// מעודכן

// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useCookies } from "react-cookie";
// import VideoChat from "./VideoChat"; // Import the VideoChat component

// const MatchesDisplay = ({ matches, setClickedUser }) => {
//   const [matchedProfiles, setMatchedProfiles] = useState(null);
//   const [cookies, setCookie, removeCookie] = useCookies(null);
//   const [isVideoChatOpen, setIsVideoChatOpen] = useState(false); // State variable for video chat
//   const [targetUserId, setTargetUserId] = useState(null); // State variable for target user ID

//   const matchedUserIds = matches.map(({ user_id }) => user_id);
//   const userId = cookies.UserId;

//   const getMatches = async () => {
//     try {
//       const response = await axios.get("http://localhost:8000/users", {
//         params: { userIds: JSON.stringify(matchedUserIds) },
//       });
//       setMatchedProfiles(response.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getMatches();
//   }, [matches]);

//   const filteredMatchedProfiles = matchedProfiles?.filter(
//     (matchedProfile) =>
//       matchedProfile.matches.filter((profile) => profile.user_id == userId)
//         .length > 0
//   );

//   const handleVideoChatClick = (targetId) => {
//     setTargetUserId(targetId);
//     setIsVideoChatOpen(true);
//   };

//   return (
//     <div className="matches-display">
//       {filteredMatchedProfiles?.map((match, _index) => (
//         <div
//           key={_index}
//           className="match-card"
//           onClick={() => setClickedUser(match)}
//         >
//           <div className="img-container">
//             <img src={match?.url} alt={match?.first_name + " profile"} />
//           </div>
//           <h3>{match?.first_name}</h3>
//           <button onClick={() => handleVideoChatClick(match.user_id)}>
//             Video Chat
//           </button>
//         </div>
//       ))}
//       {isVideoChatOpen && (
//         <VideoChat userId={userId} targetUserId={targetUserId} />
//       )}
//     </div>
//   );
// };

// export default MatchesDisplay;

////////////////////////////////////////////////

// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useCookies } from "react-cookie";
// import VideoChat from "./VideoChat";

// const MatchesDisplay = ({ matches, setClickedUser }) => {
//   const [matchedProfiles, setMatchedProfiles] = useState(null);
//   const [cookies, setCookie, removeCookie] = useCookies(null);
//   const [isVideoChatOpen, setIsVideoChatOpen] = useState(false);
//   const [targetUserId, setTargetUserId] = useState(null);

//   const matchedUserIds = matches.map(({ user_id }) => user_id);
//   const userId = cookies.UserId;

//   const getMatches = async () => {
//     try {
//       const response = await axios.get("http://localhost:8000/users", {
//         params: { userIds: JSON.stringify(matchedUserIds) },
//       });
//       setMatchedProfiles(response.data);
//       console.log("Fetched matched profiles:", response.data); // Debug log
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getMatches();
//     console.log("Matches updated:", matches); // Debug log
//   }, [matches]);

//   const filteredMatchedProfiles = matchedProfiles?.filter(
//     (matchedProfile) =>
//       matchedProfile.matches.filter((profile) => profile.user_id == userId)
//         .length > 0
//   );

//   const handleVideoChatClick = (targetId) => {
//     console.log("Starting video chat with user:", targetId); // Debug log
//     setTargetUserId(targetId);
//     setIsVideoChatOpen(true);
//   };

//   return (
//     <div className="matches-display">
//       {filteredMatchedProfiles?.map((match, _index) => (
//         <div
//           key={_index}
//           className="match-card"
//           onClick={() => setClickedUser(match)}
//         >
//           <div className="img-container">
//             <img src={match?.url} alt={match?.first_name + " profile"} />
//           </div>
//           <h3>{match?.first_name}</h3>
//           <button onClick={() => handleVideoChatClick(match.user_id)}>
//             Video Chat
//           </button>
//         </div>
//       ))}
//       {isVideoChatOpen && (
//         <VideoChat userId={userId} targetUserId={targetUserId} />
//       )}
//     </div>
//   );
// };

// export default MatchesDisplay;
