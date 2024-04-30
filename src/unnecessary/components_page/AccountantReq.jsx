// import React, { useEffect, useState } from "react";
// import styles from "./StatementTable.module.scss";
// import { useDispatch, useSelector } from "react-redux";
// import { getRequirements } from "../../../../service/StatementsService";
// import { setAllRequirments } from "../../../../store/slices/StatementsSlice";
// import {useNavigate} from "react-router-dom";
// import { useParams } from 'react-router-dom';
// import {Layout } from "../../../../components";
// import SupportMenu from "../../../SupportPage/components/SupportMenu/SupportMenu";
// function AccountantReq() {
//   const [data, setData] = useState([]);
//   const [filterChoose, setFilterChoose] = useState(0);
//   let filteredData;
//   const dispatch = useDispatch();
//   const {id} = useParams();
//   const navigate = useNavigate();
  
//   const getData = async () => {
//     try {
//       let response = await getRequirements(data);
   
//       dispatch(
//         setAllRequirments({
//           requirments: response.data
//         })
//       );
      
//     } catch (error) {
//       
//     }
    
//   };
//   useEffect(() => {
//     getData()
//   }, []);
  
//   const allStatements = useSelector((state) => state.statement);

//   if(filterChoose === 0) {
//     filteredData = allStatements.requirments.Trebovaniya === undefined ? [] : allStatements.requirments.Trebovaniya.filter(
//         (item) => item.status === "В процессе выполнения"
//       );
// }
// else{
//   filteredData =  allStatements.requirments.Trebovaniya.filter((item) => {
//     if (item.status === "Завершена" || item.status === "Отказано")
//       return item;
//   });
// }
//   return ( 
//     <Layout>
//       <div className={styles.titile__wrapper}>
//       <div className={styles.menu__wrapper}>
//           <SupportMenu first = {'В процессе выполнения'} second = {'Завершенные'} setFilterChoose={setFilterChoose} />
//         </div>
//         {filterChoose === 0 ? (
//                   <div className={styles.title}>В процессе выполнения </div>
//           ) : filterChoose === 1 ? (
//             <div className={styles.title}>Завершенные</div>
//           )  : (
//             ""
//           )}
    
//           <table className={styles.table__wrapper}>
//       <thead>
//         <tr className={styles.table__row}>
          
//           <th className={styles.table__item}>
//             <span className={styles.table__title}>Номер требования</span>
//           </th>
//           <th className={styles.table__item}>
//             <span className={styles.table__title}>Номер</span>
//           </th>
//           <th className={styles.table__item}>
//             <span className={styles.table__title}>Статус</span>
//           </th>
//           <th className={styles.table__item}>
//             <span className={styles.table__title}>Вид операции</span>
//           </th>
//           <th className={styles.table__item}>
//             <span className={styles.table__title}>Склад</span>
//           </th>
//           <th className={styles.table__item}>
//             <span className={styles.table__title}>Цех-отдел</span>
//           </th>
//           <th className={styles.table__item}>
//             <span className={styles.table__title}>Организация</span>
//           </th>
//         </tr>
//       </thead>
//       <tbody className={styles.table__body}>
//       {filteredData === undefined ? [] : filteredData.map((item) => {
//           return (   
//             <tr key={item.id} className={styles.table__row} onClick={()=>navigate(`/statement/${item.applications}`)}>
//               <td className={styles.table__item}>
//                 <span className={styles.table__title}>{item.applications}</span>
//               </td>
//               <td className={styles.table__item}>
//                 <span className={styles.table__title}>{item.uniq_codes} </span>
//               </td>
//               <td className={styles.table__item}>
//                 <span className={styles.table__title}>{item.status} </span>
//               </td>
//               <td className={styles.table__item}>
//                 <span className={styles.table__title}>{item.views_operations}</span>
//               </td>
//               <td className={styles.table__item}>
//                 <span className={styles.table__title}>{item.warehouse}</span>
//               </td>
//               <td className={styles.table__item}>
//                 <span className={styles.table__title}>{item.department}</span>
//               </td>
//               <td className={styles.table__item}>
//                 <span className={styles.table__title}>{item.company_organization}</span>
//               </td>
//             </tr>
            
//           );
//         })}
//       </tbody>
//     </table>
//       </div>
    
//     </Layout>
//   );
// }

// export default AccountantReq;