const Chat = ({user}) => {
    return (
      <>
        {user && (
          <div className="flex flex-col items-center p-4 m-4 w-[250px] h-64 border text-center border-lime-500 text-cyan-100 rounded-lg" key={user?.uid}>
            <img
              className="h-[82%] w-[80%] object-cover rounded-full"
              src={user?.photoURL}
              alt="user-icon"
            />
            <h1 className="text-xl text-orange-500">{user?.displayName}</h1>
            <p className="text-sm text-sm overflow-hidden whitespace-nowrap w-full">{user?.email}</p>
          </div>
        )}
      </>
    );
  }
  
  export default Chat;
  