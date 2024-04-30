import React, { useEffect } from "react";
import styles from "./PersonalMenu.module.scss";
import { useState } from "react";
import userInfo from "../../../utils/userInfo";
import {
  ChangePassword,
  ChangePin,
  ChangeProfileImage,
  ChangeProfileNumber,
} from "../../../service/AuthService";
import {
  changeImageAvatar,
  changePassword,
  changePhoneNumber,
  changePinCode,
} from "../../../store/slices/UserSlice";
import { useDispatch } from "react-redux";
import DynamicUserInfo from "../../../utils/DynamicUserInfo";
import Notification from "../../../utils/Notifications";
import { Button } from "../../../components";
import ModalWindow from "../../../hooks/ModalWindow/ModalWindow";
import PinCode from "../../../hooks/PinCode/PinCode";
import { useNavigate } from "react-router-dom";
import option from ".././../../assets/icons/settings.png";
import exit from "../../../assets/icons/logout.png";
import { PieChart } from "react-minimal-pie-chart";
import PersonalInfo from "./components/PersonalInfo";
import MeetingRoomOutlinedIcon from "@mui/icons-material/MeetingRoomOutlined";
import { getImage } from "../../../service/BackgroundService";
import defaulWallpaper from "../../../assets/img/air.jpg";
import BackgroundModal from "../../../hooks/BackgroundModal/BackgroundModal";
import ChangeBackground from "../../../components/ChangeBackground/ChangeBackground";
import ShieldIcon from "@mui/icons-material/Shield";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import statistik from "../../../assets/icons/pie-chart.png";

