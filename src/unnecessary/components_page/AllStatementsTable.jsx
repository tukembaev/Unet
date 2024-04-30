// import React, { useEffect, useState } from "react";
// import styles from "./StatementTable.module.scss";
// import { useDispatch, useSelector } from "react-redux";
// import { getAllRaports } from "../../../../service/StatementsService";
// import { setAllRaports } from "../../../../store/slices/StatementsSlice";
// import {useNavigate} from "react-router-dom";
// import { useParams } from 'react-router-dom';
// import {Layout } from "../../../../components";
// import userInfo from "../../../../utils/userInfo";
// function AllStatementsTable({render , filterChoose}) {
//   const [data, setData] = useState([]);

//   const dispatch = useDispatch();
//   const user = userInfo();
//   const navigate = useNavigate();
  
//   let filteredData;

//   const unique = (value, index, self) => {
//     return self.indexOf(value) === index
//   }
  
//   let acts;
  
//   const getData = async () => {
//     try {
//       let response = await getAllRaports(data);
   
//       dispatch(
//         setAllRaports({
//           allraports: response.data
//         })
//       );
      
//     } catch (error) {
//       
//     }
    
//   };
//   useEffect(() => {
//     getData()
//   }, [render]);
  
//   const allStatements = useSelector((state) => state.statement);

//   if(allStatements.allraports.Raports === undefined){
// filteredData = [];
//   }
//   else if(filterChoose === 0){
//     filteredData = allStatements.allraports.Raports.filter(item => item.status === "В режиме ожидания");
//   }

// else if (filterChoose === 1){

//   acts = allStatements.allraports.Raports.filter(item => item.status != "В режиме ожидания" && item.status != "Завершена" && item.status !== "Отказано");
//   filteredData = [...acts , ...allStatements.statements.filter(item => item.status === "В процессе выполнения") , ...allStatements.statements.filter(item => item.status === "В процессе составления акта") , ...allStatements.statements.filter(item => item.status === "В процессе подтверждения") ]

// }else if (filterChoose === 2){
//   filteredData = allStatements.allraports.Raports.filter((item) => {
//     if(item.status === "Завершена" || item.status === "Отказано") return item
//   });
// }
// else if (filterChoose === 3){
//   filteredData = allStatements.allraports.Raports.filter(item => item.employee.id === 2);
// }
// else if (filterChoose === 4){
//   filteredData = [...allStatements.allraports.Raports]
// }


//   return (
 
//           <table className={styles.table__wrapper}>
//       <thead>
//       <tr className={styles.table__row}>
//           <th className={styles.table__item}>
//             <span className={styles.table__title}>Номер рапорта</span>
//           </th>
//           <th className={styles.table__item}>
//             <span className={styles.table__title}>Заявитель</span>
//           </th>
//           <th className={styles.table__item}>
//             <span className={styles.table__title}>Тип рапорта</span>
//           </th>
//           <th className={styles.table__item}>
//             <span className={styles.table__title}>Статус рапорта</span>
//           </th>
//           <th className={styles.table__item}>
//             <span className={styles.table__title}>Дата подачи рапорта</span>
//           </th>
//         </tr>
//       </thead>
//       <tbody className={styles.table__body}>
//       {filteredData === undefined ? [] : filteredData.filter(unique).reverse().map((item,index) => {
//           return (   
//             <tr key={index} className={styles.table__row} onClick={()=>navigate(`/statement/${item.id}/`)}>
//               <td className={styles.table__item}>
//                 <span className={styles.table__title}>{item.number}</span>
//               </td>
//               <td className={styles.table__item}>
//                 <span className={styles.table__title}>{item.employee.first_name} {item.employee.surname}</span>
//               </td>
//               <td className={styles.table__item}>
//                 <span className={styles.table__title}>{item.type}</span>
//               </td>
//               <td className={styles.table__item}>
//                 <span className={styles.table__title}>{item.status}</span>
//               </td>
//               <td className={styles.table__item}>
//                 <span className={styles.table__title}>{item.date_zayavki}</span>
//               </td>
//             </tr>
            
//           );
//         })}
//       </tbody>
//     </table>
      
//   );
// }

// export default AllStatementsTable;