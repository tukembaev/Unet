import React from "react";
import Button from "../../../../Button/Button";
import styles from "./LowActTable.module.scss";

const LowActTopTableEdit = ({
  editData,
  setEditData,
  handleEditSubmit,
  handleCancelClick,
  handleEditSubmitBot,
where
}) => {
  const handleEditChange = (event, editData) => {
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;
    const newData = { ...editData };
    newData[fieldName] = fieldValue;
    setEditData(newData);
  };
  return (
    <tr >
      <td>{editData.name_spisanie}</td>
      {where === 1 ?  <td>
        <input
          name="let_expl"
          value={editData.let_expl}
          onChange={(e) => handleEditChange(e, editData)}
        />
      </td> : 
       <td>
       <input
         name="ed_izm"
         value={editData.ed_izm}
         onChange={(e) => handleEditChange(e, editData)}
       />
     </td> }
      
      
      <td>
        <input
          name="kod_ucheta"
          value={editData.kod_ucheta}
          onChange={(e) => handleEditChange(e, editData)}
        />
      </td>
      <td>{editData.counts}</td>
      <td>
        <input
          name="cena"
          value={editData.cena}
          onChange={(e) => handleEditChange(e, editData)}
        />
      </td>
      <td>
        <input
          name="summa"
          value={editData.summa}
          onChange={(e) => handleEditChange(e, editData)}
        />
      </td>
      <td>{editData.prichina}</td>

      
      {where === 1 ? <td className={styles.actions__td}>
        <Button className="requirment__update" onClick={handleEditSubmit}>
          Сохранить
        </Button>
      </td>:
      <td className={styles.actions__td}>
      <Button className="requirment__update" onClick={handleEditSubmitBot}>
        Сохранить 
      </Button>
    </td>}
      
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

export default LowActTopTableEdit;
