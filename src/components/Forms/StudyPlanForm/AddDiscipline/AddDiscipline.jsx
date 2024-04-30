import React, { useEffect, useState } from "react";

import styles from "./AddDiscipline.module.scss";

import { useDispatch, useSelector } from "react-redux";

import deleteIcon from './../../../../assets/icons/trash_del.svg'
import { TextareaAutosize } from "@material-ui/core";
import SimpleDropdown from "../../../SimpleDropdown/SimpleDropdown";
import userInfo from "../../../../utils/userInfo";
import Button from "../../../Button/Button";
import Notification from "../../../../utils/Notifications";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import { createSubject } from "../../../../service/StudyPlanService";
import Select from "react-select";
import { getAllDepartment } from "../../../../service/StudyPlanService";

function AddDiscipline({ semester, setRender, setState }) {
  //UseState
  const user = userInfo();
  let data;
  const options = ["Основной курс", "Курс по выбору"];
  const optionsControl = [
    { value: 1, label: 'Экзамен' },
    { value: 2, label: 'Зачёт' },
    { value: 3, label: 'Курс/пр' },
  ];
  const [oprtionsDepartment , setoOrtionsDepartment] = useState([]);

  const [formValues, setFormValues] = useState([]);


  //Notification
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  //Dispatch
  const dispatch = useDispatch();
  //Const & Let
  const [course_type, setCourse_type] = useState(""); // str
  const [inputFields, setInputFields] = useState([
    {
      id: 0,
      name_subject: "",
      control_form: "",
      department: 0,
      departmentLabel:"",
      credit: 0,
      srs: 0,
      amount_hours: 0,
      lecture_hours: 0,
      practice_hours: 0,
      lab_hours: 0,
      totalHours: 0,
      course_type:"",
      semester: 0,
      subject_hours: 0 ,
    },
  ]);



  // functions

  const getDepartments = async () =>{
    try{
      let response = await getAllDepartment(data);
      setoOrtionsDepartment(response.data);
    }catch(err){
      console.log(err.response);
    }
  } 

  useEffect(() =>{
    getDepartments();
  }, []);

  const handleSetTypeNumber = (id , event) => {
    const data = [...inputFields];
    let input = event.target.value;
    let filteredInput = input.replace(/\D/g, "");
    data[id][event.target.name] = Number(filteredInput);
    data[id].amount_hours = data[id].lecture_hours + data[id].practice_hours + data[id].lab_hours + data[id].srs;
    data[id].subject_hours = data[id].lecture_hours + data[id].practice_hours + data[id].lab_hours;
    setInputFields(data);
  }

  const handleSetText = (id , e) =>{
    const data = [...inputFields];
    data[id][e.target.name] = e.target.value
    setInputFields(data);
  }

  const handleSetControl = (selectedOption , id) =>{
    let data = [...inputFields];
    data[id].control_form = selectedOption.label;
  }

  const handleSetDepartment = (selectedOption , id) =>{
    let data = [...inputFields];
    data[id].department = selectedOption.value;
    data[id].departmentLabel = selectedOption.label;
}

  const addFields = () =>{
    let newFields = {
      id: inputFields?.length,
      name_subject: "",
      control_form: "",
      department: 0,
      departmentLabel:"",
      credit: 0,
      srs: 0,
      amount_hours: 0,
      lecture_hours: 0,
      practice_hours: 0,
      lab_hours: 0,
      course_type:"",
      semester: 0,
      subject_hours: 0,
    }

    setInputFields([...inputFields , newFields]);
  } 


  function clearId(data) {
    if (Array.isArray(data)) {

      return data.map((item) => clearId(item));
    } else if (typeof data === 'object') {

      const { id, content, departmentLabel ,   ...rest } = data;
      if(content){
        rest.content = clearId(content); 
      }
      return rest
    } else {
      return data;
    }
  }

  const handleAddSubmit = () => {
    const isValid = inputFields?.every((field) =>{
      return(
        field.name_subject.trim() !== "" &&
      field.control_form.trim() !== "" &&
      field.department !== 0 &&
      field.credit !== 0 &&
      field.amount_hours !== 0 &&
      field.subject_hours !== 0 &&
      field.lecture_hours !== 0 &&
      field.practice_hours !== 0 &&
      field.lab_hours !== 0 && 
      field.src !== 0 
      );
    });
    if (course_type === "") {
      setNotify({
        isOpen: true,
        message: " Вы не указали тип",
        type: "warning", sound: 'warning'
      });

    }else if(!isValid){
      setNotify({
        isOpen: true,
        message: "Заполните все обязательные поля",
        type: "warning",
        sound: "warning"
      });
    }else{
      inputFields?.map((item) => item.course_type = course_type);
      inputFields?.map((item) => item.semester = semester)

      const newFormValue = {
        id: formValues?.length + 1,
        content: inputFields,
      }
      setFormValues(prevFormValues => [...prevFormValues, newFormValue]);
  setInputFields([
    {
      id: 0,
      name_subject: "",
      control_form: "",
      department: 0,
      departmentLabel:"",
      credit: 0,
      srs: 0,
      amount_hours: 0,
      lecture_hours: 0,
      practice_hours: 0,
      lab_hours: 0,
      course_type:"",
      semester: 0,
      subject_hours: 0,
    }
  ]);

    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(formValues?.length === 0){
      setNotify({
        isOpen: true,
        message: "Перед отправкой нужно нажать кнопку добавить",
        type: "warning",
        sound: "warning"
      });
    }else{  
      try {
        const clearedData = clearId(formValues);
        const newData = clearedData?.map(({content , ...rest}) => content);
        
        let response = await createSubject(newData);
  
        setNotify({
          isOpen: true,
          message: "Дисциплина добавлена",
          type: "success", sound: "success",
        });
  
        setState(({ isPaneOpen: false }))
        setRender(true)
        window.location.reload();
      } catch (error) {
  
  
        setNotify({
          isOpen: true,
          message: "Ошибка",
          type: "error",
        });
      }
  
    };
    }

  const handleDelete = (id) => {
    const updatedFormValues = formValues?.filter((field) => field.id !== id);
  
    setFormValues(updatedFormValues);
  };
  
  const handleDeleteField = (id) =>{
    const deletedFields =  inputFields?.filter((field) => field?.id !== id);
    setInputFields(deletedFields)
  }

  const handleDeleteOne = (fieldId , itemId) =>{
    const updatedFormValues = formValues.map((field) => {
      if (field.id === fieldId) {

        const updatedContent = field.content.filter((item) => item.id !== itemId);
        return { ...field, content: updatedContent };
      }
      return field;
    });
  

    setFormValues(updatedFormValues);
  } 


  // clear
  const handleClearField = () => {
    const clearedFields = inputFields.map((field) => {
      if (field.id === 0) {
        // Если id равен 0, создайте новый объект с пустыми значениями
        return {
          id: 0,
          name_subject: "",
          control_form: "",
          department: 0,
          departmentLabel: "",
          credit: 0,
          srs: 0,
          amount_hours: 0,
          lecture_hours: 0,
          practice_hours: 0,
          lab_hours: 0,
          totalHours: 0,
          course_type: "",
          semester: 0,
          subject_hours: 0,
        };
      }
      return field; // В противном случае оставьте объект без изменений
    });
  
    setInputFields(clearedFields);
  }

  useEffect(() =>{
    let initialInputField = [{
      id: 0,
      name_subject: "",
      control_form: "",
      department: 0,
      departmentLabel:"",
      credit: 0,
      srs: 0,
      amount_hours: 0,
      lecture_hours: 0,
      practice_hours: 0,
      lab_hours: 0,
      course_type:"",
      semester: 0,
      subject_hours: 0,
    },];
    setInputFields(initialInputField);
  } , [course_type]);


  return (
    <div>

      <div className={styles.flex}>

        <div className={styles.input_box}>
          <p className={styles.form_text}>Тип</p>

          <div className={styles.signer} style={{ maxWidth: '400px' }}>
            <SimpleDropdown selected={course_type} setSelected={setCourse_type} options={options} title={"Тип"} />
          </div>
        </div>

        <div className={styles.content_parent}>   
        {inputFields?.length !== 0 && inputFields?.map((input) =>(
              <div className={styles.content_child}>
              <div className={styles.fist_content}>
                <div className={styles.first_box}>
                  <p className={styles.form_text}>Название</p>
    
                  <TextareaAutosize
                    id="name_subject"
                    name="name_subject"
                    className={styles.type_input}
                    value={input?.name_subject}
                    onChange={(e) => handleSetText(input?.id , e)}
                    placeholder="Название:"
                  />
                </div>
    
                <div className={styles.first_box_unique}>
                  <p className={styles.form_text}>Форма контроля</p>
    
                  <div className={styles.signer} style={{ maxWidth: '400px' }}>
                    <Select 
                    options={optionsControl}
                    placeholder="Форма контроля"
                    onChange={(selectedOption) => handleSetControl(selectedOption , input?.id)}
                    styles={{
                      control: (provided, state) => ({
                        // Стили для контейнера Select
                        ...provided,
                        height: '55px',
                        margin:'0px',
                        padding:"0px"
                      }),
                      menu: (provided, state) => ({
                        // Стили для выпадающего списка
                        ...provided,
                        maxHeight: '200px' , overflowY:"auto", // Задайте желаемую максимальную высоту списка
                      }),
                    }}
                    />
                  </div>
                </div>
    
                <div className={styles.first_box_unique}>
                  <p className={styles.form_text}>Кафедра</p>
    
                  <div className={styles.signer} style={{ maxWidth: '400px' }}>
                    <Select
                    options={oprtionsDepartment}
                    placeholder="Кадедра"
                    onChange={(selectedOption) => handleSetDepartment(selectedOption , input?.id)}
                    styles={{
                      control: (provided, state) => ({
                        // Стили для контейнера Select
                        ...provided,
                        height: '55px', // Задайте желаемую высоту
                      }),
                      menu: (provided, state) => ({
                        // Стили для выпадающего списка
                        ...provided,
                        maxHeight: '200px' , overflowY:"auto", // Задайте желаемую максимальную высоту списка
                      }),
                    }}
                    />
                  </div>
    
                </div>
                <div className={styles.first_box} style={{width:'10%'}}>
    
                  <p className={styles.form_text}>Кредит</p>
    
                  <TextareaAutosize
                    id="credit"
                    name="credit"
                    className={styles.type_input}
                    value={input?.credit}
                    onChange={(e) => handleSetTypeNumber(input?.id , e)}
                    placeholder="Кредит:"
                    maxLength={2}
                  />
                </div>
              </div>
    
              <div className={styles.second_content_wrapper}>
                 <div className={styles.title_hours}>
                 <h3>Часы</h3>
                 </div>

                <div className={styles.second_content}>
                <div className={styles.second_box}>
                  <p className={styles.form_text}>На Лк</p>
    
                  <TextareaAutosize
                    id="lecture_hours"
                    name="lecture_hours"
                    type="number"
                    className={styles.type_input}
                    value={input?.lecture_hours}
                    onChange={(e) => handleSetTypeNumber(input?.id , e)}
                    placeholder="На Лк:"
                    maxLength={2}
    
                  />
                </div>
                <div className={styles.second_box}>
                  <p className={styles.form_text}>На Пр</p>
    
                  <TextareaAutosize
                    id="practice_hours"
                    name="practice_hours"
                    type="number"
                    className={styles.type_input}
                    value={input?.practice_hours}
                    onChange={(e) => handleSetTypeNumber(input?.id , e)}
                    placeholder="На Пр:"
                    maxLength={2}
    
                  />
                </div>
                <div className={styles.second_box}>
                  <p className={styles.form_text}>На Лб</p>
    
                  <TextareaAutosize
                    id="lab_hours"
                    name="lab_hours"
                    type="number"
                    className={styles.type_input}
                    value={input?.lab_hours}
                    onChange={(e) => handleSetTypeNumber(input?.id , e)}
                    placeholder="На Лб:"
                    maxLength={2}
    
                  />
                </div>
                <div className={styles.second_box}>
    
                  <p className={styles.form_text}>СРС</p>
    
                  <TextareaAutosize
                    id="srs"
                    name="srs"
                    className={styles.type_input}
                    value={input?.srs}
                    onChange={(e) => handleSetTypeNumber(input?.id , e)}
                    placeholder="СРС:"
                    maxLength={2}
                  />
                </div>
                <div className={styles.box_amount}>
                  <p className={styles.form_text}>Общие академические часы</p>
    
                  <TextareaAutosize
                    id="amount_hours"
                    name="amount_hours"
                    type="number"
                    className={styles.type_input}
                    value={input?.subject_hours}
                    placeholder="0"
                    readOnly
                  />
                </div>
                <div className={styles.second_box_unique}>
                  <p className={styles.form_text}>Общее количество</p>
    
                  <TextareaAutosize
                    id="amount_hours"
                    name="amount_hours"
                    type="number"
                    className={styles.type_input}
                    value={input?.amount_hours}
                    placeholder="0"
                    readOnly
                  />
                </div>
                </div>
              </div>
              {(course_type === "Курс по выбору" && input?.id === 0) && (
                   <div className={styles.button_box} onClick={() => (input?.id)}>
                   <button className={styles.delete_btn} onClick={handleClearField}>Очистить</button>
                   </div>
                )}
                {(course_type === "Курс по выбору" && input?.id !== 0) && (
                   <div className={styles.button_box} onClick={() => handleDeleteField(input?.id)}>
                   <button className={styles.delete_btn}>Убрать</button>
                   </div>
                )}
            </div>
        ))}
        </div>
      </div>
      {/* <div className={styles.signer} style={{maxWidth:'400px'}}>
        {prerequisite !== ''? (<p className={styles.form_text}>Пререквизит</p>) : null}

         <TextareaAutosize
        id="prereq"
        name="prereq"
        className={styles.type_input}
        value={prerequisite}
        onChange={(e) => setPrerequisite(e.target.value)}
        placeholder="Пререквизит:"
      />
      
       </div> */}


      {course_type === "Курс по выбору" && (
        <div className={styles.statement_footer}>
          <Button className={styles.btn1} onClick={addFields}>
            Добавить предмет по выбору
          </Button>
        </div>
      )}
      <div className={styles.statement_footer}>
        <Button className={styles.btn1} onClick={handleAddSubmit}>
          Добавить
        </Button>
      </div>
      <div className={styles.body}>
        {formValues?.map((field) =>{
          if(field.content?.length !== 1){
            return(
              <div className={styles.position_cards}>
              {field.content?.map((item) =>(
                <div className={styles.position_child} key={item?.id}>
                <div style={{ display: 'flex', alignItems:"center" , justifyContent:"space-between" , width:"100%"}}>
                  <p className={styles.formValues_title} >{item.name_subject}</p>
                  <p className={styles.formValues_text} >{item.credit}</p>
                  <p className={styles.formValues_text} >{item.amount_hours}</p>
                  <p className={styles.formValues_text} >{item.practice_hours}</p>
                  <p className={styles.formValues_text} >{item.lecture_hours}</p>
                  <p className={styles.formValues_text} >{item.lab_hours}</p>
                  <p className={styles.formValues_text} >{item.srs}</p>
                  <p>{item.departmentLabel.slice(0 , 15) + "..."}</p>
                  <p>{item.control_form}</p>
                  <p >{item.course_type}</p>
                <img src={deleteIcon} onClick={() => handleDeleteOne(field.id , item?.id)} style={{ cursor: 'pointer' }} className={styles.size} alt="Удалить" />
                </div>
              </div>
              ))}
            </div>
            )
          }else{
            return field.content?.map((item) =>(
              <div className={styles.position_card} key={item?.id}>
              <div style={{ display: 'flex', alignItems:"center" , justifyContent:"space-between" , width:"100%"}}>
                <p className={styles.formValues_title} >{item.name_subject}</p>
                <p className={styles.formValues_text} >{item.credit}</p>
                <p className={styles.formValues_text} >{item.amount_hours}</p>
                <p className={styles.formValues_text} >{item.practice_hours}</p>
                <p className={styles.formValues_text} >{item.lecture_hours}</p>
                <p className={styles.formValues_text} >{item.lab_hours}</p>
                <p className={styles.formValues_text} >{item.srs}</p>
                <p>{item.departmentLabel.slice(0 , 15) + "..."}</p>
                <p>{item.control_form}</p>
                <p >{item.course_type}</p>
              <img src={deleteIcon} onClick={() => handleDelete(field.id)} style={{ cursor: 'pointer' }} className={styles.size} alt="Удалить" />
              </div>
            </div>
            ))
          }
        })}
      </div>
      <Notification notify={notify} setNotify={setNotify} />
      <Button className={styles.btn3} onClick={handleSubmit}>
        Отправить
      </Button>
    </div>
  );
}

export default AddDiscipline;