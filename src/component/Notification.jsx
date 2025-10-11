import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export default function Notification({ user }) {
  const [message, setMessage] = useState("");
  
  useEffect(() => {
    const socket = io("http://localhost:8080");
    socket.emit("registerUser", user.id);

    socket.on("newNotification", (msg) => {
      setMessage(msg);
      setTimeout(() => setMessage(""), 5000); // 5s tự ẩn
    });

    return () => socket.disconnect();
  }, [user]);

  if (!message) return null;

  return (
    <div className="fixed top-4 right-4 bg-blue-600 text-white p-4 rounded shadow">
      {message}
    </div>
  );
}
