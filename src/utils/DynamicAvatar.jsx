import React, { useEffect, useState } from "react";

import { getUserInfo } from "../service/AuthService";
import { useDispatch, useSelector } from "react-redux";
import userInfo from "./userInfo";
import { setUserAvatar, setUserInfo } from "../store/slices/UserSlice";
import { useNavigate } from "react-router-dom";
const DynamicAvatar = ({ idEmployee, getDynamic }) => {
  const user = userInfo();
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getUserDynamicInfo = async () => {
    try {
      let response = await getUserInfo(user.userId);

      dispatch(
        setUserAvatar({
          userAvatar: response.data,
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
    getUserDynamicInfo();
  }, []);

  const dynamicUserInfo = useSelector((state) => state.user);
  useEffect(() => {
    getDynamic(dynamicUserInfo.userAvatar);
  });

  return <></>;
};

export default DynamicAvatar;
