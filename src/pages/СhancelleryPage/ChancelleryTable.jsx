import React, { useEffect, useState } from "react";
import styles from "./ChancelleryTable.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getChancellery } from "../../service/StatementsService";
import { setChancellerys } from "../../store/slices/StatementsSlice";
import { Layout } from "../../components";


const ChancelleryTable = () => {

    const [data, setData] = useState([]);
    const [data2, setData2] = useState([]);
    const [combinedDocs , setCombinedDocs] = useState([]);

    const unique = (value, index, self) => {
      return self.indexOf(value) === index
    }
    const dispatch = useDispatch();

    const navigate = useNavigate();
  
    const getData = async () => {
      try {
        let response = await getChancellery(data);

        dispatch(
            setChancellerys({
                chancellery: response.data,
          }),
    
        );

        setCombinedDocs([...response.data.Raports])
       
      } catch (error) {
        console.log(error.response);
      }
    };

  

    useEffect(() => {
      getData();

    }, []);
  

    let filteredData = combinedDocs?.filter(
          (item) => item.status === "В канцелярии"
    );
      

    return (
      <Layout>
      <h1 className={styles.chanc_table_title}>Рапорта в канцелярии</h1>
      <table className={styles.table__wrapper}>

        <thead>
          <tr className={styles.table__row}>
            <th className={styles.table__item}>
              <span className={styles.table__title}>Номер рапорта</span>
            </th>
            <th className={styles.table__item}>
              <span className={styles.table__title}>Заявитель</span>
            </th>
            
            <th className={styles.table__item}>
              <span className={styles.table__title}>Тип рапорта</span>
            </th>
            <th className={styles.table__item}>
              <span className={styles.table__title}>Статус рапорта</span>
            </th>
            <th className={styles.table__item}>
              <span className={styles.table__title}>Дата подачи рапорта</span>
            </th>
          </tr>
        </thead>
        <tbody className={styles.table__body}>
          { filteredData?.filter(unique).reverse().map((item, index) => {
                return (
                  <tr
                    key={index}
                    className={styles.table__row}
                    onClick={() => {item.number.includes('RAPORT') ? navigate(`/chancellery/${item.id}`, { state: { typeDoc: 'Рапорт' } } ) : navigate(`/chancellery/${item.id}`, { state: { typeDoc: 'Заявление' } } ) } }
                  >
                    <td className={styles.table__item}>
                      <span className={styles.table__title}>{item.number}</span>
                    </td>
                    <td className={styles.table__item}>
                      <span className={styles.table__title}>
                        {item.employee.first_name} {item.employee.surname}
                      </span>
                    </td>
                    <td className={styles.table__item}>
                      <span className={styles.table__title}>{item.type}</span>
                    </td>
                    <td className={styles.table__item}>
                      <span className={styles.table__title}>{item.status}</span>
                    </td>
                    <td className={styles.table__item}>
                      <span className={styles.table__title}>
                        {item.date_zayavki}
                      </span>
                    </td>
                  </tr>
                );
              })}
        </tbody>
      </table>
      </Layout>
    );
  }

export default ChancelleryTable