function PersonalMenuCard({ userId, setBackgroundImage }) {
  const [openModal, setOpenModal] = useState(false);
  const [openModalOption, setOpenModalOption] = useState(false);
  const [openBackground, setOpenBackground] = useState(false);

  const [openModalPassword, setOpenModalPassword] = useState(false);
  const [openModalNumber, setOpenModalNumber] = useState(false);
  const [verifyPin, setVerifyPin] = useState(false);
  const [modalText, setModalText] = useState("Введите старый ПИН");
  const [isShown, setIsShown] = useState(false);
  const [isShownImg, setIsShownImg] = useState(false);
  const [isShownNum, setIsShownNum] = useState(false);
  const [pinCode, setPinCode] = useState();

  const [file, setFile] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [currentDynamicUser, getDynamic] = useState();
  const [EfficiencyColor, setEfficiencyColor] = useState("grey");
  let data;
  const dispatch = useDispatch();
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const user = userInfo();

  const navigate = useNavigate();
  const [userPinCode] = useState(user?.pin);

  const [phone, setPhone] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [newPin, setNewPin] = useState(false);

  const handleOpen = () => {
    setOpenModal(true);
  };
  const handleOpenPassword = () => {
    setOpenModalPassword(true);
  };

  const handleOpenPhoneNumber = () => {
    setOpenModalNumber(true);
  };

  const handleClick = (event) => {
    setIsShown(false);
    setIsShownImg(false);
  };

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const ChangeImage = async ({ file }) => {
    let response = await ChangeProfileImage(file);

    dispatch(changeImageAvatar(response.data));
    setNotify({
      isOpen: true,
      message: "Фотография успешно обновлена",
      type: "success",
      sound: "success",
    });
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const [isExpanded, setIsExpanded] = useState(false);

  const handleClickImg = () => {
    setIsExpanded(!isExpanded);
  };

  const handleExit = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("task");
    localStorage.removeItem("user");
    const socket = new WebSocket("wss://task.unet.kg/ws/online_status/");

    socket.onopen = () => {
      socket.send(
        JSON.stringify({ command: "disconnect", user_id: user?.userId })
      );
      socket.close();
    };

    navigate("/");
  };

  const dataOrders = [
    { title: "Завершенные", value: 70, color: "#FFB03A" },
    {
      title: "В процессе выполнения",
      value: user.efficiency,
      color: "#18AF55",
    },
  ];

  useEffect(() => {
    if (dataOrders[1].value <= 40) {
      setEfficiencyColor("red");
    } else if (dataOrders[1].value <= 80) {
      setEfficiencyColor("#FFB03A");
    } else if (dataOrders[1].value > 80) {
      setEfficiencyColor("#18AF55");
    }
  }, [dataOrders[1].value]);

  const backgroundImage = localStorage.getItem("bacground");
  setBackgroundImage(backgroundImage);

  let numberPhone = 0;

  if (
    currentDynamicUser?.number_phone === null ||
    currentDynamicUser?.number_phone === ""
  ) {
    numberPhone = "Не указано";
  } else {
    numberPhone = currentDynamicUser?.number_phone;
  }

  return (
    <>
      {isExpanded && (
        <div className={styles.avatar_img2} onClick={handleClickImg}>
          <img
            src={currentDynamicUser?.imeag}
            alt="Expanded Avatar"
            style={{
              cursor: "pointer",
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 9999,
              maxWidth: "380px",
              maxHeight: "380px",
            }}
          />
        </div>
      )}

      <div className={styles.profile_wrapper}>
        <div className={styles.personal_info}>
          <div className={styles.user_avatar}>
            <img
              src={currentDynamicUser?.imeag}
              alt="avatar"
              onClick={handleClickImg}
              style={{ cursor: "pointer" }}
              className={styles.user_avatar_img}
            />{" "}
          </div>
          <div className={styles.user_name}>
            <span>
              {user?.firstName} {user?.surName}
            </span>
            <br />
            <span style={{ color: "#525C69B3", fontSize: "13px" }}>
              {user?.position}
            </span>
            <br />
          </div>

          <div className={styles.user_online}>online</div>
        </div>

        <div className={styles.wallpaper_block}>
          <div
            style={{
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: "cover",
            }}
            className={styles.change_wallpaper}
          >
            <span style={{ color: "white" }}>Тема оформления</span>
            <button
              className={styles.btn_change}
              onClick={() => setOpenBackground(true)}
            >
              Сменить
            </button>
          </div>
          {!isShownImg && (
            <div id={styles.foto_profile} className={styles.change_wallpaper}>
              <span>Фото профиля</span>
              {userId === undefined ? (
                <>
                  {" "}
                  <div className={styles.download}></div>{" "}
                  {file === "" ? (
                    <label htmlFor="fileInput" className={styles.btn_change}>
                      Поменять
                    </label>
                  ) : (
                    <div style={{}}>
                      <Button
                        className={styles.btn2}
                        onClick={() => {
                          ChangeImage({ file });
                        }}
                      >
                        {" "}
                        Обновить
                      </Button>
                    </div>
                  )}
                  <input
                    type="file"
                    id="fileInput"
                    style={{ display: "none" }}
                    onChange={onFileChange}
                  />
                </>
              ) : (
                ""
              )}
            </div>
          )}
        </div>
        <div
          style={{ border: `0.5px solid ${EfficiencyColor}` }}
          className={styles.Efficiency}
        >
          <div className={styles.single_pie}>
            <div className={styles.pie_size}>
              <PieChart
                animate
                animationDuration={1000}
                animationEasing="ease-in"
                center={[20, 20]}
                data={dataOrders}
                lengthAngle={360}
                lineWidth={21}
                paddingAngle={0}
                radius={25}
                startAngle={0}
                label={null}
                labelPosition={80}
                labelStyle={{
                  fontSize: "12px",
                  fontColor: "FFFFFA",
                  fontWeight: "800",
                }}
                style={{
                  width: "50px",
                  heigth: "50px",
                  // marginTop: "15px",
                  marginLeft: "10px",
                }}
              />
            </div>
            <span>{user.efficiency}%</span>
          </div>
          <div>
            {" "}
            <span>Эффективность</span>
          </div>
        </div>

        <div
          className={styles.PersonalInfo}
          onClick={() => navigate(`/statistic/`)}
        >
          <div className={styles.my_static}>
            <img src={statistik} alt="" />
            <p>Моя статистика</p>
          </div>
        </div>

        <div>
          <PersonalInfo
            icons={
              <PhoneIphoneIcon sx={{ fontSize: "14px", marginRight: "10px" }} />
            }
            phone={phone}
            setPhone={setPhone}
            title={numberPhone ? numberPhone : "Не указано"}
            setNotify={setNotify}
            button={setPhone}
          />
        </div>

        <div>
          <PersonalInfo
            icons={
              <AlternateEmailIcon
                sx={{ fontSize: "14px", marginRight: "10px" }}
              />
            }
            title={user?.email ? user?.email : "Не указано"}
          />
        </div>
        <div>
          <PersonalInfo
            icons={
              <ShieldIcon sx={{ fontSize: "14px", marginRight: "10px" }} />
            }
            newPassword={newPassword}
            setNewPassword={setNewPassword}
            title={"Безопастность"}
            setNotify={setNotify}
            button={setNewPassword}
          />
        </div>
        <div>
          <PersonalInfo
            icons={
              <LockOpenIcon sx={{ fontSize: "14px", marginRight: "10px" }} />
            }
            newPin={newPin}
            setNewPin={setNewPin}
            title={"Двухэтапная аутентификация "}
            setNotify={setNotify}
            button={setNewPin}
            btnId="id"
          />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div onClick={() => navigate("/personalcard")}>
            <PersonalInfo
              icons={
                <PersonIcon sx={{ fontSize: "18px", marginRight: "10px" }} />
              }
              title={"Личная карточка"}
            />
          </div>
          <div onClick={handleExit} className={styles.logout}>
            <MeetingRoomOutlinedIcon sx={{ color: "gray" }} />
            <span>Выйти</span>
          </div>
        </div>
        <div
          style={{
            width: "100%",
            alignItems: "center",
            margin: "auto",
            color: "#525C69B3",
            fontSize: "13px",
          }}
        >
          <p style={{ textAlign: "center" }}>{user.division}</p>
        </div>
        <DynamicUserInfo
          idEmployee={userId === undefined ? user?.userId : userId}
          getDynamic={getDynamic}
        />
      </div>
      <BackgroundModal
        openModal={openBackground}
        setOpenModal={setOpenBackground}
      >
        <ChangeBackground setOpenModal={setOpenBackground} />
      </BackgroundModal>
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
}

export default PersonalMenuCard;
