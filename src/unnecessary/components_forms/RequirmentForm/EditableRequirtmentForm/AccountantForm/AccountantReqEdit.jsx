import React from "react";
import Button from "../../../../../../Button/Button";
import styles from "./../../RequirmentEdit/RequirmentEdit.module.scss"
const AccountantReqEdit = ({
  editFormData,
  handleCancelClick,
  setEditFormData,
  handleEditFormSubmit
}) => {
  const handleEditFormChange = (event, editFormData) => {
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;
    const newFormData = { ...editFormData };

    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };
  return (
    <tr>
      <td>
      {editFormData.sub_account} 
      </td>
      <td>
      {editFormData.analytical} 
      </td>
      <td>
      {editFormData.name_grade_size_brand}
      </td>
      <td>  
        {editFormData.nomenclature_number}
      </td>
      <td>
      {editFormData.code}
   
      </td>
      <td>
      {editFormData.name}
   
      </td>
      <td>
        {editFormData.requested}
       
      </td>
      <td>
      <input
          name="released"
          placeholder="Введите Цена"
          required="required"
          value={editFormData.released}
          onChange={(e) => handleEditFormChange(e, editFormData)}
        ></input>
        </td>
      <td>
        <input
          name="price"
          placeholder="Введите Цена"
          required="required"
          value={editFormData.price}
          onChange={(e) => handleEditFormChange(e, editFormData)}
        ></input>
      </td>
      <td>
        <input
          name="ordinal"
          placeholder="Введите Сумма"
          required="required"
          value={editFormData.ordinal}
          onChange={(e) => handleEditFormChange(e, editFormData)}
        ></input>
      </td>
      <td>
        <input
          name="number_record_warehouse_file"
          placeholder="Введите Порядковый номер записи по складской картотеке"
          required="required"
          value={editFormData.number_record_warehouse_file}
          onChange={(e) => handleEditFormChange(e, editFormData)}
        ></input>
      </td>
      <td className={styles.actions__td}>
        <Button className="requirment__update" onClick={handleEditFormSubmit}>Сохранить</Button>
      </td>
      <td className={styles.actions__td}>
      <Button className="requirment__delete" type="button" onClick={handleCancelClick}>
          Отмена
        </Button>
      </td>
    </tr>
  );
};

export default AccountantReqEdit;
