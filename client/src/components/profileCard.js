// import React from "react";

// const ProfileCard = ({ user }) => {
//   return (
//     <div className="profile-card">
//       <img src={user.url} alt="Profile" className="profile-picture" />
//       <h1>{user.first_name}</h1>
//       <p>
//         Date of Birth: {user.dob_day}/{user.dob_month}/{user.dob_year}
//       </p>
//       <p>Gender: {user.gender_identity}</p>
//       <p>Interested in: {user.gender_interest}</p>
//       <p>About: {user.about}</p>
//       <p>Interests: {user.interests.join(", ")}</p>
//       {/* Add more fields as necessary */}
//     </div>
//   );
// };

// export default ProfileCard;

/////new

// import React from "react";

// const ProfileCard = ({ user }) => {
//   return (
//     <div className="max-w-sm bg-white shadow-lg rounded-lg overflow-hidden my-4">
//       <img
//         className="w-full h-56 object-cover object-center"
//         src={user.url}
//         alt="avatar"
//       />
//       <div className="flex items-center px-6 py-3 bg-gray-900">
//         <h1 className="mx-3 text-white font-semibold text-lg">
//           {user.first_name} {user.last_name}
//         </h1>
//       </div>
//       <div className="py-4 px-6">
//         <h2 className="text-2xl font-semibold text-gray-800">
//           {user.first_name} {user.last_name}
//         </h2>
//         <p className="py-2 text-lg text-gray-700">
//           Date of Birth: {user.dob_day}/{user.dob_month}/{user.dob_year}
//         </p>
//         {user.show_gender && (
//           <p className="text-lg text-gray-700">
//             Gender: {user.gender_identity}
//           </p>
//         )}
//         <p className="py-2 text-lg text-gray-700">Interests:</p>
//         <ul className="list-disc pl-5">
//           {user.interests.map((interest, index) => (
//             <li key={index} className="text-gray-700">
//               {interest}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default ProfileCard;

///// end new

import React from "react";

const ProfileCard = ({ user }) => {
  return (
    <div className="max-w-sm bg-white shadow-lg rounded-lg overflow-hidden my-4">
      <img
        className="w-full h-auto object-contain"
        src={user.url}
        alt="avatar"
      />
      <div className="flex items-center px-6 py-3 bg-gray-900 text-center justify-center">
        <h1 className="mx-3 text-white font-semibold text-lg">
          {user.first_name} {user.last_name}
        </h1>
      </div>
      <div className="py-4 px-6">
        <p className="py-2 text-lg text-gray-700">
          Date of Birth: {user.dob_day}/{user.dob_month}/{user.dob_year}
        </p>

        <p className="text-lg text-gray-700">Gender: {user.gender_identity}</p>

        <p className="py-2 text-lg text-gray-700">Interests:</p>
        <ul className="list-disc pl-5">
          {user?.interests?.map((interest, index) => (
            <li key={index} className="text-gray-700 list-none">
              {interest}
            </li>
          ))}
        </ul>

        {/* Display relationship intent */}
        {/* <p className="text-lg text-gray-700">Relationship Intent:</p>
        <p className="text-lg text-gray-700">{user.intent}</p> */}

        {/* Display relationship intent */}
        <p className="text-lg text-gray-700">Relationship Intent:</p>
        <p className="text-lg text-gray-700">
          {user?.intent || "No intent specified"}
        </p>

        {/* Display disability information */}
        <p className="text-lg text-gray-700">Disability Type:</p>
        <p className="text-lg text-gray-700">{user.disability}</p>
      </div>
    </div>
  );
};

export default ProfileCard;
