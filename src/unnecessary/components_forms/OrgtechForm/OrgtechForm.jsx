import React, { useState } from "react";
import { Button } from "../../../../index";
import styles from "./OrgtechForm.module.scss";
import clip from "./../../../../../assets/icons/clip_add.svg";
import { createOrgTech } from "../../../../../service/StatementsService";
import { useDispatch } from "react-redux";
import { postOrgTech } from "../../../../../store/slices/StatementsSlice";
import Dropdown from "../../../../Dropdown/Dropdown";
import { directionsOrgTech } from "../../../../../constants/DropDownTypes";
import Notification from "../../../../../utils/Notifications";
import { TextareaAutosize } from "@material-ui/core";

function OrgtechForm({ setState , setRender , typestatement }) {
  //UseState
  const [id, setId] = useState(0);
  const [type] = useState(typestatement);
  const [podtypezayavki, setPodtypezayavki] = useState(0);
  const [text, setText] = useState("");
  const [employee] = useState();
  const [file, setFile] = useState([]);

  //Const & Lets
  let formData = new FormData();

  //Notification
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  //Dispatch
  const dispatch = useDispatch();

  //Functions
  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (text === "") {
      setNotify({
        isOpen: true,
        message: " Вы не указали содержимое рапорта ",
        type: "warning",     sound: 'warning'
      });
    } 
    else if(podtypezayavki === 0){
      setNotify({
        isOpen: true,
        message: ' Вы не указали направление рапорта',
        type: 'warning'
    })    
     }
    else
      try {
        let response = await createOrgTech(
          employee,
          type,
          podtypezayavki,
          text,
          file
        );

        dispatch(
          postOrgTech({
            employee,
            type,
            podtypezayavki: type,
            text: text,
            file,
          })
        );
        setNotify({
          isOpen: true,
          message: "Оргтехника успешно отправлена!",
           type: "success", sound : "success"
        });
        setState(({ isPaneOpen: false } ))
        setRender(true)
      } catch (error) {
        
      }
  };
  return (
    <div className={styles.statement_body}>
      <Dropdown
        setId={setId}
        setType={setPodtypezayavki}
        title = {'Тип рапорта'}
        data={directionsOrgTech}
      />
      <TextareaAutosize
        id="text"
        name="text"
        className={styles.discription_input}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={typestatement}
      />
      <div className={styles.add_statement_file}>
        <input
          type="file"
          name="file_upload"
          onChange={onFileChange}
          // accept="image/& , .pdf"
        />
      </div>
      <div className={styles.statement_footer}>
        <Button className={styles.btn1} onClick={handleSubmit}>
          Отправить
        </Button>
      </div>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
}

export default OrgtechForm;
