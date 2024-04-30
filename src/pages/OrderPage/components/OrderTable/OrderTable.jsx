import React, { useState } from "react";
import styles from "./OrderTable.module.scss";
import { useNavigate } from "react-router-dom";

function OrderTable({ allOrders, filterChoose }) {
  const [selectedFilter, setSelectedFilter] = useState("");
  const navigate = useNavigate();
  const unique = (value, index, self) => {
    return self.indexOf(value) === index;
  };
  let filteredData;

  if (filterChoose === 4) {
    filteredData = allOrders;
  }

  if (selectedFilter !== "" && selectedFilter !== "Все") {
    filteredData = filteredData.filter(
      (item) => item.status === selectedFilter
    );
  }

  return (
    <div className={styles.wrapper_table_body}>
      <table className={styles.table__wrapper}>
        <thead className={styles.table__head}>
          <tr className={styles.table__row}>
            <th className={styles.table__item}>
              <span className={styles.table__title}>
                {selectedFilter === "Зарегистрировано"
                  ? "Номер приказа"
                  : "Номер оборота"}
              </span>
            </th>
            <th className={styles.table__item}>
              <span className={styles.table__title}>Заявитель</span>
            </th>
            <th className={styles.table__item}>
              <span>
                <select
                  className={styles.select__dropdown}
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                >
                  <option value="Все">Все</option>
                  <option value="В процессе выполнения">
                    В процессе выполнения
                  </option>
                  <option value="На регистрацию">На регистрацию</option>
                  <option value="Зарегистрировано">Зарегистрировано</option>
                  <option value="Отказано">Отказано</option>
                </select>
              </span>
            </th>
            <th className={styles.table__item}>
              <span className={styles.table__title}>
                {selectedFilter === "Зарегистрировано"
                  ? "Дата приказа"
                  : "Дата подачи"}{" "}
              </span>
            </th>
          </tr>
        </thead>
        <tbody className={styles.table__body}>
          {filteredData
            .filter(unique)
            .reverse()
            .map((item) => {
              return (
                <tr
                  key={item.id}
                  className={styles.table__row}
                  onClick={() => navigate(`/order/${item.id}/`)}
                >
                  <td className={styles.table__item}>
                    <span className={styles.table__title}>
                      {selectedFilter === "Зарегистрировано"
                        ? item.order_number
                        : item.number}
                    </span>
                  </td>
                  <td className={styles.table__item}>
                    <span className={styles.table__title}>
                      {item.employee.first_name} {item.employee.surname}
                    </span>
                  </td>
                  <td className={styles.table__item}>
                    <span className={styles.table__title}>{item.status}</span>
                  </td>
                  <td className={styles.table__item}>
                    <span className={styles.table__title}>
                      {selectedFilter === "Зарегистрировано"
                        ? item.order_date
                        : item.date_zayavki}{" "}
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

export default OrderTable;
