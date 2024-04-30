import React from "react";
import { useEffect } from "react";
import Button from "../../../../Button/Button";
import styles from "./LowActTable.module.scss";

const LowActTopTableRow = ({
  item,
  index,
  handleEditClick,
  handleEditClickBot,
  setToTop,
  setBottomRows,
  where,
  handleEditClickTop,
}) => {
  return (
    <tr>
      <td>{item.name_spisanie}</td>
      {where === 1 ? <td>{item.let_expl}</td> : <td>{item.ed_izm}</td>}

      <td>{item.kod_ucheta}</td>
      <td>{item.counts}</td>
      <td>{item.cena}</td>
      <td>{item.summa}</td>
      <td>{item.prichina}</td>

      {where === 1 ? (
        <Button
          className="act_update"
          onClick={(e) => handleEditClick(e, item)}
        >
          Изменить
        </Button>
      ) : (
        <Button
          className="act_update"
          onClick={(e) => handleEditClick(e, item)}
        >
          Изменить
        </Button>
      )}

      {where === 1 ? (
        <Button
          className="act_update"
          onClick={(e) =>
            handleEditClickBot(e, item, item.id, setToTop, setBottomRows)
          }
        >
          Убрать из списания
        </Button>
      ) : (
        <Button
          className="act_update"
          onClick={(e) =>
            handleEditClickTop(e, item, item.id, setToTop, handleEditClickTop)
          }
        >
          Добавить в списание
        </Button>
      )}
    </tr>
  );
};

export default LowActTopTableRow;
