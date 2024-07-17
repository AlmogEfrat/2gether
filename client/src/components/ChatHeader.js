import React from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { CiLogout } from "react-icons/ci";

const ChatHeader = ({ user }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const navigate = useNavigate();

  const logout = () => {
    removeCookie("UserId", cookies.UserId);
    removeCookie("AuthToken", cookies.AuthToken);
    navigate("/");
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  return (
    <div className="chat-container-header">
      <div className="profile">
        <div className="py-2 cursor-pointer" onClick={handleProfileClick}>
          <img
            src={user.url}
            alt={"photo of " + user.first_name}
            className="rounded-full w-10 h-10 m-2"
          />
        </div>
        <h3 className="text-lg">{user.first_name}</h3>
      </div>
      <i className="text-xl cursor-pointer text-black mr-2" onClick={logout}>
        <CiLogout size={25} />
      </i>
    </div>
  );
};

export default ChatHeader;
