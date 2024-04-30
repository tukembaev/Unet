import React, { useState } from "react";

import styles from "./../FlowForm/FlowForm.module.scss";

import { useDispatch } from "react-redux";

import { TextareaAutosize } from "@material-ui/core";

import Button from "../../Button/Button";
import Notification from "../../../utils/Notifications";

import 'react-datepicker/dist/react-datepicker.css';
import { createTheme } from "../../../service/FlowService";


function ThemeForm({ subject , setRenderTheme , setState}) {
  //UseState
  
  const handleNumberChange = (e) => {
    const input = e.target.value;

    const filteredInput = input.replace(/\D/g, "");
    setTime(filteredInput);
  };
  const [time, setTime] = useState("");
  const [theme, setTheme] = useState("");
  const [text, setText] = useState("");
  const [file, setFile] = useState([]);
  const onFileChange = (e) => {
    setFile(e.target.files[0]);
    // console.log(e.target.files);
    // setFile(e.target.files)
  };
  //Notification
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  //Dispatch
  const dispatch = useDispatch();
  //Const & Let

  const handleSubmit = async (event) => {
    event.preventDefault();
     let newTheme = {
      theme ,
      description : text ,
      theme_hours : time ,
      file,
      subject
     }
      try {

        let response = await createTheme(newTheme);

        setNotify({
          isOpen: true,
          message: "Тема создана",
           type: "success", sound : "success"
        });
        setState(({ isPaneOpen: false } ))
        setRenderTheme(true)

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
       <div style={{display:'flex', flexDirection:'column', gap:'10px'}}>

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
      style={{maxWidth:'100px'}}
    />
      <input type="file" multiple onChange={onFileChange} />


       </div>
      <Notification notify={notify} setNotify={setNotify} />
      <Button className={styles.btn3} onClick={handleSubmit}>
          Отправить
        </Button>
    </div>
  );
}

export default ThemeForm;
