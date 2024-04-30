import React from 'react'
import { getKpiPublick } from '../../../../service/PublicationService';
import { setKpiEmloyee } from '../../../../store/slices/PublicationSlice';
import { useState , useEffect } from 'react';
import { useDispatch , useSelector } from 'react-redux';
import styles from "./KpiAutors.module.scss";
import down from "../../../../assets/icons/expand_more_black.png";
import right from "../../../../assets/icons/chevron_right_black.png";
import ProfilePage from '../../../ProfilePage/ProfilePage';
import PopupState from "material-ui-popup-state";
import { Popover } from "@mui/material";

export default function KpiAutors({publickId}) {
  
    // states
    let data;
    const [render, setRender] = useState(false);
    const dispatch = useDispatch();
    const [openSection, setOpenSection] = useState({
      section1: false,
      section1more: false,
    });
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [userId, setUserId] = useState();
    const open = Boolean(anchorEl);

    // functions
    const getData = async () => {
        try {
          let response = await getKpiPublick(publickId , data);
          dispatch(
            setKpiEmloyee({
                kpiEmloyee: response.data,
            })
          );
        } catch (error) {
          console.log(error);
        }
      };
      
      useEffect(() => {
        getData();
      }, [render]);

      const kpiEmployee = useSelector(
        (state) => state.publications.kpiEmloyee
      )
      const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
      };
      const handlePopoverClose = () => {
        setAnchorEl(null);
      };
      const handleClick = (userId) => {
        setUserId(userId);
      };
      
  return (
    <>
   
        
        <>
        {kpiEmployee.map((item) =>{
            return(
                <div className={styles.publick}>
                  <div className={styles.publick__head}>
                    <h3>{item?.title}</h3>
                    <div>
                      {item?.score? ( <p>Баллы :{item?.score}</p>) : (null)}
                   

                   {item?.status === 'В ожидании'? (<div style={{padding:'4px', backgroundColor: 'orange'}}><p>{item?.status}</p></div>) : (null)}
                   {item?.status === 'Потверждено'? (<div style={{padding:'4px', backgroundColor: 'green'}}><p>{item?.status}</p></div>) : (null)}
                   {item?.status === 'Отказано'? (<div style={{padding:'4px', backgroundColor: 'red'}}><p>{item?.status}</p></div>) : (null)}
                    
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
                        {item?.description}
                      </p>
                      <p>{item?.created}</p>
                    </div>
                    {item?.link ||
                    item?.doi ||
                    item?.issn ||
                    item?.eid ||
                    item?.country ||
                    item?.file ? (
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
                      {item?.file ? (
                        <a href={item?.file} download>
                          Скачать файл{" "}
                        </a>
                      ) : (
                        ""
                      )}
                    </div>
                  ) : null}
                  </div>
                  <div className={styles.publick__foot}>
                  Источники :{""}
                  <div className={styles.card_footer_members}>
                    {item?.kpi_authors.map((item) => {
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
            )
        })}
        </>
      
    
    </>
  )
}
