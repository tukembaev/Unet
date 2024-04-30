// import React, {useRef ,useState , useEffect} from "react";
// import styles from "./../RequirmentInfo.module.scss";
// import cx from "classnames";
// import { useDispatch } from "react-redux";
// import {useNavigate} from "react-router-dom";
// import Button from "./../../../../../../../../components/Button/Button";
// import SlidingPane from "react-sliding-pane"; 
// import {useReactToPrint} from 'react-to-print'
// import LimitedRequirmentForm from "../../../../../../../../components/Forms/StatementForm/components/RequirmentForm/EditableRequirtmentForm/LimitedRequirmentForm/LimitedRequirmentForm";
// import { SignRaport, SingSendReqToZav } from "../../../../../../../../service/StatementsService";
// import { setSignSendReqToZavhoz, setSignStatement } from "../../../../../../../../store/slices/StatementsSlice";
// import { useParams } from "react-router-dom";
// import QRCode from "react-qr-code";
// import RequirmentTable from "../RequirmentTable/RequirmentTable";
// import userInfo from "../../../../../../../../utils/userInfo";
// import Notification from "../../../../../../../../utils/Notifications";


// import complete from "./../../../../../../../../assets/icons/complete.svg";
// import back from "./../../../../../../../../assets/icons/back.svg";

// const LimitedReqInfo = ({ info , employeeinfo , setRender }) => {
//  const reqinfo = info.purchaselist[0];
//  const plp = reqinfo.purchaselistproducts;
//  const [changeList, setChangeList] = useState();
//  const dispatch = useDispatch();
//  const { id } = useParams();
//  const user = userInfo();
//  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
//  const navigate = useNavigate();
//    const componentRef = useRef();
//   const handlePrint = useReactToPrint({
//     content:() => componentRef.current,
//     documentTitle: `Требования, (${info.number})`,
//   })
//  ;

//  let text;
//  const [otkaz, setOtkaz] = useState(null);
//  const DeclineStatement = async ( info , text ) => {

//   if(otkaz === null) {
//     setNotify({
//       isOpen: true,
//       message: 'Укажите причину отказа',
//       type: 'warning'
      
//   })
//   } else {
//   let newStatement = { type:info.type, status: text, prich_pr_otkaz: otkaz };

//   let response = await SignRaport(id, newStatement);
  
//   dispatch(setSignStatement(response.data));
//   setNotify({
//     isOpen: true,
//     message: 'Требование успешно отказано!',
//     type: 'success'
    
// })


// setTimeout(() => {
//   window.location.reload();
// }, 1000)

// };
// }

//  const [state, setState] = useState({
//   isPaneOpen: false,
//   isPaneOpenLeft: false,
// });

//  const [width, setWidth] = useState(window.innerWidth);
//  useEffect(() => {
//    function handleResize() {
//      setWidth(window.innerWidth);
//    }
//    window.addEventListener("resize", handleResize);
//    return () => window.removeEventListener("resize", handleResize);
//  }, [width]);
//  useEffect(() => {
//    width < 600 && handleSideNavToggle();
//  });
//  function handleSideNavToggle() {
//    console.log("toggle it");
//  }


//  const handleClick = () => {
//    setState({ isPaneOpen: true })

 
//  };


//   const handleSubmit = async ({info}) => {
//     let newStatement = { type:info.type, status:"В процессе выполнения",purchaselist: [{purchaselistproducts:changeList}]}

//     setNotify({
//       isOpen: true,
//       message: 'Требование успешно отправлено!',
//       type: 'success'
//   })
//     setTimeout(() => {
//       navigate(`/statements/${user.userId}`)
//     }, 1000)

//     let response = await SingSendReqToZav(id, newStatement)

//     dispatch(setSignSendReqToZavhoz(response.data))


//   }


//   return (
//     <div className={styles.requirment_info_wrapper}>
//       <div ref={componentRef} className={styles.pdf} >
//       <div className={styles.requirment__title}>Список на приобретeние</div>
//       <h3>Статус:{info.status}</h3>
//       <div>
//         <div className={styles.m_20}>
//           <div className={cx(styles.wrapper_between)}>
//             <div>{reqinfo.company_organization}</div>
//             <div>Типовая межуведомственная форма М-11</div>
//           </div>
//           <div className={styles.wrapper_between}>
//             <div>Предприятие организации</div>
//             <div>
//               Код по ОКУД{" "}
//               <input readOnly value="0303008" className={styles.okd} />
//             </div>
//           </div>
//         </div>
//         <div className={styles.wrapper_center}>
//           <div className={styles.title__requir}>
//             Требования № {reqinfo.uniq_codes}
//           </div>
//         </div>
//         <div className={styles.wrapper_center}>
//           <div>{reqinfo.data_today}</div>
//         </div>
//         <div className={styles.m_20}>
//           <div className={styles.wrapper_end}>
//             <table className={styles.sup__table}>
//               <thead>
//                 <tr>
//                   <th>Вид операции</th>
//                   <th>Склад</th>
//                   <th>Цех-отдел, обьект-получатель</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td>{reqinfo.views_operations}</td>
//                   <td>{reqinfo.warehouse}</td>
//                   <td>{reqinfo.department}</td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </div>
//         <div className={styles.wrapper_center}>
//           <div>
//             Через кого: {" "} 
//             <span>
//               {employeeinfo.surname} {employeeinfo.first_name} {employeeinfo.last_name}
//             </span>
//           </div>
//         </div>
//         <div className={cx(styles.wrapper_between, styles.m_20)}>
//         <div>Затребовал: {reqinfo.requestedmen}</div>
//           {info.prorectorcheck != null ? <div>Разрешил: Асиев А.Т.</div> : <div>Разрешил: </div>}
//         </div>
       
