import React, { useEffect, useState } from 'react'
import styles from '../PersonalMenu.module.scss'
import { useNavigate } from 'react-router-dom';
import userInfo from '../../../../utils/userInfo';
import { useDispatch } from 'react-redux';
import { ChangePassword, ChangePin, ChangeProfileImage, ChangeProfileNumber } from '../../../../service/AuthService';
import { changeImageAvatar, changePassword, changePhoneNumber, changePinCode } from '../../../../store/slices/UserSlice';
import PinCode from '../../../../hooks/PinCode/PinCode';
import ModalWindow from '../../../../hooks/ModalWindow/ModalWindow';
import { Button } from '../../../../components';
import Notification from '../../../../utils/Notifications';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';

const PersonalInfo = ({ title, data, phone, setPhone, setNotify, icons, newPassword,setNewPassword, newPin,setNewPin, button, btnId }) => {



  const [pinCode, setPinCode] = useState();
  const [openModal, setOpenModal] = useState(false);

  const [file, setFile] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [currentDynamicUser, getDynamic] = useState();
  const [EfficiencyColor, setEfficiencyColor] = useState("grey");
  const dispatch = useDispatch();
  const [backgroundImage, setBackgroundImg] = useState(null)
  const [pinOrComment, setPinOrComment] = useState(false)
  const user = userInfo();
  const navigate = useNavigate();
  const [userPinCode] = useState(user?.pin);

  const [successPin, setSuccessPin] = useState(false)


  const createUserPin = async () => {

    try {
      let response = await ChangePin(pinCode);
      dispatch(
        changePinCode({
          pin: pinCode,
        })
      );
      setNotify({
        isOpen: true,
        message: "Пин успешно изменен",
        type: "success",
      });

      setTimeout(() => {
        setOpenModal(false);
      }, 1000);
      localStorage.removeItem("token");
      localStorage.removeItem("task");
      localStorage.removeItem("user");
      navigate("/");
    } catch (error) {
      setNotify({
        isOpen: true,
        message: "Ошибка",
        type: "error",
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (String(pinCode).length === 4 && pinCode === user.pin) {


      setNotify({
        isOpen: true,
        message: "Верный Пин-Код!",
        type: "success",
      });
      setPinCode([])
      setPinOrComment(false)
      setSuccessPin(true)

    } else {
      setNotify({
        isOpen: true,
        message: "Неправильный Пин-Код",
        type: "error",
      });
      return
    }
    if (password === "") {
      setNotify({
        isOpen: true,
        message: " Вы не указали новый пароль",
        type: "error",
      });
    } else
      try {
        let response = await ChangePassword(password);
        dispatch(
          changePassword({
            new_password: password,
          })
        );
        setNotify({
          isOpen: true,
          message: "Пароль успешно изменен",
          type: "success",
        });
        setTimeout(() => {
          window.location.reload();
        }, 500);
      } catch (error) {
        setNotify({
          isOpen: true,
          message: "Ошибка",
          type: "error",
        });
      }
  };


  const handleSubmit2 = async (event) => {
    event.preventDefault();
    if (String(pinCode).length === 4 && pinCode === user.pin) {


      setNotify({
        isOpen: true,
        message: "Верный Пин-Код!",
        type: "success",
      });
      setPinCode([])
      setPinOrComment(false)
      setSuccessPin(true)

    } else {
      setNotify({
        isOpen: true,
        message: "Неправильный Пин-Код",
        type: "error",
      });
      return
    }
    if (phoneNumber === "") {
      setNotify({
        isOpen: true,
        message: " Вы не указали новый номер телефона",
        type: "error",
      });

    }
    else
      try {
        let response = await ChangeProfileNumber(phoneNumber);
        dispatch(
          changePhoneNumber({
            numberPhone: phoneNumber,
          })
        );
        setNotify({
          isOpen: true,
          message: "Номер телефона успешно изменен",
          type: "success",
        });
        setTimeout(() => {
          window.location.reload();
        }, 500);
      } catch (error) {
        setNotify({
          isOpen: true,
          message: "Ошибка",
          type: "error",
        });
      }
  };

  const [isExpanded, setIsExpanded] = useState(false);

  const handleClickImg = () => {
    setIsExpanded(!isExpanded);
  };


  const pinLogIn = () => {


    if (String(pinCode).length === 4 && pinCode === user.pin) {
      setNotify({
        isOpen: true,
        message: "Верный Пин-Код!",
        type: "success",
      });

      setPinOrComment(true)
   



    } else {
      setNotify({
        isOpen: true,
        message: "Неправильный Пин-Код",
        type: "error",
      });

    }
  };

  const handleClosePhone = () => {
    setOpenModal(true)
    setPhone(false)
  }

  const handleClosePin = () => {
    setOpenModal(true)
    setNewPin(false)
  }



  return (
    <>
      {phone && phone !== undefined ? (
        <div>
          {pinOrComment ? (
            <ModalWindow
              openModal={!openModal}
              setOpenModal={setOpenModal}
              modalText={"Введите ПИН-код"}
            >
              <>
                <PinCode setPinCode={setPinCode} passwordVisible={true} />
                <Button
                  onClick={handleClosePhone}
                  className={styles.btn_pin_close}
                >
                  {" "}
                  Закрыть
                </Button>
                <Button onClick={handleSubmit2} className={styles.btn_pin}>

                  Подтвердить
                </Button>
              </>
            </ModalWindow>) :
            (<div className={styles.PersonalInfo}>

              <input
                type="number"
                maxLength={2}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className={styles.password_change}
                placeholder='Введите номер телефона'
                style={{
                  WebkitAppearance: 'none', // for Webkit browsers (e.g., Chrome, Safari)
                  appearance: 'none', // for other browsers
                }}
                onKeyDown={(e) => {
                  if (e.target.value.length >= 12 && e.key !== 'Backspace') {
                    e.preventDefault(); 
                  }
                }}
              />
              <div>

                <button className={styles.btn2} style={{ border: 'none' }} onClick={() => setPhone(false)}><CloseIcon sx={{ fontSize: '20px' }} /></button>
                <Button className={styles.btn2} onClick={() => setPinOrComment(true)}>
                  <DoneIcon />
                </Button>
              </div>
            </div>
            )
          }
        </div>

      ) : newPassword ? (
        <div>
          {pinOrComment ? (
            <ModalWindow
              openModal={!openModal}
              setOpenModal={setOpenModal}
              modalText={"Введите ПИН-код"}
            >
              <>
                <PinCode setPinCode={setPinCode} passwordVisible={true} />
                <Button
                  onClick={() => setOpenModal(true)}
                  className={styles.btn_pin_close}
                >
                  {" "}
                  Закрыть
                </Button>
                <Button onClick={handleSubmit} className={styles.btn_pin}>

                  Подтвердить
                </Button>
              </>
            </ModalWindow>) :
            (<div className={styles.PersonalInfo}>

              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                className={styles.password_change}
                placeholder='Введите новый пароль'
              />
              <button className={styles.btn2} style={{ border: 'none' }} onClick={() => setNewPassword(false)}><CloseIcon sx={{ fontSize: '20px' }} /></button>
              <Button className={styles.btn2} onClick={() => setPinOrComment(true)}>
                <DoneIcon />
              </Button>
            </div>
            )
          }
        </div>
      ) : newPin ? (
        <div>
          {pinOrComment ?
            (<ModalWindow
              openModal={!openModal}
              setOpenModal={setOpenModal}
              modalText={"Введите новый ПИН-код"}
            >
              <>
                <PinCode setPinCode={setPinCode} passwordVisible={false} />
                <Button
                  onClick={handleClosePin}
                  className={styles.btn_pin_close}
                >
                  {" "}
                  Закрыть
                </Button>
                <Button onClick={createUserPin} className={styles.btn_pin}>

                  Подтвердить
                </Button>
              </>
            </ModalWindow>
            ) : (
              <ModalWindow
                openModal={!openModal}
                setOpenModal={setOpenModal}
                modalText={"Введите старый ПИН-код"}
              >
                <>
                  <PinCode setPinCode={setPinCode} passwordVisible={true} />
                  <Button
                    onClick={handleClosePin}
                    className={styles.btn_pin_close}
                  >
                    {" "}
                    Закрыть
                  </Button>
                  <Button onClick={pinLogIn} className={styles.btn_pin}>

                    Подтвердить
                  </Button>
                </>
              </ModalWindow>)
          }
        </div>
      ) : (
        <div className={styles.PersonalInfo}>
          <span><span style={{ color: 'gray', paddingTop: '8px' }}>{icons}</span>{title}</span>
          <span>{data}
            {button !== undefined ? (<button
          
              id={btnId? styles.btnId : null}
              className={styles.btn_change}
              onClick={() => { button(true) }}
            >
              Поменять
            </button>) : (null)}


          </span>
        </div>
      )}


    </>
  )
}

export default PersonalInfo