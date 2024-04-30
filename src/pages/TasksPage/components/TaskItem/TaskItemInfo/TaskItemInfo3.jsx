import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { Button, Layout } from "../../../../../components";
import {
  createFinalReport,
  createFinalSubTaskReport,
  getSubTasksData,
  getTasksData,
  updateStatusTask,
  updateSubTasksData,
} from "../../../../../service/TaskService";
import {
  setFinalReport,
  setFinalReportSubTask,
  setSubTaskById,
  setTaskById,
  setUpdatedStatusTask,
  setUpdatedSubStatusTask,
} from "../../../../../store/slices/TaskSlice";
import { useNavigate } from "react-router-dom";
import styles from "./TaskItemInfo.module.scss";
import userInfo from "../../../../../utils/userInfo";
import Notification from "../../../../../utils/Notifications";
import SubTaskItem from "./SubTaskItem/SubTaskItem";
import close from "./../../../../../assets/icons/close.png";
import chat from "./../../../../../assets/icons/chat.svg";
import tree from "./../../../../../assets/icons/tree.png";
import jpeg_img from "./../../../../../assets/icons/jpg.png";
import pdf_img from "./../../../../../assets/icons/pdf.png";
import download from "./../../../../../assets/icons/download.png";
import SubTaskForm from "../../../../../components/Forms/TaskForm/components/SubTaskForm/SubTaskForm";

import ModalWindow from "../../../../../hooks/ModalWindow/ModalWindow";
import ChatTaskItem from "./ChatTaskItem/ChatTaskItem";
import SlidingPaneUtil from "../../../../../utils/SlidingPaneUtil";
import ProfilePage from "../../../../ProfilePage/ProfilePage";
import InvolvedPeople from "./components/InvolvedPeople";
import FileBlock from "../../../../../utils/FileBlock";
import Popover from "@mui/material/Popover";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";

//Start персоны

