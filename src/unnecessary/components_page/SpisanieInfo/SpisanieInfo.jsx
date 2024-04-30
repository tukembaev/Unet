import React, { useState, useRef, useEffect } from "react";
import styles from "./SpisanieInfo.module.scss";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../../../../../components/index";
import "react-sliding-pane/dist/react-sliding-pane.css";
import SlidingPane from "react-sliding-pane";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import TaskForm from "./../../../../../../../components/Forms/TaskForm/TaskForm";
import QRCode from "react-qr-code";
import { useReactToPrint } from "react-to-print";
import BasicActForm from "../../../../../../../components/Forms/ActForm/BasicActForm/BasicActForm";
import LowActForm from "../../../../../../../components/Forms/ActForm/LowActForm/LowActForm";
import { SignRaport } from "../../../../../../../service/StatementsService";
import { setSignStatement } from "../../../../../../../store/slices/StatementsSlice";
import BasicActFormContainer from "../../../../../../../components/Forms/ActForm/BasicActForm/BasicActFormContainer";
import userInfo from "../../../../../../../utils/userInfo";
import LowActFormContainer from "../../../../../../../components/Forms/ActForm/LowActForm/LowActFormContainer";

import complete from "./../../../../../../../assets/icons/complete.svg";
import back from "./../../../../../../../assets/icons/back.svg";
import Notification from "../../../../../../../utils/Notifications";
const SpisanieInfo = ({ info, employeeinfo ,setRender }) => {
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [width, setWidth] = useState(window.innerWidth);
  const [state, setState] = useState({
    isPaneOpen: false,
    isPaneOpenLeft: false,
  });
  const [state2, setState2] = useState({
    isPaneOpen2: false,
    isPaneOpenLeft2: false,
  });

  const item = info.spisanie;
  const user = userInfo();
  let text;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `Списание (${info.number})`,
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

  const SignStatement = async ({ info }) => {
    let newStatement = { type: info.type, status: "Одобрено" };

    let response = await SignRaport(id, newStatement);

    dispatch(setSignStatement(response.data));
    setNotify({
      isOpen: true,
      message: "Списание успешно подписано",
       type: "success", sound : "success"
    });

    setRender(true)
  };

  const [otkaz, setOtkaz] = useState(null);
  const DeclineStatement = async (info, text) => {
    if (otkaz === null) {
      setNotify({
        isOpen: true,
        message: "Укажите причину отказа",
        type: "warning",     sound: 'warning'
      });
    } else {
      let newStatement = {
        type: info.type,
        status: text,
        prich_pr_otkaz: otkaz,
      };

      let response = await SignRaport(id, newStatement);

      dispatch(setSignStatement(response.data));
      setNotify({
        isOpen: true,
        message: "Списание успешно отказано",
         type: "success", sound : "success"
      });

      setRender(true)
    }
  };

  const handleClick = () => {
    setState({ isPaneOpen2: true });
  };

  return (
    <div className={styles.spisanie_info_wrapper}>
      <div ref={componentRef}>
        <div className={styles.spisanie_info_heading}>
          <div className={styles.left}>
            <p>Номер Рапорта: {info.number} </p>
            <p>Статус : {info.status}</p>

            <p>Тип рапорта: {info.type}</p>
            <p>Назначение рапорта: {info.podtypezayavki}</p>
          </div>
          <div className={styles.right}>
            <p>Проректору по АХД</p>
            <p>Асиеву А.Т.</p>
            <p>от</p>
            <p>
              {employeeinfo.surname} {employeeinfo.first_name}{" "}
              {employeeinfo.last_name}
            </p>
          </div>
        </div>
        <div className={styles.spisanie_info_body}>
          <h1>Рапорт</h1>
          <div className={styles.spisanie_info_discrip}>
            <p>{info.text}</p>
            {info.file === null ? (
              ""
            ) : (
              <a href={info.file} download="myDoc.pdf">
                {" "}
                Файл{" "}
              </a>
            )}
          </div>
        </div>
        <div className={styles.spisanie_table}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Наименование</th>
                <th>Количество</th>
                <th>Причина</th>
              </tr>
            </thead>
            <tbody>
              {item.map((item, id) => (
                <tr key={id}>
                  <td>{item.name_spisanie}</td>
                  <td>{item.counts}</td>
                  <td>{item.prichina}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {info.status === "Отказано" && info.prich_pr_otkaz != null ? (
            <div className={styles.simple_raports_info_heading}>
              <h2>Причина отказа: {info.prich_pr_otkaz} </h2>
            </div>
          ) : (
            ""
          )}
          <div className={styles.all_checks}>
            {info.prorectorcheck === null ? (
              ""
            ) : (
              <div className={styles.prorector_check}>
                {info.prorectorcheck.includes("Отказано") ? (
                  <p className={styles.text_sign}>
                    Подпись проректора: <br />
                    Отказано{" "}
                  </p>
                ) : (
                  <p>
                    Подпись проректора: <br /> <br />{" "}
                  </p>
                )}
                <div
                  style={{
                    height: "auto",
                    maxWidth: 64,
                    margin: "0 auto",
                    width: "100%",
                  }}
                >
                  <QRCode
                    size={256}
                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                    value={info.prorectorcheck}
                    viewBox={`0 0 256 256`}
                  />
                </div>
              </div>
            )}

{info.ispolnpodcheck === null ? (
                  ""
                ) : (
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
                    <div
                      style={{
                        height: "auto",
                        maxWidth: 64,
                        margin: "0 auto",
                        width: "100%",
                      }}
                    >
                      <QRCode
                        size={256}
                        style={{
                          height: "auto",
                          maxWidth: "100%",
                          width: "100%",
                        }}
                        value={info.ispolnpodcheck}
                        viewBox={`0 0 256 256`}
                      />
                    </div>
                  </div>
                )}
          </div>
        </div>
      </div>
      <div className={styles.spisanie_footer}>
        <Button className={styles.btn1} onClick={() => navigate(-1)}>
          Закрыть
        </Button>

        {width > 1000 ? (
          <SlidingPane
            className={styles.some_custom_class1}
            overlayClassName={styles.some_custom_overlay_class1}
            isOpen={state.isPaneOpen2}
            title="Причина отказа"
            width="400px"
            from="bottom"
            hideHeader={true}
            onRequestClose={() => {
              setState({ isPaneOpen2: false });
            }}
          >
            <div className={styles.decline_form}>
              <div className={styles.item_flex}>
                <div className={styles.input_type3}>
                  <textarea
                    onChange={(e) => setOtkaz(e.target.value)}
                    className={styles.discription_input}
                    placeholder="Причина отказа"
                    required
                  />
                </div>

                <img
                  src={back}
                  className={styles.size}
                  onClick={() => setState({ isPaneOpen2: false })}
                ></img>

                <img
                  src={complete}
                  className={styles.size}
                  onClick={(e) => DeclineStatement(info, (text = "Отказано"))}
                ></img>
              </div>
            </div>
          </SlidingPane>
        ) : (
          <SlidingPane
            className={styles.some_custom_class1}
            overlayClassName={styles.some_custom_overlay_class1}
            isOpen={state.isPaneOpen2}
            title="Причина отказа"
            width="100%"
            from="bottom"
            hideHeader={true}
            onRequestClose={() => {
              setState({ isPaneOpen2: false });
            }}
          >
            <div className={styles.item_flex}>
              <div className={styles.input_type3}>
                <textarea
                  onChange={(e) => setOtkaz(e.target.value)}
                  className={styles.discription_input}
                  placeholder="Причина отказа"
                  required
                />
              </div>

              <img
                src={back}
                className={styles.size}
                onClick={() => setState({ isPaneOpen2: false })}
              ></img>

              <img
                src={complete}
                className={styles.size}
                onClick={(e) => DeclineStatement(info, (text = "Отказано"))}
              ></img>
            </div>
          </SlidingPane>
        )}

        {width > 1000 ? (
          
          <SlidingPane
            className={styles.some_custom_class2}
            overlayClassName={styles.some_custom_overlay_class2}
            isOpen={state.isPaneOpen}
            title="Новый акт"
            onRequestClose={() => {
              setState({ isPaneOpen: false });
            }}
          >
            {info.podtypezayavki === "Основные" ? (
              <BasicActFormContainer idstatement={info.id} spisanie={item} />
            ) : (
              <LowActFormContainer
                idstatement={info.id}
                spisanietables={item}
              />
            )}
          </SlidingPane>
        ) : (
          <SlidingPane
            className={styles.some_custom_class2}
            overlayClassName={styles.some_custom_overlay_class2}
            isOpen={state.isPaneOpen}
            width="100%"
            title="Новый акт"
            onRequestClose={() => {
              setState({ isPaneOpen: false });
            }}
          >
            {info.podtypezayavki === "Основные" ? (
              <BasicActFormContainer idstatement={info.id} spisanie={item} />
            ) : (
              <LowActFormContainer
                idstatement={info.id}
                spisanietables={item}
              />
            )}
          </SlidingPane>
        )}



        
        <>

          {info.prorectorcheck != null &&
          info.employee.id === user.employeeId &&
          info.status === "В процессе выполнения" ? (
            <>
              {" "}
              {info.podtypezayavki.includes("Малоценные") ? (
                <Button
                  className={styles.btn2}
                  onClick={() =>
                    navigate(`/actmoc/${info.spisanie[0].act_moc}`)
                  }
                >
                  {" "}
                  Посмотреть акт
                </Button>
              ) : (
                <Button
                  className={styles.btn2}
                  onClick={() =>
                    navigate(`/actosn/${info.spisanie[0].act_osn}`)
                  }
                >
                  {" "}
                  Посмотреть акт
                </Button>
              )}
            </>
          ) : (user.is_mol_of === true || user.userId === 7) &&
            info.status === "В процессе подтверждения" ? (
            <>
              {" "}
              {info.podtypezayavki.includes("Малоценные") ? (
                <Button
                  className={styles.btn2}
                  onClick={() =>
                    navigate(`/actmoc/${info.spisanie[0].act_moc}`)
                  }
                >
                  {" "}
                  Посмотреть акт
                </Button>
              ) : (
                <Button
                  className={styles.btn2}
                  onClick={() =>
                    navigate(`/actosn/${info.spisanie[0].act_osn}`)
                  }
                >
                  {" "}
                  Посмотреть акт
                </Button>
              )}
            </>
          ) : (user.is_mol_of === true || user.userId === 7) &&
            info.status === "На рассмотрении комиссии" ? (
            <>
              {" "}
              {info.podtypezayavki.includes("Малоценные") ? (
                <Button
                  className={styles.btn2}
                  onClick={() =>
                    navigate(`/actmoc/${info.spisanie[0].act_moc}`)
                  }
                >
                  {" "}
                  Посмотреть акт
                </Button>
              ) : (
                <Button
                  className={styles.btn2}
                  onClick={() =>
                    navigate(`/actosn/${info.spisanie[0].act_osn}`)
                  }
                >
                  {" "}
                  Посмотреть акт
                </Button>
              )}
            </>
          ) : (user.is_mol_of === true || user.userId === 7) &&
            info.status === "Завершена" ? (
            <>
              {" "}
              {info.podtypezayavki.includes("Малоценные") ? (
                <Button
                  className={styles.btn2}
                  onClick={() =>
                    navigate(`/actmoc/${info.spisanie[0].act_moc}`)
                  }
                >
                  {" "}
                  Посмотреть акт
                </Button>
              ) : (
                <Button
                  className={styles.btn2}
                  onClick={() =>
                    navigate(`/actosn/${info.spisanie[0].act_osn}`)
                  }
                >
                  {" "}
                  Посмотреть акт
                </Button>
              )}
            </>
          ) : info.prorectorcheck != null &&
            info.employee.id === user.employeeId &&
            info.status === "Отказано" ? (
            <>
              {" "}
              {info.podtypezayavki.includes("Малоценные") ? (
                <Button
                  className={styles.btn2}
                  onClick={() =>
                    navigate(`/actmoc/${info.spisanie[0].act_moc}`)
                  }
                >
                  {" "}
                  Посмотреть акт
                </Button>
              ) : (
                <Button
                  className={styles.btn2}
                  onClick={() =>
                    navigate(`/actosn/${info.spisanie[0].act_osn}`)
                  }
                >
                  {" "}
                  Посмотреть акт
                </Button>
              )}
            </>
          ) : info.prorectorcheck != null &&
            info.employee.id === user.employeeId && info.status === "В процессе составления акта" ? (
            <Button
              className={styles.btn2}
              onClick={() => setState({ isPaneOpen: true })}
            >
              Формировать акт на основе списания
            </Button>
          ) : info.prorectorcheck === null && user.employeeId === 2 ? (
            <>
              <Button
                className={styles.btn2}
                onClick={() => {
                  SignStatement({ info });
                }}
              >
                Одобрить
              </Button>

              <Button className={styles.btn1} onClick={handleClick}>
                {" "}
                Отказать
              </Button>
            </>
          ) : (
            ""
          )}

          <Button className={styles.btn2} onClick={handlePrint}>
            {" "}
            Распечатать PDF
          </Button>
        </>
      </div>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
};

export default SpisanieInfo;
