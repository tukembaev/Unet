import React, { useState } from "react";
import styles from "./SimpleOrder.module.scss";
import styles2 from "./Order.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../../../../../../components/index";
import "react-sliding-pane/dist/react-sliding-pane.css";
import TaskForm from "../../../../../../../components/Forms/TaskForm/TaskForm";
import { useDispatch } from "react-redux";
import userInfo from "../../../../../../../utils/userInfo";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import back from "./../../../../../../../assets/icons/back.svg";
import print from "./../../../../../../../assets/icons/print.png";
import EmployeeSelect from "../../../../../../../hooks/EmployeeSelect/EmployeeSelect";
import ModalWindow from "../../../../../../../hooks/ModalWindow/ModalWindow";
import PdfPreview from "../../../../../../../hooks/PdfPreview/PdfPreview";
import Notification from "../../../../../../../utils/Notifications";
import DocumentHistory from "../../../../../../../components/DocumentHistory/DocumentHistory";
import { useEffect } from "react";
import SlidingPaneUtil from "../../../../../../../utils/SlidingPaneUtil";
import DocumentImgSigns from "../../../../../../../components/Signs/DocumentImgSigns";
import {
  patchOrder,
  patchOrderFormData,
} from "./../../../../../../../service/OrderService";
import { setPatchedOrder } from "../../../../../../../store/slices/OrderSlice";
import { AddWaterMark } from "../../../../../../../hooks/PdfWaterMark/AddWaterMark";
import close from "./../../../../../../../assets/icons/close.png";
import FileBlock from "../../../../../../../utils/FileBlock";
import PinCode from "../../../../../../../hooks/PinCode/PinCode";
import ModalWindowForNewPin from "../../../../../../../hooks/ModalWindow/ModalWindowForNewPin/ModalWindowForNewPin";
import { getCurrentDate } from "../../../../../../../utils/todayDateForInput";
import { ScaleLoader } from "react-spinners";
const Order = ({ info, setRender }) => {
  const [otkaz, setOtkaz] = useState("");

  const [order_date, setOrder_date] = useState("");
  const [order_number, setOrder_number] = useState("");
  let text = useState();
  const [isShown, setIsShown] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  const [newAdresseId, setNewAdresseId] = useState();
  const [state, setState] = useState({
    isPaneOpen: false,
    isPaneOpenLeft: false,
    isTask: false,
  });
  const [load, setLoad] = useState(false);
  const [pinOrComment, setPinOrComment] = useState(true);
  const [pinCode, setPinCode] = useState();

  const [state2, setState2] = useState({
    isPaneOpen2: false,
    isPaneOpenLeft2: false,
    isDecline: false,
    isAcquaint: false,
    isСhancellery: false,
  });
  const handleClickDecline = () => {
    setState2({ isPaneOpen2: true, isDecline: true });
  };
  const handleClickAcquainted = () => {
    setState2({ isPaneOpen2: true, isAcquaint: true });
  };
  const handleClickСhancellery = () => {
    setState2({ isPaneOpen2: true, isСhancellery: true });
  };
  const handleClickReSend = (info) => {
    setOpenModal(true);
    ReSendStatement(info);
  };

  const handleClickRegister = (info) => {
    setOpenModal2(true);
  };

  const [width, setWidth] = useState(window.innerWidth);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = userInfo();
  const { id } = useParams();
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `Приказ (${info?.number})`,
  });

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

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

  const DeclineStatement = async (info, text) => {
    if (otkaz === "") {
      setNotify({
        isOpen: true,
        message: "Введите причину отказа",
        type: "warning",
        sound: "warning",
      });
    } else {
      try {
        setLoad(true);
        let newStatement = {
          addressee: info.addressee,
          ordermember: info.ordermember,
          type: info.type,
          status: text,
          prich_pr_otkaz: otkaz,
        };

        let response = await patchOrder(id, newStatement);

        dispatch(setPatchedOrder(response.data));
        setNotify({
          isOpen: true,
          message: "Приказ успешно отказан",
          type: "success",
          sound: "success",
        });
        setState2({ isPaneOpen2: false });
        setRender(true);
      } catch (err) {
        console.log(err.response);
      } finally {
        setLoad(false);
      }
    }
  };

  const AcquaintedStatement = async (info, text) => {
    if (otkaz === "") {
      setNotify({
        isOpen: true,
        message: "Введите комментарий для заявителя",
        type: "warning",
        sound: "warning",
      });
    } else {
      try {
        setLoad(true);
        let newStatement = {
          addressee: info.addressee,
          ordermember: info.ordermember,
          type: info.type,
          status: text,
          prich_pr_otkaz: otkaz,
        };

        let response = await patchOrder(id, newStatement);
        const count_turn = 0;
        const file = info?.file;
        const name = info?.prorector;
        const type = "Подписано";
        const finalWaterMarks = false;
        const modifedFile = await AddWaterMark({
          name,
          type,
          count_turn,
          file,
          finalWaterMarks,
        });
        let SignStatementFile = {
          addressee: info.addressee,
          status: text,
          file: modifedFile,
        };
        let response2 = await patchOrderFormData(id, SignStatementFile);

        dispatch(setPatchedOrder(response.data));
        dispatch(setPatchedOrder(response2.data));
        setNotify({
          isOpen: true,
          message: "Отправлено",
          type: "success",
          sound: "success",
        });
        setState2({ isPaneOpen2: false });
        setRender(true);
      } catch (err) {
        // console.log(err.response);
      } finally {
        setLoad(false);
      }
    }
  };

  const СhancelleryStatement = async (info, text) => {
    if (otkaz === "") {
      setNotify({
        isOpen: true,
        message: "Введите комментарий для концелярии",
        type: "warning",
        sound: "warning",
      });
    } else {
      try {
        setLoad(true);
        let newStatement = {
          addressee: info.addressee,
          ordermember: info.ordermember,
          type: info.type,
          status: text,
          prich_pr_otkaz: otkaz,
        };

        let response = await patchOrder(id, newStatement);

        dispatch(setPatchedOrder(response.data));
        setNotify({
          isOpen: true,
          message: "Отправлено в канцелярию",
          type: "success",
          sound: "success",
        });
        setState2({ isPaneOpen2: false });
        setRender(true);
      } catch (err) {
        console.log(err.response);
      } finally {
        setLoad(false);
      }
    }
  };
  const ReSendStatement = async (info) => {
    if (newAdresseId === user.userId) {
      setNotify({
        isOpen: true,
        message: " Адрессат является пользователем!",
        type: "warning",
        sound: "warning",
      });
    } else if (newAdresseId === info?.employee.user) {
      setNotify({
        isOpen: true,
        message: " Адрессат является создателем!",
        type: "warning",
        sound: "warning",
      });
    } else {
      try {
        setLoad(true);
        let newStatement = {
          addressee: newAdresseId,
          ordermember: info.ordermember,
          type: info.type,
          status: "Передать",
        };

        let response = await patchOrder(id, newStatement);

        dispatch(setPatchedOrder(response.data));
        setNotify({
          isOpen: true,
          message: "Приказ успешно переотправлен",
          type: "success",
          sound: "success",
        });
        setOpenModal(false);
        setRender(true);
      } catch (err) {
        console.log(err.response);
      } finally {
        setLoad(false);
      }
    }
  };

  const RegisterStatement = async (info) => {
    setLoad(true);
    let newStatement = {
      addressee: info.addressee,
      ordermember: info.ordermember,
      employee: info.employee,
      type: info.type,
      status: "Зарегистрировано",
      order_date: order_date,
      order_number: order_number,
    };

    let response = await patchOrder(id, newStatement);
    const count_turn = 0;
    const file = info?.file;
    const name = info?.prorector;
    const finalWaterMarks = true;

    const months = [
      "января",
      "февраля",
      "марта",
      "апреля",
      "мая",
      "июня",
      "июля",
      "августа",
      "сентября",
      "октября",
      "ноября",
      "декабря",
    ];

    const parts = order_date.split("-");
    const formattedDate = new Date(
      parseInt(parts[0]),
      parseInt(parts[1]) - 1,
      parseInt(parts[2])
    ).toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const result = formattedDate.replace(",", "");

    const modifedFile = await AddWaterMark({
      name,
      count_turn,
      file,
      finalWaterMarks,
      order_date: result,
      order_number,
    });
    let SignStatementFile = {
      addressee: info.addressee,
      status: "Зарегистрировано",
      file: modifedFile,
    };
    let response2 = await patchOrderFormData(id, SignStatementFile);

    dispatch(setPatchedOrder(response.data));
    dispatch(setPatchedOrder(response2.data));

    setTimeout(() => {
      window.location.reload();
    }, 1000);
    setNotify({
      isOpen: true,
      message: "Приказ успешно зарегистрирован",
      type: "success",
      sound: "success",
    });
    setOpenModal2(false);

    order_date = "";
    order_number = "";
    setRender(true);
    setLoad(false);
  };

  const pinLogIn = () => {
    if (String(pinCode).length === 4 && pinCode === user.pin) {
      setNotify({
        isOpen: true,
        message: "Верный Пин-Код!",
        type: "success",
        sound: "success",
      });

      setPinOrComment(false);
    } else {
      setNotify({
        isOpen: true,
        message: "Неправильный Пин-Код",
        type: "error",
      });
    }
  };

  return (
    <div>
      <div className={styles.simple_raports_wrapper}>
        <div className={styles.simple_raports_info_wrapper}>
          <div className={styles.simple_raports_info_header}>
            {width > 1100 ? (
              <>
                {" "}
                <img
                  src={close}
                  style={{
                    width: "25px",
                    height: "25px",
                    cursor: "pointer",
                    marginTop: "25px",
                  }}
                  alt=""
                  onClick={() => navigate(`/orders/${user.userId}`)}
                />
                {info?.employee?.id === user.employeeId &&
                info.status === "На регистрацию" ? (
                  <div className={styles.btns_rightside}>
                    <Button
                      className={styles.btn2}
                      onClick={() => handleClickRegister(info)}
                    >
                      {" "}
                      Зарегистрировать
                    </Button>
                  </div>
                ) : (
                  ""
                )}
                <Button className={styles.btn_back} onClick={handlePrint}>
                  {" "}
                  Распечатать PDF
                </Button>
              </>
            ) : (
              <>
                <img
                  src={back}
                  onClick={() => navigate(-1)}
                  className={styles.size}
                  alt="s"
                />
                {info?.employee?.id === user.employeeId &&
                info.status === "На регистрацию" ? (
                  <div className={styles.btns_rightside}>
                    <Button
                      className={styles.btn2}
                      onClick={() => handleClickRegister(info)}
                    >
                      {" "}
                      Зарегистрировать
                    </Button>
                  </div>
                ) : (
                  ""
                )}
                <img
                  src={print}
                  onClick={handlePrint}
                  className={styles.size}
                />
              </>
            )}
          </div>
          <div ref={componentRef}>
            <div className={styles.simple_raports_info_heading}>
              <div className={styles.left}>
                <p>Код оборота документа: {info.number} </p>
                <p>Статус: {info.status}</p>
              </div>
              {info.prorector === info.employee_name ? (
                ""
              ) : (
                <div className={styles.right}>
                  <p>Кому: {info.prorector}</p>
                  <p>от</p>
                  <p>{info.employee_name}</p>
                </div>
              )}
            </div>
            <div className={styles.simple_raports_info_body}>
              <div className={styles.simple_raports_info_discrip}>
                <div>
                  <div>
                    {width > 1300 && info.file !== null ? (
                      <div className={styles.simple_raports_wrapper}>
                        {info?.file?.includes(".pdf") ? (
                          <PdfPreview file={info.file} />
                        ) : (
                          ""
                        )}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className={styles.simple_rapoirts_user_sign}>
                  <p>
                    {info.employee?.surname} {info.employee?.first_name}{" "}
                    {info.date_zayavki}
                    {info.ispolnpodcheck && (
                      <div className={styles.user_sign}>
                        {info.ispolnpodcheck.includes("Отказано") ? (
                          <p className={styles.text_sign}>
                            Подпись заявителя: <br />
                            Отказано{" "}
                          </p>
                        ) : (
                          <p>
                            Подпись заявителя: <br /> <br />{" "}
                          </p>
                        )}
                        <div>
                          <img src={info.ispolnpodsign} alt="" />
                        </div>
                      </div>
                    )}
                  </p>
                </div>
              </div>
              {info.status === "Отказано" && info.prich_pr_otkaz != null ? (
                <div className={styles.simple_raports_info_heading}>
                  <h3>Причина отказа: {info.prich_pr_otkaz} </h3>
                </div>
              ) : (info.status === "На регистрацию" ||
                  info.status === "Зарегистрировано") &&
                info.prich_pr_otkaz != null ? (
                <div className={styles.simple_raports_info_heading}>
                  <h3>
                    Комментарий от {info.prorector} : {info.prich_pr_otkaz}{" "}
                  </h3>
                </div>
              ) : info.status === "В канцелярии" &&
                info.prich_pr_otkaz != null ? (
                <div className={styles.simple_raports_info_heading}>
                  <h3>Комментарий для концелярии: {info.prich_pr_otkaz} </h3>
                </div>
              ) : (
                ""
              )}
              <div className={styles.all_checks}>
                {info.prorectorcheck && (
                  <div>
                    {info.prorectorcheck.includes("Отказано") ? (
                      <p className={styles.text_sign}>
                        Подпись заявителя: <br />
                        Отказано{" "}
                      </p>
                    ) : (
                      <p>
                        Подпись : {info.prorector} <br />{" "}
                        {info.prorector_date_check} <br />{" "}
                      </p>
                    )}
                    <div>
                      <img src={info.prorectorsign} alt="" />
                    </div>
                  </div>
                )}

                {info.ordermember?.map((item) => {
                  return (
                    <DocumentImgSigns
                      signer_name={item.name}
                      signer_sign={item.sign}
                      signer_sign_time={item.date_check_member}
                      signer_type={item.name_approval}
                    />
                  );
                })}
              </div>
            </div>
          </div>
          {info.file === null ? (
            ""
          ) : (
            <div style={{ marginLeft: "25px" }}>
              <FileBlock file_url={info?.file} />
            </div>
          )}
          <div className={styles.simple_raports_footer}>
            <div className={styles.all_checks}></div>
            {width > 1000 ? (
              <SlidingPaneUtil
                size="900px"
                title={
                  state.isTask
                    ? "Новая задача на основе Приказа"
                    : "Передать на согласование"
                }
                state={state}
                setState={setState}
              >
                {" "}
                {state.isTask === true ? (
                  <TaskForm
                    idstatement={info.number}
                    typestatement={info.type}
                    setRender={setRender}
                    setState={setState}
                  />
                ) : (
                  ""
                )}
              </SlidingPaneUtil>
            ) : (
              <SlidingPaneUtil
                size="100%"
                title={
                  state.isTask
                    ? "Новая задача на основе Приказа"
                    : "Передать на согласование"
                }
                state={state}
                setState={setState}
              >
                {" "}
                <TaskForm
                  idstatement={info.number}
                  typestatement={info.type}
                  setRender={setRender}
                  setState={setState}
                />{" "}
              </SlidingPaneUtil>
            )}

            {pinOrComment ? (
              <ModalWindow
                openModal={state2.isPaneOpen2}
                setOpenModal={setState2.isPaneOpen2}
                modalText={"Введите ПИН-код"}
              >
                <>
                  <PinCode setPinCode={setPinCode} passwordVisible={true} />
                  <Button
                    onClick={() => setState2({ isPaneOpen2: false })}
                    className={styles.btn_pin_close}
                  >
                    {" "}
                    Закрыть
                  </Button>
                  <Button onClick={pinLogIn} className={styles.btn_pin}>
                    Подтвердить
                  </Button>
                </>
              </ModalWindow>
            ) : (
              <ModalWindowForNewPin
                openModal={state2.isPaneOpen2}
                setOpenModal={setState2.isPaneOpen2}
                modalTitle={
                  state2.isDecline
                    ? "Введите причину отказа"
                    : state2.isAcquaint
                    ? "Введите комментарий для ознакомления"
                    : state2.isСhancellery
                    ? "Введите комментарий для концелярии"
                    : ""
                }
              >
                <div className={styles.decline_form}>
                  <div className={styles.item_flex1}>
                    <div className={styles.input_type3}>
                      <textarea
                        onChange={(e) => setOtkaz(e.target.value)}
                        className={styles.discription_input}
                        placeholder={
                          state2.isDecline
                            ? "Причина отказа"
                            : state2.isAcquaint
                            ? "Комментарий для ознакомления"
                            : state2.isСhancellery
                            ? "Комментарий для концелярии"
                            : ""
                        }
                        required
                      />
                    </div>
                  </div>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Button
                    onClick={() => setState2({ isPaneOpen2: false })}
                    className={styles.btn_pin_close}
                  >
                    Закрыть
                  </Button>

                  {state2.isDecline ? (
                    <div style={{ maxHeight: "47px", marginTop: "8px" }}>
                      {load ? (
                        <ScaleLoader color="gray" size={30} />
                      ) : (
                        <Button
                          onClick={(e) =>
                            DeclineStatement(info, (text = "Отказано"))
                          }
                          className={styles.btn_pin}
                        >
                          Отказать
                        </Button>
                      )}
                    </div>
                  ) : state2.isAcquaint ? (
                    <div style={{ maxHeight: "47px", marginTop: "8px" }}>
                      {load ? (
                        <ScaleLoader color="gray" size={30} />
                      ) : (
                        <Button
                          onClick={(e) =>
                            AcquaintedStatement(info, (text = "На регистрацию"))
                          }
                          className={styles.btn_pin}
                        >
                          Отправить
                        </Button>
                      )}
                    </div>
                  ) : state2.isСhancellery ? (
                    <div style={{ maxHeight: "47px", marginTop: "8px" }}>
                      {load ? (
                        <ScaleLoader color="gray" size={30} />
                      ) : (
                        <Button
                          onClick={(e) =>
                            СhancelleryStatement(info, (text = "В канцелярии"))
                          }
                          className={styles.btn_pin}
                        >
                          Отправить
                        </Button>
                      )}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </ModalWindowForNewPin>
            )}

            {isShown === false ? (
              <div>
                {info.employee === user.employeeId &&
                (info.status === "В режиме ожидания" ||
                  info.status === "В процессе выполнения") ? (
                  <div className={styles.btns_rightside}>
                    <Button disabled="true" className={styles.btn3}>
                      {" "}
                      Успешно отправлено{" "}
                    </Button>
                  </div>
                ) : info?.addressee === user.employeeId &&
                  info.status !== "Отказано" &&
                  info.status !== "На регистрацию" &&
                  info.status !== "Зарегистрировано" &&
                  info.status !== "Ознакомлен" ? (
                  <div>
                    <div className={styles.btns_rightside}>
                      <Button
                        className={styles.btn_pin_close}
                        onClick={handleClickDecline}
                        style={{ marginTop: "20px" }}
                      >
                        {" "}
                        Отказать
                      </Button>

                      {/* <Button
                        className={styles.btn2}
                        onClick={() =>
                          setState({ isPaneOpen: true, isTask: true })
                        }
                      >
                        Формировать задачу на основе Приказа
                      </Button> */}
                      {/* <Button
                        className={styles.btn2}
                        onClick={handleClickСhancellery}
                      >
                        {" "}
                        Подписать и на концелярию
                      </Button> */}
                      <Button
                        className={styles.btn2}
                        onClick={handleClickAcquainted}
                      >
                        {" "}
                        Подписать и вернуть
                      </Button>
                      <Button
                        className={styles.btn2}
                        onClick={() => handleClickReSend(info)}
                      >
                        {" "}
                        Передать
                      </Button>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            ) : (
              <div className={styles.simple_raports_footer2}>
                <div>
                  <div className={styles.input_type3}>
                    <textarea
                      onChange={(e) => setOtkaz(e.target.value)}
                      className={styles.discription_input}
                      placeholder="Причина отказа"
                    />
                  </div>
                </div>
                <div className={styles.mobile_btns}>
                  <Button
                    className={styles.btn1}
                    onClick={() => {
                      DeclineStatement(info, (text = "Отказано"));
                    }}
                  >
                    {" "}
                    Отказать
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        <DocumentHistory typeDoc={"Приказ"} info={info} />

        <div></div>

        <Notification notify={notify} setNotify={setNotify} />
      </div>

      {pinOrComment ? (
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
              Подтвердить
            </Button>
          </>
        </ModalWindow>
      ) : (
        <>
          <ModalWindow
            openModal={openModal}
            setOpenModal={setOpenModal}
            modalTitle={"Выберите сотрудника"}
            // modalText={"Выбор"}
          >
            <EmployeeSelect selectedEmployee={setNewAdresseId} />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Button
                onClick={() => setOpenModal(false)}
                className={styles.btn_pin_close}
              >
                Закрыть
              </Button>
              <div style={{ maxHeight: "47px", marginTop: "8px" }}>
                {load ? (
                  <div>
                    {" "}
                    <ScaleLoader color="grey" size={30} />{" "}
                  </div>
                ) : (
                  <Button
                    onClick={() => ReSendStatement(info)}
                    className={styles.btn_pin}
                  >
                    Передать
                  </Button>
                )}
              </div>
            </div>
          </ModalWindow>{" "}
        </>
      )}

      {pinOrComment ? (
        <ModalWindow
          openModal={openModal2}
          setOpenModal={setOpenModal2}
          modalText={"Введите ПИН-код"}
        >
          <>
            <PinCode setPinCode={setPinCode} passwordVisible={true} />
            <Button
              onClick={() => setOpenModal2(false)}
              className={styles.btn_pin_close}
            >
              {" "}
              Закрыть
            </Button>
            <Button onClick={pinLogIn} className={styles.btn_pin}>
              Подтвердить
            </Button>
          </>
        </ModalWindow>
      ) : (
        <>
          <ModalWindow
            openModal={openModal2}
            setOpenModal={setOpenModal2}
            modalTitle={"Регистрация приказа"}
            modalText={"Заполните поля"}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <input
                  max={getCurrentDate()}
                  type="date"
                  placeholder="Дата приказа"
                  className={styles2.order_input}
                  required
                  value={order_date}
                  onChange={(e) => setOrder_date(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Номер приказа"
                  className={styles2.order_input}
                  required
                  value={order_number}
                  onChange={(e) => setOrder_number(e.target.value)}
                />
              </div>
              <div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Button
                    onClick={() => setOpenModal2(false)}
                    className={styles.btn_pin_close}
                  >
                    Закрыть
                  </Button>
                  <div style={{ maxHeight: "50px", marginTop: "8px" }}>
                    {load ? (
                      <div>
                        {" "}
                        <ScaleLoader color="grey" size={30} />{" "}
                      </div>
                    ) : (
                      <Button
                        onClick={() => RegisterStatement(info)}
                        className={styles.btn_pin}
                      >
                        Зарегистрировать
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </ModalWindow>{" "}
        </>
      )}
    </div>
  );
};
export default Order;
