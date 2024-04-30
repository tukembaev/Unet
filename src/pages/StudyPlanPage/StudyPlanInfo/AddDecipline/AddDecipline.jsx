import React, { useRef } from "react";
import { useState, useEffect } from "react";
import styles from "../StudyPlanInfo.module.scss";
import { TextareaAutosize } from "@material-ui/core";
import { getAllDepartment } from "../../../../service/StudyPlanService";
import Select from "react-select";
import accept from "../../../../assets/icons/accept.png";
import { createSubject } from "../../../../service/StudyPlanService";
import Notification from "../../../../utils/Notifications";
import makeAnimated from "react-select/animated";


const AddDiscipline = ({
  semesterId,
  groupItem,
  setIsAding,
  setRender,
  title,
  setNotify,
}) => {
  // states
  let data;
  const [dicipline, setDicipline] = useState({
    name_subject: "",
    control_form: "",
    department: 0,
    departmentLabel: "",
    credit: 0,
    srs: 0,
    amount_hours: 0,
    lecture_hours: 0,
    practice_hours: 0,
    lab_hours: 0,
    course_type: groupItem !== null ? "Курс по выбору" : "",
    group: groupItem === null ? null : groupItem?.group,
    semester: semesterId,
    subject_hours: 0,
  });
  const [redBorder, setRedBorder] = useState(false);
  const animatedComponents = makeAnimated();
  const tyoeOptions = ["Основной курс", "Курс по выбору"];

  const controlOptions = ["Экзамен", "Зачёт", "Курс/пр"];

  const [optionsDepartment, setoOrtionsDepartment] = useState([]);
  const myInput = useRef(null);
  const myDropdown = useRef(null);
  // functintions

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

  // handleSubmit

  const handleSubmit = async () => {
    const isValid =
      dicipline.name_subject !== "" &&
      dicipline.control_form !== "" &&
      dicipline.department !== 0 &&
      dicipline.credit !== 0 &&
      dicipline.srs !== 0 &&
      dicipline.course_type !== "";

    if (!isValid) {
      setNotify({
        isOpen: true,
        message: "Заполните все обязательные поля",
        type: "warning",
        sound: "warning",
      });
      setRedBorder(true);
    } else {
      try {
        const { departmentLabel, ...newData } = dicipline;
        let response = await createSubject(newData);
        setNotify({
          isOpen: true,
          message: "Предмет успешно добавлен",
          type: "success",
          sound: "success",
        });
        setRedBorder(false);
        if (groupItem?.group !== null) {
          setIsAding((prev) => ({
            ...prev,
            [groupItem?.group]: !prev[groupItem?.group],
          }));
        }
        if (groupItem === null) {
          setIsAding((prev) => ({
            ...prev,
            [semesterId]: !prev[semesterId],
          }));
        }
        setRender(true);
      } catch (err) {
        console.log(err.response);
      }
    }
  };

  const handleSelect = (selected) => {
    setDicipline((prev) => ({ ...prev, department: selected.value }));
  };
  
  // select styles 
  const customStyles = {
    control: (provided) => ({
      ...provided,
      fontSize: '12px',
      padding:"0px",
      border: `3px solid ${
        redBorder && dicipline.department === 0
          ? "#d62121"
          : "rgb(150 159 161 / 52%)"
      }`,
      height: '32px',
      'min-height': '32px',
      'min-width': '160px',
    }),
    option: (provided) => ({
      ...provided,
      fontSize: '12px', 
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding:'0px',
      paddingLeft:'3px'
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      padding: '0px 8px', // Убираем padding для индикатора
    }),
    menu : (provided) => ({
      ...provided,
      minWidth: '400px',
    }),
  };

  return (
    <>
      <tr className={styles.table__row}>
        <td className={styles.table__item}></td>
        <td className={styles.table__item}>
          <div className={styles.dicipline_box}>
            <TextareaAutosize
              id="name_subject"
              name="name_subject"
              onChange={(e) =>
                setDicipline((prev) => ({
                  ...prev,
                  name_subject: e.target.value,
                }))
              }
              type="text"
              className={styles.dicipline_input}
              placeholder={title}
              style={{
                border: `3px solid ${
                  redBorder && dicipline.name_subject === ""
                    ? "#d62121"
                    : "rgb(150 159 161 / 52%)"
                }`,
              }}
            />
          </div>
        </td>
        <td className={styles.table__item}>
          <div className={styles.dicipline_box} required>
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
        </td>
        <td className={styles.table__item}>
          {groupItem === null ? (
            <div className={styles.dicipline_box}>
              <select
                name="type"
                className={styles.edit_input}
                style={{
                  maxWidth: "200px",
                  border: `3px solid ${
                    redBorder && dicipline.course_type === ""
                      ? "#d62121"
                      : "rgb(150 159 161 / 52%)"
                  }`,
                }}
                onClick={(e) =>
                  setDicipline((prev) => ({
                    ...prev,
                    course_type: e.target.value,
                  }))
                }
              >
                <option value="" disabled selected hidden>
                  Тип
                </option>
                {tyoeOptions?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <span className={styles.table__title}>Курс по выбору</span>
          )}
        </td>
        <td className={styles.table__item}>
          <div className={styles.dicipline_box}>
            <select
              name="type"
              className={styles.edit_input}
              style={{
                maxWidth: "200px",
                border: `3px solid ${
                  redBorder && dicipline.control_form === ""
                    ? "#d62121"
                    : "rgb(150 159 161 / 52%)"
                }`,
              }}
              onClick={(e) =>
                setDicipline((prev) => ({
                  ...prev,
                  control_form: e.target.value,
                }))
              }
            >
              <option value="" disabled selected hidden>
                Форма контроля
              </option>
              {controlOptions?.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </td>
        <td className={styles.table__item}>
          <div className={styles.dicipline_box_number}>
            <TextareaAutosize
              id="credit"
              name="credit"
              type="number"
              value={dicipline.credit}
              onChange={(e) => handleSetNumber(e)}
              className={styles.dicipline_input_number}
              placeholder="Кредит:"
              style={{
                border: `3px solid ${
                  redBorder && dicipline.credit === 0
                    ? "#d62121"
                    : "rgb(150 159 161 / 52%)"
                }`,
              }}
            />
          </div>
        </td>
        <td className={styles.table__item}>
          <div className={styles.dicipline_box_number}>
            <TextareaAutosize
              id="amount_hours"
              name="amount_hours"
              type="number"
              value={dicipline.amount_hours}
              className={styles.dicipline_readOnly}
              placeholder="0"
              onChange={(e) => handleSetNumber(e)}
              readOnly
            />
          </div>
        </td>
        <td className={styles.table__item}>
          <div className={styles.dicipline_box_number}>
            <TextareaAutosize
              id="lecture_hours"
              name="lecture_hours"
              type="number"
              value={dicipline.lecture_hours}
              onChange={(e) => handleSetNumber(e)}
              className={styles.dicipline_input_number}
              placeholder="На Лк:"
            />
          </div>
        </td>
        <td className={styles.table__item}>
          <div className={styles.dicipline_box_number}>
            <TextareaAutosize
              id="practice_hours"
              name="practice_hours"
              type="number"
              value={dicipline.practice_hours}
              onChange={(e) => handleSetNumber(e)}
              className={styles.dicipline_input_number}
              placeholder="На Пр:"
            />
          </div>
        </td>
        <td className={styles.table__item}>
          <div className={styles.dicipline_box_number}>
            <TextareaAutosize
              id="lab_hours"
              name="lab_hours"
              type="number"
              value={dicipline.lab_hours}
              onChange={(e) => handleSetNumber(e)}
              className={styles.dicipline_input_number}
              placeholder="На Лб:"
            />
          </div>
        </td>

        <td className={styles.table__item}>
          <div className={styles.dicipline_box_number}>
            <TextareaAutosize
              id="srs"
              name="srs"
              type="number"
              value={dicipline.srs}
              onChange={(e) => handleSetNumber(e)}
              className={styles.dicipline_readOnly}
              placeholder="СРС:"
              readOnly
            />
          </div>
        </td>

        <td className={styles.table__item}>
          <div className={styles.dicipline_box_number}>
            <TextareaAutosize
              id="subject_hours"
              name="subject_hours"
              type="number"
              value={dicipline.subject_hours}
              className={styles.dicipline_readOnly}
              placeholder="0"
              onChange={(e) => handleSetNumber(e)}
              readOnly
            />
          </div>
        </td>
        <td className={styles.table__item}>
          <div className={styles.accept_box}>
            <button onClick={handleSubmit}>
              <img src={accept} alt="" />
            </button>
          </div>
        </td>
      </tr>
    </>
  );
};

export default AddDiscipline;
