import React, { useEffect, useState } from "react";
import { Button, Layout } from "../../components";
import styles from "./ChatPage2.module.scss";
import {
  Avatar,
  Divider,
  ListItem,
  ListItemAvatar,
  TextareaAutosize,
} from "@material-ui/core";
import {
  Autocomplete,
  ListItemText,
  Stack,
  TextField,
  Typography,
  List,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import ChatContent from "../ChatPage/components/ChatContent";
import DuoSharpIcon from "@mui/icons-material/DuoSharp";
import { createChat, getChatData, getChats } from "../../service/ChatService";
import {
  setChatById,
  setChats,
  setMessageChat,
} from "../../store/slices/ChatSlice";
import { useDispatch, useSelector } from "react-redux";
import userInfo from "../../utils/userInfo";
import send from "./../../assets/icons/send.svg";
import ErrorOutlineTwoToneIcon from "@mui/icons-material/ErrorOutlineTwoTone";
import VideocamTwoToneIcon from "@mui/icons-material/VideocamTwoTone";
import ModalWindow from "../../hooks/ModalWindow/ModalWindow";
import EmployeeSelectUserId from "../../hooks/EmployeeSelect/EmployeeSelectUserId";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ScaleLoader } from "react-spinners";
import WebSocketComponent from "../../http/websockets";
import moment from "moment";
import classNames from "classnames";

