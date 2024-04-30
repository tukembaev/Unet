import React from 'react'
import styles from "./../RequirmentInfo.module.scss";
const RequirmentTable = ({plp}) => {
    
  return (
    <div>
        <table className={styles.requirment__table}>
          <thead>
            <tr>
              <th colSpan={2}>Корреспондирущий счет</th>
              <th colSpan={2}>Материальные ценности</th>
              <th colSpan={2}>Единица измерения</th>
              <th colSpan={2}>Количество</th>
              <th rowSpan={2}>Цена</th>
              <th rowSpan={2}>Сумма</th>
              <th rowSpan={2}>
                Порядковый номер записи по складской картотеке
              </th>
              <th className={styles.del} rowSpan={2} colSpan={2}></th>
            </tr>
            <tr>
              <th>Счет, суб-счет</th>
              <th>Код аналитического учета</th>
              <th>Наименование,сорт, размер, марка</th>
              <th>Код (номенклатурный номер)</th>
              <th>Код</th>
              <th>Наименование</th>
              <th>Затребовано</th>
              <th>Отпущено</th>
            </tr>
          </thead>
          <tbody>
          {plp.map((item) => {
          return (   
            <tr>
              <td>{item.sub_account}</td>
              <td>{item.analytical}</td>
              <td>{item.name_grade_size_brand}</td>
              <td>{item.nomenclature_number}</td>
              <td>{item.code}</td>
              <td>{item.name}</td>
              <td>{item.requested}</td>
              <td>{item.released}</td>
              <td>{item.price}</td>
              <td>{item.ordinal}</td>
              <td>{item.number_record_warehouse_file}</td>
            </tr>
                 );
                })}
          </tbody>
        </table>
     
        </div>
  )
}

export default RequirmentTable