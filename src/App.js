import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

import { routes } from "./constants/routes";
import NoMatch from "./pages/NoMatch/NoMatch";
import WebSocketComponent from "./http/websockets";
import { useDispatch, useSelector } from "react-redux";
import { setAlertMessagesById } from "./store/slices/AlertSlice";

import MessageNotification from "./utils/MessageNotification";
import userInfo from "./utils/userInfo";
import { getChats } from "./service/ChatService";
import { setMessageChat } from "./store/slices/ChatSlice";
import { RoutesAccess } from "./hooks/RoutesAccess/RoutesAccess";

function App() {
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const location = useLocation();
  let socket = null;
  const user = userInfo();
  const [newMessage, setNewMessage] = useState("");
  const [render, setRender] = useState(false);
  let data;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getData = async () => {
    if (user.userId)
      try {
        let response = await getChats(data);

        dispatch(
          setMessageChat({
            messagechat: response.data,
          })
        );
      } catch (error) {
        if (error.response.data.code === "token_not_valid") {
          const socket = new WebSocket("wss://task.unet.kg/ws/online_status/");

          socket.onopen = () => {
            socket.send(
              JSON.stringify({ command: "disconnect", user_id: user.userId })
            );
            socket.close();
          };

          navigate("/");
        }
      }
  };

  useEffect(() => {
    // Create the WebSocket connection
    socket = new WebSocket("wss://task.unet.kg/ws/chat/"); // Replace with your WebSocket URL

    socket.addEventListener("open", handleOpen);
    socket.addEventListener("close", handleClose);
    socket.addEventListener("error", handleError);
    socket.addEventListener("message", handleMessage);

    // Clean up the WebSocket connection on component unmount
    return () => {
      socket.removeEventListener("open", handleOpen);
      socket.removeEventListener("close", handleClose);
      socket.removeEventListener("error", handleError);
      socket.removeEventListener("message", handleMessage);

      socket.close();
    };
  }, []);

  useEffect(() => {
    getData();
    setRender(false);
  }, [render]);

  const handleOpen = () => {
    // console.log("WebSocket connection opened");
  };

  const handleClose = () => {
    // console.log("WebSocket connection closed");
  };

  const handleError = (error) => {
    // console.error("WebSocket error:", error);
    // Handle the error (e.g., display an error message)
  };

  const handleMessage = (event) => {
    const receivedMessage = JSON.parse(event.data);

    if (receivedMessage.user !== user.userId) {
      dispatch(
        setAlertMessagesById({
          alertsMessages: [...alert, receivedMessage],
        })
      );
      setNotify({
        isOpen: true,
        sender: receivedMessage.sender,
        message: receivedMessage.content,
        type: "info",
        image: receivedMessage.image,
      });
      setNewMessage(receivedMessage);
    }
    setRender(true);
  };

  const allChats = useSelector((state) => state.chat);

  const alert = useSelector((state) => state.alert.alertsMessages);

  const shouldRenderWebSocketComponent = !location.pathname.includes("/chats/");

  return (
    <div className="app">
      <Routes>
        {routes.map((route) => {
          return (
            <Route
              key={route.path}
              path={route.path}
              element={route.component}
            />
          );
        })}

        <Route path="*" element={<NoMatch />} />
      </Routes>

      {shouldRenderWebSocketComponent &&
        allChats.messagechat.map((item) => (
          <WebSocketComponent
            key={item.id}
            url={`wss://task.unet.kg/ws/chat/${item.id}/`}
            onOpen={handleOpen}
            onClose={handleClose}
            onError={handleError}
            onMessage={handleMessage}
            setSocket={(s) => (socket = s)} // Pass the socket to ChatPageContainer
          />
        ))}

      <MessageNotification notify={notify} setNotify={setNotify} />
    </div>
  );
}

export default App;
