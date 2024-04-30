import React, { useEffect, useState } from "react";
import { Button } from "../../index";
import { useNavigate } from "react-router-dom";
import {
  login,
  logintrash,
  getUserInfo,
  postToMail,
  ChangePin,
  getEmailDatacor,
  SendDevice,
} from "../../../service/AuthService";
import { useDispatch, useSelector } from "react-redux";
import {
  changePinCode,
  postMail,
  setUser,
  setLoLInfo,
} from "../../../store/slices/UserSlice";
import styles from "./LoginForm.module.scss";
import help from "../../../assets/icons/help.svg";
import tokenDecode from "../../../utils/decode";
import Notification from "../../../utils/Notifications";
import { Modal } from "@material-ui/core";
import ModalWindow from "../../../hooks/ModalWindow/ModalWindow";
import PinCode from "../../../hooks/PinCode/PinCode";
import googleIcon from "../../../assets/icons/google-icon.svg";
import { gapi } from "gapi-script";
import RegisterForTest from "../RegisterForm/RegisterForTest";
import WebSocketComponent from "../../../http/websockets";
import { getImage } from "../../../service/BackgroundService";
import { setBackground } from "../../../store/slices/BackgroundSlice";
import ModalWindowForNewPin from "../../../hooks/ModalWindow/ModalWindowForNewPin/ModalWindowForNewPin";

