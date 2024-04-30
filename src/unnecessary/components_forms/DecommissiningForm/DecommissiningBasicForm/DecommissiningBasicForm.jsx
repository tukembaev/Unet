import React from "react";
import { useState ,useEffect } from "react";
import styles from "./DecommissiningBasicForm.module.scss";

const DecommissiningBasicForm = ({setBasicValues}) => {

const onChange = ({ target }) => {
  setBasicValues((s) => ({ ...s, [target.name]: target.value }));
};
  return (
    <div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>№</th>
            <th>Наименование</th>
            <th>Количество</th>
            <th>Причина</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              1
            </td>
            <td>
              <input  name="name_spisanie" onChange={onChange} />
            </td>
            <td>
              <input  name="counts" onChange={onChange} type="number"/>
            </td>
            <td>
              <input  name="prichina" onChange={onChange} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DecommissiningBasicForm;
