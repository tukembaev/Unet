import React, { useState, useRef, useEffect } from "react";
import { getChancellery, getRaportData } from "../../../service/StatementsService";
import { setChancellerys, setStatementById } from "../../../store/slices/StatementsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import userInfo from "../../../utils/userInfo";
import { Button, Layout } from "../../../components";
import { useReactToPrint } from "react-to-print";
import back from "./../../../assets/icons/back.svg";
import print from "./../../../assets/icons/print.png"
import DocumentImgSigns from "../../../components/Signs/DocumentImgSigns";
import DocumentHistory from "../../../components/DocumentHistory/DocumentHistory";
import Notification from "../../../utils/Notifications";
import { useLocation } from 'react-router-dom';
import styles from './../../StatementPage/components/StatementTable/StatementInfo/components/SimpleRaports/SimpleRaports.module.scss'
import PdfPreview from "../../../hooks/PdfPreview/PdfPreview";
import SlidingPaneUtil from "../../../utils/SlidingPaneUtil";
import TaskForm from "../../../components/Forms/TaskForm/TaskForm";
import FileBlock from "../../../utils/FileBlock";


const ChancelleryInfo = () => {
   const [data, setData] = useState();
   const [render,setRender] = useState(false)
   const [otkaz, setOtkaz] = useState("");
  let text = useState();

  const location = useLocation();
  const typeDoc = location.state?.typeDoc;

 

  const [isShown, setIsShown] = useState(false);

  const [state, setState] = useState({
    isPaneOpen: false,
    isPaneOpenLeft: false,
    isTask: false,
  });

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
    
  
  const getData = async () => {
    try {

        let response = await getRaportData(id ,data);
        dispatch(
          setStatementById({
            statementId: response.data,
          })
        );
      
   
     
    } catch (error) {
      
    }
    
  };

  useEffect(() => {
    getData();
    setRender(false);
  }, [render]);

  const [width, setWidth] = useState(window.innerWidth);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = userInfo();
  const { id } = useParams();
  const componentRef = useRef();


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
  const info = useSelector((state) =>  state.statement.statementId);


  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `Рапорт (${info.number})`,
  });

  return (
    <Layout> 

    <div className={styles.simple_raports_wrapper}>
      <div className={styles.simple_raports_info_wrapper}>
      {width > 600 ? (
              <SlidingPaneUtil
                size="900px"
                title={
                  state.isTask
                    ? `Новая задача на основе ${info.number}`
                    : "Передать на согласование"
                }
                state={state}
                setState={setState}
              >
                {" "}
                {state.isTask === true ? (
                  <TaskForm
                    idstatement={info.id}
                    typestatement={info.type}
                    setRender={setRender}
                    setState={setState}
                  />
                ) : (
                  ''
                )}
              </SlidingPaneUtil>
            ) : (
              <SlidingPaneUtil
                size="100%"
                title={
                  state.isTask
                    ? `Новая задача на основе ${info.number}`
                    : "Передать на согласование"
                }
                state={state}
                setState={setState}
              >
                {" "}
                <TaskForm
                  idstatement={info.id}
                  typestatement={info.type}
                  setRender={setRender}
                  setState={setState}
                />{" "}
              </SlidingPaneUtil>
            )}

        <div className={styles.simple_raports_info_header}>
        {width > 1100 ?  <> <Button className={styles.btn_back} onClick={() => navigate(-1)}>
            Назад
          </Button>
          <Button className={styles.btn_back} onClick={handlePrint}>
            {" "}
            Распечатать PDF
          </Button> </>: 
           <>
           <img src={back} className={styles.size} alt="s" />
           <img src={print} className={styles.size} />
           
           </>
          }
         
        </div>
        <div ref={componentRef}>
          <div className={styles.simple_raports_info_heading}>
            <div className={styles.left}>
              <p>Номер оборота документа: {info.number} </p>
              <p>Статус: {info.status}</p>
              <p>Тема: {info.type}</p>
            </div>
            <div className={styles.right}>
              <p>{info.prorector}</p>
              <p>от</p>
              <p>
                {info?.employee?.surname}{" "}
                {info?.employee?.first_name}
              </p>
            </div>
          </div>
          <div className={styles.simple_raports_info_body}>
            <h1>{info.type_doc}</h1>
            <div className={styles.simple_raports_info_discrip}>
              <p>{info.text}</p>
              <div className={styles.simple_rapoirts_user_sign}>
                <p>
                  {info?.employee?.surname}{" "}
                  {info?.employee?.first_name}{" "}
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

              {info.file === null ? (
                ""
              ) : (
                <div>
                  <a href={info.file} download="myDoc.pdf">
                    {" "}
                    <FileBlock file_url={info?.file}/>
                  </a>
                </div>
              )}
            </div>
            {/* {info.status === "Отказано" && info.prich_pr_otkaz != null ? (
              <div className={styles.simple_raports_info_heading}>
                <h2>Причина отказа: {info.prich_pr_otkaz} </h2>
              </div>
            ) : info.status === "Ознакомлен" && info.prich_pr_otkaz != null ? (
              <div className={styles.simple_raports_info_heading}>
                <h2>Комментарий ознакомления: {info.prich_pr_otkaz} </h2>
              </div>
            ) : info.status === "В канцелярии" && info.prich_pr_otkaz != null ? (
              <div className={styles.simple_raports_info_heading}>
                <h2>Комментарий для концелярии: {info.prich_pr_otkaz} </h2>
              </div>
            ) : (
              ""
            )} */}
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
      Подпись {info.prorector_name}: <br /> {info.prorector_date_check} <br />  Резолюция: {info.prich_pr_otkaz} <br/>{" "}
    </p>
  )}
  <div>
    <img src={info.prorectorsign} alt="" />
  </div>
</div>
)}

              {info?.applicationmember?.map((item) => {
                    return (
                     <DocumentImgSigns
                     signer_name = {item.name}
                     signer_sign = {item.sign}
                     signer_sign_time = {item.date_check_member}
                     />
                    );
                  })}
                       {info?.statementmember?.map((item) => {
                    return (
                     <DocumentImgSigns
                     signer_name = {item.name}
                     signer_sign = {item.sign}
                     signer_sign_time = {item.date_check_member}
                     />
                    );
                  })}
            </div>
          </div>
        </div>
        <div>
                     <div className={styles.btns_rightside_chanc}>
                      {info.has_tasks === true ? '' :  <Button
                        className={styles.btn2}
                        onClick={() =>
                          setState({ isPaneOpen: true, isTask: true })
                        }
                      >
                        Формировать задачу на основе рапорта
                      </Button> }
            
                      </div>
                      </div>
      </div>

      <DocumentHistory info={info} typeDoc = 'Заявление' />
  


      <Notification notify={notify} setNotify={setNotify} />
    </div>

    {width > 1300  && info.file !== null ?  <div className={styles.simple_raports_wrapper}>
      <div className={styles.simple_raports_info_wrapper}>
      {info?.file?.includes('.pdf') ? <PdfPreview file={info.file} /> : ''}
      </div>
      </div> : ''}

  </Layout>
  )
}

export default ChancelleryInfo