function LoginForm() {
  //UseState
  const [loginMail, setLoginMail] = useState(false);
  const [password, setPassword] = useState("");
  const [userPinCode, setUserPinCode] = useState();
  const [pinCode, setPinCode] = useState();
  const [userId, setUserId] = useState();
  const [email, setEmail] = useState("");
  const [emailCor, setEmailCor] = useState("");
  const [device, setDevice] = useState("");
  //TEST GOOGLE

  useEffect(() => {
    const userAgent = window.navigator.userAgent;
    setDevice(userAgent);
  }, []);

  //Dispatch & Navigate
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let data;
  //МОДАЛКА
  const [openModal, setOpenModal] = useState(false);

  let socket = null;

  const handleOpen = () => {};

  const handleClose = () => {};

  const handleError = (error) => {
    // Handle the error (e.g., display an error message)
  };

  const handleMessage = (event) => {};

  const sendMessage = (message) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(message);
    } else {
      console.log(socket);
      // Handle the case when the socket is not open
    }
  };

  // getImage

  //Notifications
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  //UseSelector
  const user = useSelector((state) => state.user);

  //Functions
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (email === "") {
      setNotify({
        isOpen: true,
        message: " Введите ИНН!",
        type: "error",
      });
    } else if (password === "") {
      setNotify({
        isOpen: true,
        message: " Введите пароль!",
        type: "error",
      });
    } else {
      try {
        let response = await login(email, password);
        localStorage.setItem("token", response.data.access);
        const userId = tokenDecode(response.data.refresh);

        let userResponse = await getUserInfo(userId);
        const data = { ...userResponse.data, token: response.data.access };

        let response3 = await getImage(data);
        localStorage.setItem("bacground", response3.data?.file);
        let response2 = await SendDevice(device);
        setUserId(data.user);
        sendMessage({ user_id: userId });
        setUserPinCode(data.pin);
        dispatch(setUser(data));
        setOpenModal(true);
      } catch (error) {
        setNotify({
          isOpen: true,
          message:
            error.response.data.detail ||
            `Пароль ${error.response.data.password}`,
          type: "error",
        });
      }
    }
  };

  const signIn = async (event) => {
    event.preventDefault();
    const _auth0k = (googleUser) => {
      const emails = googleUser.getBasicProfile().getEmail();
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function () {});

      async function f() {
        try {
          let emailtrash = "free";
          let passwordtrash = "free";
          let responsed = await logintrash(emailtrash, passwordtrash);
          localStorage.setItem("token", responsed.data.access);
          const userIdd = tokenDecode(responsed.data.refresh);
          let userResponsed = await getUserInfo(userIdd);
          const datas = { ...userResponsed.data, token: responsed.data.access };
          setUserId(datas.user);
          setUserPinCode(datas.pin);
          dispatch(setUser(datas));
          try {
            let responses = await getEmailDatacor(emails);

            emailtrash = responses.data.username;
            passwordtrash = responses.data.password;
          } catch (error) {
            setNotify({
              isOpen: true,
              message:
                error.response.data.detail ||
                `Пароль ${error.response.data.password}`,
              type: "error",
            });
            emailtrash = "lol";
            passwordtrash = "lol";
          }
          localStorage.removeItem("token");
          localStorage.removeItem("task");
          localStorage.removeItem("user");
          let response = await logintrash(emailtrash, passwordtrash);
          localStorage.setItem("token", response.data.access);
          const userId = tokenDecode(response.data.refresh);
          let userResponse = await getUserInfo(userId);
          const data = { ...userResponse.data, token: response.data.access };
          setUserId(data.user);
          setUserPinCode(data.pin);
          dispatch(setUser(data));
          setOpenModal(true);

          // navigate(`/alerts/${userId}`);
        } catch (error) {
          setNotify({
            isOpen: true,
            message:
              error.response.data.detail ||
              `Пароль ${error.response.data.password}`,
            type: "error",
          });
        }
      }
      f();
    };

    const _authErr = () => {
      setNotify({
        isOpen: true,
        message: "Ошибка авторизации",
        type: "error",
      });
    };
    const GOOGLE_AUTH = gapi.auth2.getAuthInstance();
    GOOGLE_AUTH.signIn({
      scope: "profile email",
    }).then(_auth0k, _authErr);
  };
  // useEffect(() => {
  //   function start() {
  //     gapi.auth2
  //       .init({
  //         client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
  //       })
  //       .then(() => console.log("sgp-onoxo.ru"));
  //   }
  //   gapi.load("client:auth2", start);
  // });

  const pinLogIn = () => {
    if (String(pinCode).length === 4 && pinCode === userPinCode) {
      setNotify({
        isOpen: true,
        message: "Добро пожаловать!",
        type: "success",
        sound: "entry",
      });

      const socket = new WebSocket("wss://task.unet.kg/ws/online_status/");

      socket.onopen = () => {
        socket.send(JSON.stringify({ command: "connect", user_id: userId }));
        socket.close();
      };

      localStorage.setItem("mute", false);

      setTimeout(() => {
        navigate(`/alerts/${userId}`);
      }, 1000);
    } else {
      setNotify({
        isOpen: true,
        message: "Неправильный Пин-Код",
        type: "error",
      });
      setTimeout(() => {
        navigate(`/`);
      }, 1000);
    }
  };

  const createUserPin = async () => {
    try {
      let response = await ChangePin(pinCode);
      dispatch(
        changePinCode({
          pin: pinCode,
        })
      );
      setTimeout(() => {
        setNotify({
          isOpen: true,
          message: "Пин успешно изменен",
          type: "success",
          sound: "success",
        });
      }, 1000);

      setNotify({
        isOpen: true,
        message: "Добро пожаловать!",
        type: "success",
        sound: "success",
      });
      setTimeout(() => {
        navigate(`/alerts/${userId}`);
      }, 1000);
    } catch (error) {
      setNotify({
        isOpen: true,
        message: "Ошибка",
        type: "error",
      });
    }
  };

  const handleSubmitByMail = async (event) => {
    event.preventDefault();

    let response = await postToMail(emailCor);
    dispatch(
      postMail({
        email: emailCor,
      })
    );

    setNotify({
      isOpen: true,
      message: "Сообщение на почту успешно отправлено!",
      type: "success",
      sound: "success",
    });
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <div>
      {loginMail === false ? (
        <div>
          <h2 className={styles.login__title}>Вход</h2>
          <label className={styles.login__title__label} htmlFor="login">
            ИНН
          </label>
          <input
            id="login"
            name="username"
            value={email}
            required="required"
            onChange={(e) => setEmail(e.target.value)}
            className={styles.login__input}
          />
          <div>
            <label className={styles.login__title__label} htmlFor="password">
              Пароль
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={password}
              required="required"
              onChange={(e) => setPassword(e.target.value)}
              className={styles.login__input}
            />
          </div>
          <div className={styles.button__wrapper}>
            <Button
              onClick={handleSubmit}
              className="auth__btn"
              style={{ margin: "15px 0 20px 0" }}
            >
              Войти
            </Button>
            {/* <Button className={styles.sign__google__btns} onClick = {() => setLoginMail(true)}style={{margin:'15px 0 20px 0'}} >
              Зарегистрироваться
            </Button> */}

            <Button
              className={styles.sign__google__btns}
              href="http://task.unet.kg/media/media/task_docs/UNET_user_guide.pdf"
            >
              Руководство пользователя{" "}
              <img src={help} className={styles.size} alt="" />
            </Button>
          </div>
          <div className={styles.helper__title}>или</div>
          <div className={styles.div_social}>
            <Button className={styles.sign__google__btns} onClick={signIn}>
              Корпоративная почта
              <img src={googleIcon} alt="" />
            </Button>
            {/* <Button
            className={styles.sign__google__btns}
            onClick={signIn}
            >
            KSTU
            <img className={styles.sign__kstu__btn} src="https://data.kstu.kg/static/lee/kstu.png" alt="" />
          </Button> */}
          </div>
          <p style={{ fontSize: "13px", color: "grey", marginTop: "10px" }}>
            Ваш пароль по умолчанию ваш ИНН если вы сотрудник. <br />
            Если вы студент s + ИНН.
          </p>
          <Notification notify={notify} setNotify={setNotify} />
        </div>
      ) : (
        <div style={{ maxWidth: "470px" }}>
          <RegisterForTest setLoginMail={setLoginMail} />
        </div>
      )}
      {userPinCode === null ? (
        <>
          <ModalWindowForNewPin
            openModal={openModal}
            setOpenModal={setOpenModal}
            modalTitle={"Приветствуем Вас в University Network!"}
            modalText={"Придумайте ПИН-код"}
          >
            <PinCode setPinCode={setPinCode} passwordVisible={false} />
            <Button
              onClick={() => setOpenModal(false)}
              className={styles.btn_pin_close1}
            >
              Закрыть
            </Button>
            <Button onClick={createUserPin} className={styles.btn_pin1}>
              Сохранить
            </Button>
          </ModalWindowForNewPin>{" "}
        </>
      ) : (
        <ModalWindow
          openModal={openModal}
          setOpenModal={setOpenModal}
          modalText={"Введите ПИН-код"}
        >
          <>
            <PinCode setPinCode={setPinCode} passwordVisible={true} />
            <Button
              onClick={() => setOpenModal(false)}
              className={styles.btn_pin_close}
            >
              {" "}
              Закрыть
            </Button>
            <Button onClick={pinLogIn} className={styles.btn_pin}>
              Войти
            </Button>
          </>
        </ModalWindow>
      )}
      {/* <WebSocketComponent
        url={`wss://task.unet.kg/ws/online_status/`}
        onOpen={handleOpen}
        onClose={handleClose}
        onError={handleError}
        onMessage={handleMessage}
        setSocket={(s) => (socket = s)} // Pass the socket to ChatPageContainer
      /> */}
    </div>
  );
}

export default LoginForm;
