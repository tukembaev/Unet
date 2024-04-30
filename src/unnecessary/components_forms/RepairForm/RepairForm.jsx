import React, { useState } from "react";
import { Button } from "../../../../index";
import styles from "./RepairForm.module.scss";
import clip from "./../../../../../assets/icons/clip_add.svg";
import { createRepair } from "../../../../../service/StatementsService";
import { useDispatch , useSelector} from "react-redux";
import { postRepair } from "../../../../../store/slices/StatementsSlice";
import Dropdown from "../../../../Dropdown/Dropdown";
import { directionsRepair } from "../../../../../constants/DropDownTypes";
import { NavLink ,useNavigate} from "react-router-dom";
import Notification from "../../../../../utils/Notifications";
import { TextareaAutosize } from "@material-ui/core";

function RepairForm({typestatement , userId , setRender , setState}) {
    //UseState
    const [ id, setId ] = useState(0);
    const [ type] = useState(typestatement);
    const [ podtypezayavki, setPodtypezayavki ] = useState(0);
    const [text, setText] = useState("");
    const [employee] = useState(510);
    const [file ,setFile] = useState([]);
  //Notification
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
  //Dispatch & Navigate
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //Const & Let
  let formData = new FormData();


  //Functions
  const onFileChange = (e) => {
    setFile(e.target.files[0])
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    if(text === ""){
      setNotify({
        isOpen: true,
        message: ' Вы не указали содержимое рапорта',
        type: 'warning'
    })    
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
      let response = await createRepair(employee, type, podtypezayavki, text ,file);
        
      dispatch(
        postRepair({
          employee,
          type,
          podtypezayavki:type,
          text: text,
          file,
        })
      );
      // navigate(`/statement/${allStatements.statements.slice(-1)[0].id}/`)
      setNotify({
        isOpen: true,
        message: 'Ремонт успешно отправлен!',
        type: 'success'
    })    
    setState(({ isPaneOpen: false } ))
    setRender(true)

     
    } catch (error) {
      setNotify({
        isOpen: true,
        message: 'Ошибка',
        type: 'error'
    })    
      console.log(error.response)
    }
  };

 
  
  return (
    <div className={styles.statement_body} >
      <Dropdown setId={setId} setType={setPodtypezayavki}       title = {'Тип рапорта'} data={directionsRepair}/>
      <TextareaAutosize
        id="text"
        name="text"
        className={styles.discription_input}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Содержимое рапорта"
      />
       <div className={styles.add_statement_file}>
     
     <input type="file" name="file_upload" onChange={onFileChange} 
     // accept="image/& , .pdf"
      />
        
       
       </div>
      <div className={styles.statement_footer}>
      <NavLink className={styles.menu__link} to={`/statements/${userId}`}>
        <Button className={styles.btn1} onClick={handleSubmit}>
          Отправить
        </Button>
        </NavLink>
       
      </div>
      <Notification
                notify={notify}
                setNotify={setNotify}
            />
    </div>
  );
}

export default RepairForm;
