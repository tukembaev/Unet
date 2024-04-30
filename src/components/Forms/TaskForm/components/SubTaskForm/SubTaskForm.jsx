import React, { useEffect, useState } from "react";

import styles from "./SubTaskForm.module.scss";

import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Button from "../../../../Button/Button";
import TaskResponsible from "../TaskResponsible/TaskResponsible";
import { setEmployee, setSubTask, setSubTaskforSubTask } from "../../../../../store/slices/TaskSlice";
import { createSubTask, createSubTaskForSubTask, getEmployee } from "../../../../../service/TaskService";
import Notification from "../../../../../utils/Notifications";
import TaskDeadline from "../TaskDeadline/TaskDeadline";
import { useNavigate } from "react-router-dom";
import TaskWatchers from "../TaskWatchers/TaskWatchers";
import TaskCoWorker from "../TaskCoWorker/TaskCoWorker";
import DropdownResources from "../../../../Dropdown/DropdownResources";
import { Slider } from "@mui/material";
import { getMyMembers } from "../../../../../service/CollectiveService";
import { setMyMembers } from "../../../../../store/slices/CollectiveSlice";
import deleteIcon from './../../../../../assets/icons/trash_del.svg';
function SubTaskForm({ task , setState ,isSubTask}) {
  //UseState
  const [idRes, setIdRes] = useState();
  const [taskIdRes, setTaskIdRes] = useState();
  const [titleRes, setTitleRes] = useState();
  const [remain ,setRemain] = useState('');
  const [unit ,setUnit] = useState('');

  const [resources, setResources] = useState([]);
  const [selectedResources, setSelectedResources] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const [task_name2, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [Responsible, setResponsible] = useState([]);
  const [CoWorker, setCoWorker] = useState([]);
  const [Watchers, setWatchers] = useState([]);
  const [deadline_date, setDeadlineDate] = useState(null);

  //Notification
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  //Dispatch & Navigate & Params
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  //Functions
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


	const data = [myTeam];


  const responsibleMan = {
    member_id:Responsible.value,
    member_type: "Ответственный",
  }
  const allCoWorkers = CoWorker.map(({ value }) => ({
    member_id: value,
    member_type: "Соисполнитель",
  }));
  const allWatchers = Watchers.map(({ value }) => ({
    member_id: value,
   member_type: "Наблюдатель",
  }));

  const selectedPeople = [responsibleMan , ...allCoWorkers, ...allWatchers];
  

  let SubTaskInfo = [
    {

      members_subtask: selectedPeople,
      subtask_name: task_name2,
      description: description,
      deadline_date: deadline_date,
      resources:resources
    },
  ];

  const handleSubmit = async (event, task) => {
    event.preventDefault();

    if (task_name2 === "") {
      setNotify({
        isOpen: true,
        message: "Введите название подзадачи",
        type: "warning",     sound: 'warning'
      });
    } else if (Responsible.id === undefined) {
      setNotify({
        isOpen: true,
        message: "Выберите ответственного",
        type: "warning",     sound: 'warning'
      });
    } else if (isSubTask === false) {
      let newSubTask = {
        deadline_date: task.deadline_date,
        subtasks: SubTaskInfo,
      };
      
      let response = await createSubTask(id, newSubTask);

      dispatch(setSubTask(response.data));
      setNotify({
        isOpen: true,
        message: "Подзадача успешно создана",
         type: "success", sound : "success"
      });

      setState({ isPaneOpen: false })
    }else{
      
      let newSubTask = {
        deadline_date: task.deadline_date,
        sub_subtasks: SubTaskInfo,
      };

      let response = await createSubTaskForSubTask(id, newSubTask);
     
      dispatch(setSubTaskforSubTask(response.data));
      setNotify({
        isOpen: true,
        message: "Подзадача успешно создана",
         type: "success", sound : "success"
      });

      setState({ isPaneOpen: false })
    }
  };

  const [is_critical, setIsCriticalChecked] = useState(false);
  const [allow_change_deadline, setIsAllowChange] = useState(false);
  const [skip_dayoffs, setisSkipDayOff] = useState(false);

  const [check_after_finish, setIsCheckFinish] = useState(false);
  const [determ_by_subtasks, setIsDeterm] = useState(false);
  const [report_after_finish, setIsReportFinish] = useState(false);

  const [request_type, setRequestType] = useState([]);
  useEffect(() => {
    // Transform the 'resources' array into the desired structure
    const transformedResources = task?.resources?.map((resource) => ({
      id: resource.id,
      label: resource.resource_title,
      remain: resource.remain,
      unit:resource.unit === 'kg' ? 'кг' :  resource.unit === 'g' ? 'грамм' :  resource.unit === 'l' ? 'литр' :  resource.unit === 'ml' ? 'миллилитр' : 'шт',

    }));
  
    // Set the state with the transformed resources
    setRequestType(transformedResources);
  }, []);


  const handleChange = (event, newValue) => {
    setQuantity(newValue);
  };
  

  const handleAddResource = (e) => {
    e.preventDefault();
    // Проверяем, что значения idRes и remain не пустые перед добавлением
    if (idRes && remain !== '') {
      // Создаем новый объект с данными и добавляем его в массив ресурсов
      let idResInt = parseInt(idRes)
      
      const newResource = {
        task_resource: idResInt,
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
          <div className={styles.task_heading_top}>
            <input
              id="title"
              name="title"
              placeholder="Введите название подзадачи"
              className={styles.title_input}
              value={task_name2}
              onChange={(e) => setTaskName(e.target.value)}
              maxLength={18}
            />
          </div>
          <div className={styles.task_heading_bot}>
            <input
              id="discrip"
              name="discrip"
              placeholder="Описание подзадачи"
              className={styles.title_input}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.task_options}>
          <TaskResponsible
            dataResponsible={data}
            setResponsible={setResponsible}
            IsMilti={false}
            text= {"Ответственный"}
          />
          <TaskWatchers dataWatchers={data} setWatchers={setWatchers} />
          <TaskCoWorker dataCoWorker={data} setCoWorker={setCoWorker} />
          <TaskDeadline
            setIsAllowChange={setIsAllowChange}
            setisSkipDayOff={setisSkipDayOff}
            setIsCheckFinish={setIsCheckFinish}
            setIsDeterm={setIsDeterm}
            setDeadlineDate={setDeadlineDate}
            showChecks={false}
          />
        </div>
        {task.resources.length !== 0 ?  
        <div className={styles.task_options} style={{marginTop:'5px'}}>
          <div style={{display:'flex' ,gap:'30px'}}>
            <div>
          <h4 style={{paddingTop:'15px'}}>Добавление ресурсов к задаче</h4>
          <div style={{maxWidth:'250px'}}>
          <DropdownResources setId={setIdRes} setType={setTitleRes} setRemain = {setRemain} setUnit = {setUnit} setTaskIdRes = {setTaskIdRes} title = {'Вид'} data = {request_type ?? []}/> 
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
        </div> : null }
    
        <div className={styles.task_footer}>
            <Button
              className={styles.btn1}
              onClick={(event) => {
                handleSubmit(event, task);
              }}
            >
              Создать подзадачу
            </Button>
          </div>
      </form>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
}

export default SubTaskForm;
