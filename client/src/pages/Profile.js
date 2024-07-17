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
import { Link } from "react-router-dom";
import Loader from "../components/Loader";

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
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex justify-start items-start p-5 mx-auto">
        <Link
          to={"/dashboard"}
          className="p-2 text-white bg-black text-md rounded-lg"
        >
          Back
        </Link>
      </div>
      <div className="flex justify-center items-center mt-5">
        <ProfileCard user={userData} />
      </div>
    </div>
  );
};

export default Profile;
