import React, { Fragment, useState, useEffect } from "react";
import LowActTopTableEdit from "./LowActTopTableEdit";
import LowActTopTableRow from "./LowActTopTableRow";
import styles from "./LowActTable.module.scss";


const LowActTopTable = ({
  TopList,
  setToTop,
  setBottomRows,
  handleEditClickBot,
  handleEditClickTop,
  where,
}) => {
  const [formDataList, setFormDataList] = useState(TopList);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({
    id: "",
    name_spisanie: "",
    counts: "",
    prichina: "",
    let_expl: "",
    kod_ucheta: "",
    cena: "",
    summa: "",
    ed_izm: "",
  });

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

  const handleEditSubmit = (event) => {
    event.preventDefault();
    const editedData = {
      ...editData,
    };
    const newList = [...formDataList];
    const index = formDataList.findIndex((item) => item.id === editId);
    newList[index] = editedData;
    setFormDataList(newList);
    setToTop(newList);
    setEditId(null);
  };


  const handleEditSubmitBot = (event) => {
    event.preventDefault();
    const editedData = {
      ...editData,
    };
    const newList = [...formDataList];
    const index = formDataList.findIndex((item) => item.id === editId);
    newList[index] = editedData;
    setFormDataList(newList);
    setBottomRows(newList);
    setEditId(null);
  };


  const handleCancelClick = () => {
    setEditId(null);
  };
  useEffect(() => {
    setFormDataList(TopList)
    
  }, [TopList])


  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Наименования и описание(марка сорт и т.д.)</th>
          {where === 1 ? <th>Количество лет в эксплуатации</th> : <th>Единица измерения по ОКЕИ</th> }
    
          <th>Код аналитического учета</th>
          <th>Количество предметов</th>
          <th>Цена , сом</th>
          <th>Сумма, сом </th>
          <th>Примечания к списанию</th>
        </tr>
      </thead>
 
        <tbody>
          {formDataList.map((item, index) => (
            <Fragment>
              {editId === item.id ? (
                <LowActTopTableEdit
                  editData={editData}
                  setEditData={setEditData}
                  handleEditSubmit={handleEditSubmit}
                  handleEditSubmitBot={handleEditSubmitBot}
                  handleCancelClick={handleCancelClick}
                  where={where}
                />
              ) : (
                <LowActTopTableRow
                  handleEditClick={handleEditClick}
                  item={item}
                  index={index}
                  handleEditClickBot={handleEditClickBot}
                  handleEditClickTop={handleEditClickTop}
                  setToTop={setToTop}
                  setBottomRows={setBottomRows}
                  where={where}
                />
              )}
            </Fragment>
          ))}
        </tbody>

    </table>
  );
};

export default LowActTopTable;
