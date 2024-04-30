import React from "react";
import styles from "./../../../StatementPage/components/StatementTable/StatementReportTable.module.scss";

function OrderReportTable({ data }) {
  return (
    <div style={{ overflow: "auto" }}>
      <table className={styles.table__wrapper}>
        <thead className={styles.table__head}>
          <tr className={styles.table__row}>
            <th className={styles.table__item}>
              <span className={styles.table__title}>Номер</span>
            </th>
            <th className={styles.table__item}>
              <span className={styles.table__title}>Заявитель</span>
            </th>
            <th className={styles.table__item}>
              <span className={styles.table__title}>Адрессат</span>
            </th>

            <th className={styles.table__item}>
              <span className={styles.table__title}>Статус</span>
            </th>
            <th className={styles.table__item}>
              <span className={styles.table__title}>Дата подачи</span>
            </th>
          </tr>
        </thead>

        <tbody className={styles.table__body}>
          {data?.map((item, index) => {
            return (
              <tr key={index} className={styles.table__row}>
                <td className={styles.table__item}>
                  <span className={styles.table__title}>{item.number}</span>
                </td>
                <td className={styles.table__item}>
                  <span className={styles.table__title}>{item.employee}</span>
                </td>
                <td className={styles.table__item}>
                  <span className={styles.table__title}>
                    {item.employee.first_name} {item.addressee}
                  </span>
                </td>

                <td className={styles.table__item}>
                  {/* {item.status.includes('В процессе выполнения') ? <span className={styles.table__title} style={{color:'#FBBA14'}}>{item.status}</span> : 
                     item.status.includes('В режиме ожидания') ?  <span className={styles.table__title} style={{color:'FFD56A'}}>{item.status}</span> :
                     item.status.includes('Завершена') || item.status.includes('Ознакомлен') ? <span className={styles.table__title} style={{color:'rgb(67 255 0)'}}>{item.status}</span> : ''
                     } */}
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
    </div>
  );
}

export default OrderReportTable;
