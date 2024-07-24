import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Nav from "../components/Nav"; // Make sure to import Nav if it's in a different file

const OnBoarding = () => {
  const interestsArray = [
    "Music",
    "Sports",
    "Travel",
    "Movies",
    "Books",
    "Fitness",
    "Gaming",
    "Cooking",
    "Art",
    "Technology",
    "Photography",
    "Nature",
    "Science",
    "History",
    "Fashion",
    "Food",
    "Writing",
    "Dance",
    "Yoga",
    "DIY",
    "Pets",
    "Politics",
    "Entrepreneurship",
    "Music Production",
    "Board Games",
    "Theater",
    "Health and Wellness",
    "Volunteering",
    "Cryptocurrency",
    "Anime and Manga",
    "Home Decor",
    "Fashion Design",
    "Languages",
    "Animation",
    "Pets",
    "Meditation",
    "Cycling",
    "Podcasts",
    "Fishing",
    "Skiing",
    "Surfing",
    "Crafts",
    "Magic",
    "Film Making",
    "Interior Design",
    "Graphic Design",
    "Sustainability",
    "Virtual Reality",
    "Archery",
    "Calligraphy",
    "Chess",
    "Writing",
    "Volunteering",
    "Board Games",
    "Camping",
    "Singing",
  ];
  //Add a relationship goal
  const intentArray = [
    "still trying to understand",
    "Make new friends",
    "short term fun",
    "Short term with an option to extend",
    "Long term with option to shorten",
    "long term relationship",
  ];
  const disabilityArray = [
    "Sight",
    "Physical Disability",
    "Mental Disability",
    "Hearing Impairment",
    "Cardiac Conditions",
    "Cognitive Disability",
    "Speech and Language Disorders",
    "Learning Disabilities",
    "Mental Health Conditions",
    "Visual Impairment",
    "Neurological Disorders",
    "Autism Spectrum Disorder",
    "Down Syndrome",
    "Chronic Illness",
    "Cerebral Palsy",
    "Diabetes",
    "Alzheimer’s Disease",
    "Other",
  ];

  const [selectedInterests, setSelectedInterests] = useState([]);
  const [selectedDisability, setSelectedDisability] = useState(""); //הוספת מגבלה
  const [selectedIntent, setSelectedIntent] = useState(""); // Initialize with a default value

  const handleInterestSelect = (interest) => {
    console.log("category", interest);
    if (selectedInterests.includes(interest)) {
      setSelectedInterests((prevInterests) =>
        prevInterests.filter((item) => item !== interest)
      );
    } else if (selectedInterests.length < 5) {
      setSelectedInterests((prevInterests) => [...prevInterests, interest]);
    }
    console.log(selectedInterests);
  };

  /////////////////////////////////////////////////
  const handleIntentSelect = (intent) => {
    setSelectedIntent(intent); // Directly set the new intent
  };
  //Add a relationship goal
  // const handleIntentSelect = (intent) => {
  //   setSelectedIntent(intent);
  // };

  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [formData, setFormData] = useState({
    user_id: cookies.UserId,
    first_name: "",
    dob_day: "",
    dob_month: "",
    dob_year: "",
    show_gender: false,
    gender_identity: "man",
    gender_interest: "woman",
    url: "",
    about: "",
    matches: [],
  });
  ///  disability: "", // Add disability field to form data להוסיף לדאטה בייס?
  const [openModal, setOpenModal] = useState(false);
  ///הוספה לתקנון
  const [openRegulationModal, setOpenRegulationModal] = useState(false); // State for regulation modal
  const [regulationsAccepted, setRegulationsAccepted] = useState(false);

  // Add state for relationship intent modal
  const [openIntentModal, setOpenIntentModal] = useState(false);

  //const [selectedIntent, setSelectedIntent] = useState("");

  const [openDisabilityModal, setOpenDisabilityModal] = useState(false); ///הוסםת מגבלה
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  // הוספת מגבלה
  const handleOpenDisabilityModal = () => setOpenDisabilityModal(true);
  const handleCloseDisabilityModal = () => setOpenDisabilityModal(false);

  ///הוספה לתקנון
  const handleOpenRegulationModal = () => setOpenRegulationModal(true); // Open regulation modal
  const handleCloseRegulationModal = () => setOpenRegulationModal(false); // Close regulation modal

  // Handlers for relationship intent modal
  const handleOpenIntentModal = () => setOpenIntentModal(true);
  const handleCloseIntentModal = () => setOpenIntentModal(false);

  let navigate = useNavigate();

  // const handleIntentSelect = (intent) => { // <-- Changed to select only one intent
  //   setSelectedIntent(intent);
  // };

  const handleSubmit = async (e) => {
    console.log("submitted", formData);
    e.preventDefault();
    //// הוספה לתקנון

    if (!regulationsAccepted) {
      // Check if regulations are accepted
      handleOpenRegulationModal(); // Open the regulation modal if not accepted
      return;
    }
    const updatedFormData = {
      ...formData,
      interests: selectedInterests,
      intent: selectedIntent, // Add intent to form data,//Add a relationship goal
      disability: selectedDisability, /// add Disability
    };
    try {
      const response = await axios.put(
        "http://localhost:8000/user",
        updatedFormData
      );
      console.log(response);
      const success = response.status === 200;
      if (success) navigate("/dashboard");
    } catch (err) {
      console.log(err);
    }
  };

  /////////// before change
  const handleChange = (e) => {
    console.log("e", e);
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    const name = e.target.name;
    /////////// before change

    //check
    console.log(`Setting ${name} to ${value}`);

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  ///הוספה מגבלה
  const handleDisabilitySelect = (disability) => {
    setSelectedDisability(disability);
    handleCloseDisabilityModal();
  };

  ///הוספה לתקנון
  const handleAcceptRegulations = () => {
    setRegulationsAccepted(true); // Mark regulations as accepted
    handleCloseRegulationModal(); // Close the regulation modal
  };

  return (
    <>
      <Nav minimal={true} setShowModal={() => {}} showModal={false} />

      <div className="onboarding">
        <h2>CREATE ACCOUNT</h2>

        <form onSubmit={handleSubmit}>
          <section>
            <label htmlFor="first_name">First Name</label>
            <input
              id="first_name"
              type="text"
              name="first_name"
              placeholder="First Name"
              required={true}
              value={formData.first_name}
              onChange={handleChange}
            />
            <label>Birthday</label>
            <div className="text-dark flex justify-between text-center">
              <input
                id="dob_day"
                type="number"
                name="dob_day"
                placeholder="DD"
                required={true}
                value={formData.dob_day}
                onChange={handleChange}
                className="w-15"
              />
              <input
                id="dob_month"
                type="number"
                name="dob_month"
                placeholder="MM"
                required={true}
                value={formData.dob_month}
                onChange={handleChange}
                className="birthday-input"
              />
              <input
                id="dob_year"
                type="number"
                name="dob_year"
                placeholder="YYYY"
                required={true}
                value={formData.dob_year}
                onChange={handleChange}
                className="birthday-input"
              />
            </div>
            <label>Gender</label>
            <div className="multiple-input-container">
              <input
                id="man-gender-identity"
                type="radio"
                name="gender_identity"
                value="man"
                onChange={handleChange}
                checked={formData.gender_identity === "man"}
              />
              <label htmlFor="man-gender-identity">Man</label>
              <input
                id="woman-gender-identity"
                type="radio"
                name="gender_identity"
                value="woman"
                onChange={handleChange}
                checked={formData.gender_identity === "woman"}
              />
              <label htmlFor="woman-gender-identity">Woman</label>
              <input
                id="more-gender-identity"
                type="radio"
                name="gender_identity"
                value="more"
                onChange={handleChange}
                checked={formData.gender_identity === "more"}
              />
              <label htmlFor="more-gender-identity">Other</label>
            </div>
            <label htmlFor="show-gender">Show Gender on my Profile</label>
            <input
              id="show-gender"
              type="checkbox"
              name="show_gender"
              onChange={handleChange}
              checked={formData.show_gender}
            />
            <label>Show Me</label>
            <div className="multiple-input-container">
              <input
                id="man-gender-interest"
                type="radio"
                name="gender_interest"
                value="man"
                onChange={handleChange}
                checked={formData.gender_interest === "man"}
              />
              <label htmlFor="man-gender-interest">Man</label>
              <input
                id="woman-gender-interest"
                type="radio"
                name="gender_interest"
                value="woman"
                onChange={handleChange}
                checked={formData.gender_interest === "woman"}
              />
              <label htmlFor="woman-gender-interest">Woman</label>
              <input
                id="everyone-gender-interest"
                type="radio"
                name="gender_interest"
                value="everyone"
                onChange={handleChange}
                checked={formData.gender_interest === "everyone"}
              />
              <label htmlFor="everyone-gender-interest">Everyone</label>
            </div>
            <div className="flex flex-col gap-4">
              <button
                data-modal-target="default-modal"
                data-modal-toggle="default-modal"
                className="text-white mt-3 text-gray-600 bg-transparent border border-gray-600 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                type="button"
                onClick={handleOpenModal}
              >
                Interests
              </button>

              <button
                data-modal-target="intent-modal" ////goal intert relat
                data-modal-toggle="intent-modal"
                className="text-white mt-3 text-gray-600 bg-transparent border border-gray-600 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                type="button"
                onClick={handleOpenIntentModal}
              >
                Relationship Intent
              </button>
              <button
                data-modal-target="disability-modal"
                data-modal-toggle="disability-modal"
                className="text-white text-gray-600 bg-transparent border border-gray-600 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                type="button"
                onClick={handleOpenDisabilityModal}
              >
                Disability
              </button>
            </div>{" "}
            {/* Closed the wrapper div */}
            <label htmlFor="about">About me</label>
            <input
              id="about"
              type="text"
              name="about"
              required={true}
              placeholder="I like long walks..."
              value={formData.about}
              onChange={handleChange}
            />
            <label htmlFor="url">Profile Photo</label>
            <input
              type="url"
              name="url"
              id="url"
              onChange={handleChange}
              required={true}
            />
            <div className="photo-container">
              {formData.url && (
                <img src={formData.url} alt="profile pic preview" />
              )}
            </div>
            <button
              type="submit"
              className="text-white bg-gradient-to-r from-[#F05252] to-[#E02424] hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </section>

          {openModal && (
            <div
              id="default-modal"
              tabIndex="-1"
              aria-hidden="true"
              className="fixed inset-0 flex items-center justify-center z-50 overflow-y-auto"
            >
              <div className="relative w-full max-w-2xl max-h-full bg-white rounded-lg shadow dark:bg-gray-700">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-900">
                    what do you find interesting?
                  </h3>
                  <button
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={handleCloseModal}
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>

                <div className="flex flex-wrap justify-between max-w-full gap-3 mx-5 p-3">
                  {interestsArray.map((category, index) => (
                    <div key={index} className="">
                      <button
                        type="button"
                        className="p-1 bg-white border border-pink-500 rounded-md cursor-pointer text-center"
                        onClick={() => handleInterestSelect(category)}
                      >
                        {category}
                      </button>
                    </div>
                  ))}
                  {selectedInterests.map((interest) => (
                    <div className="text-blue-600 text-md" key={interest}>
                      {interest}
                    </div>
                  ))}
                </div>

                <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                  <button
                    type="button"
                    className="text-white bg-gradient-to-r from-[#F05252] to-[#E02424] hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={handleCloseModal}
                  >
                    I'm done!
                  </button>
                  <button
                    type="button"
                    className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    onClick={handleCloseModal}
                  >
                    not interested
                  </button>
                </div>
              </div>
            </div>
          )}
          {/* {openIntentModal && ( // Relationship intent modal
            <div
              id="intent-modal"
              tabIndex="-1"
              aria-hidden="true"
              className="fixed inset-0 flex items-center justify-center z-50 overflow-y-auto"
            >
              <div className="relative w-full max-w-2xl max-h-full bg-white rounded-lg shadow dark:bg-gray-700">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Relationship Intent
                  </h3>
                  <button
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={handleCloseIntentModal}
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                <div className="flex flex-wrap justify-between max-w-full gap-3 mx-5 p-3">
                  {intentArray.map((intent, index) => (
                    <div key={index}>
                      <button
                        type="button"
                        className={`button-class ${
                          selectedIntent === intent
                            ? "active-class bg-pink-500 text-white"
                            : "bg-white border border-pink-500 text-pink-500"
                        }`}
                        onClick={() => handleIntentSelect(intent)}
                      >
                        {intent}
                      </button>
                    </div>
                  ))}
                  {selectedIntent.map((intent) => (
                    <div className="text-blue-600 text-md" key={intent}>
                      {intent}
                    </div>
                  ))}
                   ///////////////////////////////////////////////////////////////
                  {/* {intentArray.map((intent, index) => (
                    <div key={index} className="">
                      <button
                        type="button"
                        className={`p-2 rounded-md cursor-pointer text-center ${
                          selectedIntent === intent
                            ? "bg-pink-500 text-white"
                            : "bg-white border border-pink-500 text-pink-500"
                        }`}
                        onClick={() => handleIntentSelect(intent)} // Selecting a single intent
                      >
                        {intent}
                      </button>
                    </div>
                  ))} 
                  ///////////////////////////////////////////////

                </div>
                <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                  <button
                    type="button"
                    className="text-white bg-gradient-to-r from-[#F05252] to-[#E02424] hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={handleCloseIntentModal} // Confirming the selection
                  >
                    Confirm
                  </button>
                  <button
                    type="button"
                    className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    onClick={handleCloseIntentModal} // Closing the modal without changes
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )} */}

          {openIntentModal && ( // Relationship intent modal
            <div
              id="intent-modal"
              tabIndex="-1"
              aria-hidden="true"
              className="fixed inset-0 flex items-center justify-center z-50 overflow-y-auto"
            >
              <div className="relative w-full max-w-2xl max-h-full bg-white rounded-lg shadow dark:bg-gray-700">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-text-gray-900">
                    Relationship Intent
                  </h3>
                  <button
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={handleCloseIntentModal}
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                <div className="flex flex-wrap justify-between max-w-full gap-3 mx-5 p-3">
                  {intentArray.map((intent, index) => (
                    <div key={index} className="">
                      <button
                        type="button"
                        className={`p-2 rounded-md cursor-pointer text-center ${
                          selectedIntent === intent
                            ? "bg-pink-500 text-white"
                            : "bg-white border border-pink-500 text-black"
                        }`}
                        onClick={() => handleIntentSelect(intent)}
                      >
                        {intent}
                      </button>
                    </div>
                  ))}
                </div>
                <div className="p-3">
                  <p>
                    Selected Intent:{" "}
                    <strong className="text-blue-600">
                      {selectedIntent || "None selected"}
                    </strong>
                  </p>
                </div>
                <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                  <button
                    type="button"
                    className="text-white bg-gradient-to-r from-[#F05252] to-[#E02424] hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={handleCloseIntentModal}
                  >
                    I'm done!
                  </button>
                  <button
                    type="button"
                    className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    onClick={handleCloseIntentModal}
                  >
                    not interested
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* {openIntentModal && ( // Relationship intent modal
            <div
              id="intent-modal"
              tabIndex="-1"
              aria-hidden="true"
              className="fixed inset-0 flex items-center justify-center z-50 overflow-y-auto"
            >
              <div className="relative w-full max-w-2xl max-h-full bg-white rounded-lg shadow dark:bg-gray-700">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Relationship Intent
                  </h3>
                  <button
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={handleCloseIntentModal}
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                <div className="flex flex-wrap justify-between max-w-full gap-3 mx-5 p-3">
                  {intentArray.map((intent, index) => (
                    <div key={index} className="">
                      <button
                        type="button"
                        className={`p-2 rounded-md cursor-pointer text-center ${
                          selectedIntent === intent
                            ? "bg-pink-500 text-white"
                            : "bg-white border border-pink-500 text-pink-500"
                        }`}
                        onClick={() => handleIntentSelect(intent)}
                      >
                        {intent}
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                  <button
                    type="button"
                    className="text-white bg-gradient-to-r from-[#F05252] to-[#E02424] hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={handleCloseIntentModal}
                  >
                    Confirm
                  </button>
                  <button
                    type="button"
                    className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    onClick={handleCloseIntentModal}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )} */}
          {openDisabilityModal && (
            <div
              id="disability-modal"
              tabIndex="-1"
              aria-hidden="true"
              className="fixed inset-0 flex items-center justify-center z-50 overflow-y-auto"
            >
              <div className="relative w-full max-w-2xl max-h-full bg-white rounded-lg shadow dark:bg-gray-700">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    What type of disability do you have?
                  </h3>
                  <button
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={handleCloseDisabilityModal}
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>

                <div className="flex flex-wrap justify-between max-w-full gap-3 mx-5 p-3">
                  {disabilityArray.map((disability, index) => (
                    <div key={index} className="">
                      <button
                        type="button"
                        className="p-1 bg-white border border-pink-500 rounded-md cursor-pointer text-center"
                        onClick={() => handleDisabilitySelect(disability)}
                      >
                        {disability}
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                  <button
                    type="button"
                    className="text-white bg-gradient-to-r from-[#F05252] to-[#E02424] hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={handleCloseDisabilityModal}
                  >
                    I'm done!
                  </button>
                  <button
                    type="button"
                    className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    onClick={handleCloseDisabilityModal}
                  >
                    not interested
                  </button>
                </div>
              </div>
            </div>
          )}

          {openRegulationModal && ( // Regulation modal
            <div
              id="regulation-modal"
              tabIndex="-1"
              aria-hidden="true"
              className="fixed inset-0 flex items-center justify-center z-50 overflow-y-auto"
            >
              <div className="relative w-full max-w-4xl max-h-full bg-white rounded-lg shadow dark:bg-gray-700">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Terms of Service
                  </h3>
                  <button
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={handleCloseRegulationModal}
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                <div className="p-4 md:p-5 space-y-4 overflow-y-auto max-h-[75vh] text-center">
                  <p
                    className="text-base leading-relaxed text-gray-500 dark:text-gray-400 mx-auto"
                    style={{ maxWidth: "700px" }}
                  >
                    <p className="font-bold text-lg">Welcome to 2-gether! </p>
                    <p>
                      We are dedicated to creating a safe, inclusive, and
                      accessible platform for all users, especially those with
                      disabilities. By using our site, you agree to abide by the
                      following terms and conditions. Please read them
                      carefully.{" "}
                    </p>
                    <p className="font-bold text-lg mt-4">
                      {" "}
                      1. Acceptance of Terms
                    </p>
                    By accessing or using 2-gether, you agree to be bound by
                    these Terms of Service and our Privacy Policy. If you do not
                    agree with any part of these terms, you must not use our
                    service.
                    <p className="font-bold text-lg mt-4">2. Eligibility</p>
                    <p>
                      You must be at least 18 years old to use 2-gether. By
                      using our service, you represent and warrant that you are
                      at least 18 years old.
                    </p>
                    <p className="font-bold text-lg mt-4">3. User Conduct</p>
                    <p>
                      You agree to use 2-gether in a manner that is respectful
                      and considerate of all users, including those with
                      disabilities. You will not:
                    </p>
                    <ul className="list-disc pl-5 text-left">
                      <li>
                        Harass, intimidate, or discriminate against any user
                        based on disability, race, gender, sexual orientation,
                        religion, or any other characteristic.
                      </li>
                      <li>
                        Post or share content that is offensive, abusive, or
                        harmful.
                      </li>
                      <li>
                        Impersonate any person or entity, or falsely state or
                        misrepresent yourself.
                      </li>
                    </ul>
                    <p className="font-bold text-lg mt-4">4. Accessibility </p>
                    <p>
                      We are committed to providing an accessible experience for
                      all users. If you have any suggestions or encounter any
                      accessibility barriers, please contact our support team at
                      almogefratproject@gmail.com. We will work to address your
                      concerns promptly.
                    </p>
                    <p className="font-bold text-lg mt-4"> 5. Privacy </p>
                    <p>
                      Your privacy is important to us. Please review our Privacy
                      Policy to understand how we collect, use, and protect your
                      personal information.
                    </p>
                    <p className="font-bold text-lg mt-4">
                      6.Content and Intellectual Property
                    </p>
                    <p>
                      You retain all rights to the content you post on [Your
                      Dating Site Name]. However, by posting content, you grant
                      us a non-exclusive, royalty-free, worldwide license to
                      use, display, and distribute your content in connection
                      with our service.
                    </p>
                    <p className="font-bold text-lg mt-4">7. Termination</p>
                    <p>
                      We reserve the right to suspend or terminate your account
                      if you violate these Terms of Service or engage in conduct
                      that we deem inappropriate or harmful to the community.
                    </p>
                    <p className="font-bold text-lg mt-4">8. Disclaimers</p>
                    <p>
                      2-gether is provided on an "as is" and "as available"
                      basis. We do not guarantee that the service will be
                      uninterrupted or error-free. We disclaim all warranties,
                      express or implied, including but not limited to
                      warranties of merchantability, fitness for a particular
                      purpose, and non-infringement.
                    </p>
                    <p className="font-bold text-lg mt-4">
                      9. Limitation of Liability{" "}
                    </p>
                    <p>
                      To the fullest extent permitted by law, 2-gether shall not
                      be liable for any indirect, incidental, special,
                      consequential, or punitive damages, or any loss of profits
                      or revenues, whether incurred directly or indirectly, or
                      any loss of data, use, goodwill, or other intangible
                      losses, resulting from (i) your use or inability to use
                      the service; (ii) any unauthorized access to or use of our
                      servers and/or any personal information stored therein;
                      (iii) any interruption or cessation of transmission to or
                      from the service.
                    </p>
                    <p className="font-bold text-lg mt-4">
                      10. Changes to Terms
                    </p>
                    <p>
                      We may update these Terms of Service from time to time. If
                      we make material changes, we will notify you by email or
                      through our site. Your continued use of the service after
                      such changes constitutes your acceptance of the new terms.
                    </p>
                    <p className="font-bold text-lg mt-4"> 11. Contact Us </p>
                    <p>
                      If you have any questions or concerns about these Terms of
                      Service, please contact us at almogefratproject@gmail.com.
                    </p>
                  </p>

                  <p
                    className="text-base leading-relaxed text-gray-500 dark:text-gray-400 mx-auto"
                    style={{ maxWidth: "700px" }}
                  >
                    By clicking "I accept" below, you acknowledge that you have
                    read and agree to these Terms of Service.
                  </p>
                </div>
                <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                  <button
                    type="button"
                    className="text-white bg-gradient-to-r from-[#F05252] to-[#E02424] hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={handleAcceptRegulations}
                  >
                    I accept
                  </button>
                  <button
                    type="button"
                    className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    onClick={handleCloseRegulationModal}
                  >
                    Decline
                  </button>
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default OnBoarding;
