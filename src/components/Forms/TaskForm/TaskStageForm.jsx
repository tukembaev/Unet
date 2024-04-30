import React, { useEffect, useState } from "react";
import { Button } from "../../index";
import styles from "./TaskForm.module.scss";
import clip from "./../../../assets/icons/clip_add.svg";
import TaskResponsible from "./components/TaskResponsible/TaskResponsible";
import TaskWatchers from "./components/TaskWatchers/TaskWatchers";
import TaskCoWorker from "./components/TaskCoWorker/TaskCoWorker";
import TaskDeadline from "./components/TaskDeadline/TaskDeadline";
import TaskResult from "./components/TaskResult/TaskResult";
import {
  setEmployee,
  setUpdatedStatusTask,
} from "./../../../store/slices/TaskSlice";
import { getEmployee, updateStatusTask } from "../../../service/TaskService";
import { ScaleLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { postTask } from "../../../store/slices/TaskSlice";
import { createTask } from "../../../service/TaskService";
import Notification from "../../../utils/Notifications";
import { useNavigate, useParams } from "react-router-dom";
import { getMyMembers, getMyTeam } from "../../../service/CollectiveService";
import { setMyMembers, setMyTeam } from "../../../store/slices/CollectiveSlice";
import Dropdown from "../../Dropdown/Dropdown";
import { Slider } from "@mui/material";
import DropdownResources from "../../Dropdown/DropdownResources"
import deleteIcon from './../../../assets/icons/trash_del.svg'
function TaskStageForm({ budgetForTask , stage_id , idstatement, typestatement , setRender , setState , request_type }) {
  //UseState
  const [loader , setLoader] = useState(false)
  const [id, setId] = useState();
  const [idRes, setIdRes] = useState();
  const [titleRes, setTitleRes] = useState();
  const [remain ,setRemain] = useState('');
  const [unit ,setUnit] = useState('');
  const [CoWorker, setCoWorker] = useState([]);
  const [Watchers, setWatchers] = useState([]);
  const [Responsible, setResponsible] = useState([]);
  const [Director, setDirector] = useState([]);
  const [deadline_date, setDeadlineDate] = useState(null);
  const [task_name, setTaskName] = useState("");
  const [budget, setBudget] = useState("");
  const [file, setFile] = useState("");
  const [description, setDescription] = useState("");
  const [subtasks] = useState([]);
  const [attached_document] = useState("");
  //Checkboxes
  const [is_critical, setIsCriticalChecked] = useState(false);
  const [allow_change_deadline, setIsAllowChange] = useState(false);
  const [skip_dayoffs, setisSkipDayOff] = useState(false);
  const [check_after_finish, setIsCheckFinish] = useState(false);
  const [determ_by_subtasks, setIsDeterm] = useState(false);
  const [report_after_finish, setIsReportFinish] = useState(false);
  const navigate = useNavigate()
  //Notifications
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  //Dispatch
  const dispatch = useDispatch();

  //Function

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

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
		setRender(true)
	  }, []);
	
	const myTeam = useSelector((state) => state.collective.members);


	const data = [myTeam];

  // const allResponsible = {
  //   member_id: Responsible.id ,
  //   member_type: "Ответственный",
  // };

 

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (task_name === "") {
      setNotify({
        isOpen: true,
        message: "Введите название задачи",
        type: "warning",     sound: 'warning'
      });
    } 
    
    
    else if (allResponsible[0].member_id === undefined) {
      setNotify({
        isOpen: true,
        message: "Выберите ответственного",
        type: "warning",     sound: 'warning'
      });
    } else {
      event.preventDefault();

      let clipedStatement = "";
      if (idstatement === undefined) {
        clipedStatement = "";
      } else {
        clipedStatement = idstatement;
      }
    setDeadlineDate(null)
      
    let budgetDouble = parseFloat(budget);

      try {
        setLoader(true)
        let response = await createTask({
          task_name,
          is_critical,
          description,
          members: selectedPeople,
          deadline_date,
          allow_change_deadline,
          skip_dayoffs,
          check_after_finish,
          determ_by_subtasks,
          report_after_finish,
          subtasks,
          attached_document: String(clipedStatement),
          stage:stage_id,
          budget:budgetDouble , 
          resources:resources
        });

        dispatch(
          postTask({
            task_name: task_name,
            is_critical,
            description: description,
            members: selectedPeople,
            deadline_date,
            allow_change_deadline,
            skip_dayoffs,
            check_after_finish,
            determ_by_subtasks,
            report_after_finish,
            subtasks,
            attached_document: clipedStatement,
            stage:stage_id,
            budget:budget , 
            resources:resources
          })
        );

        let withFile = { file: file };

        let response1 = await updateStatusTask(response.data.id, withFile);

        dispatch(setUpdatedStatusTask(response1.data));

        setNotify({
          isOpen: true,
          message: "Задача успешно отправлена",
           type: "success", sound : "success"
        });
  
        setState(({ isPaneOpen: false } ))
        setRender(true);
        navigate(-1)
      } catch (error) {
   
        setNotify({
          isOpen: true,
          message: "Ошибка",
          type: "error",
        });
   
      }finally{
        setLoader(false)
      }
    }
  };
  //UseSelector


  let formData = new FormData();
  const allResponsible = Responsible.map(({ value }) => ({
    member_id: value,
    member_type: "Ответственный",
  }));
  const allCoWorkers = CoWorker.map(({ value }) => ({
    member_id: value,
    member_type: "Соисполнитель",
  }));
  const allWatchers = Watchers.map(({ value }) => ({
    member_id: value,
    member_type: "Наблюдатель",
  }));

  const selectedPeople = [...allResponsible, ...allCoWorkers, ...allWatchers];
  const [resources, setResources] = useState([]);
  const [selectedResources, setSelectedResources] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const handleChange = (event, newValue) => {
    setQuantity(newValue);
  };
  
  const handleChangeBudget = (event, newValue) => {
    setBudget(newValue);
  };
  const handleInputChange = (event) => {
    setBudget(event.target.value === '' ? '' : Number(event.target.value));
  };
  const handleBlur = () => {
    if (budget < 0) {
      setBudget(0);
    } else if (budget > budgetForTask) {
      setBudget(budgetForTask);
    }
  };

  // const handleBlur = () => {
  //   if (budgetForTask < 0) {
  //     setBudget(0);
  //   } else if (budgetForTask > 100) {
  //     setBudget(100);
  //   }
  // };

  const handleAddResource = (e) => {
    e.preventDefault();
    // Проверяем, что значения idRes и remain не пустые перед добавлением
    if (idRes && remain !== '') {
      // Создаем новый объект с данными и добавляем его в массив ресурсов
      let idResInt = parseInt(idRes)
      const newResource = {
        resource: idResInt,

        quantity: quantity
      };
      const output = {
        resource: idResInt,
        title:titleRes ,
        quantity: quantity,
        unit: unit
      };
      setSelectedResources(prevResources => [...prevResources, output]);

      setResources(prevResources => [...prevResources, newResource]);

      setIdRes('');
      setQuantity('');
      setTitleRes('');
      setRemain(''); 
      setUnit(''); 
    }
  };

  const handleRemoveResource = (id) => {
    // Создаем копию массива selectedResources и фильтруем его, оставляя только элементы с другим id
    const updatedSelectedResources = selectedResources.filter((item) => item.resource !== id);
  
    // Обновляем состояние selectedResources, чтобы отобразить изменения в UI
    setSelectedResources(updatedSelectedResources);
  
    // Теперь также нужно обновить массив resources, чтобы удалить соответствующий ресурс
    const updatedResources = resources.filter((item) => item.resource !== id);
  
    // Обновляем состояние resources
    setResources(updatedResources);
  };
  return (
    <div className={styles.task_wrapper}>
      <form>
        <div className={styles.task_heading}>
        <div className={styles.added_raport}>
            {typestatement === undefined ? (
              ""
            ) : (
              <>
              
                <h4
             style={{paddingBottom:'15px'}}
                >{`Прикрепленный документ: ${typestatement}`}</h4>
              </>
            )}
          </div>
          <div className={styles.task_heading_top} style={{marginBottom:'6px'}}>
            <h3 style={{color:'white'}}>Бюджет:</h3>
          <Slider value={budget}  onChange={handleChangeBudget} m aria-label="Default" valueLabelDisplay="auto" max={budgetForTask} />
<input
       className={styles.title_input}
            value={budget}
            size="small"
            onChange={handleInputChange}
            onBlur={handleBlur}
            placeholder={`Бюджет : ${budgetForTask}`}
            inputProps={{
              step: 10,
              min: 0,
              max: 100,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
              </div>
          <div className={styles.task_heading_top}>
            
            <input
              id="title"
              name="title"
              placeholder="Введите название задачи"
              className={styles.title_input}
              value={task_name}
              onChange={(e) => setTaskName(e.target.value)}
              maxLength={35}
            />


            <div className={styles.task_heading_right}>
              <div className={styles.checkbox}>
                <input
                  id="important"
                  name="title"
                  type="checkbox"
                  className={styles.title_input_check}
                  checked={is_critical}
                  onChange={() => setIsCriticalChecked(!is_critical)}
                />
                <span>Это важная задача</span>
              </div>
            </div>
          </div>
          <textarea
            id="discription"
            name="discription"
            className={styles.discription_input}
            placeholder="Описание"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
       
         
        </div>
        <div className={styles.task_options}>
          <TaskResponsible
            dataResponsible={data}
            setResponsible={setResponsible}
            isMilti={true}
            text= {"Ответственный"}
          />
          <TaskWatchers dataWatchers={data} setWatchers={setWatchers} />
          <TaskCoWorker dataCoWorker={data} setCoWorker={setCoWorker} />
          {/* <TaskDirector dataDirector={data} setDirector={setDirector} /> */}
          <TaskDeadline
            setIsAllowChange={setIsAllowChange}
            setisSkipDayOff={setisSkipDayOff}
            setIsCheckFinish={setIsCheckFinish}
            setIsDeterm={setIsDeterm}
            setDeadlineDate={setDeadlineDate}
            showChecks={true}
          />

          {/* <TaskResult setIsReportFinish={setIsReportFinish} /> */}
    
        </div>
    
        <div className={styles.task_options} style={{marginTop:'5px'}}>
          <div style={{display:'flex' ,gap:'30px'}}>
            <div>
          <h4 style={{paddingTop:'15px'}}>Добавление ресурсов к задаче</h4>
          <div style={{maxWidth:'250px'}}>
          <DropdownResources setId={setIdRes} setType={setTitleRes} setRemain = {setRemain} setUnit = {setUnit} title = {'Вид'} data = {request_type ?? []}/> 
          <Slider value={quantity} onChange={handleChange} m aria-label="Default" valueLabelDisplay="auto" max={remain} />
          <Button className={styles.btn1}  onClick={handleAddResource}>
              Добавить ресурс 
            </Button>
            </div>
          </div>
          <div style={{marginTop:'15px'}}> 
          {selectedResources.map((item) => (
    <div key={item.resource} style={{display:'flex', gap:'15px'}}>
      <h4>
        {item.title} : {item.quantity} {item.unit}
      </h4>
      <span style={{cursor:'pointer'}}onClick={(e) => { e.preventDefault(); handleRemoveResource(item.resource); }}>
  <img src={deleteIcon}  className={styles.size} alt="Удалить" />
</span>
    </div>
  ))}
    </div>

        </div>
        </div>
     
        <div className={styles.task_footer}>
        {loader? (   <ScaleLoader



color="white" size={30} />) : (<Button className={styles.btn1} onClick={handleSubmit}>
              Создать задачу
            </Button>)}
          </div>
      </form>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
}

export default TaskStageForm;
