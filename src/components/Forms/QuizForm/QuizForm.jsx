import React, { useState } from 'react'
import Notification from '../../../utils/Notifications';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Layout } from '../../../components'
import { createNewUser } from '../../../service/AdminService';

import {  useSelector } from 'react-redux';
import { postRegisterUser } from '../../../store/slices/AdminSlice';

import { useEffect } from 'react';
import styles from './QuizForm.module.scss'
import PositionSelect from '../../../hooks/PositionSelect/PositionSelect';
import { getPositionData } from '../../../service/OrderService';
import { setPositionById } from '../../../store/slices/OrderSlice';
import { questions } from '../../../constants/quizQuestions';
import { GetQuizAnswers, SendQuizAnswers } from '../../../service/AuthService';

const QuizForm = () => {
    
    const [dataPosition, setDataPosition] = useState([]);
    const [gender, setGender] = useState(null);
    const [data,setData] = useState(null)
    const [render,setRender] = useState(false)
    const navigate = useNavigate()

    const [notify, setNotify] = useState({
      isOpen: false,
      message: "",
      type: "",
    });
    const dispatch = useDispatch();


    const getData = async () => {
      try {
        let response = await GetQuizAnswers(data );
        setData(response.data)
        
      } catch (error) {
        
      }
    };
  
    useEffect(() => {
      getData();
      setRender(false)
   
    }, [render]);



    const [answers, setAnswers] = useState([]);

    const handleAnswerChange = (question, answer) => {
      setAnswers(prevAnswers => {
        const updatedAnswers = [...prevAnswers];
        const existingAnswer = updatedAnswers.find(a => a.question === question);
  
        if (existingAnswer) {
          existingAnswer.answer = answer;
        } else {
          updatedAnswers.push({ question, answer });
        }
  
        return updatedAnswers;
      });
    };

    //Const & Let
    const handleSubmit = async (event) => {
      event.preventDefault();
      
      if(answers.length === 16){
        try {
          let response = await SendQuizAnswers(answers);
       
          setNotify({
            isOpen: true,
            message: "Ответы успешно отправлены",
             type: "success", sound : "success"
          });
     
          navigate(-1)
        } catch (error) {
          
       
          setNotify({
            isOpen: true,
            message: "",
            type: "error",
          });
        }
      }
      else {
        setNotify({
          isOpen: true,
          message: "Вы не ответили на все вопросы опроса",
          type: "warning",     sound: 'warning'
        });
      }
        
    };
    
  return (
<Layout>
<div className={styles.container}>  
{data?.length !== 0 ? (<div>
  <p>Вы успешно прошли опрос</p>
</div>) : (<div> <div class={styles.title}>Опрос</div>
        <form className={styles.form}>
        {questions.map(question => (
     
        <div  className={styles.gender_details} key={question.id}>
          <p className={styles.gender_title}>{question.question_text}</p>
          <div className={styles.category}>
            <label >
              <input
                type="radio"
                name={`question_${question.id}/`}
                value="true"
    
                onChange={() => handleAnswerChange(question.id, true)}
              />
              Да
            </label>
            <label>
              <input
                type="radio"
                name={`question_${question.id}/`}
                value="false"
                onChange={() => handleAnswerChange(question.id, false)}
              />
              Нет
            </label>
          </div>
      
        </div>  ))}
        <div className="button" style={{textAlign:'right'}}>
                <input type="submit" className={styles.btn_pin} onClick={handleSubmit} value="Отправить"/>
            </div>
        </form>
    </div>)}    
       
     
        {/* <div className="gender_details">
                <span className="gender_title"> Выберите пол</span>
                <div className="category">
                    <label for="dot-1">
                        <span className="dot one"></span>
                        <span className="gender">Мужчина</span>
                    </label>
                    <label for="dot-2">
                        <span className="dot two"></span>
                        <span className="gender">Женщина</span>
                    </label>
              
                </div>
            </div> */}
       
  
     

    </div>
    <Notification notify={notify} setNotify={setNotify} />
</Layout>
  )
}

export default QuizForm