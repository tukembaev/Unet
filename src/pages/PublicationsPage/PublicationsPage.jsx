import React, { useEffect, useState } from "react";
import styles from "./PublicationsPage.module.scss";
import { Layout } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { getPublications } from "../../service/PublicationService";
import Notification from "../../utils/Notifications";
import { setPublications } from "../../store/slices/PublicationSlice";
import SlidingPaneUtil from "../../utils/SlidingPaneUtil";
import PublicationForm from "../../components/Forms/PublicationForm/PublicationForm";
import userInfo from "../../utils/userInfo";
import right from "./../../assets/icons/chevron_right_black.png";
import down from "./../../assets/icons/expand_more_black.png";
import PopupState from "material-ui-popup-state";
import { Popover } from "@mui/material";
import ProfilePage from "../ProfilePage/ProfilePage";
const PublicationsPage = () => {
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  let id, data;
  const [render, setRender] = useState(false);
  const [openSection, setOpenSection] = useState({
    section1: false,
    section1more: false,
  });
  const [state, setState] = useState({
    isPaneOpen: false,
    isPaneOpenLeft: false,
  });
  const dispatch = useDispatch();
  const user = userInfo();

  const getData = async () => {
    try {
      let response = await getPublications(id, data);
      dispatch(
        setPublications({
          allPublications: response.data,
        })
      );
    } catch (error) {
      
    }
  };
  useEffect(() => {
    getData();
    setRender(false);
  }, [render]);

  const all_publications = useSelector(
    (state) => state.publications.allPublications
  );

  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [width]);
  const [userId, setUserId] = useState();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (userId) => {
    setUserId(userId);
  };
  const open = Boolean(anchorEl);

  return (
    <Layout>
      <div>
        <div style={{ display: "flex", gap: "25px" }}>
          <h1 style={{ color: "white" }}>Публикации</h1>{" "}
          <button
            onClick={() => setState({ isPaneOpen: true })}
            className={styles.btn_pin}
          >
            Создать публикацию
          </button>{" "}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
          <div className={styles.section_body}>
            {all_publications.map((item) => (
              <div key={item.id} className={styles.card}>
                <div className={styles.card_header}>
                  <h3>{item.title}</h3>
                </div>
                <div className={styles.card_body}>
                  <div className={styles.card_body_header}>
                    <div>
                      {item?.description ? (
                        <p
                          style={{
                            display: "inline-block",
                            whiteSpace: "initial",
                            wordBreak: "break-all",
                            width: "100%",
                          }}
                        >
                          {item.description}
                        </p>
                      ) : (
                        ""
                      )}
                      <p>{item.created}</p>
                      {item?.file ? (
                        <a href={item?.file} download target="_blank">
                          Скачать файл
                        </a>
                      ) : (
                        ""
                      )}
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
                          <a href={`${item?.link}`}> Ссылка : {item?.link} </a>{" "}
                        </div>
                      ) : (
                        ""
                      )}
                      {item?.doi ? <a href={`https://doi.org/${item?.doi}`}>DOI : {item?.doi}</a> : ""}
                      {item?.issn ? <a href={`https://portal.issn.org/resource/ISSN/${item?.issn}`}>ISSN : {item?.issn}</a> : ""}
                      {item?.isni ? <a href={`https://isni.org/isni/${item?.isni}`}>ISNI : {item?.isni}</a> : ""}
                      {item?.wikipedia_url ? <a href={`https://${item?.wikipedia_url}`}>WikipediaURL : {item?.wikipedia_url}</a> : ""}
                      {item?.wikidata ? <a href={`https://wikidata.org/wiki/${item?.wikidata}`}>WikiData : {item?.wikidata}</a> : ""}
                      {item?.eid ? <p>EID : {item?.eid}</p> : ""}
                      {item?.country ? <p>Страна : {item?.country}</p> : ""}
                    </div>
                  ) : null}
                </div>
                <div className={styles.card_footer}>
                  Источники :{""}
                  <div className={styles.card_footer_members}>
                    {item?.authors.map((item) => {
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
                                  onMouseEnter={() => handleClick(item.user_id)}
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
                                      src={item?.photo}
                                      className={styles.size2}
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
              </div>
            ))}
          </div>
        </div>
        <>
          {width > 600 ? (
            <SlidingPaneUtil
              size="50%"
              title="Новая публикация"
              state={state}
              setState={setState}
            >
              <PublicationForm setRender={setRender} setState={setState} />{" "}
            </SlidingPaneUtil>
          ) : (
            <SlidingPaneUtil
              size="100%"
              title="Новая публикация"
              state={state}
              setState={setState}
            >
              <PublicationForm setRender={setRender} setState={setState} />{" "}
            </SlidingPaneUtil>
          )}
        </>
      </div>

      <Notification notify={notify} setNotify={setNotify} />
    </Layout>
  );
};

export default PublicationsPage;
