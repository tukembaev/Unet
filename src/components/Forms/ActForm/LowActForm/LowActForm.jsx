import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Notification from "../../../../utils/Notifications";
import Button from "../../../Button/Button";

import styles from "./LowActForm.module.scss";
import LowActTopTable from "./LowActTopTable/LowActTopTable";

const LowActForm = (props) => {
  //UseState 
  const [toTop, setToTop] = useState([...props.spisanie]);
  const [toBottom, setBottomRows] = useState([]);

  //Notifications
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })

  //Functions
  const handleEditClickTop = (event, item , id) => {
    const obj = { item };
    const newArray = toTop.slice();
    const newArrayBot = toBottom.slice();
    const notFound = newArray.find((obj) => {
      return obj.id === item.id;
    });

    if (notFound === undefined) {
      newArray.push(obj.item);
      setBottomRows(newArrayBot.filter(item => item.id !== id));
      setToTop(newArray);
    }else{
      setNotify({
        isOpen: true,
        message: 'Вы уже добавили эту предмет в таблицу (передать)',
        type: 'warning'
    })
     }
  };

  const handleEditClickBot = (event, item , id, setToTop, setBottomRows ) => {
    const obj = { item };
    const newArray = toBottom.slice();
    const newArrayTop = toTop.slice();
    const notFound = newArray.find((obj) => {
      return obj.id === item.id;
    });

    if (notFound === undefined) {
      newArray.push(obj.item);
      setToTop(newArrayTop.filter(item => item.id !== id));
      setBottomRows(newArray);
    }else{
      setNotify({
        isOpen: true,
        message: 'Вы уже добавили эту предмет в таблицу (списать)',
        type: 'warning'
    })
    }
  };
  
   useEffect(() => {
     props.setSpisanie([...toTop,...toBottom])
   },[toTop , toBottom])
  

  return (
    <div className={styles.act_wrapper}>
      <div className={styles.act_heading}>
        <div className={styles.top_right_heading}>
       
          <div className={styles.input_type3}>
          Дата утверждения <input type="date" onChange={(e) => props.setDate_utver(e.target.value)}/>
          </div>
        </div>
        <div className={styles.column}>
          <div className={styles.wrapper_center}>
            <div className={styles.title__requir}>
              Акт № 
            </div>
          </div>
          <div className={styles.wrapper_center}>
            <div>О списании малоценных предметов Форма №443 по ОКУД</div>
          </div>
        </div>
      </div>
      <div className={styles.act_body}>
        <div className={styles.act_body_section1}>
          <div className={styles.act_between}>
            <div className={styles.act_gap_20}>
              <div className={styles.input_type3}>
                Дата <input type="date" onChange={(e) => props.setDate_act(e.target.value)}/>
              </div>
              <div className={styles.input_type3}>
                Учреждения(центральной бухгалтерии)
                <input onChange={(e) => props.setUchrejdenie(e.target.value)}/>
              </div>
              <div className={styles.input_type3}>
                Структурное подразделение
                <input onChange={(e) => props.setStruct_podrazdelenie(e.target.value)}/>
              </div>
              <div className={styles.input_type3}>
                Материально ответственное лицо
                <input onChange={(e) => props.setMat_otv(e.target.value)}/>
              </div>
            </div>
            <div className={styles.wrapper_end}>
              <table className={styles.sup__table}>
                <thead>
                  <tr>
                    <th>Код операции</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      504143
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className={styles.act_body_section2}>
          <div className={styles.input_type3}>
            Комиссия
            <input onChange={(e) => props.setKomis(e.target.value)}/>
          </div>
          <div className={styles.input_type3}>
            Назначенная приказом (распоряжением) от
            <input type="date" onChange={(e) => props.setDate_naznach(e.target.value)}/>
            № <input onChange={(e) => props.setNaznach_num(e.target.value)}/>
            произвела проверку состояния пришедших в негодность малоценных
            предметов в
            <input onChange={(e) => props.setMesto(e.target.value)}/>и установила , что не поддаются ремонту и не могу быть
            использованы или переданы другим организациям наименовенные ниже
            ценности, подлежащие списанию и исключению из учета:
          </div>
        </div>



        <div className={styles.act_body_section3}>
          <LowActTopTable TopList = {toTop} setToTop={setToTop} setBottomRows={setBottomRows} handleEditClickBot={handleEditClickBot} where = {1}/>
        </div>


        <div className={styles.act_body_section4}>
          <div className={styles.act_gap_20}>
            Итог:
            <div className={styles.input_type3}>
              Всего по настоящему акту списано
              <input onChange={(e) => props.setDate_expl(e.target.value)}/>
            </div>
            <div className={styles.input_type3}>
              Предметов на общую сумму
              <input onChange={(e) => props.setSumma(e.target.value)}/>
            </div>
            <div className={styles.input_type3}>
              Перечислено в настоящем акте имущество принял на ответственное
              хранение
              <input type="date" onChange={(e) => props.setDate_hraneniya(e.target.value)}/>
              №
              <input onChange={(e) => props.setName_pokaz(e.target.value)}/>
            </div>
            В результате списания получены следующие материалы, которые подлежат
            оприходованию в учете и сдаче на склад(кладовую) для дальнейшего
            использования:
            <div className={styles.input_type3}>
              Назначенная приказом(распоряжением) от
              <input type="date" onChange={(e) => props.setDate_izgotov(e.target.value)}/>
              №
              <input onChange={(e) => props.setDebet(e.target.value)} />
            </div>
            <div className={styles.input_type3}>
              Произвела проверку состояния пришедших в негодность малоценных
              предметов в
              <input onChange={(e) => props.setOsnovanie(e.target.value)}/>и установила, что не поддаются ремонту и не могут быть
              использованны и переданы другим организациям наименованные ниже
              ценности,подлежащие списанию и исключению из учета:
            </div>


            <div className={styles.act_body_section3}>
              <LowActTopTable TopList = {toBottom} setToTop={setToTop} setBottomRows={setBottomRows} handleEditClickTop={handleEditClickTop} where = {2}/>
            </div>
            
          
          
          
          
          </div>
          <div className={styles.act_body_section5}>
            <div className={styles.input_type3}>
              Всего:
              <input placeholder="Сумма прописью" onChange={(e) => props.setSumma_propis(e.target.value)}/>
            </div>
            <div className={styles.input_type3}>
              Перечисленные в настоящем акте материалы на сумму
              <input onChange={(e) => props.setCredit(e.target.value)}/>
              сом
              <input onChange={(e) => props.setRasporyaditel(e.target.value)}/>
              принял на хранение
            </div> 
          </div>
        </div>
      </div>
      <Notification
                notify={notify}
                setNotify={setNotify}
            />
    </div>
  );
};
export default LowActForm;
