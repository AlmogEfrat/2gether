import TinderCard from "react-tinder-card";
import { useEffect, useState } from "react";
import ChatContainer from "../components/ChatContainer";
import { useCookies } from "react-cookie";
import axios from "axios";
import Loader from "../components/Loader";
import Footer from "../components/Footer";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [genderedUsers, setGenderedUsers] = useState(null);
  const [lastDirection, setLastDirection] = useState();
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [clickedUser, setClickedUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const userId = cookies.UserId;

  const getUser = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8000/user", {
        params: { userId },
      });
      console.log(response.data.user_id);
      setUser(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const getGenderedUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8000/gendered-users", {
        params: { gender: user?.gender_interest, userId: userId },
      });

      setGenderedUsers(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (user) {
      getGenderedUsers();
    }
  }, [user]);

  // const updateMatches = async (matchedUserId) => {
  //   try {
  //     await axios.put("http://localhost:8000/addmatch", {
  //       userId,
  //       matchedUserId,
  //     });
  //     getUser();
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  ///////////שינוי ב-28/7 פתיחת צאט שני משתמשים
  // const swiped = async (direction, swipedUserId) => {
  //   if (direction === "right") {
  //     const response = await axios.put("http://localhost:8000/addmatch", {
  //       userId,
  //       matchedUserId: swipedUserId,
  //     });

  //     if (response.data.matched) {
  //       console.log("Mutual match found!");
  //       // Update local state or context to reflect the mutual match and open the chat
  //       updateChat(swipedUserId); // You will need to define this function
  //     } else {
  //       console.log("No mutual match yet.");
  //     }
  //   }
  //   setLastDirection(direction);
  // };
  const updateMatches = async (matchedUserId) => {
    try {
      await axios.put("http://localhost:8000/addmatch", {
        userId,
        matchedUserId,
      });
      getUser();
    } catch (err) {
      console.log(err);
    }
  };

  const swiped = (direction, swipedUserId) => {
    if (direction === "right") {
      updateMatches(swipedUserId);
    }
    setLastDirection(direction);
  };

  const outOfFrame = (name) => {
    console.log(name + " left the screen!");
  };

  const matchedUserIds = user?.matches
    .map(({ user_id }) => user_id)
    .concat(userId);

  // שינוי ב26/7 משתמשים שלא יראו את עצמם בהתאמות

  const filteredGenderedUsers = genderedUsers?.filter(
    (genderedUser) => !matchedUserIds.includes(genderedUser.user_id)
  );

  // const filteredGenderedUsers = genderedUsers?.filter(
  //   (genderedUUser) => matchedUserIds !== genderedUUser.user_id
  // );

  return (
    <>
      {loading && <Loader />}
      {user && (
        <div className="dashboard min-w-full">
          <ChatContainer user={user} />
          <div className="swipe-container w-1/2">
            <div className="card-container">
              {filteredGenderedUsers?.map((genderedUser) => (
                <TinderCard
                  className="swipe"
                  key={genderedUser.user_id}
                  onSwipe={(dir) => swiped(dir, genderedUser.user_id)}
                  onCardLeftScreen={() => outOfFrame(genderedUser.first_name)}
                >
                  <div
                    style={{ backgroundImage: "url(" + genderedUser.url + ")" }}
                    className="card"
                  >
                    <h3 className="text-2xl">{genderedUser.first_name}</h3>
                  </div>
                </TinderCard>
              ))}

              <div className="swipe-info">
                {lastDirection ? <p>You swiped {lastDirection}</p> : <p />}
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="w-full justify-center flex-col">
        <Footer />
      </div>
    </>
  );
};
export default Dashboard;
