import React, { useState } from "react";
import { Button } from "../../../../index";
import styles from "./WriteOff.module.scss";
import clip from "./../../../../../assets/icons/clip_add.svg";
import { createWriteOff } from "../../../../../service/StatementsService";
import { useDispatch } from "react-redux";
import { postWriteOff } from "../../../../../store/slices/StatementsSlice";
import Dropdown from "../../../../Dropdown/Dropdown";
import { directionsWriteOff } from "../../../../../constants/DropDownTypes";
import DecommissiningBasicForm from "./../DecommissiningForm/DecommissiningBasicForm/DecommissiningBasicForm";
import DecommissiningLowValueForm from "../DecommissiningForm/DecommissiningLowValueForm/DecommissiningLowValueForm";
import Notification from "../../../../../utils/Notifications";
import { TextareaAutosize } from "@material-ui/core";
function WriteOff({ typestatement , setRender , setState}) {
  //UseState
  const [id, setId] = useState(0);
  const [type, setType] = useState(typestatement);
  const [podtypezayavki, setPodtypezayavki] = useState(0);
  const [text, setText] = useState("");
  const [employee] = useState(479);
  const [spisanie] = useState([]);
  const [basicValues, setBasicValues] = useState([]);
  const [file, setFile] = useState("");
  const [lowValues, setLowValues] = useState([]);
  //Notification
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  //Dispatch
  const dispatch = useDispatch();
  //Const & Let
  let formData = new FormData();
  //Functions
  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmitBasic = async (event) => {
    event.preventDefault();
    if (text === "") {
      setNotify({
        isOpen: true,
        message: " Вы не заполнили содержание списания",
        type: "warning",     sound: 'warning'
      });
    }
    else if (podtypezayavki === 0) {
      setNotify({
        isOpen: true,
        message: " Вы не выбрали тип рапорта",
        type: "warning",     sound: 'warning'
      });
    } 
    else
      try {
        let response = await createWriteOff({
          employee,
          type,
          podtypezayavki,
          text,
          spisanie: [basicValues],
        });

        dispatch(
          postWriteOff({
            employee,
            type,
            podtypezayavki: type,
            text: text,
            spisanie: basicValues,
          })
        );
        setNotify({
          isOpen: true,
          message: "Основное списание успешно отправлено!",
           type: "success", sound : "success"
        });
        setState(({ isPaneOpen: false } ))
        setRender(true)
      } catch (error) {
        setNotify({
          isOpen: true,
          message: "",
          type: "error",
        });
        
      }
  };

  const handleSubmitLow = async (event) => {
    event.preventDefault();
    lowValues.map((item) => delete item.id);

    try {
      let response = await createWriteOff({
        file,
        employee,
        type,
        podtypezayavki,
        text,
        spisanie: lowValues,
      });

      dispatch(
        postWriteOff({
          file,
          employee,
          type: typestatement,
          podtypezayavki: type,
          text: text,
          spisanie: lowValues,
        })
      );
      setNotify({
        isOpen: true,
        message: "Малоценное списание успешно отправлено!",
         type: "success", sound : "success"
      });
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      
      setNotify({
        isOpen: true,
        message: "",
        type: "error",
      });
    }
  };

  return (
    <div className={styles.statement_body}>
      <Dropdown
        setId={setId}
        title = {'Тип рапорта'}
        setType={setPodtypezayavki}
        data={directionsWriteOff}
      />
      <TextareaAutosize
        id="text"
        name="text"
        className={styles.discription_input}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Содержимое рапорта"
      />
      {(() => {
        switch (id) {
          case "1":
            return <DecommissiningBasicForm setBasicValues={setBasicValues} />;
          case "2":
            return <DecommissiningLowValueForm setLowValues={setLowValues} />;
          default:
            return "";
        }
      })()}
      <div className={styles.statement_footer}>
        {(() => {
          switch (id) {
            case "1":
              return (
                <Button className={styles.btn1} onClick={handleSubmitBasic}>
                  Отправить
                </Button>
              );
            case "2":
              return (
                <Button className={styles.btn1} onClick={handleSubmitLow}>
                  Отправить
                </Button>
              );
            default:
              return "";
          }
        })()}
      </div>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
}

export default WriteOff;
