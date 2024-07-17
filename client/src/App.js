import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import OnBoarding from "./pages/OnBoarding";
import Profile from "./pages/Profile";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useCookies } from "react-cookie";
import AccessibilityButton from "./components/AccessibilityButton";

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  const authToken = cookies.AuthToken;

  return (
    <BrowserRouter>
      <AccessibilityButton />
      <Routes>
        <Route path="/" element={<Home />} />
        {authToken && <Route path="/dashboard" element={<Dashboard />} />}
        {authToken && <Route path="/onboarding" element={<OnBoarding />} />}
        {authToken && <Route path="/Profile" element={<Profile />} />}
      </Routes>
    </BrowserRouter>
  );
};

export default App;

// import "./index.css"; // Import index.css
// import React from "react";
// import Home from "./pages/Home";
// import Dashboard from "./pages/Dashboard";
// import OnBoarding from "./pages/OnBoarding";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { useCookies } from "react-cookie";

// import VideoChat from "./components/VideoChat";

// const App = () => {
//   const [cookies, setCookie, removeCookie] = useCookies(["user"]);
//   const authToken = cookies.AuthToken;

//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         {authToken && <Route path="/dashboard" element={<Dashboard />} />}
//         {authToken && <Route path="/onboarding" element={<OnBoarding />} />}
//         {authToken && <Route path="/videochat" element={<VideoChat />} />}{" "}
//         {/* Add VideoChat route */}
//       </Routes>
//     </BrowserRouter>
//   );
// };

// export default App;
