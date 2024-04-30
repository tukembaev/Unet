import { TextareaAutosize } from '@material-ui/core';
import React,{useState , useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createMessageToSupport, setSupportTypes } from '../../../store/slices/SupportSlice';
import { createEmployeeSupport, getSupportTypes } from '../../../service/SupportService';
import Notification from '../../../utils/Notifications';
import Button from '../../Button/Button';
import Dropdown from '../../Dropdown/Dropdown';
import styles from './../SupportForm/SupportForm.module.scss'
import { createEmployeeZayavlenie, getZayavlenieTypes } from '../../../service/ZayavlenieService';
import { setZayavlenieTypes ,createZayavlenie } from '../../../store/slices/ZayavlenieSlice';
import OrderSigner from '../OrderForm/components/OrderSigner';
import { getTopPositionData } from '../../../service/OrderService';
import { setTopPositionById } from '../../../store/slices/OrderSlice';
const ZayavlenieForm = ({ setRender , setState}) =>  {
    //UseState
    const [addressee , setAddressee] = useState()
    const [type, setType] = useState("");
    const [text, setText] = useState("");
    const [data] = useState()
    const [id, setId] = useState(0);

    const [signer ,setSigner] = useState('')
    const [request_type ,setRequest_type] = useState();
    const [isEmployee , setIsEmployee] = useState(false);
    const [topic, setTopic] = useState("");
 
    const [employee] = useState(510);
    const [file, setFile] = useState('');
    //Notification
    const [notify, setNotify] = useState({
      isOpen: false,
      message: "",
      type: "",
    });
  
  let formData = new FormData();
  //Functions
  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };
    const dispatch = useDispatch();
 
    const getData = async () => {
      try {
        let response = await getZayavlenieTypes(data);
        dispatch(
            setZayavlenieTypes({
            zayavlenieTypes: response.data,
          })
        );
     
        setRequest_type(response.data)
        
        response.data.length === 0 ? setIsEmployee(true) : setIsEmployee(false)

      } catch (error) {
        
      }
    };

    const getDataEmp = async () => {
      try {
        let response = await getTopPositionData(id , data);
  
        dispatch(
          setTopPositionById({
            top_position: response.data,
          })
        );
  
      } catch (error) {
        
  
      }
    };

    
    useEffect(() => {
      getData();
      getDataEmp();
    }, []);

    const handleSubmit = async (event) => {
      event.preventDefault();
    
      if (signer === '') {
        setNotify({
          isOpen: true,
          message: " Вы не выбрали Адрессата",
          type: "warning",     sound: 'warning'
        });
      } 
      else if (type === ''){
        setNotify({
          isOpen: true,
          message: " Вы не указали направление заявления",
          type: "warning",     sound: 'warning'
        });
      }

      else if (text === ''){
        setNotify({
          isOpen: true,
          message: " Вы не указали содержимое",
          type: "warning",     sound: 'warning'
        });
      }
 
      else{

        try {
      
          let response = await createEmployeeZayavlenie(signer, type , text, file);

          dispatch(
            createZayavlenie({
              addressee:signer,
              type,
              text,
              file,
            })
          );

          setNotify({
            isOpen: true,
            message: "Заявление успешно отправлена",
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
        }
      }
    };
    
  const forSelect = useSelector((state) => state.order.top_position);

  //Consts & Let
  const dataRector = [forSelect];
 

    return (
      <div className={styles.statement_wrapper}>
      <div className={styles.statement_body}>
      <OrderSigner text = {"Кому:"} dataSigners = {dataRector[0]} setSigner = {setSigner}/>
        {isEmployee ?     <TextareaAutosize
        id="type"
        name="type"
        className={styles.type_input}
        value={type}
        onChange={(e) => setType(e.target.value)}
        placeholder="Направление заявления:"
      /> :      <Dropdown setId={setId} setType={setType} title = {'Вид заявления'} data = {request_type ?? []}/>}
   

        <TextareaAutosize
          id="text"
          name="text"
          className={styles.discription_input}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Содержимое:"
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
          <Button className={styles.btn1} onClick = {handleSubmit} >
            Отправить
          </Button>
        </div>
        <Notification notify={notify} setNotify={setNotify} />
      </div>   </div>
    );
  }

export default ZayavlenieForm