//       </div>
//       {info.prorectorcheck === null ?  <LimitedRequirmentForm plp = {plp} setChangeList = {setChangeList} /> : <RequirmentTable plp = {plp}/>}
//       {info.status === 'Отказано' && info.prich_pr_otkaz != null ? <div className={styles.simple_raports_info_heading}>
//         <h2>Причина отказа: {info.prich_pr_otkaz} </h2>
//         </div> : "" }
//           <div className={styles.all_checks}>
//         {info.prorectorcheck === null ? '' :<div className={styles.prorector_check}>
//         {info.prorectorcheck.includes('Отказано') ? <p className={styles.text_sign}>Подпись проректора: <br />Отказано </p>: <p>Подпись проректора: <br /> <br /> </p> }
//          <div style={{ height: "auto", maxWidth: 64, margin: "0 auto", width: "100%" }}>
//             <QRCode
//               size={256}
//               style={{ height: "auto", maxWidth: "100%", width: "100%" }}
//               value={info.prorectorcheck}
//               viewBox={`0 0 256 256`}
//             />
//           </div>
//         </div> }
      
//         {info.ispolnpodcheck === null ? '' :<div className={styles.ispol_check}>
//         {info.ispolnpodcheck.includes('Отказано') ? <p className={styles.text_sign}>Подпись заявителя: <br />Отказано </p>: <p>Подпись заявителя: <br /> <br /> </p> }
//         <div style={{ height: "auto", maxWidth: 64, margin: "0 auto", width: "100%" }}>
//             <QRCode
//               size={256}
//               style={{ height: "auto", maxWidth: "100%", width: "100%" }}
//               value={info.ispolnpodcheck}
//               viewBox={`0 0 256 256`}
//             />
//           </div>
          
//         </div> }
//         {info.rukovpodcheck === null ? '' : <div className={styles.prorector_check}>
//         {info.rukovpodcheck.includes('Отказано') ? <p className={styles.text_sign}>Подпись заведующего склада: <br />Отказано </p>: <p>Подпись заведующего склада: <br /> <br /> </p> }
//        <div style={{ height: "auto", maxWidth: 64, margin: "0 auto", width: "100%" }}>
//             <QRCode
//               size={256}
//               style={{ height: "auto", maxWidth: "100%", width: "100%" }}
//               value={info.rukovpodcheck}
//               viewBox={`0 0 256 256`}
//             />
//           </div> 
//         </div>}
//         </div>
//         </div>
//         {width > 1000 ? (
//       <SlidingPane
//         className={styles.some_custom_class1}
//         overlayClassName={styles.some_custom_overlay_class1}
//         isOpen={state.isPaneOpen}
//         title="Причина отказа"
//         width="400px"
//         from="bottom"
//         hideHeader = {true}
//         onRequestClose={() => {
//           setState({ isPaneOpen: false });
//         }}
//       >   
//         <div className={styles.decline_form}>
//         <div className={styles.item_flex}>
//                     <div className={styles.input_type3}>

// <textarea
//   onChange={(e) => setOtkaz(e.target.value)}
//   className={styles.discription_input}
//   placeholder="Причина отказа"
//   required
// />
// </div>
  
//                      <img
//                         src={back}
//                         className={styles.size}
//                         onClick={() => setState({ isPaneOpen: false })}
                       
//                       >
                        
//                       </img>
                  
//                         <img
//                         src={complete}
//                         className={styles.size}
//                         onClick={(e) =>
//                           DeclineStatement(
                           
//                             info,
//                             (text = "Отказано")
//                           )
//                         }
                       
//                       ></img>
//                     </div>
//                     </div>
//       </SlidingPane>
//       ) : (  <SlidingPane
//         className={styles.some_custom_class1}
//         overlayClassName={styles.some_custom_overlay_class1}
//         isOpen={state.isPaneOpen}
//         title="Причина отказа"
//         width="100%"
//         from="bottom"
//         hideHeader = {true}
//         onRequestClose={() => {
//           setState({ isPaneOpen: false });
//         }}
//       >
//            <div className={styles.decline_form}>
//         <div className={styles.item_flex}>
//        <div className={styles.item_flex}>
//                     <div className={styles.input_type3}>

// <textarea
//   onChange={(e) => setOtkaz(e.target.value)}
//   className={styles.discription_input}
//   placeholder="Причина отказа"
//   required
// />
// </div>
  
//                      <img
//                         src={back}
//                         className={styles.size}
//                         onClick={() => setState({ isPaneOpen: false })}
                       
//                       >
                        
//                       </img>
                  
//                         <img
//                         src={complete}
//                         className={styles.size}
//                         onClick={(e) =>
//                           DeclineStatement(
//                             info,
//                             (text = "Отказано")
//                           )
//                         }
                       
//                       ></img>
//                     </div></div></div>
//       </SlidingPane>     )}
//         <div className={styles.statement_footer}>
          
//         <Button className={styles.btn1} onClick={() => navigate(-1)}>
//           Вернуться
//         </Button>
//         {info.prorectorcheck === null ? <div className={styles.btn_left_padding}> <Button className={styles.btn1} onClick={handleClick}> Отказать</Button> <Button className={styles.btn2} onClick={() => {
//                                     handleSubmit({info})
//                 }}>Отправить требование заведущему склада</Button>   </div>: ''}
        
//         {info.prorectorcheck === null ? ''  : <Button className={styles.btn2} onClick={handlePrint}> Распечатать PDF</Button>}
       
    
//       </div>
//       <Notification
//                 notify={notify}
//                 setNotify={setNotify}
//             />
//     </div>
//   );
// };

// export default LimitedReqInfo;
