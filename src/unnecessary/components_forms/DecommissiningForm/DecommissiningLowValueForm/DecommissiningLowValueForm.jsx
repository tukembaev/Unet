import React, { Fragment } from "react";
import { useState ,useEffect } from "react";
import styles from "./DecommissiningLowValueForm.module.scss";
import { nanoid } from "@reduxjs/toolkit";
import cx from "classnames";
import Button from "../../../../../Button/Button";
import DecommissingLowValueEdit from "./DecommissingLowValueEdit/DecommissingLowValueEdit";
import DecommissiningLowValueRow from "./DecommissiningLowValueRow/DecommissiningLowValueRow";

const DecommissiningLowValueForm = ({setLowValues}) => {
  const [formDataList, setFormDataList] = useState([]);
  const [formData, setFormData] = useState({
    name_spisanie: "",
    counts: "",
    prichina: "",
  });
  const [editData, setEditData] = useState({
    name_spisanie: "",
    counts: "",
    prichina: "",
  });
  const [editId, setEditId] = useState(null);
  const handleAddChange = (e) => {
    const fieldName = e.target.getAttribute("name");
    const fieldValue = e.target.value;

    const newFormData = { ...formData };
    newFormData[fieldName] = fieldValue;

    setFormData(newFormData);
  };

  const handleAddClick = () => {
    if (formDataList.length > 49) {
      alert("Limit");
    } else {
    setFormDataList([...formDataList, { id: nanoid(),...formData }]);
    }

  };

  const handleEditClick = (event, item) => {
    event.preventDefault();
    setEditId(item.id);
    const values = {
      id: item.id,
      name_spisanie: item.name_spisanie,
      counts: item.counts,
      prichina: item.prichina,
    };
    setEditData(values);
  };
  const handleCancelClick = () => {
    setEditId(null);
  };
  const handleDeleteClick = (id) => {
    const newList = [...formDataList];
    const index = formDataList.findIndex((item) => item.id === id);
    newList.splice(index, 1);
    setFormDataList(newList);
  };
  const handleEditSubmit = (event) => {
    
      event.preventDefault();
      
      const editedData = {
        ...editData,
      };
      const newList = [...formDataList];
      const index = formDataList.findIndex((item) => item.id === editId);
      newList[index] = editedData;
      setFormDataList(newList);

      setEditId(null);
      
  };
  useEffect(() => {
    setLowValues(formDataList);
  }, [formDataList])
  


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
          {formDataList.map((item, index) => (
            <Fragment>
              {editId === item.id ? (
                <DecommissingLowValueEdit
                  editData={editData}
                  setEditData={setEditData}
                  handleEditSubmit={handleEditSubmit}
                  handleCancelClick={handleCancelClick}
                />
              ) : (
                <DecommissiningLowValueRow
                  handleEditClick={handleEditClick}
                  handleDeleteClick={handleDeleteClick}
                  item={item}
                  index={index}
                />
              )}
            </Fragment>
          ))}
        </tbody>
      </table>
      <div className={cx(styles.m_20, styles.add__wrapper)}>
        {/* <input
          name="name_spisanie"
          placeholder="Введите наименование"
          required="required"
          onChange={handleAddChange}
          className={styles.add__input}
        />
        <input
          name="counts"
          placeholder="Введите количество"
          required="required"
          onChange={handleAddChange}
          className={styles.add__input}
        />
        <input
          name="prichina"
          placeholder="Введите причину"
          required="required"
          onChange={handleAddChange}
          className={styles.add__input}
        /> */}
        <Button className="add__requir" onClick={handleAddClick}>
          Добавить данные
        </Button>
      </div>
    </div>
  );
};

export default DecommissiningLowValueForm;
