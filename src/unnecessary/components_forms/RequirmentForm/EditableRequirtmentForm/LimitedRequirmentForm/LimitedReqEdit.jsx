import React from "react";
import Button from "../../../../../../Button/Button";
import styles from "./../../RequirmentEdit/RequirmentEdit.module.scss"
const LimitedReqEdit = ({
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
    <>
    <tr>
      <td>
        <input
          name="sub_account"
          placeholder="Введите счет"
          required="required"
          value={editFormData.sub_account}
          onChange={(e) => handleEditFormChange(e, editFormData)}
        ></input>
      </td>
      <td>
        <input
          name="analytical"
          placeholder="Введите код аналитического учета"
          required="required"
          value={editFormData.analytical}
          onChange={(e) => handleEditFormChange(e, editFormData)}
        ></input>
      </td>
      <td>
        <input
          name="name_grade_size_brand"
          placeholder="Введите Наименование"
          required="required"
          value={editFormData.name_grade_size_brand}
          onChange={(e) => handleEditFormChange(e, editFormData)}
        ></input>
      </td>
      <td>
        <input
          name="nomenclature_number"
          placeholder="Введите Код (номенклатурный номер)"
          required="required"
          value={editFormData.nomenclature_number}
          onChange={(e) => handleEditFormChange(e, editFormData)}
        ></input>
      </td>
      <td>
        <input
          name="code"
          placeholder="Введите код"
          required="required"
          value={editFormData.code}
          onChange={(e) => handleEditFormChange(e, editFormData)}
        ></input>
      </td>
      <td>
        <input
          name="name"
          placeholder="Введите наименование"
          required="required"
          value={editFormData.name}
          onChange={(e) => handleEditFormChange(e, editFormData)}
        ></input>
      </td>
      <td>
        <input
          name="requested"
          placeholder="Введите затребовано"
          required="required"
          value={editFormData.requested}
          onChange={(e) => handleEditFormChange(e, editFormData)}
        ></input>
      </td>
      <td> 
        {editFormData.released}
       
      </td>
      <td>
      {editFormData.price}
     
      </td>
      <td>
      {editFormData.ordinal}
    
      </td>
      <td>
      {editFormData.number_record_warehouse_file}
     
      </td>
      <td className={styles.actions__td}>
        <Button className="requirment__update" onClick={handleEditFormSubmit}>Сохранить</Button>
      </td>
    
    </tr>
    </>
  );
};

export default LimitedReqEdit;
