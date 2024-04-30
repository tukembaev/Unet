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
import { useParams } from "react-router-dom";
import { getMyMembers, getMyTeam } from "../../../service/CollectiveService";
import { setMyMembers, setMyTeam } from "../../../store/slices/CollectiveSlice";

function TaskForm({ idstatement, typestatement , setRender , setState }) {
  //UseState
  const [id, setId] = useState();
  const [CoWorker, setCoWorker] = useState([]);
  const [Watchers, setWatchers] = useState([]);
  const [Responsible, setResponsible] = useState([]);
  const [Director, setDirector] = useState([]);
  const [deadline_date, setDeadlineDate] = useState(null);
  const [task_name, setTaskName] = useState("");
  const [file, setFile] = useState("");
  const [description, setDescription] = useState("");
  const [subtasks] = useState([]);
  const [attached_document] = useState("");
  const [loader , setLoader] = useState(false)
  //Checkboxes
  const [is_critical, setIsCriticalChecked] = useState(false);
  const [allow_change_deadline, setIsAllowChange] = useState(false);
  const [skip_dayoffs, setisSkipDayOff] = useState(false);
  const [check_after_finish, setIsCheckFinish] = useState(false);
  const [determ_by_subtasks, setIsDeterm] = useState(false);
  const [report_after_finish, setIsReportFinish] = useState(false);
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
  const handleDescription = (e) =>{
    const maxLength = 2000;
    if(e.target.value.length <= maxLength){
      setDescription(e.target.value)
    }else{
      setNotify({
        isOpen: true,
        message: "Максимальная  длина описание 2000 символов",
        type: "warning",     sound: 'warning'
      });
    }
  }

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
          <div className={styles.task_heading_top}>
            <input
              id="title"
              name="title"
              placeholder="Введите название задачи"
              className={styles.title_input}
              value={task_name}
              onChange={(e) => setTaskName(e.target.value)}
              maxLength={18}
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
            onChange={handleDescription}
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

export default React.memo(TaskForm);
