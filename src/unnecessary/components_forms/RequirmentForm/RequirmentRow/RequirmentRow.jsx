import React, { useEffect, useState } from "react";
import userInfo from "../../../../../../utils/userInfo";
import Button from "./../../../../../Button/Button";
import styles from "./RequirmentRow.module.scss";
const RequirmentRow = ({
  requirmentItem,
  handleEditClick,
  handleDeleteClick,
  
}) => {
  const user = userInfo();
  return (
    <tr>
 <td>{requirmentItem.sub_account}</td>
      <td>{requirmentItem.analytical}</td>
      <td>{requirmentItem.name_grade_size_brand}</td>
      <td>{requirmentItem.nomenclature_number}</td>
      <td>{requirmentItem.code}</td>
      <td>{requirmentItem.name}</td>
      <td>{requirmentItem.requested}</td>
      <td>{requirmentItem.released}</td>
      <td>{requirmentItem.price}</td>
      <td>{requirmentItem.ordinal}</td>
      <td>{requirmentItem.number_record_warehouse_file}</td>
      <td className={styles.actions__td}>
       
        <Button className="requirment__update" onClick={(e) => handleEditClick(e, requirmentItem)}>
          Изменить
        </Button>
      </td>
      <td className={styles.actions__td}>
        <Button className="requirment__delete" onClick={(e) => handleDeleteClick(requirmentItem.id)}>
          Удалить
        </Button>
      </td>
    </tr>
  );
};

export default RequirmentRow;