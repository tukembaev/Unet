import React from "react";
import styles from "../FlowForm.module.scss";
import FlowClassSelect from "../../../../hooks/FlowSelect/FlowClassSelect";
import Button from "../../../Button/Button";
import { useState, useEffect } from "react";
import SimpleDropdown from "../../../SimpleDropdown/SimpleDropdown";
import FlowCorpusSelect from "../../../../hooks/FlowSelect/FlowCorpusSelect";
import { ScaleLoader } from "react-spinners";
import { postFlowsShedules } from "../../../../service/FlowService";

const AddShedule = ({ setRender, setNotify, data }) => {
  // states
  const [responsbleFlow, setResponsbleFlow] = useState(null);
  const [dayName, setDayName] = useState("");
  const [type, setType] = useState("");
  const [time, setTime] = useState("");
  const [lessonClass, setClass] = useState("");
  const [weekType, setWeekTyoe] = useState("");
  const request_type = [
    data?.lector && "Лекция",
    data?.laboratory && "Лабораторная",
    data?.practice && "Практическая",
  ];
  const weekOptions = ["Числитель", "Знаменатель", "Еженедельно"];
  const request_type2 = [
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
    "Воскресенье",
  ];
  const [corpus, setCorpus] = useState("");
  const [loader, setLoader] = useState(false);
  const [formValues, setFormValues] = useState([]);

  const [direction, setDirection] = useState("");
  const [semester, setSemester] = useState("");
  const [subject, setSubject] = useState("");

  const handleAddSubmit = async () => {
    let typeOfClassRoom;
    if (
      lessonClass?.value?.includes("Практическая") &&
      lessonClass?.value?.includes("Лабораторная")
    ) {
      typeOfClassRoom = "Практическая Лабораторная";
    } else if (lessonClass?.value?.includes("Практическая")) {
      typeOfClassRoom = "Практическая";
    } else if (lessonClass?.value?.includes("Лекция")) {
      typeOfClassRoom = "Лекция";
    } else if (lessonClass?.value?.includes("Лабораторная")) {
      typeOfClassRoom = "Лабораторная";
    } else {
      typeOfClassRoom = "Все";
    }

    if (
      dayName === "" ||
      time === "" ||
      corpus === "" ||
      lessonClass === "" ||
      type === ""
    ) {
      setNotify({
        isOpen: true,
        message: "Заполните все поля",
        type: "warning",
        sound: "warning",
      });
    } else if (typeOfClassRoom.includes(type) === false) {
      setNotify({
        isOpen: true,
        message: ` В аудитории можно проводить только ${typeOfClassRoom}`,
        type: "warning",
        sound: "warning",
      });
    } else {
      if (dayName === "") {
      }
      try {
        setLoader(true);

        const newData = {
          schedules: [
            {
              stream: data?.id,
              day: dayName,
              time,
              lesson_type: type,
              korpus: corpus.id,
              auditorium: lessonClass.id,
              week_type: weekType !== "" ? weekType : "Еженедельно",
            },
          ],
        };

        const { schedules } = { ...newData };

        let response = await postFlowsShedules(data?.id, schedules);

        const corpusId = corpus.id;
        const corpusLabel = corpus.value;
        const auditorium = lessonClass.id;
        const auditoriumLabel = lessonClass.label;
        const newFormValue = {
          id: formValues.length + 1,
          lesson_type: type,
          day: dayName,
          time,
          corpusLabel,
          korpus: corpusId,
          auditorium,
          auditoriumLabel,
        };
        setNotify({
          isOpen: true,
          message: `Пара успешно добавлена`,
          type: "success",
          sound: "success",
        });
        setRender(true);
        setFormValues((prevFormValues) => [...prevFormValues, newFormValue]);
      } catch (error) {
        setNotify({
          isOpen: true,
          message: ` На это время аудитория занята`,
          type: "warning",
          sound: "warning",
        });
      } finally {
        setLoader(false);
      }
    }
  };

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" , marginBottom:"20px"}}>
        {responsbleFlow ? <h3>Номер потока {responsbleFlow}</h3> : null}

        <div className={styles.signer} style={{ width: "280px" }}>
          <SimpleDropdown
            selected={dayName}
            setSelected={setDayName}
            title={"День недели"}
            options={request_type2}
          />
        </div>

        <div
          className={styles.signer}
          style={{ width: "280px", marginTop: "15px" }}
        >
          <SimpleDropdown
            selected={type}
            setSelected={setType}
            title={"Вид"}
            options={request_type}
          />
        </div>

        <div
          className={styles.signer}
          style={{ width: "280px", marginTop: "15px" }}
        >
          <SimpleDropdown
            selected={weekType}
            setSelected={setWeekTyoe}
            title={"Еженедельно"}
            options={weekOptions}
          />
        </div>

        <h3>Время:</h3>
        <input
          type="time"
          className={styles.time}
          value={time}
          onChange={(e) => setTime(e.target.value)}
          id="appt"
          name="appt"
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <FlowCorpusSelect setCoprus={setCorpus} />
          <FlowClassSelect id={corpus.id} setClass={setClass} />
        </div>
      </div>
      {loader ? (
        <ScaleLoader color="white" size={30} />
      ) : (
        <Button className={styles.btn3} onClick={handleAddSubmit}>
          Добавить расписание
        </Button>
      )}

      <div className={styles.body}>
        {formValues?.map((item, index) => (
          <div className={styles.position_card} key={item.id}>
            <div className={styles.position_card__first}>
              <p>{index + 1}</p>
              <p>{item.day}</p>
              <p>{item.lesson_type}</p>
              <p>{item.corpusLabel}</p>
              <p>{item.auditoriumLabel}</p>
            </div>
            <div className={styles.position_card__last}>
              <p>{item.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddShedule;
