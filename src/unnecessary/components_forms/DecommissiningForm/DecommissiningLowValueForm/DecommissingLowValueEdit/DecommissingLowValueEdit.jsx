import React from "react";
import Button from "../../../../../../Button/Button"
import styles from "./DecommissingLowValueEdit.module.scss"
const DecommissingLowValueEdit = ({
  editData,
  setEditData,
  handleEditSubmit,
  handleCancelClick,
}) => {
  const handleEditChange = (event, editData) => {
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;
    const newData = { ...editData };
    newData[fieldName] = fieldValue;
    setEditData(newData);
  };
  return (
    <tr>
      <td></td>
      <td>
        <input
          name="name_spisanie"
          value={editData.name_spisanie}
          onChange={(e) => handleEditChange(e, editData)}
        />
      </td>
      <td>
        <input
          name="counts"
          value={editData.counts}
          onChange={(e) => handleEditChange(e, editData)}
        />
      </td>
      <td>
        <input
          name="prichina"
          value={editData.prichina}
          onChange={(e) => handleEditChange(e, editData)}
        />
      </td>
      <td className={styles.actions__td}>
        <Button className="requirment__update" onClick={handleEditSubmit}>
          Сохранить
        </Button>
      </td>
      <td className={styles.actions__td}>
        <Button
          className="requirment__delete"
          type="button"
          onClick={handleCancelClick}
        >
          Отмена
        </Button>
      </td>
    </tr>
  );
};

export default DecommissingLowValueEdit;
