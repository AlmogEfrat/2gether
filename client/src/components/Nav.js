import whiteLogo from "../images/new logo.png";
import colorLogo from "../images/black logo.png";

const Nav = ({ authToken, minimal, setShowModal, showModal, setIsSignUp }) => {
  const handleClick = () => {
    setShowModal(true);
    setIsSignUp(false);
  };

  return (
    <nav className="w-full p-5 h-20s">
      <div className="">
        <img
          className="h-20 w-20s"
          src={minimal ? colorLogo : whiteLogo}
          alt="logo"
        />
      </div>
      {!authToken && !minimal && (
        <button
          className="nav-button"
          onClick={handleClick}
          disabled={showModal}
        >
          Log in
        </button>
      )}
    </nav>
  );
};
export default Nav;
