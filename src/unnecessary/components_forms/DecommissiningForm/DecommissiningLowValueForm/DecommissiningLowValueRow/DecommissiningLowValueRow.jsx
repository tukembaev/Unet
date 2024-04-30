import React from "react";
import styles from "./DecommissiningLowValueRow.module.scss";
import Button from "../../../../../../Button/Button"
const DecommissiningLowValueRow = ({item, index, handleEditClick, handleDeleteClick}) => {
  return (
    <tr>
      <td>{index + 1}</td>
      <td>{item.name_spisanie}</td>
      <td>{item.counts}</td>
      <td>{item.prichina}</td>
      <td className={styles.actions__td}>
        <Button className="requirment__update" onClick={(e) => handleEditClick(e, item)}>
          Изменить
        </Button>
      </td>
      <td className={styles.actions__td}>
        <Button className="requirment__delete" onClick={(e) => handleDeleteClick(item.id)}>
          Удалить
        </Button>
      </td>
    </tr>
  );
};

export default DecommissiningLowValueRow;
