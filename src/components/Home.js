import React, { useEffect, useState } from "react";
import Header from "./Header";
import { ref, onValue } from "firebase/database";
import { database } from "../firebase";
import AvailableUser from "./AvailableUser";
import { photoURLs } from "../constants";
import Chat from "./Chat";
import io from "socket.io-client";
import { useSelector } from "react-redux";

const Home = () => {
  const [userList, setUserList] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState(new Map());
  const user = useSelector((store) => store.user);
  const [socket,setSocket] = useState(null);
  const [chatMessages, setChatMessages] = useState([]); // State for chat messages


  useEffect(() => { 
    const socket = io("http://localhost:3001"); 
    setSocket(socket);
    const userId = user?.uid || localStorage.getItem("UID");
    socket.emit("join", userId);
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(()=>{
      if(!socket) return;
    socket.on("updateOnlineUsers", (updatedOnlineUsers) => {
    const entries = updatedOnlineUsers.map((userId) => [userId, true]);
    setOnlineUsers(new Map(entries));
    });

    return ()=>{
      socket.off("updateOnlineUsers");
    }

  },[socket]);

  useEffect(()=>{

    if(!socket) return;

    socket.on('forwardmessage',(messageData)=>{
      if (messageData.recipientId === user.uid) {
        setChatMessages((prevMessages) => [...prevMessages, messageData]);
        console.log("Chat  received: ", messageData);
      }
    })

    return ()=>{
      socket.off('forwardmessage');
    }

  },[socket])


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
            photoURL: randomPhotoURL,
            ...data[key],
            isOnline: onlineUsers.has(key), // Directly check for online status
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
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="flex h-screen bg-gray-800 text-white w-screen fixed">
      <div className="w-1/4 text-white z-10 pb-20 mb-20">
        <Header />
        {userList.length > 1 ? (
          <h1 className=" p-2 mb-2 font-bold text-2xl text-center cursor-pointer hover:text-red-500">
            Available Users
          </h1>
        ) : (
          <h1>Loading..</h1>
        )}
        <AvailableUser
          userList={userList}
          onlineUsers={onlineUsers}
          onUserClick={handleUserClick}
        />
      </div>
      <div className="flex-1 p-4">
        {selectedUser ? (
          <div className="flex flex-col items-center justify-center h-full text-black">
            <Chat
              user={selectedUser}
              onSendMessage={(message) => {
                const recipientSocketId = onlineUsers.get(selectedUser.uid);
                if (recipientSocketId) {
                  if(!socket) return;
                  socket.emit("message", {
                    content: message,
                    senderId: user.uid,
                    recipientId: selectedUser.uid,
                  });
                } else {
                  // Handle the case when the recipient is offline
                  // You might want to display a message or store the message temporarily
                }
              }}
              socket={socket}
              chatMessages={chatMessages}
              setChatMessages={setChatMessages} // Pass socket connection as prop
            />
          </div>
        ) : (
          <div className="flex justify-center items-center h-full">
            <p className="text-gray-500">Select a user to view details</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
