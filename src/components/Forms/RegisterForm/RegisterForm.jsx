import React, {useState} from 'react'
import styles from  './RegisterForm.module.scss'
import { Layout } from '../../../components'
import { createNewUser } from '../../../service/AdminService';
import Notification from '../../../utils/Notifications';
import { useDispatch, useSelector } from 'react-redux';
import { postRegisterUser } from '../../../store/slices/AdminSlice';
import TaskWatchers from '../TaskForm/components/TaskWatchers/TaskWatchers';
import { getEmployee } from '../../../service/TaskService';
import { setEmployee } from '../../../store/slices/TaskSlice';
import { useEffect } from 'react';
import EmployeeSelect from '../../../hooks/EmployeeSelect/EmployeeSelect';
import PositionSelect from '../../../hooks/PositionSelect/PositionSelect';
import { getPositionData } from '../../../service/OrderService';
import { setPositionById } from '../../../store/slices/OrderSlice';
import { useNavigate, useParams } from 'react-router-dom';
import StudentGroupSelect from '../../../hooks/StudentSelect/StudentGroupSelect';
import StudentDirectionSelect from '../../../hooks/StudentSelect/StudentDirectionSelect';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
const RegisterForm = () => {
    //UserInfo

    const [direction, setDirection] = useState(null);
    const [group, setGroup] = useState(null);
    const [dataPosition, setDataPosition] = useState([]);
    const [user_type, setUser_type] = useState("E");
    const [gender, setGender] = useState(null);
    const [first_name, setFirst_name] = useState('');
    const [last_name, setLast_name] = useState('');
    const [middle_name, setMiddle_name] = useState('');
    const [data_of_birth, setData_of_birth] = useState("");
    const [number_phone, setNumber_phone] = useState("");
    const [email, setEmail] = useState('');
    const [citizenship, setCitizenship] = useState("");
    const [position, setPosition] = useState("");
    const [inn, setInn] = useState(null);
    //Passport
    const [serial, setSerial] = useState("");
    const [number, setNumber] = useState(null);
    const [issued_by, setIssued_by] = useState("");
    const [date_of_issue, setDate_of_issue] = useState("");
    const [date_end, setDate_end] = useState("");
    const [backgroundImage,setBackgroundImage] = useState(null)
    const navigate = useNavigate()

    const [notify, setNotify] = useState({
      isOpen: false,
      message: "",
      type: "",
    });
    const dispatch = useDispatch();


    const getData = async () => {
      let data
      try {
        let response = await getPositionData(data);

        dispatch(
          setPositionById({
            position: response.data,
          })
        );
  
      } catch (error) {
        
      }
    };
  
    useEffect(() => {
      getData();
  
    }, []);
    //Const & Let
    const handleSubmit = async (event) => {
      event.preventDefault();
        if(gender === null) {
          setNotify({
            isOpen: true,
            message: "Выберите пол",
            type: "warning",     sound: 'warning'
          });
        }
       else 
        try {
          let response = await createNewUser( gender,
            first_name,
            last_name,
            middle_name,
            data_of_birth,
            number_phone,
            email,
            citizenship,
            position,
            inn,
            serial,
            number,
            issued_by,
            date_of_issue,
            date_end,
            user_type,
            group,
            direction
           );
          dispatch(
            postRegisterUser({
              gender,
    first_name,
    last_name,
    middle_name,
    data_of_birth,
    number_phone,
    email,
    citizenship,
    position,
    inn,
    serial,
    number,
    issued_by,
    date_of_issue,
    date_end,
    user_type,
    group,
    direction
            })
          );
          setNotify({
            isOpen: true,
            message: "Пользователь успешно добавлен!",
             type: "success", sound : "success"
          });
          
          window.location.reload();
        } catch (error) {
          
  
          setNotify({
            isOpen: true,
            message: "",
            type: "error",
          });
        }
    };
    
    const forSelect = useSelector((state) => state.order.position);

  //Consts & Let
  const dataRector = [forSelect];
   
  useEffect(() => {
  setPosition(dataPosition.id)
  }, [dataPosition])
  

const backgroundImageLocal = localStorage.getItem("bacground");



  return (
<div style={{backgroundImage:` url(${backgroundImageLocal})`, backgroundSize: 'cover',backgroundPosition: 'center'}} className={styles.Layout}>
<div className={styles.container}>
  <div className={styles.title}><span onClick={() => navigate(-1)}><ArrowBackIcon sx={{color: 'gray', fontSize: '19px',marginRight: '10px',cursor:'pointer'}}/></span>Регистрация пользователя</div>
  <form action="#">

  <span className={styles.gender_title}>Выберите роль</span>
    <div className={styles.gender_details}>
      <div style={{display:'flex'}}>
      <input  style={{
    height: '18px',
    width: '18px',
    background: '#d9d9d9',
    borderRadius: '50%',
    marginRight: '10px',
    border: '5px solid transparent',
  }} type="radio" name="role" id="dot-1" value={user_type} onChange={(e) => setUser_type('E')} required />
   <span className={styles.gender}>Сотрудник</span>
   </div>
   <div style={{display:'flex'}}>
      <input  style={{
    height: '18px',
    width: '18px',
    background: '#d9d9d9',
    borderRadius: '50%',
    marginRight: '10px',
    border: '5px solid transparent',
  }} type="radio" name="role" id="dot-2" value={user_type} onChange={(e) => setUser_type('S')} required />
     <span className={styles.gender}>Студент</span>
     </div>
    
    
    </div>

  <span className={styles.gender_title}>Выберите пол</span>
    <div className={styles.gender_details}>
      <div style={{display:'flex'}}>
      <input  style={{
    height: '18px',
    width: '18px',
    background: '#d9d9d9',
    borderRadius: '50%',
    marginRight: '10px',
    border: '5px solid transparent',
  }} type="radio" name="gender" id="dot-1" value={gender} onChange={(e) => setGender('Мужчина')} required />
   <span className={styles.gender}>Мужчина</span>
   </div>
   <div style={{display:'flex'}}>
      <input  style={{
    height: '18px',
    width: '18px',
    background: '#d9d9d9',
    borderRadius: '50%',
    marginRight: '10px',
    border: '5px solid transparent',
  }} type="radio" name="gender" id="dot-2" value={gender} onChange={(e) => setGender('Женщина')} required />
     <span className={styles.gender}>Женщина</span>
     </div>
    
    
    </div>
    
    <div className={styles.user_details}>
      <div className={styles.input_pox}>
        <span className={styles.datails}>Имя</span>
        <input type="text" placeholder="Введите полное имя" value={first_name} onChange={(e) => setFirst_name(e.target.value)} required />
      </div>
      <div className={styles.input_pox}>
        <span className={styles.datails}>Фамилия</span>
        <input type="text" placeholder="Введите фамилию" value={last_name} onChange={(e) => setLast_name(e.target.value)} required />
      </div>
      <div className={styles.input_pox}>
        <span className={styles.datails}>Отчество</span>
        <input type="text" placeholder="Введите Отчество" value={middle_name} onChange={(e) => setMiddle_name(e.target.value)} required />
      </div>
      <div className={styles.input_pox}>
        <span className={styles.datails}>Дата рождения</span>
        <input type="date" placeholder="Введите дату рождения" value={data_of_birth} onChange={(e) => setData_of_birth(e.target.value)} required />
      </div>
      <div className={styles.input_pox}>
        <span className={styles.datails}>Номер телефона</span>
        <input type="text" placeholder="Введите номер телефона" value={number_phone} onChange={(e) => setNumber_phone(e.target.value)} required />
      </div>
      <div className={styles.input_pox}>
        <span className={styles.datails}>Почта</span>
        <input type="text" placeholder="Введите почту" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
    
      {user_type === 'E' ?   <div className={styles.input_pox}>
        <span className={styles.datails}>Должность</span>
        <PositionSelect dataPosition={dataRector[0]} setDataPosition={setDataPosition} />
        </div> : <><div className={styles.input_pox}>
        <span className={styles.datails}>Направление</span>
        <StudentDirectionSelect  setDirection={setDirection}/>
        </div>  
        <div className={styles.input_pox}> <span className={styles.datails}>Группа</span>
        <StudentGroupSelect id = {direction} setGroup={setGroup} /> </div> </> } 
        <div className={styles.input_pox}>
        <span className={styles.datails}>Гражданство</span>
        <input type="text" placeholder="Введите Гражданство" value={citizenship} onChange={(e) => setCitizenship(e.target.value)} required />
      </div>
      <div className={styles.input_pox}>
        <span className={styles.datails}>ИНН</span>
        <input type="text" placeholder="Введите ИНН" value={inn} onChange={(e) => setInn(e.target.value)} required />
      </div>
      <div className={styles.input_pox}>
        <span className={styles.datails}>Серия паспорта</span>
        <input type="text" placeholder="Введите серия паспорта" value={serial} onChange={(e) => setSerial(e.target.value)} required />
      </div>
      <div className={styles.input_pox}>
        <span className={styles.datails}>Номер паспорта</span>
        <input type="text" placeholder="Введите номер паспорта" value={number} onChange={(e) => setNumber(e.target.value)} required />
      </div>
      <div className={styles.input_pox}>
        <span className={styles.datails}>Кем Выдан</span>
        <input type="text" placeholder="Введите кем Выдан" value={issued_by} onChange={(e) => setIssued_by(e.target.value)} required />
      </div>
      <div className={styles.input_pox}>
        <span className={styles.datails}>Дата выдачи</span>
        <input type="date" placeholder="Дата выдачи" value={date_of_issue} onChange={(e) => setDate_of_issue(e.target.value)} required />
      </div>
      <div className={styles.input_pox}>
        <span className={styles.datails}>Дата окончания</span>
        <input type="date" placeholder="Дата окончания" value={date_end} onChange={(e) => setDate_end(e.target.value)} required />
      </div>
    </div>
    <div className={styles.button}>
      <input type="submit" onClick={handleSubmit} value="Зарегистрировать в систему" />
    </div>
  </form>
</div>
    <Notification notify={notify} setNotify={setNotify} />
</div>
  )
}

export default RegisterForm