const ChatPage2 = () => {
  const [search, setSearch] = useState("");

  const user = userInfo();
  const [data] = useState();
  const [id, setId] = useState();
  const [render, setRender] = useState(false);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState();
  const [image, setImage] = useState();
  const [userId, setUserId] = useState();
  const [selectedEmployee, setSelectedEmployee] = useState([]);
  const [selectedEmployeeLabel, setSelectedEmployeeLabel] = useState([]);
  const [selectedChatTitle, setSelectedChatTitle] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [rightBlock, setRightBlock] = useState(false);
  const [text, setText] = useState("");
  const [isLeftSideOpen, setIsLeftSideOpen] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const ITEM_HEIGHT = 48;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick2 = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const allMessages = useSelector((state) => state.chat.messageId);
  const getData = async () => {
    try {
      let response = await getChats(data);

      dispatch(
        setMessageChat({
          messagechat: response.data,
        })
      );
    } catch (error) {}
  };

  const handleClick = ({ id, image, name }) => {
    setId(id);
    setSelectedChatTitle(id);
    setName(name);
    setImage(image);
    setUserId(user);
    setRender(true);
    setLoading(true);
    setRightBlock(true);
  };

  useEffect(() => {
    getData();
    setRender(false);
  }, [render, allMessages]);

  const allChats = useSelector((state) => state.chat);

  let employee_myself = user.userId;
  let employee_two_post = selectedEmployee;
  let check = allChats.messagechat.filter(
    (item) => item.members[1].user_id === employee_two_post
  );

  const createNewChat = async () => {
    try {
      if (employee_two_post === employee_myself) {
        setNotify({
          isOpen: true,
          message: "",
          type: "warning",
          sound: "warning",
        });
        return;
      }

      if (check.length !== 0) {
        setNotify({
          isOpen: true,
          message: "Чат уже существует",
          type: "warning",
          sound: "warning",
        });
        return;
      }

      let response = await createChat([
        { employee: employee_two_post },
        { employee: employee_myself },
      ]);

      dispatch(
        setChats({
          chats: response.data,
        })
      );
      setRender(true);
      setOpenModal(false);
    } catch (error) {
      if (error.response.data.message === "Чат уже существует")
        setNotify({
          isOpen: true,
          message: error.response.data.message,
          type: "warning",
          sound: "warning",
        });
    }
  };

  useEffect(() => {
    dispatch(
      setChatById({
        messageId: [],
      })
    );
  }, [window.location.pathname]);
  const handleChange = (e) => {
    const value = e.target.value;
    setText(value);
  };
  function filterMembersBySurname(data, surName) {
    const filteredMembers = [];

    data.forEach((item) => {
      if (item.members && Array.isArray(item.members)) {
        item.members.forEach((member) => {
          if (member?.employee_name?.includes(surName) !== true) {
            const sentAt = item.sent_at;
            let hours = null;
            let minutes = null;

            if (sentAt !== null) {
              const date = new Date(sentAt);
              hours = date.getHours();
              minutes = date.getMinutes();
            }
            filteredMembers.push({
              id: item.id,
              chat_type: item.chat_type,
              employee_name: member.employee_name,
              image: member.image,
              last_message: item.last_message,

              sent_at: hours !== null ? `${hours}:${minutes}` : null,
            });
          }
        });
      }
    });

    return filteredMembers;
  }

  const filteredArray = filterMembersBySurname(
    allChats.messagechat,
    user.surName
  );

  const getFormattedDate = (date) => {
    const options = { day: "2-digit", month: "long" };
    return new Date(date).toLocaleDateString("ru-RU", options);
  };

  const getFormattedTime = (date) => {
    const options = {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Bishkek",
    };

    const isoFormattedDate = date.replace(/\./g, "-");
    const formattedTime = new Date(isoFormattedDate).toLocaleTimeString(
      "ky-KG",
      options
    );

    return formattedTime;
  };

  const getMessageId = async () => {
    try {
      let response2 = await getChatData(id, data);

      dispatch(
        setChatById({
          messageId: response2.data,
        })
      );
      setLoading(false);
    } catch (error) {
      console.log(error.response2);
    }
  };

  useEffect(() => {
    getMessageId();
  }, [id]);

  const selectedEmpl = filteredArray?.filter((elem) => elem.id === id);
  const scrollMessagesToBottom = () => {
    const element = document.getElementById("messages");
    if (element) {
      element.scrollTop = element.scrollHeight;
    }
  };

  useEffect(() => {
    scrollMessagesToBottom();
  }, [id, allMessages.messages]);

  let socket = null;

  const handleError = (error) => {};

  const handleMessage = (event) => {
    // const recievedMessage = JSON.parse(event.data);
    // const updatedMessages = [...allMessages.messages, recievedMessage];
    //
    // const updatedAllMessages = {
    //   ...allMessages,
    //   messages: updatedMessages,
    // };
    // dispatch(
    //   setChatById({
    //     messageId: updatedAllMessages,
    //   })
    // );
  };
  const moment = require("moment");
  const sendMessage = (message) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(message);
    } else {
      console.log(socket);

      // Handle the case when the socket is not open
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (text === "") {
      setNotify({
        isOpen: true,
        message: " Попытка отправки пустого сообщения",
        type: "warning",
        sound: "warning",
      });
    } else {
      try {
        let newMes = {
          chat: allMessages.id,
          command: "new_message",
          message: text,
          sender: user.userId,
        };

        const messageToSend = JSON.stringify(newMes);
        sendMessage(messageToSend);
        setText("");
      } catch (error) {}
    }
  };

  const [loadedMessagesCount, setLoadedMessagesCount] = useState(10);

  const loadMoreMessages = () => {
    // Увеличиваем количество загруженных сообщений на 10
    setLoadedMessagesCount((prevCount) => prevCount + 10);
  };

  const toggleLeftRightSide = () => {
    setIsLeftSideOpen(!isLeftSideOpen);
  };
  return (
    <Layout>
      <div
        style={{
          width: "100%",
          backgroundColor: "white",
          height: "100%",
          borderRadius: "10px 10px 0px 10px",
          display: "flex",
        }}
      >
        <div
          className={
            selectedEmpl.length === 0
              ? `${styles.body_left}`
              : `${styles.hidden_left}`
          }
        >
          <div className={styles.left_header}>
            <h2 className={styles.left_title}>Чаты</h2>
            {""}
            <p onClick={() => setOpenModal(true)} className={styles.plus_icon}>
              +
            </p>
          </div>

          <div className={styles.d1}>
            <form>
              <input type="text" placeholder="Искать здесь..." />
              <button type="submit"></button>
            </form>
          </div>
          <div className={styles.user_list}>
            <List sx={{ width: "100%", maxWidth: "100%" }}>
              {filteredArray?.map((item) => {
                return (
                  <ListItem
                    className={`${styles.users_list} ${
                      selectedUser === item.id ? styles.selectedUser : ""
                    }`}
                    alignItems="center"
                    onClick={() => {
                      handleClick({
                        id: item.id,
                        name: item.employee_name,
                        image: item.image,
                      });
                      setSelectedUser(item.id);
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar
                        alt="Remy Sharp"
                        src={item?.image}
                        sx={{ width: "50px", height: "50px" }}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <div
                          style={{
                            // width: "100%",
                            display: "flex",
                            justifyContent: "space-between",
                            overflow: "hidden",
                            maxHeight: "100px",
                          }}
                        >
                          <p className={styles.employee_name}>
                            {item?.employee_name}
                          </p>

                          <p className={styles.last_message}>{item?.sent_at}</p>
                        </div>
                      }
                      secondary={
                        <div style={{ overflow: "hidden" }}>
                          {item?.last_message ? (
                            <Typography
                              sx={{
                                display: "inline",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              {item?.last_message}
                            </Typography>
                          ) : (
                            <Typography
                              sx={{
                                display: "inline",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                color: " rgba(0, 0, 0, 0.45)",
                                fontSize: "13px",
                              }}
                              component="span"
                              variant="body2"
                            >
                              Напишите ваще первое сообщение
                            </Typography>
                          )}
                        </div>
                      }
                    />
                  </ListItem>
                );
              })}
            </List>
          </div>
        </div>
        {rightBlock ? (
          <div
            className={
              selectedEmpl.length === 0
                ? `${styles.body_right}`
                : `${styles.hidden}`
            }
          >
            <div className={styles.right_header}>
              <List sx={{ width: "100%", maxWidth: 360 }}>
                <ListItem alignItems="center">
                  {/* <ArrowBackIcon
                    onClick={toggleLeftRightSide}
                    sx={{ zIndex: 100 }}
                    className={styles.backBtn}
                  /> */}
                  <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src={selectedEmpl[0]?.image} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: "inline", marginTop: "10px" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          <p className={styles.employee_name}>
                            {selectedEmpl[0]?.employee_name}
                          </p>
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
              </List>

              {/* <div style={{ display: "flex", flexWrap: "row" }}>
              <VideocamTwoToneIcon
                className={styles.optionsBtn}
                fontSize="large"
                sx={{
                  cursor: "pointer",
                  color: "var(--Green-2, #27AE60)",
                  margin: "15px",
                }}
              />
              <ErrorOutlineTwoToneIcon
                className={styles.optionsBtn}
                fontSize="large"
                sx={{
                  cursor: "pointer",
                  color: "rgba(0, 0, 0, 0.45)",
                  margin: "15px",
                }}
              />
              <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick2}
                sx={{ height: '65px' }}
                className={styles.menuBtn}
              >
                <MoreVertIcon sx={{ fontSize: '33px' }} />
              </IconButton>
              <Menu
                id="long-menu"
                MenuListProps={{
                  'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                  style: {
                    maxHeight: ITEM_HEIGHT * 4.5,
                    width: '20ch',
                  },
                }}
              >

                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
              </Menu>
            </div> */}
            </div>
            <div className={styles.right_body}>
              <React.Fragment>
                {allMessages?.messages?.length === 0 ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100px",
                    }}
                  >
                    <ScaleLoader color="black" size={30} />
                  </div>
                ) : (
                  <div id="messages" className={styles.messages}>
                    <ul
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                      }}
                    >
                      <button
                        onClick={loadMoreMessages}
                        className={styles.loadMoreButton}
                      >
                        Загрузить еще 10 сообщений
                      </button>
                      {allMessages?.messages &&
                      allMessages?.messages?.length > 0
                        ? [...allMessages.messages.slice(-loadedMessagesCount)] // Use slice(-loadedMessagesCount) to get the last 10 messages
                            ?.map((message, index, array) => {
                              const isoFormattedDate =
                                message?.sent_at?.replace(/\./g, "-"); // Convert to ISO format
                              const currentDate =
                                getFormattedDate(isoFormattedDate);

                              const previousMessage =
                                index > 0 ? array[index - 1] : null;
                              const previousIsoFormattedDate = previousMessage
                                ? previousMessage.sent_at.replace(/\./g, "-")
                                : null;
                              const previousDate = previousIsoFormattedDate
                                ? getFormattedDate(previousIsoFormattedDate)
                                : null;

                              return (
                                <React.Fragment key={message.id}>
                                  {previousDate !== currentDate && (
                                    <li className={styles.dateSeparator}>
                                      {/* <span  style={{color:'#eee',overflow:'hidden'}}>
                                       ────────────────
                                      </span> */}
                                      <span>{currentDate}</span>
                                      {/* <span style={{color:'#eee',overflow:'hidden'}}>
                                       ────────────────
                                      </span> */}
                                    </li>
                                  )}
                                  <li
                                    className={
                                      user.userId === message.user
                                        ? styles.sent
                                        : styles.replies
                                    }
                                  >
                                    {/* <img src={selectedEmpl[0]?.image} alt="" /> */}
                                    <p>
                                      {message.content}
                                      <br />{" "}
                                      <span className={styles.message_date}>
                                        {getFormattedTime(message.sent_at)}
                                      </span>
                                    </p>
                                  </li>
                                </React.Fragment>
                              );
                            })
                        : ""}
                    </ul>
                  </div>
                )}
              </React.Fragment>

              <form className={styles.formsong}>
                <input
                  name="message"
                  className={styles.input}
                  placeholder="Введите сообщение"
                  autoComplete="off"
                  value={text}
                  onChange={handleChange}
                ></input>

                <button
                  type="submit"
                  style={{
                    border: "none",
                    background: "none",
                    padding: 0,
                    cursor: "pointer",
                  }}
                  onClick={handleSubmit}
                >
                  <img src={send} className={styles.send} alt="" />
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div
            className={
              selectedEmpl.length === 0
                ? `${styles.body_right}`
                : `${styles.hidden}`
            }
          ></div>
        )}
        <ModalWindow
          openModal={openModal}
          setOpenModal={setOpenModal}
          modalTitle={"Выберите собеседника"}
        >
          <div>
            <EmployeeSelectUserId
              selectedEmployee={setSelectedEmployee}
              setSelectedEmployeeLabel={setSelectedEmployeeLabel}
              isMulti={false}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              onClick={() => setOpenModal(false)}
              className="btn_modal_close"
            >
              Закрыть
            </Button>
            <Button className="btn_modal_access" onClick={createNewChat}>
              Создать чат
            </Button>
          </div>
        </ModalWindow>
      </div>
      <WebSocketComponent
        url={`wss://task.unet.kg/ws/chat/${allMessages.id}/`}
        // onOpen={handleOpen}
        onClose={handleClose}
        onError={handleError}
        onMessage={handleMessage}
        setSocket={(s) => (socket = s)}
      />
    </Layout>
  );
};

export default ChatPage2;
