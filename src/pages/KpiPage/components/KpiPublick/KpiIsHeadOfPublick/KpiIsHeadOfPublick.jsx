import React from "react";
import styles from "../KpiPublick.module.scss";
import PopupState from "material-ui-popup-state";
import { Popover } from "@mui/material";
import ProfilePage from "../../../../ProfilePage/ProfilePage";
import right from "../../../../../assets/icons/chevron_right_black.png";
import down from "../../../../../assets/icons/expand_more_black.png";
import { useState } from "react";
import Notification from "../../../../../utils/Notifications";
import ChangePublick from "../../ChangePublick/ChangePublick";
import userInfo from "../../../../../utils/userInfo";
import { deleteKpiInfo } from "../../../../../service/PublicationService";
import KpiEmployeePublick from "../KpiEmployeePublick/KpiEmployeePublick";

export default function KpiIsHeadOfPublick({ data, setRender, isHeadOf }) {
  // states
  const [change, setChange] = useState({
    chsnge: false,
    changeMore: false,
  });
  const [openSection, setOpenSection] = useState({
    section1: false,
    section1more: false,
  });

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [userId, setUserId] = useState();
  const open = Boolean(anchorEl);

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  // functions

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (userId) => {
    setUserId(userId);
  };
  const user = userInfo();

  const handleDelete = async (id) => {
    try {
      let response = await deleteKpiInfo(id);

      setNotify({
        isOpen: true,
        message: "Публикация успешно удалена",
        type: "success",
      });
      setRender(true);
    } catch (error) {
      console.log(error.response);

      setNotify({
        isOpen: true,
        message: "Ошибка",
        type: "error",
      });
    }
  };
  const filteredData = data.filter(
    (item) =>
      item?.creator_name === `${user?.surName} ${user?.firstName}` &&
      item?.position === "Заведуйший кафедры" &&
      isHeadOf
  );
  const employee = data.filter(
    (item) =>
      item?.creator_name === `${user?.surName} ${user?.firstName}` &&
      item?.position === "Сотрудника"
  );
  return (
    <>
      {isHeadOf ? (
 <>
 {filteredData?.map((item) => (
   <div key={item?.id} className={styles.publick}>
     <div className={styles.publick__head}>
       <div
         style={{
           display: "flex",
           flexDirection: "column",
           rowGap: "10px",
         }}
       >
        <h3  className={styles.break_title}>{item?.title}</h3>
       </div>
       <div className={styles.publick__status}>
         {item?.status === "В ожидании" ? (
           <div className={styles.expecting_puclick}>
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
           <div className={styles.rejected_publick}>
             <p>{item?.status}</p>
             <button onClick={() => handleDelete(item.id)}>
               Удалить
             </button>
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
             {item?.status === "В ожидании" ? (
               <>
                 <p>Подтверждающий : {item?.signer_name}</p>
               </>
             ) : null}
           </div>
           <p>Дата создания {item?.created}</p>
           <p>От лица : {item?.position}</p>
           {item?.files !== 0 ? (
             <div className={styles.publick_files}>
               {item?.files?.map((item) => {
                 // Extract the filename from the URL
                 const filename = decodeURIComponent(
                   item?.file
                 ).substring(item?.file?.lastIndexOf("/") + 1);

                 return (
                   <a
                     href={item?.file}
                     download
                     target="_blank"
                     key={item?.id}
                   >
                     {filename?.split("").slice(0, 10).join("")}
                   </a>
                 );
               })}
             </div>
           ) : (
             ""
           )}
           <p>Создал : {item?.creator_name}</p>
           {item?.edited ? (
             <p>Дата изменения: {item?.edited}</p>
           ) : null}
         </div>
         {item?.link ||
         item?.doi ||
         item?.issn ||
         item?.eid ||
         item?.country ? (
           <img
             src={openSection[item?.id] ? down : right}
             className={styles.size}
             alt=""
             onClick={() =>
               setOpenSection((prevState) => ({
                 ...prevState,
                 [item.id]: !prevState[item?.id],
               }))
             }
           />
         ) : null}
       </div>
       {openSection[item?.id] ? (
         <div className={styles.card_body_more}>
           {item?.link ? (
             <div>
               {" "}
               <a href={`${item?.link}`}>
                 {" "}
                 Ссылка: {item?.link}{" "}
               </a>{" "}
             </div>
           ) : (
             ""
           )}
           {item?.doi ? (
             <a href={`https://doi.org/${item?.doi}`}>
               DOI : {item?.doi}
             </a>
           ) : (
             ""
           )}
           {item?.issn ? (
             <a
               href={`https://portal.issn.org/resource/ISSN/${item?.issn}`}
             >
               ISSN : {item?.issn}
             </a>
           ) : (
             ""
           )}
           {item?.isni ? (
             <a href={`https://isni.org/isni/${item?.isni}`}>
               ISNI : {item?.isni}
             </a>
           ) : (
             ""
           )}
           {item?.wikipedia_url ? (
             <a href={`https://${item?.wikipedia_url}`}>
               WikipediaURL: {item?.wikipedia_url}
             </a>
           ) : (
             ""
           )}
           {item?.wikidata ? (
             <a href={`https://wikidata.org/wiki/${item?.wikidata}`}>
               WikiData: {item?.wikidata}
             </a>
           ) : (
             ""
           )}
           {item?.eid ? <p>EID: {item?.eid}</p> : ""}
           {item?.country ? <p>Страна: {item?.country}</p> : ""}
         </div>
       ) : null}
     </div>
     <div className={styles.publick__foot}>
       <div className={styles.publick__source}>
         <p>Источники :{""}</p>
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
                         onMouseEnter={() => handleClick(item?.user_id)}
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
                             {item?.employee_name}
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
         {change[item?.id] ? null : (
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
       </div>
     </div>
     <hr />
     <div className={styles.change__box}>
       {change[item?.id] ? (
         <ChangePublick
           data={item}
           setClose={setChange}
           setRender={setRender}
         />
       ) : null}
     </div>
   </div>
 ))}
</>
      ) : (
        <>
          {employee?.map((item) => (
            <div key={item?.id} className={styles.publick}>
              <div className={styles.publick__head}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    rowGap: "10px",
                  }}
                >
                  <h3  className={styles.break_title}>{item?.title}</h3>
                </div>
                <div className={styles.publick__status}>
                  {item?.status === "В ожидании" ? (
                    <div className={styles.expecting_puclick}>
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
                    <div className={styles.rejected_publick}>
                      <p>{item?.status}</p>
                      <button onClick={() => handleDelete(item?.id)}>
                        Удалить
                      </button>
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
                      {item?.status === "В ожидании" ? (
                        <>
                          <p>Подтверждающий : {item?.signer_name}</p>
                        </>
                      ) : null}
                    </div>
                    <p>Дата создания {item?.created}</p>
                    <p>От лица : {item?.position}</p>
                    {item?.files !== 0 ? (
                      <div className={styles.publick_files}>
                        {item?.files?.map((item) => {
                          // Extract the filename from the URL
                          const filename = decodeURIComponent(
                            item?.file
                          )?.substring(item?.file?.lastIndexOf("/") + 1);

                          return (
                            <a
                              href={item?.file}
                              download
                              target="_blank"
                              key={item?.id}
                            >
                              {filename.split("").slice(0, 10).join("")}
                            </a>
                          );
                        })}
                      </div>
                    ) : (
                      ""
                    )}
                    <p>Создал : {item?.creator_name}</p>
                    {item?.edited ? (
                      <p>Дата изменения: {item?.edited}</p>
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
                          [item?.id]: !prevState[item?.id],
                        }))
                      }
                    />
                  ) : null}
                </div>
                {openSection[item?.id] ? (
                  <div className={styles.card_body_more}>
                    {item?.link ? (
                      <div>
                        {" "}
                        <a href={`${item?.link}`}>
                          {" "}
                          Ссылка: {item?.link}{" "}
                        </a>{" "}
                      </div>
                    ) : (
                      ""
                    )}
                    {item?.doi ? (
                      <a href={`${item?.doi}`}>
                        DOI : {item?.doi}
                      </a>
                    ) : (
                      ""
                    )}
                    {item?.issn ? (
                      <a
                        href={`${item?.issn}`}
                      >
                        ISSN : {item?.issn}
                      </a>
                    ) : (
                      ""
                    )}
                    {item?.isni ? (
                      <a href={`${item?.isni}`}>
                        ISNI : {item?.isni}
                      </a>
                    ) : (
                      ""
                    )}
                    {item?.wikipedia_url ? (
                      <a href={`${item?.wikipedia_url}`}>
                        WikipediaURL: {item?.wikipedia_url}
                      </a>
                    ) : (
                      ""
                    )}
                    {item?.wikidata ? (
                      <a href={`${item?.wikidata}`}>
                        WikiData: {item?.wikidata}
                      </a>
                    ) : (
                      ""
                    )}
                    {item?.eid ? <p>EID: {item?.eid}</p> : ""}
                    {item?.country ? <p>Страна: {item?.country}</p> : ""}
                  </div>
                ) : null}
              </div>
              <div className={styles.publick__foot}>
                <div className={styles.publick__source}>
                  <p>Источники :{""}</p>
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
                                  onMouseEnter={() => handleClick(item?.user_id)}
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
                                      {item?.employee_name}
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
                  {change[item?.id] ? null : (
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
                </div>
              </div>
              <hr />
              <div className={styles.change__box}>
                {change[item?.id] ? (
                  <ChangePublick
                    data={item}
                    setClose={setChange}
                    setRender={setRender}
                  />
                ) : null}
              </div>
            </div>
          ))}
        </>
      )}

      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
}
