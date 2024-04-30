import React from "react";
import styles from "./BasicActForm.module.scss";
const BasicActForm = (props) => {

  return (
    <div className={styles.act_wrapper}>
      <div className={styles.act_heading}>
        <div className={styles.column}>
          <div className={styles.wrapper_center}>
            <div className={styles.title__requir}>
              Акт № 
            </div>
          </div>
          <div className={styles.wrapper_center}>
            <div>
              О списании основных средств в бюджетных учреждениях Форма ОС-4
              бюдж. по ОКУД
            </div>
          </div>
          <div className={styles.title__requir2}>
            От <input type='date' onChange={(e) => props.setDate_act(e.target.value)} />
            Дата
          </div>
        </div>
      </div>
      <div className={styles.act_body}>
        <div className={styles.act_body_section1}>
        <div className={styles.act_between}>
          <div className={styles.act_gap_20}>
          <div className={styles.input_type3}>
            Учреждение(централизованная бухгалтерия)
            <input onChange={(e) => props.setUchrejdenie(e.target.value)} />
            по ОКПО
          </div>
          <div className={styles.input_type3}>
            Структурное подразделение
            <input onChange={(e) => props.setStruct_podrazdelenie(e.target.value)} />
            по КСП
          </div>
          <div className={styles.input_type3}>
            Наименование средства
            <input onChange={(e) => props.setName_sredstva(e.target.value)} />
            по ОКОФ
          </div>
          <div className={styles.input_type3}>
            Материально ответственное лицо
            <input onChange={(e) => props.setMat_otv(e.target.value)} />
          </div>
          </div>
          <div className={styles.wrapper_end}>
            <table className={styles.sup__table}>
              <thead>
                <tr>
                  <th>Коды</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    
                    504104
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        </div>
        <div className={styles.act_body_section2}>
        <div className={styles.act_between}>
        <table className={styles.sup__table}>
              <thead>
              <th>
               Заводской номер
                  </th>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <input
                      onChange={(e) => props.setZavod_num(e.target.value)}
                      className={styles.sup__table__input}
                    />
                  </td>
                </tr>
              </tbody>
            </table>

            <table className={styles.sup__table}>
              <thead>
              <th>
                  Инвентарный номер
                  </th>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <input
                      onChange={(e) => props.setInvent_num(e.target.value)}
                      className={styles.sup__table__input}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            </div>
        </div>

        <div className={styles.act_body_section3}>
        <table className={styles.table}>
        <thead>
          <tr>
          <th>Наименование показателя</th>
            <th>Дебет (Корреспондирущие счета)</th>
            <th>Кредит (Корреспондирущие счета)</th>
            <th>Сумма(сом)</th>
        
          </tr>
        </thead>
        <tbody>
          <tr>
          <td>
              {props.spisanie[0].name_spisanie}
            </td>
            <td>
              <input  name="name_spisanie" onChange={(e) => props.setDebet(e.target.value)} />
            </td>
            <td>
              <input  name="counts"  type="number" onChange={(e) => props.setCredit(e.target.value)}/>
            </td>
            <td>
              <input  name="prichina" onChange={(e) => props.setSumma(e.target.value)} />
            </td>
            
          </tr>

          
        </tbody>
      </table>
</div>
<div className={styles.act_body_section4}>
<div className={styles.act_gap_20}>
<div className={styles.input_type3}>
            Комиссия
            <input onChange={(e) => props.setKomis(e.target.value)} />
      
          </div>
          <div className={styles.input_type3}>
            Назначение приказом(распоряжением)
            <input onChange={(e) => props.setRasporyaditel(e.target.value)} />
           
          </div>

<div className={styles.wrapper_center}>
          <div className={styles.input_type3}>
            Дата
            <input type='date' onChange={(e) => props.setDate_naznach(e.target.value)} />
            
          </div>

          <div className={styles.input_type3}>
            №
            <input onChange={(e) => props.setNaznach_num(e.target.value)} />
            На основании
            <input onChange={(e) => props.setOsnovanie(e.target.value)} />
          </div>
  </div>


<div className={styles.input_type3}>
           Осмотрела
            <input onChange={(e) => props.setName_obj(e.target.value)} />
            и нашла его подлежащим списанию (разборке) по следующим причинам:
          </div>
<div className={styles.input_type3}>
           1.Год изготовления или постройки 
            <input type='date' onChange={(e) => props.setDate_izgotov(e.target.value)} />
            г
          </div>
          <div className={styles.input_type3}>
           2.Дата поступления в учреждение: 
            <input type='date' onChange={(e) => props.setDate_postupleniya(e.target.value)} />
            г
          </div>
          <div className={styles.input_type3}>
           3.Дата ввода в эксплуатацию : 
            <input type='date' onChange={(e) => props.setDate_expl(e.target.value)} />
            г
          </div>
          <div className={styles.input_type3}>
           4.Количество капитальных ремонтов : 
            <input onChange={(e) => props.setRemont_count(e.target.value)} />
           на сумму 
           <input onChange={(e) => props.setSumma_remontov(e.target.value)} /> 
           сом
          </div>
          


</div>

</div>
<div className={styles.act_body_section5}>
<div className={styles.input_type3}>
            5. Сведения о содержании драгоценных материалов (металлов, камней, и т.п )
            
             </div>
             <table className={styles.table}>
        <thead>
          <tr>
          <th>Наименование драгоценных металлов</th>
            <th>Код аналитического учета</th>
            <th>Наименование (единица измерения)</th>
            <th>Код по ОКЕИ (единица измерения)</th>
            <th>Количество (масса)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
          <td>
          <input  name="name_spisanie" onChange={(e) => props.setName_metall_1(e.target.value)} />
            </td>
            <td>
            <input  name="name_spisanie" onChange={(e) => props.setKod_ucheta_1(e.target.value)} />
            </td>
            <td>
            <input  name="name_spisanie" onChange={(e) => props.setEd_izm_1(e.target.value)} />
            </td>
            <td>
            <input  name="name_spisanie" onChange={(e) => props.setCode_okei_1(e.target.value)} />
            </td>
            <td>
            <input  name="name_spisanie" onChange={(e) => props.setMassa_1(e.target.value)} />
            </td>
          </tr>

          <tr>
          <td>
          <input  name="name_spisanie" onChange={(e) => props.setName_metall_2(e.target.value)} />
            </td>
            <td>
            <input  name="name_spisanie" onChange={(e) => props.setKod_ucheta_2(e.target.value)} />
            </td>
            <td>
            <input  name="name_spisanie" onChange={(e) => props.setEd_izm_2(e.target.value)} />
            </td>
            <td>
            <input  name="name_spisanie" onChange={(e) => props.setCode_okei_2(e.target.value)} />
            </td>
            <td>
            <input  name="name_spisanie" onChange={(e) => props.setMassa_2(e.target.value)} />
            </td>
          </tr>


          <tr>
          <td>
          <input  name="name_spisanie" onChange={(e) => props.setName_metall_3(e.target.value)} />
            </td>
            <td>
            <input  name="name_spisanie" onChange={(e) => props.setKod_ucheta_3(e.target.value)} />
            </td>
            <td>
            <input  name="name_spisanie" onChange={(e) => props.setEd_izm_3(e.target.value)} />
            </td>
            <td>
            <input  name="name_spisanie" onChange={(e) => props.setCode_okei_3(e.target.value)} />
            </td>
            <td>
            <input  name="name_spisanie" onChange={(e) => props.setMassa_3(e.target.value)} />
            </td>
          </tr>

          
        </tbody>
      </table>

</div>
<div className={styles.act_body_section6}>
<div className={styles.input_type3}>
            6. Техническое состояние и причины списания
            <input onChange={(e) => props.setZakluchenie(e.target.value)} />
             </div>

</div>
      </div>
      </div>

  );
};
export default BasicActForm;
