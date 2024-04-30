import { TextareaAutosize } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

import Notification from "../../../utils/Notifications";
import Button from "../../Button/Button";

import styles from "./../SupportForm/SupportForm.module.scss";

import EmployeeSelect from "../../../hooks/EmployeeSelect/EmployeeSelect";

import { createEmployeeDocument } from "../../../service/DocumentService";
import { createDocument } from "../../../store/slices/DocumentSlice";
const DocumentForm = ({ setRender, setState }) => {
  //UseState

  const [type, setType] = useState("");
  const [text, setText] = useState("");

  const [signer, setSigner] = useState("");

  const [file, setFile] = useState("");
  //Notification
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  //Functions
  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (type === "") {
      setNotify({
        isOpen: true,
        message: " Вы не указали тему",
        type: "warning",     sound: 'warning'
      });
    } else if (text === "") {
      setNotify({
        isOpen: true,
        message: " Вы не указали содержимое",
        type: "warning",     sound: 'warning'
      });
    } else {
      try {
        let response = await createEmployeeDocument(signer, type, text, file);
        dispatch(
          createDocument({
            addressee: signer,
            type,
            text,
            file,
          })
        );

        setNotify({
          isOpen: true,
          message: "Документ успешно отправлен",
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
    }
  };

  return (
    <div className={styles.statement_wrapper}>
      <div className={styles.statement_body}>
        <EmployeeSelect selectedEmployee={setSigner} />

        <TextareaAutosize
          id="type"
          name="type"
          className={styles.type_input}
          value={type}
          onChange={(e) => setType(e.target.value)}
          placeholder="Тема:"
        />

        <TextareaAutosize
          id="text"
          name="text"
          className={styles.discription_input}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Краткое описание:"
        />
        <div className={styles.add_statement_file}>
          <input
            type="file"
            name="file_upload"
            onChange={onFileChange}
            // accept="image/& , .pdf"
          />
          <span>Прикрепление файла</span>
        </div>
        <div className={styles.statement_footer}>
          <Button className={styles.btn1} onClick={handleSubmit}>
            Отправить
          </Button>
        </div>
        <Notification notify={notify} setNotify={setNotify} />
      </div>{" "}
    </div>
  );
};

export default DocumentForm;
