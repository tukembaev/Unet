import { TextareaAutosize } from '@material-ui/core';
import React, {useState , useEffect} from 'react'
import { useDispatch } from 'react-redux';
import { setSupportTypes } from '../../../store/slices/SupportSlice';
import { createEmployeeSupport, getSupportTypes } from '../../../service/SupportService';
import Notification from '../../../utils/Notifications';
import Button from '../../Button/Button';
import Dropdown from '../../Dropdown/Dropdown';
import styles from './SupportForm.module.scss'
import { ScaleLoader } from 'react-spinners';
const SupportForm = ({ setRender , setState}) =>  {
    //UseState
    const [data] = useState()
    const [id, setId] = useState(0);
    const [type , setType] = useState();
    const [request_type ,setRequest_type] = useState();
    const [topic, setTopic] = useState("");
    const [message, setMessage] = useState("");
    const [employee] = useState(510);
    const [file, setFile] = useState("");
    const [load,setLoad] = useState(false)
    //Notification
    const [notify, setNotify] = useState({
      isOpen: false,
      message: "",
      type: "",
    });
  
    const dispatch = useDispatch();
 
    const getData = async () => {
      try {
        let response = await getSupportTypes(id, data);
        dispatch(
          setSupportTypes({
            supportId: response.data,
          })
        );
        
        setRequest_type(response.data.application_types)
      } catch (error) {
        
      }
    };
    useEffect(() => {
      getData();
    }, []);

    const handleSubmit = async (event) => {
      event.preventDefault();
        try {
          setLoad(true)
          let response = await createEmployeeSupport(type, topic, message);
       
          setState(({ isPaneOpen: false } ))
          setRender(true)
        } catch (error) {
          
          setNotify({
            isOpen: true,
            message: "Ошибка",
            type: "error",
          });
        }
    };

    return (
      <div className={styles.statement_wrapper}>
      <div className={styles.statement_body}>
        
        <Dropdown setId={setId} setType={setType} title = {'Направление обращения'} data = {request_type ?? []}/>

        <input  placeholder="Название обращения:" className={styles.title_input} type="text" value={topic}
          onChange={(e) => setTopic(e.target.value)}/>
        <TextareaAutosize
          id="text"
          name="text"
          className={styles.discription_input}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Содержимое:"
        />
     
        <div className={styles.statement_footer}>
          {load? <div style={{display: 'flex', }}><ScaleLoader color="grey" size={30} /> </div>: <Button className={styles.btn1} onClick = {handleSubmit} >
            Отправить
          </Button>}
          
        </div>
        <Notification notify={notify} setNotify={setNotify} />
      </div>   </div>
    );
  }

export default SupportForm