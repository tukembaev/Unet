import React, { useEffect, useState, useCallback } from "react";
import { Layout, Button } from "../../components/index";
import KanbanTable from "./components/KanbanTable/KanbanTable";
import styles from "./TasksPage.module.scss";
import "react-sliding-pane/dist/react-sliding-pane.css";
import TaskForm from "../../components/Forms/TaskForm/TaskForm";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  RequestReport,
  getSubTasksDataUser,
  getTasksDataUser,
} from "../../service/TaskService";
import { setTaskById } from "../../store/slices/TaskSlice";
import CompletedTaskTable from "./components/KanbanTable/CompletedTaskTable";
import SlidingPaneUtil from "../../utils/SlidingPaneUtil";
import cx from "classnames";
import { ScaleLoader } from "react-spinners";
import refresh from "./../../assets/icons/refresh-white.png";
import EmployeeSelectUserId from "../../hooks/EmployeeSelect/EmployeeSelectUserId";
import userInfo from "../../utils/userInfo";
import EmployeeRoleSelect from "../../hooks/EmployeeSelect/EmployeeRoleSelect";
import EmployeeStatusSelect from "../../hooks/EmployeeSelect/EmployeeStatusSelect";
import ReportTaskTable from "./components/KanbanTable/ReportTaskTable";
import Notification from "../../utils/Notifications";
import ModalWindow from "../../hooks/ModalWindow/ModalWindow";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import BottomSheet from "../../components/BottomSheet/BottomSheet";
function TasksPage() {
  const [width, setWidth] = useState(window.innerWidth);
  const [showFilter, setShowFilter] = useState(false);

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [loading, setLoading] = useState(true);
  const [render, setRender] = useState(false);
  const [state, setState] = useState({
    isPaneOpen: false,
    isPaneOpenLeft: false,
  });

  const [data, setData] = useState([]);
  const [Menu, setMenu] = useState({
    isSubtasks: false,
    isReport: false,
  });

  const [choose, setChoose] = useState(1);
  const user = userInfo();

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [width]);
  useEffect(() => {
    width < 600 && handleSideNavToggle();
  }, []);
  function handleSideNavToggle() {
    console.log("toggle it");
  }

  const dispatch = useDispatch();
  const { id } = useParams();

  const getData = async () => {
    if (Menu.isSubtasks === true) {
      try {
        let response = await getSubTasksDataUser(id, data);
        dispatch(
          setTaskById({
            tasksId: response.data,
          })
        );
        setData(response.data);
        setLoading(false);
      } catch (error) {}
    } else {
      try {
        let response = await getTasksDataUser(id, data);

        dispatch(
          setTaskById({
            tasksId: response.data,
          })
        );
        setData(response.data);
        setLoading(false);
      } catch (error) {}
    }
  };

  const allTasks = useSelector((state) => state.task);
  const ALL = allTasks.tasksId.ALL;
  const [searchTerm, setSearchTerm] = useState("");

  const [SearchByTitle, setSearchByTitle] = useState(false);
  const handleSearch = useCallback((event) => {
    setSearchTerm(event.target.value);
  }, []);

  useEffect(() => {
    getData();
    setRender(false);
    setChoose(1);
  }, [render, Menu]);

  const handleClickShowFilter = (event) => {
    setShowFilter((current) => !current);
  };
  const [openModal, setOpenModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState([user.userId]);
  const [selectedEmployeeLabel, setSelectedEmployeeLabel] = useState([]);
  const [selectedRole, setSelectedRole] = useState([]);
  const [selectedRoleLabel, setSelectedRoleLabel] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [responseInfo, setResponseInfo] = useState("");
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Simpleraport",
  });

  const handleSubmitReport = async () => {
    try {
      let response = await RequestReport({
        employees: selectedEmployee,
        roles: selectedRole,
        statuses: selectedStatus.includes("Все") ? [] : selectedStatus,
        startDate: startDate,
        endDate: endDate,
      });

      setResponseInfo(response.data);
      setOpenModal(false);
    } catch (error) {
      setNotify({
        isOpen: true,
        message: "Ошибка",
        type: "error",
      });
      setOpenModal(false);
    }
  };

  const date = new Date();

  const monthNames = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ];

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const formattedDate = `${day} ${monthNames[monthIndex]} ${year} ${hours}:${minutes}`;
  const currentURL = window.location.href;

  return (
    <Layout>
      <div className={styles.top_header}>
        {Menu.isReport === true ? (
          ""
        ) : Menu.isSubtasks ? (
          <select
            className={styles.title2}
            value={choose}
            onChange={(e) => setChoose(parseInt(e.target.value))}
          >
            <option value={1}>Все мои подзадачи</option>
            <option value={2}>Мои подзадачи/Делаю</option>
            <option value={3}>Мои подзадачи/Помогаю</option>
            <option value={4}>Мои подзадачи/Поручил</option>
            <option value={5}>Мои подзадачи/Наблюдаю</option>
            <option value={6}>Мои задачи/Завершенные</option>{" "}
          </select>
        ) : (
          <select
            className={styles.title2}
            value={choose}
            onChange={(e) => setChoose(parseInt(e.target.value))}
          >
            <option value={1}>Все мои задачи</option>
            <option value={2}>Мои задачи/Делаю</option>
            <option value={3}>Мои задачи/Помогаю</option>
            <option value={4}>Мои задачи/Поручил</option>
            <option value={5}>Мои задачи/Наблюдаю</option>
            <option value={6}>Мои задачи/Завершенные</option>{" "}
          </select>
        )}

        <div className={styles.wrapper_menu}>
          <div className={styles.list__wrapper}>
            <div className={styles.list__item}>
              <a
                href="#"
                className={cx(
                  styles.list__link,
                  Menu.isSubtasks === false && Menu.isReport === false
                    ? styles.active
                    : ""
                )}
                onClick={() => {
                  setChoose(1);
                  setMenu({ isSubtasks: false, isReport: false });
                  setLoading(true);
                }}
              >
                Задачи
              </a>
            </div>

            <div className={styles.list__item}>
              <a
                href="#"
                className={cx(
                  styles.list__link,
                  Menu.isSubtasks ? styles.active : ""
                )}
                onClick={() => {
                  setChoose(1);
                  setMenu({ isSubtasks: true });
                  setLoading(true);
                }}
              >
                Подзадачи
              </a>
            </div>
            <div className={styles.list__item}>
              <a
                href="#"
                className={cx(
                  styles.list__link,
                  Menu.isReport ? styles.active : ""
                )}
                onClick={() => {
                  setChoose(1);
                  setMenu({ isReport: true });
                  setLoading(true);
                  setResponseInfo("");
                }}
              >
                Отчеты
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.wrapper_task_parent}>
        <div className={styles.wrapper_task}>
          {Menu.isReport !== true ? (
            <div className={styles.titile__wrapper}>
              <div>
                {Menu.isSubtasks ? (
                  ""
                ) : (
                  <Button
                    className="create__statement__btn"
                    onClick={() => setState({ isPaneOpen: true })}
                  >
                    Создать задачу
                  </Button>
                )}
              </div>
              <div className={styles.task__parent}>
                <input
                  className={styles.search}
                  placeholder={
                    SearchByTitle
                      ? "Введите название задачи"
                      : "Введите ответственного"
                  }
                  type="text"
                  value={searchTerm}
                  onChange={handleSearch}
                />

                <span>
                  <img
                    src={refresh}
                    title={
                      SearchByTitle
                        ? "Поиск по ответственному"
                        : "Поиск по названию задачи"
                    }
                    className={styles.search_choose}
                    onClick={() => setSearchByTitle((current) => !current)}
                  />
                </span>
              </div>
            </div>
          ) : (
            <>
              <Button
                className="create__statement__btn"
                onClick={() => setOpenModal(true)}
                style={{ marginBottom: "15px" }}
              >
                Создать отчет
              </Button>
              {responseInfo === "" ? (
                ""
              ) : (
                <Button
                  className="create__statement__btn"
                  onClick={handlePrint}
                  style={{ marginBottom: "15px", marginLeft: "15px" }}
                >
                  Распечатать
                </Button>
              )}
            </>
          )}

          <div className={styles.line}></div>
          {loading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100px",
              }}
            >
              <ScaleLoader color="white" size={30} />{" "}
              {/* Используйте нужные вам свойства для настройки загрузочного индикатора */}
            </div>
          ) : Menu.isReport !== true ? (
            <div>
              {(() => {
                switch (choose) {
                  case 1:
                    return (
                      <KanbanTable
                        allTasks={allTasks.tasksId?.ALL}
                        searchTerm={searchTerm}
                        SearchByTitle={SearchByTitle}
                        isSubtasks={Menu.isSubtasks}
                      />
                    );
                  case 2:
                    return (
                      <KanbanTable
                        allTasks={allTasks.tasksId?.DOING}
                        isSubtasks={Menu.isSubtasks}
                        searchTerm={searchTerm}
                        SearchByTitle={SearchByTitle}
                      />
                    );
                  case 3:
                    return (
                      <KanbanTable
                        allTasks={allTasks.tasksId?.HELPING}
                        isSubtasks={Menu.isSubtasks}
                        searchTerm={searchTerm}
                        SearchByTitle={SearchByTitle}
                      />
                    );
                  case 4:
                    return (
                      <KanbanTable
                        allTasks={allTasks.tasksId?.INSTRUCTED}
                        isSubtasks={Menu.isSubtasks}
                        searchTerm={searchTerm}
                        SearchByTitle={SearchByTitle}
                      />
                    );
                  case 5:
                    return (
                      <KanbanTable
                        allTasks={allTasks.tasksId?.WATCHING}
                        isSubtasks={Menu.isSubtasks}
                        searchTerm={searchTerm}
                        SearchByTitle={SearchByTitle}
                      />
                    );
                  case 6:
                    return (
                      <CompletedTaskTable
                        completedTasks={allTasks.tasksId?.COMPLETED}
                        isSubtasks={Menu.isSubtasks}
                        searchTerm={searchTerm}
                        SearchByTitle={SearchByTitle}
                      />
                    );
                  default:
                    return "";
                }
              })()}
            </div>
          ) : (
            <div>
              <style>
                {`
      @media print {
        /* Стили, применяемые при печати */
        body {
          background-color: white;
          font-size: 12pt;
 
        }
        /* Пример стилизации элементов при печати */
        .print-only {
          padding: 15px;
          color: white;
        }
        /* Стилизация элемента h4 при печати */
        .print-only h4 {
          color: black !important;
        }
      }
    `}
              </style>

              {responseInfo ? (
                <div className="print-only" ref={componentRef}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "0 15px",
                    }}
                  >
                    <h4 style={{ color: "white", paddingTop: "15px" }}>
                      {" "}
                      {currentURL}{" "}
                    </h4>
                    <h4 style={{ color: "white", paddingTop: "15px" }}>
                      {" "}
                      {formattedDate}{" "}
                    </h4>
                  </div>
                  <div style={{ padding: "0 15px" }}>
                    {user?.position?.includes("Ректор") ||
                    user?.position?.includes("Проректор") ? (
                      <h4 style={{ color: "white", paddingTop: "15px" }}>
                        Выбранные сотрудники:{" "}
                        {selectedEmployeeLabel?.map((item) => (
                          <span style={{ paddingLeft: "4px" }}>{item}</span>
                        ))}
                      </h4>
                    ) : null}

                    <h4 style={{ color: "white" }}>
                      Выбранные роли:{" "}
                      {selectedRole?.map((item) => (
                        <span>{item}</span>
                      ))}
                    </h4>
                    <h4 style={{ color: "white" }}>
                      Выбранный статус: <span>{selectedStatus}</span>
                    </h4>
                    <h4 style={{ color: "white" }}>
                      Начало: <span>{startDate}</span>
                    </h4>
                    <h4 style={{ paddingBottom: "10px", color: "white" }}>
                      Конец: <span>{endDate}</span>
                    </h4>
                  </div>

                  <ReportTaskTable
                    tasks={responseInfo.TASKS ?? []}
                    subtasks={responseInfo.SUBTASKS ?? []}
                    componentRef={componentRef}
                  />
                </div>
              ) : null}
            </div>
          )}
        </div>
        <ModalWindow
          openModal={openModal}
          setOpenModal={setOpenModal}
          modalTitle={"Создать отчет"}
        >
          <div
            className={styles.titile__wrapper}
            style={{ gap: "25px", flexDirection: "column" }}
          >
            {user?.position?.includes("Ректор") ||
            user?.position?.includes("Проректор") ? (
              <EmployeeSelectUserId
                selectedEmployee={setSelectedEmployee}
                setSelectedEmployeeLabel={setSelectedEmployeeLabel}
                isMulti={true}
              />
            ) : (
              ""
            )}
            <EmployeeRoleSelect
              setSelectedRole={setSelectedRole}
              isMulti={true}
            />
            <EmployeeStatusSelect
              setSelectedStatus={setSelectedStatus}
              isMulti={true}
            />
            <input
              type="date"
              onChange={(e) => setStartDate(e.target.value)}
              name="start"
              required
              className={styles.discription_input}
            />
            <input
              type="date"
              onChange={(e) => setEndDate(e.target.value)}
              name="end"
              required
              className={styles.discription_input}
            />
            <div style={{ display: "flex", gap: "25px" }}>
              <button
                className={styles.btn_pin_close}
                onClick={() => setOpenModal(false)}
              >
                Закрыть
              </button>
              <button className={styles.btn_pin} onClick={handleSubmitReport}>
                Создать
              </button>
            </div>
          </div>
        </ModalWindow>
      </div>
      <Notification notify={notify} setNotify={setNotify} />
      {width > 1000 ? (
        <BottomSheet
          title={"Новая задача"}
          isOpen={state.isPaneOpen}
          onClose={setState}
        >
          <TaskForm setRender={setRender} setState={setState} />{" "}
        </BottomSheet>
      ) : (
        <SlidingPaneUtil
          size="100%"
          title="Новая задача"
          state={state}
          setState={setState}
        >
          {" "}
          <TaskForm setRender={setRender} setState={setState} />{" "}
        </SlidingPaneUtil>
      )}
    </Layout>
  );
}

export default React.memo(TasksPage);
