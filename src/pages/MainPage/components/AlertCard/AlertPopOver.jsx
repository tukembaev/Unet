import React, { useEffect, useState } from "react";
import styles from "./AlertPopOver.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { getAlertData } from "./../../../../service/AlertService.js";
import { setAlertById } from "./../../../../store/slices/AlertSlice";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Button } from "../../../../components";
import SlidingPaneUtil from "../../../../utils/SlidingPaneUtil";
import ProfilePage from "../../../ProfilePage/ProfilePage";
import ModalWindow from "../../../../hooks/ModalWindow/ModalWindow";
import Notification from "../../../../utils/Notifications";
import { AnswerToInvite } from "../../../../service/CollectiveService";
import userInfo from "../../../../utils/userInfo";
// accardion
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Badge from "@mui/material/Badge";




function useScrollTop() {
  const [scrollTop, setScrollTop] = useState(0);
  const onScroll = (event) => setScrollTop(event.target.scrollTop);
  return [scrollTop, { onScroll }];
}

const AlertPopOver = () => {
  const [scrollTop, scrollProps] = useScrollTop();
  const [data, setData] = useState([]);
  const user = userInfo();
  const [openModal, setOpenModal] = useState({
    modalActive: false,
    inviterName: "",
    command: "",
  });
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const alert = useSelector((state) => state.alert.alerts);
  const messages = useSelector((state) => state.alert.alertsMessages);
  const getData = async () => {
    try {
      let response = await getAlertData(id, data);
      dispatch(
        setAlertById({
          alerts: response.data,
        })
      );
    } catch (error) {
      
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [width]);
  useEffect(() => {
    width < 600 && handleSideNavToggle();
  });
  function handleSideNavToggle() {
    console.log("toggle it");
  }
 
  const [stateUserInfo, setStateUserInfo] = useState({
    idUser: "",
    isPaneOpen: false,
    isPaneOpenLeft: false,
  });
  const openLink = (item) => {
    if (item.ssylca.includes("task")) {
      navigate(`/${item.ssylca}`);
    } else {
      navigate(`/${item.ssylca}`);
    }
  };
  const openMessage = (item) => {
    navigate("/chats/");
  };

  const handleAccept = async (item) => {
    try {
      let response = await AnswerToInvite(item[0], {
        members: [{ user_id: user.userId, is_confirmed: true }],
      });

      setNotify({
        isOpen: true,
        message: "Вы успешно добавлены",
         type: "success", sound : "success"
      });

      getData();
      setOpenModal({ modalActive: false });
    } catch (error) {
      

      setNotify({
        isOpen: true,
        message: "Ошибка",
        type: "error",
      });
    }
  };

  const handleDecline = async (item) => {
    try {
      let response = await AnswerToInvite(item[0], {
        members: [{ user_id: user.userId, is_confirmed: false }],
      });

      setNotify({
        isOpen: true,
        message: "Отказано",
         type: "success", sound : "success"
      });

      getData();
      setOpenModal({ modalActive: false });
    } catch (error) {
      

      setNotify({
        isOpen: true,
        message: "Ошибка",
        type: "error",
      });
    }
  };

  // accardion
  const [expanded, setExpanded] = useState(false); 

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  

  return (
    <div
      className={styles.news_card_wrapper}
      {...scrollProps}
      style={{
        boxShadow: scrollTop > 0 ? "none" : "none",
        maxHeight: width < 900 ? "unset" : "750px",
        overflow: "auto",
      }}
    >
      <div className={styles.alert_format}>
       <Badge 
         badgeContent={alert.length}
         color="primary"
         style={{ zIndex: "0" }}
       >
       <Accordion className={styles.accardion} expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
          <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          >
           <Typography sx={{ width: '33%', flexShrink: 0 }}>
           Оповещения
          </Typography>
          </AccordionSummary>
          <AccordionDetails
          style={{ overflow:'auto'}}
          >
          <Typography>
          {[...alert]?.reverse().length === 0 ? (
          <div className={styles.news_card}>
            <div className={styles.news_heading}>
              <div className={styles.user_info}>
                <div style={{ display: "flex", gap: "10px" }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      paddingTop: "5px",
                    }}
                  >
                    <h4 className={styles.user_login}>
                      У вас нет новых оповещений
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          [...alert]?.map((item) =>{
            return(
              <div className={styles.news_card}>
              <div className={styles.news_heading}>

                <div
                  className={styles.user_info}
                  onClick={() => {
                    if (item.status === "U") {
                      openMessage(item);
                    } else if (
                      item.ssylca.includes("teams") ||
                      item.ssylca.includes("command")
                    ) {
                      setOpenModal({
                        modalActive: true,
                        inviterName: item.surname_name,
                        command: item.command,
                      });
                    } else {
                      openLink(item);
                    }
                  }}
                >

                  <div style={{ display: "flex", gap: "10px" }}>
                    <img
                      src={item.image}
                      style={{
                        borderRadius: "50%",
                        width: "34px",
                        height: "34px",
                        objectFit: "cover",
                        marginTop: "7px",
                      }}
                      alt=""
                    />
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        paddingTop: "5px",
                      }}
                    >
                      <h4 className={styles.user_login}>
                        {item.surname_name}
                      </h4>
                      <h4 className={styles.body_title}>
                        {item.alerts}
                      </h4>
                    </div>
                  </div>
                  <span className={styles.date}>
                    {item.date_alerts} 
                  </span>
                </div>
              </div>
            </div>
            )
          })
        )}
          </Typography>
        </AccordionDetails>
        </Accordion>
       </Badge>
      </div>
      <div className={styles.alert__messages}>

      <Badge 
        badgeContent={messages.length}
        color="primary"
        style={{ zIndex: "0" }}
      >
      <Accordion className={styles.accardion} expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
          <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
          >
           <Typography sx={{ width: '33%', flexShrink: 0 }}>
           Сообщения
          </Typography>
          </AccordionSummary>
          <AccordionDetails>
          <Typography>
          {[...messages]?.reverse().length === 0 ? (
          <div className={styles.news_card}>
            <div className={styles.news_heading}>
              <div className={styles.user_info}>
                <div style={{ display: "flex", gap: "10px" }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      paddingTop: "5px",
                    }}
                  >
                    <h4 className={styles.user_login}>
                      У вас нет новых сообщений
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          [...messages]?.map((item) =>{
            return(
              <div className={styles.news_card}>
              <div className={styles.news_heading}>

                <div
                  className={styles.user_info}
                  onClick={() => {
                    if (item.status === "U") {
                      openMessage(item);
                    } else if (
                      item.ssylca.includes("teams") ||
                      item.ssylca.includes("command")
                    ) {
                      setOpenModal({
                        modalActive: true,
                        inviterName: item.surname_name,
                        command: item.command,
                      });
                    } else {
                      openLink(item);
                    }
                  }}
                >

                  <div style={{ display: "flex", gap: "10px" }}>
                    <img
                      src={item.image}
                      style={{
                        borderRadius: "50%",
                        width: "34px",
                        height: "34px",
                        objectFit: "cover",
                        marginTop: "7px",
                      }}
                      alt=""
                    />
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        paddingTop: "5px",
                      }}
                    >
                      <h4 className={styles.user_login}>
                        {item.sender}
                      </h4>
                      <h4 className={styles.body_title}>
                         {item.content}
                      </h4>
                    </div>
                  </div>
                  <span className={styles.date}>
                        {item.sent_at}{" "}
                  </span>
                </div>
              </div>
            </div>
            )
          })
        )}
          </Typography>
        </AccordionDetails>
        </Accordion>
        
      </Badge>
      </div>
      <ModalWindow
        setOpenModal={setOpenModal}
        openModal={openModal.modalActive}
        modalTitle={`${openModal.inviterName} приглашает Вас в команду :   `}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              onClick={() => handleDecline(openModal.command)}
              className={styles.btn_pin_close}
            >
              Отказать
            </Button>
            <Button
              onClick={() => handleAccept(openModal.command)}
              className={styles.btn_pin}
            >
              Принять
            </Button>
          </div>
        </div>
      </ModalWindow>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
};

export default AlertPopOver;
