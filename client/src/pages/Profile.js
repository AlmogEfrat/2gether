// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import ProfileCard from "../components/profileCard"; // Import ProfileCard component

// const Profile = () => {
//   const [userData, setUserData] = useState(null);

//   useEffect(() => {
//     // Fetch user data from the server
//     const fetchUserData = async () => {
//       try {
//         const response = await axios.get("http://localhost:8000/user-profile", {
//           withCredentials: true,
//         });
//         setUserData(response.data);
//       } catch (error) {
//         console.error("Error fetching user data", error);
//       }
//     };

//     fetchUserData();
//   }, []);

//   if (!userData) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <ProfileCard user={userData} /> {/* Pass user data to ProfileCard */}
//     </div>
//   );
// };

// export default Profile;

//////////////////////////

import React, { useEffect, useState } from "react";
import axios from "axios";
import ProfileCard from "../components/profileCard";
import { useCookies } from "react-cookie";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [cookies] = useCookies(["UserId"]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/user-profile", {
          params: { userId: cookies.UserId },
          withCredentials: true,
        });
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };

    if (cookies.UserId) {
      fetchUserData();
    }
  }, [cookies.UserId]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ProfileCard user={userData} />
    </div>
  );
};

export default Profile;
