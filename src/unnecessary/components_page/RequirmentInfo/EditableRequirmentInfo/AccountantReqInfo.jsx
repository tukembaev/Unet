// import React, {useState , useRef} from "react";
// import { useDispatch } from "react-redux";
// import styles from "./../RequirmentInfo.module.scss";
// import cx from "classnames";
// import {useNavigate} from "react-router-dom";
// import Button from "./../../../../../../../../components/Button/Button";
// import "react-sliding-pane/dist/react-sliding-pane.css";
// import QRCode from "react-qr-code";
// import {useReactToPrint} from 'react-to-print'
// import AccountantForm from "../../../../../../../../components/Forms/StatementForm/components/RequirmentForm/EditableRequirtmentForm/AccountantForm/AccountantForm";
// import { useParams } from "react-router-dom";
// import { SingSendReqToZav } from "../../../../../../../../service/StatementsService";
// import { setSignSendReqToZavhoz } from "../../../../../../../../store/slices/StatementsSlice";
// import RequirmentTable from "../RequirmentTable/RequirmentTable";
// import Notification from "../../../../../../../../utils/Notifications";
// import userInfo from "../../../../../../../../utils/userInfo";

// const AccountantReqInfo = ({ info , employeeinfo , setRender}) => {

//  const reqinfo = info.purchaselist[0];
//  const plp = reqinfo.purchaselistproducts;
//  const navigate = useNavigate();
//  const [changeList, setChangeList] = useState();
//  const dispatch = useDispatch();
//  const { id } = useParams();
//  const user = userInfo();
//  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
//    const componentRef = useRef();
//   const handlePrint = useReactToPrint({
//     content:() => componentRef.current,
//     documentTitle: `Требования, (${info.number})`,
//   })

//     const handleSubmit = async ({info}) => {
//     let newStatement = {type:info.type, status:"В процессе выполнения",purchaselist: [{purchaselistproducts:changeList}]}
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
//           <div>{reqinfo.date_today}</div>
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
//           <div>Затребовал: {reqinfo.requestedmen}</div>
//           {info.prorectorcheck != null ? <div>Разрешил: Асиев А.Т.</div> : <div>Разрешил: </div>}
//         </div>
//       </div>
//       {info.status === 'Отказано' && info.prich_pr_otkaz != null ? <div className={styles.simple_raports_info_heading}>
//         <h2>Причина отказа: {info.prich_pr_otkaz} </h2>
//         </div> : "" }
//       { info.prorectorcheck === null
//             ? <RequirmentTable plp = {plp}/>
//             : info.rukovpodcheck === null
//             ? <AccountantForm plp = {plp} setChangeList = {setChangeList} />
//             : info.rukovpodcheck != null && info.prorectorcheck != null
//             ? <RequirmentTable plp = {plp}/>
//             : ''}
//         <div className={styles.all_checks}>
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
//          <div style={{ height: "auto", maxWidth: 64, margin: "0 auto", width: "100%" }}>
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
//         <div className={styles.statement_footer}>
          
     
//         {/* <SlidingPane
//           className={styles.some_custom_class2}
//           overlayClassName={styles.some_custom_overlay_class2}
//           isOpen={state.isPaneOpen}
//           title="Новый рапорт"
//           onRequestClose={() => {
//             setState({ isPaneOpen: false });
//           }}
//         >
//           <TaskForm idstatement={info.id} typestatement={info.type} />
//         </SlidingPane> */}
//         <div>
//         <Button className={styles.btn1} onClick={() => navigate(-1)}>
//             Назад
//           </Button>  {"  "}
//                     { info.prorectorcheck === null
//             ? <Button className={styles.btn2} onClick={handlePrint}> Распечатать PDF</Button>
//             : info.rukovpodcheck === null && user.userId === 505 && info.status !== 'Отказано'
//             ?   <><Button className={styles.btn2} onClick={() => {
                  
//                   handleSubmit({info})
//                 }}>Отпустить</Button></>   
//             : info.rukovpodcheck != null && info.prorectorcheck != null
//             ? <Button className={styles.btn2} onClick={handlePrint}> Распечатать PDF</Button>
//             : ''}
        
//         </div>
    
//       </div>
//       <Notification
//                 notify={notify}
//                 setNotify={setNotify}
//             />
//     </div>
//   );
// };

// export default AccountantReqInfo;
