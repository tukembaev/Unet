import React, { useEffect, useState } from "react";
import styles from "./TimeRecorder.module.scss";
import clock from "./../../../assets/icons/clock.png";
import play from "./../../../assets/icons/play.png";
import pause from "./../../../assets/icons/pause.png";
import stop from "./../../../assets/icons/stop.png";
import Button from "../../Button/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  getTime,
  startTimer,
  stopTimer,
} from "../../../service/StatisticService";
import { setTimeData } from "../../../store/slices/StatisticSlice";
import WebSocketComponent from "../../../http/websockets";
import userInfo from "../../../utils/userInfo";
const TimeRecorder = () => {
  const [render, setRender] = useState(false);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [isStart, setStart] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [workDuration, setWorkDuration] = useState(0);
  const user = userInfo();
  const getData = async () => {
    try {
      let response = await getTime(data);

      dispatch(
        setTimeData({
          timeTracker: response.data,
        })
      );

      if (response.data.start_datetime) {
        const startTime = new Date(response.data.start_datetime);
        const endTime = response.data.end_datetime
          ? new Date(response.data.end_datetime)
          : new Date();
        const duration = (endTime - startTime) / 1000; // Разница в секундах
        setWorkDuration(duration);
      }
    } catch (error) {}
  };

  let socket = null; // Declare socket as a variable accessible within ChatPageContainer

  const handleOpen = () => {
    console.log("WebSocket connection opened timer");
  };

  const handleClose = () => {
    console.log("WebSocket connection closed timer");
  };

  const handleError = (error) => {
    console.error("WebSocket error timer:", error);
    // Handle the error (e.g., display an error message)
  };

  const handleMessage = (event) => {
    const receivedMessage = JSON.parse(event.data);
  };

  const sendMessage = (message) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(message);
    } else {
      console.log(socket);
      // Handle the case when the socket is not open
    }
  };

  const startTimerCount = async (event) => {
    event.preventDefault();
    let newMes = {
      type: "start",
    };

    const messageToSend = JSON.stringify(newMes);
    sendMessage(messageToSend);
  };

  const stopTimerCount = async (event) => {
    event.preventDefault();

    try {
      const currentTime = new Date();
      let response = await stopTimer(currentTime);
      setRender(true);
      setStart(false);
    } catch (error) {}
  };
  const timer = useSelector((state) => state.statistic.timeTracker);

  useEffect(() => {
    getData();
    setRender(false);
  }, [render]);

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setCurrentTime(new Date());
  //     setRender(true)
  //   }, 1000);

  //   return () => {
  //     clearInterval(timer);
  //   };

  // }, []);

  return (
    <div className={styles.time_recorder_wrapper}>
      <div style={{ display: "flex", gap: "25px", paddingBottom: "17px" }}>
        <h3>
          Длительность рабочего дня:{" "}
          {timer === [] ? (
            <span>00:00</span>
          ) : (
            <span>
              {new Date(workDuration * 1000).toISOString().substr(11, 8)}
            </span>
          )}{" "}
        </h3>
      </div>
      {isStart === false ? (
        <div className={styles.btn_start} onClick={startTimerCount}>
          <img src={play} alt="" />
          <p style={{ paddingTop: "4px" }}>Начать рабочий день</p>
        </div>
      ) : (
        <div style={{ display: "flex", gap: "15px" }}>
          <div className={styles.btn_pause}>
            <img
              src={pause}
              style={{ width: "26px", height: "26px", marginLeft: "5px" }}
              alt=""
            />
            <p style={{ paddingTop: "4px" }}>Приостановить</p>
          </div>
          <div className={styles.btn_stop} onClick={stopTimerCount}>
            <img
              src={stop}
              style={{ width: "28px", height: "26px", marginLeft: "5px" }}
              alt=""
            />
            <p style={{ paddingTop: "4px" }}>Завершить рабочий день</p>
          </div>
        </div>
      )}

      <h3 style={{ paddingLeft: "5px", paddingBottom: "5px" }}>
        Задачи на день
      </h3>
      <div className={styles.task_card}>
        <div className={styles.task_name}>
          <p>Сальто сделать сюда просто ссылку</p>
        </div>
      </div>

      <div className={styles.task_card}>
        <div className={styles.task_name}>
          <p>Сальто сделать сюда просто ссылку</p>
        </div>
      </div>

      <WebSocketComponent
        url={`wss://task.unet.kg/ws/timer/${user.token}/`}
        onOpen={handleOpen}
        onClose={handleClose}
        onError={handleError}
        onMessage={handleMessage}
        setSocket={(s) => (socket = s)} // Pass the socket to ChatPageContainer
      />
    </div>
  );
};

export default TimeRecorder;
