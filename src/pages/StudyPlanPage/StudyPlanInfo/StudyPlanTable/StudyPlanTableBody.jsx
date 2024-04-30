import React from "react";
import { useState, useEffect } from "react";
import styles from "../StudyPlanInfo.module.scss";
import { TextareaAutosize } from "@material-ui/core";
import { getAllDepartment } from "../../../../service/StudyPlanService";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const StudyPlanTableBody = ({ item, setDicipline, dicipline, isEditing }) => {
  // states
  const optionsControl = ["Экзамен", "Зачёт", "Курс/пр"];
  let data;
  const [optionsDepartment, setoOrtionsDepartment] = useState([]);
  const animatedComponents = makeAnimated();

  // functions

  const handleSetNumber = (e) => {
    const data = { ...dicipline };
    let input = e.target.value;
    let filteredInput = input.replace(/\D/g, "");
    data[e.target.name] = Number(filteredInput);
    data.amount_hours =
      data.lecture_hours + data.practice_hours + data.lab_hours;
    data.srs = data.credit * 30 - data.amount_hours;
    data.subject_hours =
      data.lecture_hours + data.practice_hours + data.lab_hours + data.srs;
    setDicipline(data);
  };

  const getDepartments = async () => {
    try {
      let response = await getAllDepartment(data);
      setoOrtionsDepartment(response.data);
    } catch (err) {
      console.log(err.response);
    }
  };

  useEffect(() => {
    getDepartments();
  }, []);

  const handleControlForm = (e) => {
    setDicipline((prev) => ({ ...prev, control_form: e.target.value }));
  };

  const handleSelect = (selected) => {
    setDicipline((prev) => ({ ...prev, department: selected.value }));
  };

  // select styles
  const customStyles = {
    control: (provided) => ({
      ...provided,
      fontSize: "12px",
      padding: "0px",
      border: `3px solid rgb(150 159 161 / 52%)`,
      height: "32px",
      "min-height": "32px",
      "min-width": "160px",
    }),
    option: (provided) => ({
      ...provided,
      fontSize: "12px",
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: "0px",
      paddingLeft: "3px",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      padding: "0px 8px", // Убираем padding для индикатора
    }),
    menu: (provided) => ({
      ...provided,
      minWidth: "400px",
    }),
  };
  return (
    <>
      <td className={styles.table__item}>
        {isEditing[item?.id] ? (
          <div className={styles.edit_box}>
            <Select
              closeMenuOnSelect={true}
              components={animatedComponents}
              options={optionsDepartment}
              onChange={handleSelect}
              autosize={true}
              isSearchable={true}
              placeholder="Кафедра"
              required={true}
              noOptionsMessage={() => "Поиск не дал результатов"}
              styles={customStyles}
            />
          </div>
        ) : (
          <span className={styles.table__title}>{item?.dep}</span>
        )}
      </td>
      <td className={styles.table__item}>
        <span className={styles.table__title}>{item?.course_type}</span>
      </td>
      <td className={styles.table__item}>
        {isEditing[item?.id] ? (
          <div className={styles.edit_box}>
            <select className={styles.edit_input} onClick={handleControlForm}>
              {optionsControl?.map(
                (option) =>
                  option === dicipline?.control_form && (
                    <option>{option}</option>
                  )
              )}
              {optionsControl?.map((option) => {
                if (option !== dicipline?.control_form) {
                  return <option>{option}</option>;
                } else {
                  return null;
                }
              })}
            </select>
          </div>
        ) : (
          <span className={styles.table__title}>{item?.control_form}</span>
        )}
      </td>
      <td className={styles.table__item}>
        {isEditing[item?.id] ? (
          <div className={styles.edit_box_number}>
            <TextareaAutosize
              re
              type="number"
              value={dicipline?.credit}
              className={styles.edit_input_number}
              name="credit"
              onChange={(e) => handleSetNumber(e)}
            />
          </div>
        ) : (
          <span className={styles.table__title}>{item?.credit}</span>
        )}
      </td>
      <td className={styles.table__item}>
        {isEditing[item?.id] ? (
          <div className={styles.edit_box_number}>
            <TextareaAutosize
              type="number"
              value={dicipline?.amount_hours}
              className={styles.dicipline_readOnly}
              name="amount_hours"
              readOnly
            />
          </div>
        ) : (
          <span className={styles.table__title}>{item?.amount_hours}</span>
        )}
      </td>
      <td className={styles.table__item}>
        {isEditing[item?.id] ? (
          <div className={styles.edit_box_number}>
            <TextareaAutosize
              type="number"
              value={dicipline?.lecture_hours}
              name="lecture_hours"
              className={styles.edit_input_number}
              onChange={(e) => handleSetNumber(e)}
            />
          </div>
        ) : (
          <span className={styles.table__title}>{item?.lecture_hours}</span>
        )}
      </td>
      <td className={styles.table__item}>
        {isEditing[item?.id] ? (
          <div className={styles.edit_box_number}>
            <TextareaAutosize
              type="number"
              value={dicipline?.practice_hours}
              name="practice_hours"
              className={styles.edit_input_number}
              onChange={(e) => handleSetNumber(e)}
            />
          </div>
        ) : (
          <span className={styles.table__title}>{item?.practice_hours}</span>
        )}
      </td>
      <td className={styles.table__item}>
        {isEditing[item?.id] ? (
          <div className={styles.edit_box_number}>
            <TextareaAutosize
              value={dicipline?.lab_hours}
              type="number"
              className={styles.edit_input_number}
              name="lab_hours"
              onChange={(e) => handleSetNumber(e)}
            />
          </div>
        ) : (
          <span className={styles.table__title}>{item?.lab_hours}</span>
        )}
      </td>
      <td className={styles.table__item}>
        {isEditing[item?.id] ? (
          <div className={styles.edit_box_number}>
            <TextareaAutosize
              type="number"
              value={dicipline?.srs}
              className={styles.dicipline_readOnly}
              readOnly
              name="srs"
            />
          </div>
        ) : (
          <span className={styles.table__title}>{item?.srs}</span>
        )}
      </td>
      <td className={styles.table__item}>
        {isEditing[item?.id] ? (
          <div className={styles.edit_box_number}>
            <TextareaAutosize
              type="number"
              value={dicipline?.subject_hours}
              className={styles.dicipline_readOnly}
              name="subject_hours"
              readOnly
            />
          </div>
        ) : (
          <span className={styles.table__title}>{item?.subject_hours}</span>
        )}
      </td>
    </>
  );
};

export default StudyPlanTableBody;
