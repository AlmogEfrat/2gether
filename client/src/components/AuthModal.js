import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { IoMdClose } from "react-icons/io";

const AuthModal = ({ setShowModal, isSignUp }) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [error, setError] = useState(null);
  const [errorEmail, setErrorEmail] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies(null);

  let navigate = useNavigate();

  const handleClick = () => {
    setShowModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isSignUp && password !== confirmPassword) {
        setError("הסיסמאות אינן תואמות!"); // בדיקה אם הסיסמאות אינן תואמות
        return;
      }

      const response = await axios.post(
        `http://localhost:8000/${isSignUp ? "signup" : "login"}`,
        { email, password }
      );

      if (isSignUp && response.status !== 201) {
        setErrorEmail(
          response.data.message || "An error occurred during signup."
        );
        return;
      }

      setCookie("AuthToken", response.data.token);
      setCookie("UserId", response.data.userId);

      const success = response.status === 201;
      if (success && isSignUp) navigate("/onboarding");
      if (success && !isSignUp) navigate("/dashboard");

      window.location.reload();
    } catch (error) {
      console.log(error);

      if (error.response) {
        // Server responded with a status other than 2xx
        if (error.response.status === 401) {
          setError("User already exists. Try again.");
        } else if (error.response.status === 500) {
          setError("Internal Server Error. Please try again later.");
        } else {
          setError("An error occurred. Please try again.");
        }
      } else if (error.request) {
        // Request was made but no response was received
        setError(
          "No response from server. Please check your network connection."
        );
      } else {
        // Something else happened while setting up the request
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="auth-modal">
      <div className="close-icon cursor-pointer" onClick={handleClick}>
        <IoMdClose />
      </div>

      <h2 className="text-lg">{isSignUp ? "CREATE ACCOUNT" : "LOG IN"}</h2>
      <p className="mt-5">
        By clicking Log In, you agree to our terms. Learn how we process your
        data in our Privacy Policy and Cookie Policy.
      </p>
      <form onSubmit={handleSubmit} className="mt-5">
        <input
          type="email"
          id="email"
          name="email"
          placeholder="email"
          required={true}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="password"
          required={true}
          onChange={(e) => setPassword(e.target.value)}
        />
        {isSignUp && (
          <input
            type="password"
            id="password-check"
            name="password-check"
            placeholder="confirm password"
            required={true}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        )}
        <input className="secondary-button cursor-pointer" type="submit" />
        <p>{error}</p>
        <p>{errorEmail}</p>
      </form>
    </div>
  );
};
export default AuthModal;
