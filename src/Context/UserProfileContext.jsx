import axios from "axios";
import { createContext, useState } from "react";
import { headers } from "./CartContext";

export const userProfileObject = createContext();

function UserProfileContextProvider({ children }) {
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState("");
  const [userId, setUserId] = useState("");
  const [error, setError] = useState("");

  function getUserInfo() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/auth/verifyToken", { headers })
      .then((res) => {
        const userData = res.data.decoded;
        setUserName(userData.name);
        setUserRole(userData.role);
        setUserId(userData.id);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function updateUserData(uName, uEmail, uPhone) {
   return await axios
      .put(
        "https://ecommerce.routemisr.com/api/v1/users/updateMe/",
        {
          name: uName,
          email: uEmail,
          phone: uPhone,
        },
        { headers }
      )
      .then((res) => {
        setUserName(res.data.user.name);
        return true
      })
      .catch((error) => {
        setError(error.response.data.errors.msg)
        return false
      });
  }

  return (
    <userProfileObject.Provider value={{ getUserInfo, userName, userRole, userId, updateUserData, error }}>
      {children}
    </userProfileObject.Provider>
  );
}

export default UserProfileContextProvider;
