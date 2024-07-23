/////////////////////////לפני שינוי צפייה בפרופיל

// import Home from "./pages/Home";
// import Dashboard from "./pages/Dashboard";
// import OnBoarding from "./pages/OnBoarding";
// import Profile from "./pages/Profile";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { useCookies } from "react-cookie";
// import AccessibilityButton from "./components/AccessibilityButton";

// const App = () => {
//   const [cookies, setCookie, removeCookie] = useCookies(["user"]);

//   const authToken = cookies.AuthToken;

//   return (
//     <BrowserRouter>
//       <AccessibilityButton />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         {authToken && <Route path="/dashboard" element={<Dashboard />} />}
//         {authToken && <Route path="/onboarding" element={<OnBoarding />} />}
//         {authToken && <Route path="/Profile" element={<Profile />} />}
//       </Routes>
//     </BrowserRouter>
//   );
// };

// export default App;

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import OnBoarding from "./pages/OnBoarding";
import Profile from "./pages/Profile";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useCookies } from "react-cookie";
import AccessibilityButton from "./components/AccessibilityButton";
import VideoChat from "./components/VideoChat";

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
        {authToken && <Route path="/profile" element={<Profile />} />}
        {authToken && <Route path="/profile/:userId" element={<Profile />} />}
        {authToken && <Route path="/chat-video" element={<VideoChat />} />}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
