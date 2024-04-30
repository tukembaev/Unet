import React, { useEffect, useState,Suspense,lazy } from "react";
import { Button } from "../../../../index";
import styles from "./RaportForm.module.scss";
import { createRaport } from "../../../../../service/StatementsService";
import { useDispatch, useSelector } from "react-redux";
import { postStatement } from "./../../../../../store/slices/StatementsSlice";
import Notification from "../../../../../utils/Notifications";
import { TextareaAutosize } from "@material-ui/core";
// import OrderSigner from "../../../OrderForm/components/OrderSigner";
import { getPositionData, getTopPositionData } from "../../../../../service/OrderService";
import { setPositionById, setTopPositionById } from "../../../../../store/slices/OrderSlice";
import { getEmployee } from "../../../../../service/TaskService";
import { setEmployee } from "../../../../../store/slices/TaskSlice";
import Dropdown from "../../../../Dropdown/Dropdown";
import userInfo from "../../../../../utils/userInfo";
import { getMyMembers, getMyTeam } from "../../../../../service/CollectiveService";
import { setMyMembers, setMyTeam } from "../../../../../store/slices/CollectiveSlice";
import { ScaleLoader } from "react-spinners";
const OrderSigner = lazy(() => import('../../../OrderForm/components/OrderSigner'))


function RaportForm({ setRender , setState}) {
  //UseState
  const user = userInfo()
  const request_type = [{id: 0, label: "Рапорт"}, {id: 1, label: "Заявление"}];
  const [data] = useState()
  const [signer ,setSigner] = useState('')

  const [addressee , setAddressee] = useState()
  const [id, setId] = useState('');
  const [type_doc, setType_doc] = useState("");
  const [type, setType] = useState("");
  const [text, setText] = useState("");
  const [employee] = useState(510);
  const [file, setFile] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [loader, setLoader] = useState(false);

  //Notification
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  //Dispatch
  const dispatch = useDispatch();
  //Const & Let


     const getData = async () => {
      try {
        let response = await getMyMembers(data);
        
        dispatch(
          setMyMembers({
            members: response.data,
          })
        );
    
      } catch (error) {
        
      }
      };
    
      useEffect(() => {
      getData();

      }, []);
    
    const myTeam = useSelector((state) => state.collective.members);
    
    const dataRector = [myTeam];
    
  const onFileChange = (event) => {
    setFile(event.target.files);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    if (type === "") {
      setNotify({
        isOpen: true,
        message: " Вы не указали тему документа",
        type: "warning",     sound: 'warning'
      });
     
    }    
  
    else if (text === ''){
      setNotify({
        isOpen: true,
        message: " Вы не указали содержимое документа",
        type: "warning",     sound: 'warning'
      });
      
    }
    else if (type_doc === ''){
      setNotify({
        isOpen: true,
        message: " Вы не указали тип документа",
        type: "warning",     sound: 'warning'
      });
      
    }
    else if (signer === user.userId) {
      setNotify({
        isOpen: true,
        message: " Адрессат является пользователем!",
        type: "warning",     sound: 'warning'
      });
    } 
    else
      try {
        setLoader(true);
        const formData = new FormData();
        formData.append('addressee',signer);
        formData.append('type', type);
        formData.append('type_doc', type_doc);
        formData.append('text', text);
       
    for (let i = 0; i < file.length; i++) {
      formData.append('files', file[i]);
    }
        let response = await createRaport(formData);
        dispatch(
          postStatement({
            addressee:signer,
         
            type:type,
            type_doc,
            text: text,
            file: file ? file.name : null,
          })
        );
   
        setNotify({
          isOpen: true,
          message: "Рапорт успешно отправлен",
           type: "success", sound : "success"
        });
        setState(({ isPaneOpen: false } ))
        setRender(true)

      } catch (error) {
        

        setNotify({
          isOpen: true,
          message: "Ошибка",
          type: "error",
        });
      }finally {
        setLoader(false);
      }

  };



  return (
    <div>
         <div className={styles.signer} style={{width:'280px'}}>
       <Dropdown setId={setId} setType={setType_doc} title = {'Тип документа'} data = {request_type ?? []}/>
       </div>
      <div className={styles.signer}>
        <Suspense fallback={<p>Loading...</p>}>

       <OrderSigner text = {"Кому:"} dataSigners = {dataRector[0]} setSigner = {setSigner}/>
        </Suspense>
       </div>
    
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
        placeholder="Содержимое:"
      />
      <div className={styles.add_statement_file}>
      <input type="file" multiple  onChange={onFileChange} />
        <span>Прикрепление файла</span>
      </div>
      <div className={styles.statement_footer}>
      {loader ? (
        <ScaleLoader color="white" size={30} />
      ) : (
        <Button className={styles.btn1} onClick={handleSubmit}>
          Отправить
        </Button>
      )}
      </div>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
}

export default RaportForm;
