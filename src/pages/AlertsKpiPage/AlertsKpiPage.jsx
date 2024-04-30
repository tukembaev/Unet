import React, { useEffect, useState } from "react";
import { Button, Layout } from "../../components";
import styles from "./AlertsKpiPage.module.scss";
import {
  getKpiInfo,
  patchKpiInfo,
  patchKpiInfoJson,
} from "../../service/PublicationService";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import down from "../../assets/icons/expand_more_black.png";
import right from "../../assets/icons/chevron_right_black.png";
import ProfilePage from "../ProfilePage/ProfilePage";
import PopupState from "material-ui-popup-state";
import { Popover } from "@mui/material";
import ModalWindow from "../../hooks/ModalWindow/ModalWindow";
import { TextareaAutosize } from "@material-ui/core";
import EmployeeSelectAllUserId from "../../hooks/EmployeeSelect/EmployeeSelectAllUserId";
import userInfo from "../../utils/userInfo";
import ChangeAlerts from "../KpiPage/components/KpiContent/components/ChangePublick/ChangeAlerts";
import PinCode from "../../hooks/PinCode/PinCode";
import Notification from "../../utils/Notifications";

const AlertsKpiPage = () => {
  const [data, setData] = useState(null);
  const [render, setRender] = useState(false);
  const [status, setStatus] = useState(null);

  const { id } = useParams();
  const [rejection_reason, SetRejected_reason] = useState("");
  const navigate = useNavigate();
  const [change, setChange] = useState(false);
  const [title, setTitle] = useState(data?.title || "");
  const [description, setDescription] = useState(data?.description || "");
  const [link, setLink] = useState(data?.link || "");
  const [doi, setDoi] = useState(data?.doi);
  const [issn, setIssn] = useState(data?.issn || "");
  const [isni, setIsni] = useState(data?.isni || "");
  const [wikipedia_url, setWiki] = useState(data?.wikipedia_url || "");
  const [wikidata, setWikiData] = useState(data?.wikidata || "");
  const [eid, setEid] = useState(data?.eid || "");
  const [country, setCountry] = useState(data?.country || "");
  const [file, setFile] = useState(data?.file || null);
  const [authors, setSelectedEmployee] = useState(data?.kpi_authors || []);
  const [selectedFiles, setSelectedFiles] = useState(null);

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [pinOrComment,setPinOrComment] = useState(false)
  const [pinOrComment2,setPinOrComment2] = useState(true)
  const [pinCode, setPinCode] = useState();
  const [openModal, setOpenModal] = useState(false);

  const onFileChange = (event) => {
    setSelectedFiles(event.target.files);
  };
  const user = userInfo();
  const getUserIdArray = (data) => {
    const userIdArray = data.map((item) => item.user_id);
    return userIdArray;
  };

  const handleSubmit = async (id) => {
    try {
      let kpi__authors = getUserIdArray(authors);

      let response = await patchKpiInfoJson(id, {
        title: title === "" ? data?.title : title,
        link: link === "" ? data?.link : link,
        kpi_authors:
          kpi__authors.length === 0 ? data?.kpi__authors : kpi__authors,
        issn: issn === "" ? data?.issn : issn,
        wikidata: wikidata === "" ? data?.wikidata : wikidata,
        description: description === "" ? data?.description : description,
        isni: isni === "" ? data?.isni : isni,
        wikipedia_url:
          wikipedia_url === "" ? data?.wikipedia_url : wikipedia_url,
        eid: eid === "" ? data?.eid : eid,
        country: country === "" ? data?.country : country,
        status,
        rejection_reason,
        files: null,
      });
      setState2({ isPaneOpen2: false })
      setNotify({
        isOpen: true,
        message: "Действие было успешно выполнено",
         type: "success", sound : "success"
      });
      setChange(false);
      setTimeout(() => navigate(-1) , 2000)
   
    } catch (error) {
      
      // setNotify({
      //   isOpen: true,
      //   message: "Ошибка",
      //   type: "error",
      // });
    }
  };
  const handleClear = () => {
    setCountry("");
    setLink("");
    setSelectedEmployee([]);
    setFile(null);
    setIsni("");
    setIssn("");
    setIssn("");
    setWikiData("");
    setDescription("");
    setWiki("");
    setEid("");
    setCountry("");
    setTitle("");
    setDoi("");
  };

  const getData = async () => {
    try {
      let response = await getKpiInfo(id, data);
      setData(response.data);
    } catch (error) {
      
    }
  };

  useEffect(() => {
    getData();
  }, [render]);

  useEffect(() => {
    handleSubmit(data?.id);
  }, [status]);

  const [openSection, setOpenSection] = useState({
    section1: false,
    section1more: false,
  });
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [userId, setUserId] = useState();
  const open = Boolean(anchorEl);

  const dispatch = useDispatch();

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (userId) => {
    setUserId(userId);
  };

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

  const pinLogIn = () => {

          
    if (String(pinCode).length === 4 && pinCode === user.pin) {
      setNotify({
        isOpen: true,
        message: "Верный Пин-Код!",
         type: "success", sound : "success"
      });
      
      setPinOrComment(false)
      setStatus("Подтверждено")
      
      
      
    } else {
      setNotify({
        isOpen: true,
        message: "Неправильный Пин-Код",
        type: "error",
      });
      
    }
  };


  const pinLogIn2 = () => {

          
    if (String(pinCode).length === 4 && pinCode === user.pin) {
      setNotify({
        isOpen: true,
        message: "Верный Пин-Код!",
         type: "success", sound : "success"
      });
      
      setPinOrComment2(false)
      
      
      
      
    } else {
      setNotify({
        isOpen: true,
        message: "Неправильный Пин-Код",
        type: "error",
      });
      
    }
  };

  return (
    <Layout>
      <div className={styles.wrapper}>
        <>
          {!data ? (
            <p>Нет публикаций</p>
          ) : (
            <>
              <div className={styles.publick}>
                <div className={styles.publick__head}>
                  <h3>{data?.title}</h3>

                  <div style={{display: 'flex', gap: '10px'}}>
                    {data?.status === "В ожидании" ? (
                      <div
                      style={{
                        padding: "2px 10px",
                        backgroundColor: "orange",
                        color: "white",
                        borderRadius: "6px",
                      }}
                      >
                        <p>{data?.status}</p>
                      </div>
                    ) : null}
                    {data?.status === "Подтверждено" ? (
                      <div style={{display: 'flex', gap: '10px'}}>

                    <p>Баллов: {data?.score}</p>
                      <div
                        style={{
                          padding: "2px 10px",
                          backgroundColor: "green",
                          color: "white",
                          borderRadius: "6px",
                        }}
                      >
                        <p>{data?.status}</p>
                      </div>
                      </div>
                    ) : null}
                    {data?.status === "Отказано" ? (
                      <div
                        style={{
                          backgroundColor: "red",
                          color: "white",
                          borderRadius: "6px",
                          padding: "2px 10px",
                        }}
                      >
                        <p>{data?.status}</p>
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className={styles.publick__body}>
                  <div className={styles.publick__body__head}>
                    <div>
                      <p
                        style={{
                          display: "inline-block",
                          whiteSpace: "initial",
                          wordBreak: "break-all",
                          width: "100%",
                        }}
                      >
                        {data?.description}
                      </p>
                      {data?.status === "Отказано" ? (
                        <p>Причина отказа: {data?.rejection_reason}</p>
                      ) : null}

                      <p> Дата издания: {data?.created}</p>
                      <>
                          <p>Подтверждающий : {data?.signer_name}</p>
                        </>
                        <p>Дата создания {data?.published}</p>
                    <p>От лица : {data?.position}</p>
                    <p>Создал : {data?.creator_name}</p>

                    </div>
                    {data?.link ||
                    data?.doi ||
                    data?.issn ||
                    data?.eid ||
                    data?.country ||
                    data?.file ? (
                      <img
                        src={openSection[data?.id] ? down : right}
                        className={styles.size}
                        alt=""
                        onClick={() =>
                          setOpenSection((prevState) => ({
                            ...prevState,
                            [data?.id]: !prevState[data?.id],
                          }))
                        }
                      />
                    ) : null}
                  </div>
                  {openSection[data?.id] ? (
                    <div className={styles.card_body_more}>
                      {data?.link ? (
                        <div>
                          {" "}
                          <a href={`${data?.link}`}> {data?.link} </a>{" "}
                        </div>
                      ) : (
                        ""
                      )}
                      {data?.doi ? <p>DOI : {data?.doi}</p> : ""}
                      {data?.issn ? <p>ISSN : {data?.issn}</p> : ""}
                      {data?.eid ? <p>EID : {data?.eid}</p> : ""}
                      {data?.country ? <p>Страна : {data?.country}</p> : ""}

                      {data?.files?.length !== 0 ? (
                        <div
                          style={{ display: "flex", gap: "10px" }}
                          className={styles.publick_files}
                        >
                          <p>Файлы:</p>
                          {data?.files?.map((item) => {
                            // Extract the filename from the URL
                            const filename = decodeURIComponent(
                              item?.file
                            ).substring(item?.file.lastIndexOf("/") + 1);

                            return (
                              <div>
                                <a
                                  href={item?.file}
                                  download
                                  target="_blank"
                                  key={item?.id}
                                >
                                  {filename.split("").slice(0, 10).join("")}
                                </a>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  ) : null}
                </div>

              {change ? (
                  <ChangeAlerts
                    data={data}
                    setClose={setChange}
                    setRender={setRender}
                  />
                ) : null}

                <div className={styles.publick__foot}>
                  Источники :{""}
                  <div className={styles.card_footer_members}>
                    {data?.kpi_authors.map((data) => {
                      return (
                        <>
                          <PopupState
                            variant="popover"
                            popupId="demo-popup-popover"
                          >
                            {(popupState) => (
                              <>
                                <div
                                  className={styles.data_div}
                                  onMouseEnter={() => handleClick(data.user_id)}
                                >
                                  <div
                                    style={{ display: "flex", gap: "15px" }}
                                    aria-owns={
                                      open ? "mouse-over-popover" : undefined
                                    }
                                    aria-haspopup="true"
                                    onMouseEnter={handlePopoverOpen}
                                    onMouseLeave={handlePopoverClose}
                                  >
                                    <img
                                      src={data?.photo}
                                      className={styles.size2}
                                      alt=""
                                    />{" "}
                                    <p
                                      className={{
                                        display: "flex",
                                        columnGap: "20px",
                                      }}
                                    >
                                      {data?.employee_name}
                                    </p>
                                  </div>
                                </div>

                                <Popover
                                  id="mouse-over-popover"
                                  sx={{
                                    pointerEvents: "none",
                                  }}
                                  open={open}
                                  anchorEl={anchorEl}
                                  anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "center",
                                  }}
                                  transformOrigin={{
                                    vertical: "top",
                                    horizontal: "center",
                                  }}
                                  onClose={handlePopoverClose}
                                >
                                  <ProfilePage userId={userId} />
                                </Popover>
                              </>
                            )}
                          </PopupState>
                        </>
                      );
                    })}

                    {data.status === "Отказано" && !change ? (
                      <div style={{display: 'flex', gap: '10px'}}>
                      <button
                        className={styles.publick__btn}
                        onClick={() => setChange(true)}
                      >
                        Изменить
                      </button>

                      <button
              onClick={() => navigate(-1)}
              className={styles.btn1}
              style={{ marginLeft: "0" }}
            >
              Назад
            </button>
                      </div>
                    ) : null}
                     
                  </div>
                </div>
              </div>



              {pinOrComment2? ( <ModalWindow
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
            <Button onClick={pinLogIn2} className={styles.btn_pin}>
              Подтвердить
            </Button>
          </>
        </ModalWindow>) : (<ModalWindow
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
                        onChange={(e) => SetRejected_reason(e.target.value)}
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
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <Button
                  onClick={() => setState2({ isPaneOpen2: false })}
                  className={styles.btn_pin_close}
                >
                  Закрыть
                </Button>

                {state2.isDecline ? (
                  <Button
                    onClick={(e) => setStatus("Отказано")}
                    className={styles.btn_pin}
                  >
                    Отказать
                  </Button>
                ) : (
                  ""
                )}

                </div>
              </ModalWindow>) }

              
            </>
          )}
        </>
        {data?.status == "Отказано" ? (
          <div className={styles.btn_submit}>
            {/* <button className={styles.btn1} onClick={() => setStatus('Повтор')}>Повтор</button> */}
          </div>
        ) : (
          <div className={styles.btn_submit}>
            <button
              onClick={() => navigate(-1)}
              className={styles.btn1}
              style={{ marginLeft: "0" }}
            >
              Назад
            </button>
            {data?.status == "В ожидании" &&
            data?.signer === user.employeeId ? (
              <div>
                <button className={styles.btn1} onClick={handleClickDecline}>
                  Отказать
                </button>
                <button
                  className={styles.btn1}
                  onClick={() => setOpenModal(true)}
                >
                  Подтвердить
                </button>
              </div>
            ) : null}
          </div>
        )}
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
            <Button onClick={() => { pinLogIn();}} className={styles.btn_pin}>

             Подтвердить
            </Button>
          </>
        </ModalWindow>
      </div>
      <Notification notify={notify} setNotify={setNotify} />
    </Layout>
  );
};

export default AlertsKpiPage;
