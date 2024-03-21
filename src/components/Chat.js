import React, { useEffect, useRef, useState } from "react";

const Chat = ({ user, onSendMessage, socket, chatMessages, setChatMessages }) => {
  // const [chatMessages, setChatMessages] = useState([]); // State for chat messages
  const messageInputRef = useRef(null); // Reference to message input

  // useEffect(() => {
  //   // Receive messages from the server
  //   socket.on("forwardmessage", (messageData) => {
  //     if (messageData.recipientId === user.uid) {
  //       setChatMessages((prevMessages) => [...prevMessages, messageData]);
  //       console.log("Chat  received: ", messageData);
  //     }
  //   });

  //   // Clean up the socket listener on component unmount
  //   return () => {
  //     socket.off("forwardmessage");
  //   };
  // }, [socket, user.uid]);

  const sendMessage = () => {
    const message = messageInputRef.current.value.trim();
    if (message) {
      onSendMessage(message);
       // Send message through parent component
       console.log("Sending message: ", message);
      setChatMessages((prevMessages) => [...prevMessages, {content:message,isSent:true}]);
      messageInputRef.current.value = ""; // Clear input after sending
    }
  };


  return (
    <>
      {user && (
        <div className="chat-container bg-gray-200 rounded-lg overflow-hidden">
          <div className="chat-header mb-4 flex items-center p-4">
            <img
              className="h-8 w-8 rounded-full mr-2"
              src={user.photoURL}
              alt="user-icon"
            />
            <h1 className="text-xl text-orange-500">{user.displayName}</h1>
          </div>
          {/* Chat history */}
          {chatMessages.map((message, index) => (
            <div
              key={index}
              className={`chat-message flex items-start mb-2 ${
                message.isSent===true ? "justify-start" : "justify-end"
              }`}
            >
              {message.isSent ? (
                <div className="flex items-center">
                  <img
                    className="h-8 w-8 rounded-full"
                    src={user.photoURL}
                    alt="user-icon"
                  />
                  <p className="text-base text-gray-800 bg-white p-2 rounded-lg">
                    {message.content}
                  </p>
                </div>
              ) : (
                <div className="flex items-center">
                  <p className="text-base text-gray-800 bg-gray-300 p-2 rounded-lg">
                    {message.content}
                  </p>
                  <img
                    className="h-8 w-8 rounded-full ml-2"
                    src={user.photoURL}
                    alt="user-icon"
                  />
                </div>
              )}
            </div>
          ))}

          {/* Message input */}
          <div className="flex items-center border-t border-gray-300 p-4">
            <input
              ref={messageInputRef}
              className="flex-grow outline-none px-4 py-2 rounded-lg"
              placeholder="Type your message..."
            />
            <button
              onClick={sendMessage}
              className="ml-4 text-blue-500 hover:text-blue-700"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chat;
