import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";
import ProfilePage from "../../../pages/ProfilePage/ProfilePage";
import { useEffect } from "react";
import userInfo from "../../../utils/userInfo";
import Moment from "react-moment";
import Popover from "@mui/material/Popover";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import DynamicAvatar from "../../../utils/DynamicAvatar";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { useDispatch, useSelector } from "react-redux";
import { getAlertData } from "../../../service/AlertService";
import { setAlertById } from "../../../store/slices/AlertSlice";
import AlertPopOver from "../../../pages/MainPage/components/AlertCard/AlertPopOver";
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import MenuDrawerMobile from "../Sidebar/components/Menu/MenuDrawerMobile";
import PersonalMenuCard from "../../../pages/ProfilePage/PersonalMenu/PersonalMenuCard";
import { render } from "@testing-library/react";
import chat from "../../../assets/icons/chat_icon.png";
import chatsd from "../../../assets/icons/chat.svg"


function Header({ width , setBackgroundImage}) {
  const [currentDynamicAvatar, getDynamicAvatar] = useState();
  const navigate = useNavigate();
  const [state, setState] = useState({
    isPaneOpen: false,
    isPaneOpenLeft: false,
  });

  const initialMuteStatus = localStorage.getItem("mute") === "true";
const [muteStatus, setMuteStatus] = useState(initialMuteStatus);
  const handleSwitchMute = () => {
    const newMuteStatus = !muteStatus;
    setMuteStatus(newMuteStatus);
    localStorage.setItem("mute", newMuteStatus.toString());
  };

  const handleQrCodeClick = () => {
    navigate("/qr-code");
  };

  function handleSideNavToggle() {
    console.log("toggle it");
  }

  const user = userInfo();

  function notificationsLabel(count) {
    if (count === 0) {
      return "no notifications";
    }
    if (count > 99) {
      return "more than 99 notifications";
    }
    return `${count} notifications`;
  }
  let data;
  const dispatch = useDispatch();
  const getData = async () => {
    try {
      let response = await getAlertData(user.userId, data);
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

  const alert = useSelector((state) => state.alert.alerts);
  const messages = useSelector((state) => state.alert.alertsMessages);

  let all_alerts = [...alert, ...messages];
  useEffect(() => {
    all_alerts = [...alert, ...messages];
  }, [alert, messages]);

  return (
    <>
      <div className={styles.header__wrapper}>
        {width >= 1000 ? (
          <div className={styles.logo__wrapper}>
            {/* <img src={unetLogo} alt="" /> */}
          </div>
        ) : (
          <MenuDrawerMobile width={width} />
        )}
          <div style={{display:"flex" , alignItems:"center" , justifyContent:'center' , cursor:"pointer"}}
           onClick={() => navigate(`/chats/`)}
          >
            <img src={chat} alt="" style={{width:"22px" , height:"21px" , objectFit:'cover'}}/>
          </div>
          {muteStatus ? <VolumeOffIcon sx={{cursor: 'pointer'}} onClick = {handleSwitchMute} className={styles.alert} /> : <VolumeUpIcon sx={{cursor: 'pointer'}} onClick = {handleSwitchMute} className={styles.alert} /> }
        <PopupState variant="popover" popupId="demo-popup-popover">
          {(popupState2) => (
            <>
              {width > 1080 ? (
                <div className={styles.alerts}>
                  <IconButton
                    aria-label={notificationsLabel(100)}
                    {...bindTrigger(popupState2)}
                  >
                    <Badge
                      badgeContent={all_alerts.length}
                      color="primary"
                      style={{ zIndex: "0" }}
                      >
                      <NotificationsActiveIcon className={styles.alert} />
                    </Badge>
                  </IconButton>
                </div>
              ) : (
                ""
                )}

              <Popover
                {...bindPopover(popupState2)}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
              >
                <AlertPopOver />
              </Popover>
            </>
          )}
        </PopupState>

        <PopupState variant="popover" popupId="demo-popup-popover">
          {(popupState) => (
            <>
              <p className={styles.date_interval}>
                <Moment format="HH:mm:ss" interval={1000} />
              </p>
              <div  className={styles.user__wrapper}>
                <div className={styles.avatar2} {...bindTrigger(popupState)}>
                  <img
                    src={currentDynamicAvatar?.imeag}
                    alt=""
                    className={styles.image__cover}
                    />
                </div>
              </div>

              <Popover
                {...bindPopover(popupState)}
                
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                  
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
                >
               
                {/* <ProfilePage /> */}
                <PersonalMenuCard  setBackgroundImage={setBackgroundImage}/>
              </Popover>
            </>
          )}
        </PopupState>
      </div>

      <DynamicAvatar getDynamic={getDynamicAvatar} />
    </>
  );
}

export default Header;