//End персон
const TaskItemInfo = React.memo(({ isSubTask }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  const [messageCount, setMessageCount] = useState();
  const [involvePeople, setInvolvePeople] = useState();
  const [isActive, setIsActive] = useState(false);
  const [state, setState] = useState({
    isPaneOpen: false,
    isPaneOpenLeft: false,
  });
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [report, setReport] = useState();
  const [report_file, setReport_File] = useState([]);
  const [modalText, setModalText] = useState("Привет");
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState([]);
  const [isShown, setIsShown] = useState(false);
  const [changeDeadline, setChangeDeadline] = useState();
  const [localTask, setLocalTask] = useState([]);
  const [width, setWidth] = useState(window.innerWidth);
  const user = userInfo();
  const taskinfo = localStorage.getItem("task");
  let text;
  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    width < 600 && handleSideNavToggle();
  }, [width]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    setIsActive(searchParams.has("subtask"));
  }, [location]);

  useEffect(() => {
    getData();
  }, [id]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.has("subtask")) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [location]);

  function handleSideNavToggle() {
    console.log("toggle it");
  }

  const getData = useCallback(async () => {
    try {
      let response;
      if (isSubTask) {
        response = await getSubTasksData(id, data);
        dispatch(setSubTaskById({ subtasksId: response.data }));
        setInvolvePeople(response.data.members_subtask);
      } else {
        response = await getTasksData(id, data);
        dispatch(setTaskById({ tasksId: response.data }));
        setInvolvePeople(response.data.members);
      }
    } catch (error) {
      
    }
  }, [id, data, isSubTask, dispatch]);

  const onFileChange = (e) => {
    setReport_File(e.target.files[0]);
  };

  const handleOpen = () => {
    setOpenModal(true);
  };

  const FinalRaport = async () => {
    if (report === undefined) {
      setNotify({
        isOpen: true,
        message: " Введите описание отчета!",
        type: "error",
      });
      return;
    }

    const newStatement = {
      report: report,
      report_file: report_file,
      status: "Завершена",
    };

    let response;
    if (isSubTask) {
      response = await createFinalSubTaskReport(id, newStatement);
      dispatch(setFinalReportSubTask(response.data));
    } else {
      response = await createFinalReport(id, newStatement);
      dispatch(setFinalReport(response.data));
    }

    setNotify({
      isOpen: true,
      message: "Отчет успешно отправлен!",
       type: "success", sound : "success"
    });
    setOpenModal(false);
  };

  const handleClick = useCallback(() => {
    setIsShown((current) => !current);
  }, []);

  const handleClickChat = useCallback(() => {
    setIsActive((current) => !current);
  }, []);

  const task = useSelector((state) =>
    isSubTask ? state.task.subtasksId : state.task.tasksId
  );

  const updateStatus = async (text) => {
    let newTask = { status: text };
    let response;
    if (isSubTask) {
      response = await updateSubTasksData(id, newTask);
      dispatch(setUpdatedSubStatusTask(response.data));
    } else {
      response = await updateStatusTask(id, newTask);
      dispatch(setUpdatedStatusTask(response.data));
    }

    const successMessage =
      text === "Начата"
        ? "Задача начата"
        : text === "Приостановлена"
        ? "Задача приостановлена"
        : "Задача завершена";

    setNotify({
      isOpen: true,
      message: successMessage,
       type: "success", sound : "success"
    });
  };

  const updateDeadline = async () => {
    let newTask = { deadline_date: changeDeadline };
    let response = await updateStatusTask(id, newTask);
    dispatch(setUpdatedStatusTask(response.data));

    setNotify({
      isOpen: true,
      message: "Дедлайн успешно изменен",
       type: "success", sound : "success"
    });

    setIsShown((current) => !current);
  };

  const uncomplited_tasks = isSubTask
    ? task?.sub_subtasks?.filter(
        (item) =>
          item.status.includes("Ждет") || item.status.includes("В процессе")
      )
    : task?.subtasks?.filter(
        (item) =>
          item.status.includes("Ждет") || item.status.includes("В процессе")
      );

  const responsible_peoples = isSubTask
    ? task?.members_subtask
        ?.filter((person) => person.member_type === "Ответственный")
        .map((item) => item.member.id)
    : task?.members
        ?.filter((person) => person.member_type === "Ответственный")
        .map((item) => item.member.id);

  const [stateUserInfo, setStateUserInfo] = useState({
    idUser: "",
    isPaneOpen: false,
    isPaneOpenLeft: false,
  });

  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const ProfileMemo = useMemo(
    () => <ProfilePage userId={task?.creator?.user} />,
    [task.creator]
  );
  return (
    <Layout>
      <div className={styles.task_info_wrapper}>
        {width > 1000 ? (
          <>
            <SlidingPaneUtil
              size="900px"
              title="Новая подзадача"
              state={state}
              setState={setState}
            >
              {" "}
              <SubTaskForm
                task={task}
                setState={setState}
                isSubTask={isSubTask}
              />{" "}
            </SlidingPaneUtil>
          </>
        ) : (
          <>
            <SlidingPaneUtil
              size="100%"
              title="Новая подзадача"
              state={state}
              setState={setState}
            >
              {" "}
              <SubTaskForm
                task={task}
                setState={setState}
                isSubTask={isSubTask}
              />{" "}
            </SlidingPaneUtil>
          </>
        )}
        <div className={styles.task_info_left}>
          <div className={styles.task_info_left_header}>
            <div>
              {" "}
              {isSubTask === true ? (
                <>
                  <div style={{ display: "flex", gap: "15px" }}>
                    <img
                      src={close}
                      style={{
                        width: "25px",
                        height: "25px",
                        cursor: "pointer",
                        marginTop: "10px",
                      }}
                      alt=""
                      onClick={() => navigate(-1)}
                    />
                    <h2 style={{ paddingTop: "5px" }}>
                      {task.subtask_name}{" "}
                      <img
                        onClick={() => {
                          navigate(`/task-tree/${task.id}/`, {
                            state: { isSubtasks: isSubTask },
                          });
                        }}
                        className={styles.size}
                        title="Дерево задачи"
                        src={tree}
                        alt=""
                      />{" "}
                    </h2>{" "}
                  </div>
                  <h4
                    className={styles.underline}
                    onClick={() => navigate(`/${task.log_url}`)}
                    style={{ paddingTop: "5px" }}
                  >
                    Подзадача к: {task.log_name}
                  </h4>{" "}
                </>
              ) : (
                <div style={{ display: "flex", gap: "15px" }}>
                  {" "}
                  <img
                    src={close}
                    style={{
                      width: "25px",
                      height: "25px",
                      cursor: "pointer",
                      marginTop: "10px",
                    }}
                    alt=""
                    onClick={() => navigate(-1)}
                  />
                  <h2 style={{ paddingTop: "5px" }}>
                    {task.task_name}{" "}
                    <img
                      onClick={() => {
                        navigate(`/task-tree/${task.id}/`, {
                          state: { isSubtasks: isSubTask },
                        });
                      }}
                      className={styles.size}
                      title="Дерево подзадачи"
                      src={tree}
                      alt=""
                    />{" "}
                  </h2>{" "}
                </div>
              )}
            </div>

            <div>
              {task.attached_document === "" ||
              task.attached_document === undefined ||
              task.attached_document === null ? (
                ""
              ) : (
                <Button
                  className={styles.btn_attach}
                  href={`/${task.attached_document}`}
                >{`Прикрепленный документ`}</Button>
              )}
            </div>
          </div>
          <div className={styles.task_info_left_body}>
            <p>{task.description}</p>
            {task.file === null ? "" : <FileBlock file_url={task?.file} />}
          </div>

          <div className={styles.task_reports}>
            {task.report != null || task.report_file != null ? (
              <>
                <h3>Отчет:</h3>
                {task.report != null ? <p>{task.report}</p> : ""}
                {task.report_file != null ? (
                  <>
                    <p>Прикрепленный файл</p>
                    <FileBlock file_url={task?.report_file} />
                  </>
                ) : (
                  ""
                )}
              </>
            ) : (
              ""
            )}
          </div>
          <div className={styles.simple_raports_footer}>
            <div className={styles.simple_raports_footer_btns}>
              <div>
                {isSubTask === true ? (
                  ""
                ) : (
                  <>
                    <Button className={styles.btn1} onClick={handleClickChat}>
                      Чат
                    </Button>
                    {task?.status === "Завершена" ? (
                      ""
                    ) : task?.creator?.user === user.userId ? (
                      <Button
                        className={styles.btn1}
                        onClick={() => setOpenModal(true)}
                      >
                        Досрочно завершить
                      </Button>
                    ) : (
                      ""
                    )}
                  </>
                )}
              </div>
              {task.status === undefined ? (
                ""
              ) : task.status === "Завершена" ? (
                ""
              ) : task.status.includes("Ждет") === true &&
                responsible_peoples.includes(user.employeeId) ? (
                <div className={styles.simple_footer_btns}>
                  <Button
                    className={styles.btn2}
                    onClick={() => setState({ isPaneOpen: true })}
                  >
                    Добавить подзадачу
                  </Button>
                  <Button
                    className={styles.btn2}
                    onClick={() => {
                      updateStatus((text = "Начата"));
                    }}
                  >
                    Начать
                  </Button>
                  {uncomplited_tasks?.length === 0 ? (
                    <Button
                      className={styles.btn2}
                      onClick={() => setOpenModal(true)}
                    >
                      Завершить
                    </Button>
                  ) : (
                    ""
                  )}
                </div>
              ) : task.status.includes("В процессе ") === true &&
                responsible_peoples.includes(user.employeeId) ? (
                <div className={styles.simple_footer_btns}>
                  <Button
                    className={styles.btn2}
                    onClick={() => setState({ isPaneOpen: true })}
                  >
                    Добавить подзадачу
                  </Button>
                  <Button
                    className={styles.btn2}
                    onClick={() => {
                      updateStatus((text = "Приостановлена"));
                    }}
                  >
                    Приостановить
                  </Button>
                  {uncomplited_tasks?.length === 0 ? (
                    <Button
                      className={styles.btn2}
                      onClick={() => setOpenModal(true)}
                    >
                      Завершить
                    </Button>
                  ) : (
                    ""
                  )}
                </div>
              ) : (
                ""
              )}
            </div>
            {isActive && (
              <div>
                <ChatTaskItem
                  setMessageCount={setMessageCount}
                  globalChat={false}
                  SupportChat={false}
                  SupportComplete={undefined}
                />
              </div>
            )}
          </div>
        </div>

        <div className={styles.task_info_right}>
          <div className={styles.task_widget}>
            <div className={styles.widget_heading}>
              <h3>{task.status} </h3>
            </div>
            <div className={styles.widget_body}>
              <div className={styles.widget_body_items}>
                <div className={styles.item_header_first}>
                  <p className={styles.item_text}>
                    Крайний срок: <span>{task.deadline_date}</span>
                  </p>

                  {isSubTask === false
                    ? task.members === undefined
                      ? []
                      : task.members
                          .filter(
                            (person) => person.member_type === "Ответственный"
                          )
                          .map((filteredPerson) =>
                            filteredPerson.member.id === user.employeeId &&
                            task.allow_change_deadline === true ? (
                              <div>
                                <span
                                  className={styles.edit_deadline_span}
                                  onClick={handleClick}
                                >
                                  Изменить дату дедлайна
                                </span>
                                {isShown && (
                                  <div className={styles.flex_col}>
                                    <input
                                      type="date"
                                      onChange={(e) =>
                                        setChangeDeadline(e.target.value)
                                      }
                                      className={styles.edit_deadline}
                                    />
                                    <Button
                                      className={styles.btn2}
                                      onClick={() => {
                                        updateDeadline(task);
                                      }}
                                    >
                                      {" "}
                                      Изменить{" "}
                                    </Button>
                                  </div>
                                )}
                              </div>
                            ) : (
                              ""
                            )
                          )
                    : task.members_subtask === undefined
                    ? []
                    : task.members_subtask
                        .filter(
                          (person) => person.member_type === "Ответственный"
                        )
                        .map((filteredPerson) =>
                          filteredPerson.member.id === user.employeeId &&
                          task.allow_change_deadline === true ? (
                            <div>
                              <span
                                className={styles.edit_deadline_span}
                                onClick={handleClick}
                              >
                                Изменить дату дедлайна
                              </span>
                              {isShown && (
                                <div className={styles.flex_col}>
                                  <input
                                    type="date"
                                    onChange={(e) =>
                                      setChangeDeadline(e.target.value)
                                    }
                                    className={styles.edit_deadline}
                                  />
                                  <Button
                                    className={styles.btn2}
                                    onClick={() => {
                                      updateDeadline(task);
                                    }}
                                  >
                                    {" "}
                                    Изменить{" "}
                                  </Button>
                                </div>
                              )}
                            </div>
                          ) : (
                            ""
                          )
                        )}
                </div>
                <div className={styles.item}>
                  <p className={styles.item_text}>
                    Поставлена: <span> {task.create_date} </span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.task_widget}>
            <div className={styles.widget_heading}>
              <h3>Люди вовлеченные в задачу </h3>
            </div>
            <div className={styles.widget_body}>
              <div className={styles.widget_body_items}>
                <InvolvedPeople
                  text_role={"Ответственный"}
                  setStateUserInfo={setStateUserInfo}
                  involvePeople={involvePeople}
                />
                <InvolvedPeople
                  text_role={"Наблюдатель"}
                  setStateUserInfo={setStateUserInfo}
                  involvePeople={involvePeople}
                />
                <InvolvedPeople
                  text_role={"Соисполнитель"}
                  setStateUserInfo={setStateUserInfo}
                  involvePeople={involvePeople}
                />
                <PopupState variant="popover" popupId="demo-popup-popover">
                  {(popupState) => (
                    <>
                      <div className={styles.item}>
                        <p className={styles.item_text}>
                          Постановщик:
                          <div
                            className={styles.cursor_pointer}
                            aria-owns={open ? "mouse-over-popover" : undefined}
                            aria-haspopup="true"
                            onMouseEnter={handlePopoverOpen}
                            onMouseLeave={handlePopoverClose}
                          >{`${
                            task.creator === undefined
                              ? ""
                              : ` ${task.creator.first_name} ${task.creator.surname}`
                          }`}</div>
                        </p>
                      </div>
                      <Popover
                        id="mouse-over-popover"
                        sx={{
                          pointerEvents: "none",
                        }}
                        open={open}
                        anchorEl={anchorEl}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "center",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "center",
                        }}
                        onClose={handlePopoverClose}
                      >
                        {ProfileMemo}
                      </Popover>
                    </>
                  )}
                </PopupState>
              </div>
            </div>
          </div>
        </div>
        <Notification notify={notify} setNotify={setNotify} />
      </div>

      <div className={styles.subtask_head}>
        <h1>Подзадачи</h1>
      </div>
      <div className={styles.wrapper}>
        {task?.subtasks?.map((item) => {
          return (
            <SubTaskItem task={item} setStateUserInfo={setStateUserInfo} />
          );
        })}
        {task?.sub_subtasks?.map((item) => {
          return (
            <SubTaskItem task={item} setStateUserInfo={setStateUserInfo} />
          );
        })}
      </div>

      <ModalWindow
        openModal={openModal}
        setOpenModal={setOpenModal}
        modalTitle={"Для этой задачи обязателен отчет"}
      >
        <div className={styles.decline_form}>
          <div className={styles.item_flex}>
            <div className={styles.input_type3}>
              <textarea
                onChange={(e) => setReport(e.target.value)}
                className={styles.discription_input}
                placeholder="Описание отчета"
                required
              />
              <input
                type="file"
                name="file_upload"
                onChange={onFileChange}
                // accept="image/& , .pdf"
              />
            </div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            onClick={() => setOpenModal(false)}
            className={styles.btn_pin_close}
          >
            Закрыть
          </Button>
          <Button onClick={FinalRaport} className={styles.btn2}>
            Сохранить
          </Button>
        </div>
      </ModalWindow>
    </Layout>
  );
});
export default TaskItemInfo;
