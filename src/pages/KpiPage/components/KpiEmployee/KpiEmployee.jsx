import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getKpiEmployee } from "../../../../service/PublicationService";
import { useEffect, useState } from "react";
import { setKpiEmloyee } from "../../../../store/slices/PublicationSlice";
import down from "../../../../assets/icons/expand_more_black.png";
import right from "../../../../assets/icons/chevron_right_black.png";
import PopupState from "material-ui-popup-state";
import { Popover } from "@mui/material";
import ProfilePage from "../../../ProfilePage/ProfilePage";
import styles from "./KpiEmployee.module.scss";
import ChangePublick from "../ChangePublick/ChangePublick";
import { useParams, useNavigate } from "react-router-dom";
import { Layout } from "../../../../components";
import userInfo from "../../../../utils/userInfo";

export default function KpiEmployee() {
  // states
  let data;
  const { id } = useParams();
  const navigate = useNavigate();
  const [render, setRender] = useState(false);
  const dispatch = useDispatch();
  const user = userInfo();
  const [openSection, setOpenSection] = useState({
    section1: false,
    section1more: false,
  });
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (userId) => {
    setUserId(userId);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [userId, setUserId] = useState();
  const open = Boolean(anchorEl);

  const [change, setChange] = useState({
    chsnge: false,
    changeMore: false,
  });
  // functions
  const getData = async () => {
    try {
      let response = await getKpiEmployee(id, data);
      dispatch(
        setKpiEmloyee({
          kpiEmloyee: response.data,
        })
      );
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    getData();
    setRender(false);
  }, [render]);

  const kpiEmployee = useSelector((state) => state.publications.kpiEmloyee);

  return (
    <Layout>
      <div className={styles.kpiEmployee}>
        <div className={styles.close_Kpi}>
          <button onClick={() => navigate(-1)}>Закрыть</button>
        </div>
        <div className={styles.kpi__publick}>
          {kpiEmployee.length !== 0 ? (
            kpiEmployee?.map((item) => (
              <div key={item.id} className={styles.publick}>
                <div className={styles.publick__head}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      rowGap: "10px",
                    }}
                  >
                    <h3>{item?.title}</h3>
                  </div>
                  <div className={styles.publick__status}>
                    {item?.status === "В ожидании" ? (
                      <div
                        style={{
                          padding: "2px 10px",
                          backgroundColor: "orange",
                          color: "white",
                          borderRadius: "6px",
                        }}
                      >
                        <p>{item?.status}</p>
                      </div>
                    ) : null}
                    {item?.status === "Подтверждено" ? (
                      <div
                        style={{
                          padding: "2px 10px",
                          backgroundColor: "green",
                          color: "white",
                          borderRadius: "6px",
                        }}
                      >
                        <p>{item?.status}</p>
                      </div>
                    ) : null}
                    {item?.status === "Отказано" ? (
                      <div
                        style={{
                          backgroundColor: "red",
                          color: "white",
                          borderRadius: "6px",
                          padding: "2px 10px",
                        }}
                      >
                        <p>{item?.status}</p>
                      </div>
                    ) : null}
                    {item?.status === "Подтверждено" ? (
                      <p>Баллов : {item?.score}</p>
                    ) : null}
                  </div>
                </div>
                <div className={styles.publick__body}>
                  <div className={styles.publick__body__head}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        rowGap: "5px",
                      }}
                    >
                      <p
                        style={{
                          display: "inline-block",
                          whiteSpace: "initial",
                          wordBreak: "break-all",
                          width: "100%",
                        }}
                      >
                        {item?.description}
                      </p>
                      {item?.status === "Отказано" ? (
                        <p>Причина отказа : {item?.rejection_reason}</p>
                      ) : null}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          rowGap: "5px",
                        }}
                      >
                        {item.status === "В ожидании" ? (
                          <>
                            <p>Подтверждающий : {item?.signer_name}</p>
                          </>
                        ) : null}
                      </div>
                      <p>Дата создания {item?.created}</p>
                      {item?.file ? (
                        <a href={item?.file} download target="_blank">
                          Скачать файл
                        </a>
                      ) : (
                        ""
                      )}
                      <p>Создал : {item?.creator_name}</p>
                      {item?.edited ? (
                        <p>Дата изменения : {item?.edited}</p>
                      ) : null}
                    </div>
                    {item?.link ||
                    item?.doi ||
                    item?.issn ||
                    item?.eid ||
                    item?.country ? (
                      <img
                        src={openSection[item.id] ? down : right}
                        className={styles.size}
                        alt=""
                        onClick={() =>
                          setOpenSection((prevState) => ({
                            ...prevState,
                            [item.id]: !prevState[item.id],
                          }))
                        }
                      />
                    ) : null}
                  </div>
                  {openSection[item.id] ? (
                    <div className={styles.card_body_more}>
                      {item?.link ? (
                        <div>
                          {" "}
                          <a href={`${item?.link}`}> {item?.link} </a>{" "}
                        </div>
                      ) : (
                        ""
                      )}
                      {item?.doi ? <p>DOI : {item?.doi}</p> : ""}
                      {item?.issn ? <p>ISSN : {item?.issn}</p> : ""}
                      {item?.eid ? <p>EID : {item?.eid}</p> : ""}
                      {item?.country ? <p>Страна : {item?.country}</p> : ""}
                    </div>
                  ) : null}
                </div>
                <div className={styles.publick__foot}>
                  <div className={styles.publick__source}>
                    <p>Источники :{""}</p>
                    <div className={styles.card_footer_members}>
                      {item?.kpi_authors?.map((item) => {
                        return (
                          <>
                            <PopupState
                              variant="popover"
                              popupId="demo-popup-popover"
                            >
                              {(popupState) => (
                                <>
                                  <div
                                    className={styles.item_div}
                                    onMouseEnter={() =>
                                      handleClick(item.user_id)
                                    }
                                  >
                                    <div
                                      className={styles.publick__authors}
                                      aria-owns={
                                        open ? "mouse-over-popover" : undefined
                                      }
                                      aria-haspopup="true"
                                      onMouseEnter={handlePopoverOpen}
                                      onMouseLeave={handlePopoverClose}
                                    >
                                      <img
                                        src={item?.photo}
                                        className={styles.size}
                                        alt=""
                                      />{" "}
                                      <p
                                        className={{
                                          display: "flex",
                                          columnGap: "20px",
                                        }}
                                      >
                                        {item.employee_name}
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
                    </div>
                  </div>
                  <div className={styles.foot__btn}>
                    {item?.creator_name.includes(
                      `${user?.surName} ${user?.firstName}`
                    ) ? (
                      <>
                        {change[item.id] ? null : (
                          <>
                            {item?.status !== "В ожидании" ? (
                              <button
                                className={styles.publick__btn}
                                onClick={() =>
                                  setChange((prev) => ({
                                    ...prev,
                                    [item.id]: true,
                                  }))
                                }
                              >
                                Изменить
                              </button>
                            ) : null}
                          </>
                        )}
                      </>
                    ) : null}
                  </div>
                </div>
                <hr />
                <div className={styles.change__box}>
                  {change[item.id] ? (
                    <ChangePublick
                      data={item}
                      setClose={setChange}
                      setRender={setRender}
                    />
                  ) : null}
                </div>
              </div>
            ))
          ) : (
            <>
              <div className={styles.employee}></div>
              <p>Нет публикаций</p>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}
