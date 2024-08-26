import React from "react";

// Function to calculate age from date of birth
const calculateAge = (dob) => {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

const ProfileCard = ({ user }) => {
  const age = calculateAge(
    `${user.dob_year}-${user.dob_month}-${user.dob_day}`
  );
  return (
    <div className="min-w-lg mx-10 p-5 bg-white shadow-lg rounded-lg overflow-hidden my-4">
      <div className="w-[400px] h-[350px] pb-10 mb-10">
        <img
          className="w-full h-auto object-contain h-98  w-98"
          src={user.url}
          alt="avatar"
        />
      </div>

      <div className="flex items-center px-6 py-3 bg-gray-900 text-center justify-center">
        <h1 className="mx-3 text-white font-semibold text-lg pt-1 text-white">
          {user.first_name} {user.last_name}
        </h1>
      </div>
      <div className="py-4 px-6">
        <p className=" py-2 text-lg text-gray-700">Age: {age}</p>

        {/* הצגת תאריך לידה */}
        {/* <p className="py-2 text-lg text-gray-700">
          Date of Birth: {user.dob_day}/{user.dob_month}/{user.dob_year}
        </p> */}

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
        <p className="py-2 text-lg text-gray-700">Relationship Intent:</p>
        <p className="text-gray-700">{user?.intent || "No intent specified"}</p>

        <p className="py-2 text-lg text-gray-700">Disability Types:</p>
        <ul className="list-disc pl-5">
          {Array.isArray(user.disability) ? (
            user.disability.map((disability, index) => (
              <li key={index} className="text-gray-700 list-none">
                {disability}
              </li>
            ))
          ) : (
            <li className="text-gray-700">
              {user.disability || "None specified"}
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ProfileCard;
