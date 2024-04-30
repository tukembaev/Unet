import React, {useState} from 'react'

import styles from './RegisterForTest.module.scss'
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
import { getUserInfo, logintrash } from '../../../service/AuthService';
import tokenDecode from '../../../utils/decode';
import { setUser } from '../../../store/slices/UserSlice';
const RegisterForTest = ({setLoginMail}) => {
    //UserInfo

    const [dataPosition, setDataPosition] = useState([]);
    const [gender, setGender] = useState(null);
    const [first_name, setFirst_name] = useState('');
    const [last_name, setLast_name] = useState('');
    const [middle_name, setMiddle_name] = useState('');
    const [data_of_birth, setData_of_birth] = useState("");
    const [number_phone, setNumber_phone] = useState("");
    const [email, setEmail] = useState('');
    const [citizenship, setCitizenship] = useState("");
    // const [position, setPosition] = useState(2);
    const [inn, setInn] = useState(null);
    //Passport
    const [serial, setSerial] = useState("");
    const [number, setNumber] = useState(0);
    const [issued_by, setIssued_by] = useState("");
    const [date_of_issue, setDate_of_issue] = useState("");
    const [date_end, setDate_end] = useState("");
    
    const navigate = useNavigate()

    const [notify, setNotify] = useState({
      isOpen: false,
      message: "",
      type: "",
    });
    const dispatch = useDispatch();


    
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
            let emailtrash = "free"
            let passwordtrash = "free"
            let responsed = await logintrash(emailtrash, passwordtrash);
            localStorage.setItem("token", responsed.data.access);
           const userIdd = tokenDecode(responsed.data.refresh);
            let userResponsed = await  getUserInfo(userIdd);
            const datas = { ...userResponsed.data, token: responsed.data.access };
        
            dispatch(setUser(datas));
    
           const position = 2;
          let response = await createNewUser(      
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

 

            })
          );
          setNotify({
            isOpen: true,
            message: "Пользователь успешно добавлен!, Авторизуйтесь через ИНН",
             type: "success", sound : "success"
          });
          
        
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
   

  


  return (
<>
<div className={styles.container}>
  <div className={styles.title}>Регистрация пользователя</div>
  <form action="#">

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
        <input type="text" placeholder="Имя" value={first_name} onChange={(e) => setFirst_name(e.target.value)} required />
      </div>
      <div className={styles.input_pox}>
        <span className={styles.datails}>Фамилия</span>
        <input type="text" placeholder="Фамилию" value={last_name} onChange={(e) => setLast_name(e.target.value)} required />
      </div>
      <div className={styles.input_pox}>
        <span className={styles.datails}>Дата рождения</span>
        <input type="date" placeholder="Дату рождения" value={data_of_birth} onChange={(e) => setData_of_birth(e.target.value)} required />
      </div>
      <div className={styles.input_pox}>
        <span className={styles.datails}>Номер телефона</span>
        <input type="text" placeholder="Номер телефона" value={number_phone} onChange={(e) => setNumber_phone(e.target.value)} required />
      </div>
      <div className={styles.input_pox}>
        <span className={styles.datails}>Почта</span>
        <input type="text" placeholder="Почту" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div className={styles.input_pox}>
        <span className={styles.datails}>ИНН</span>
        <input type="text" placeholder="ИНН" value={inn} onChange={(e) => setInn(e.target.value)} required />
      </div>
    </div>
    <div className={styles.button}>
      <button className={styles.go_back} onClick={() => setLoginMail(false)}>Вернуться</button>
      <input type="submit" onClick={handleSubmit} value="Зарегистрироваться" />
    </div>
  </form>
</div>
    <Notification notify={notify} setNotify={setNotify} />
    </>
  )
}

export default RegisterForTest