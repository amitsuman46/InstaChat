import React, { useEffect, useState } from "react";
import Header from "./Header";
import { ref, onValue } from "firebase/database";
import { database } from "../firebase";
import AvailableUser from "./AvailableUser";
import { photoURLs } from "../constants";
import Chat from "./Chat";
const Home = () => {
  const [userList, setUserList] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [hide,setHide] = useState(false);
  const fetchUsers = async () => {
    try {
      const usersRef = ref(database, "users");

      onValue(usersRef, (snapshot) => {
        const data = snapshot.val();
        const fetchedUsers = [];

        for (const key in data) {
          const randomIndex = Math.floor(Math.random() * photoURLs.length);
          const randomPhotoURL = photoURLs[randomIndex];
          fetchedUsers.push({
            uid: key,
            photoURL:randomPhotoURL,
            ...data[key],
          });
        }
        setUserList(fetchedUsers);

      });
    } catch (error) {
      console.error("Error fetching users:", error);

    }
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
  }
  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <div className="bg-[#1e293b] h-screen">
      <Header />
      <div className="w-full text-white">
        {userList.length > 1 ? (
          <h1 className="font-bold text-2xl text-center cursor-pointer hover:text-red-500" onClick={()=>setHide(!hide)}>Available Users {hide ? "⬇️": "⬆️"} </h1>
        ):<h1>Loading..</h1>}
        {!hide && <AvailableUser userList={userList} onUserClick={handleUserClick}/>}
        <div className="flex items-center justify-center m-2 p-2">
        <Chat user={selectedUser}/>
        </div>
        
      </div>
    </div>
  );
};

export default Home;
