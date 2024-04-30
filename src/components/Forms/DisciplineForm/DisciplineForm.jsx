import React, { useState } from "react";

import styles from "./../FlowForm/FlowForm.module.scss";

import { useDispatch } from "react-redux";

import { TextareaAutosize } from "@material-ui/core";

import Dropdown from "../../Dropdown/Dropdown";

import Button from "../../Button/Button";
import Notification from "../../../utils/Notifications";
import "react-datepicker/dist/react-datepicker.css";
import { createFlow } from "../../../service/FlowService";
function DisciplineForm({ setRender, setState }) {
  //UseState

  const [formValues] = useState([]);

  const handleNumberChange = (e) => {
    const input = e.target.value;

    const filteredInput = input.replace(/\D/g, "");
    setTime(filteredInput);
  };
  const request_type = [
    { id: 0, label: "Лекция" },
    { id: 1, label: "Лабораторная" },
    { id: 2, label: "Практическая" },
  ];
  const [setId] = useState("");
  const [setType] = useState("");
  const [time, setTime] = useState("");
  const [theme, setTheme] = useState("");
  const [text, setText] = useState("");
  const [file, setFile] = useState([]);
  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  //Notification
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  //Const & Let

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      let response = await createFlow(theme, text, time, file);

      setNotify({
        isOpen: true,
        message: "Поток создан",
         type: "success", sound : "success"
      });
      setState({ isPaneOpen: false });
      setRender(true);
    } catch (error) {
      

      setNotify({
        isOpen: true,
        message: "Ошибка",
        type: "error",
      });
    }
  };

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <div
          className={styles.signer}
          style={{ width: "280px", marginTop: "15px" }}
        >
          <Dropdown
            setId={setId}
            setType={setType}
            title={"Вид"}
            data={request_type ?? []}
          />
        </div>
        <TextareaAutosize
          id="theme"
          name="theme"
          className={styles.type_input}
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          placeholder="Тема:"
        />
        <TextareaAutosize
          id="text"
          name="text"
          className={styles.discription_input}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Описание:"
        />
        <TextareaAutosize
          id="time"
          name="time"
          className={styles.type_input}
          value={time}
          onChange={handleNumberChange}
          placeholder="Часы:"
          style={{ maxWidth: "100px" }}
        />
        <input type="file" multiple onChange={onFileChange} />
        <span>Прикрепление файла</span>
      </div>
      <div className={styles.body}>
        {formValues?.map((item, index) => (
          <div className={styles.position_card} key={item.id}>
            <div style={{ display: "flex", gap: "25px" }}>
              <p>{index + 1}</p>
              <p>{item.schedules[0].day}</p>
              <p>{item.schedules[0].type}</p>
              <p>{item.schedules[0].corpusLabel}</p>
              <p>{item.schedules[0].auditoriumLabel}</p>
            </div>
            <div style={{ display: "flex", gap: "25px" }}>
              <p>{item.schedules[0].time}</p>
            </div>
          </div>
        ))}
      </div>
      <Notification notify={notify} setNotify={setNotify} />
      <Button className={styles.btn3} onClick={handleSubmit}>
        Отправить
      </Button>
    </div>
  );
}

export default DisciplineForm;
