import React, { useEffect, useState } from "react";
import styles from "./Calendar.module.scss";
import { Button, Layout } from "../../components";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import ModalWindow from "../../hooks/ModalWindow/ModalWindow";
import UpcomingEvents from "./components/UpcomingEvents";
import { useDispatch, useSelector } from "react-redux";
import Notification from "../../utils/Notifications";
import {
  createEventForAll,
  getCompanyEvents,
} from "../../service/CalendarService";
import { postEvent, setCompanyEvents } from "../../store/slices/CalendarSlice";
import "moment/locale/ru";
import userInfo from "../../utils/userInfo";
import Dropdown from "../../components/Dropdown/Dropdown";
import AcademYears from "./AcademYearsCalendarPage/AcademYearsCalendarPage";

const CalendarPage = () => {
  // states
  const [semester, setSemester] = useState(true);
  const [edication, setEducational] = useState(true);
  const [all, setAll] = useState(true);
  const [data, setData] = useState();
  const [render, setRender] = useState();
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventColor, setEventColor] = useState("#1976d2");
  const [openModal, setOpenModal] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  const request_type = [
    { id: 0, label: "Осенний З" },
    { id: 1, label: "Зимний семестр" },
    { id: 2, label: "Весенний семестр" },
    { id: 3, label: "Летний семестр" },
  ];
  const request_type2 = [
    { id: 0, label: "Регистрация на дисциплины" },
    { id: 1, label: "Модульная неделя" },
    { id: 2, label: "Экзамены" },
    { id: 3, label: "FX" },
    { id: 4, label: "Другое" },
  ];
  const [id, setId] = useState("");
  const [type, setType] = useState("");
  const user = userInfo();
  moment.locale("ru");
  const localizer = momentLocalizer(moment);
  const dispatch = useDispatch();

  // functions
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const { title, start, end, description } = event.target.elements;
    let titleEvent = id === "4" ? title.value : type;
    const newEvent = {
      title: titleEvent,
      start: new Date(start.value),
      end: new Date(end.value),
      description: description.value,
      color: eventColor,
    };
    setEvents([...events, newEvent]);
    event.target.reset();

    try {
      let response = await createEventForAll(
        newEvent.title,
        newEvent.description,
        newEvent.color,
        newEvent.start,
        newEvent.end
      );

      dispatch(
        postEvent({
          title: newEvent.title,
          description: newEvent.description,
          color: newEvent.color,
          start: newEvent.start,
          end: newEvent.end,
        })
      );

      setNotify({
        isOpen: true,
        message: "Событие успешно отправлено",
         type: "success", sound : "success"
      });
      setRender(true);
      setOpenModal(false);
      setOpenModal2(false);
      setId("");
    } catch (error) {
      

      setNotify({
        isOpen: true,
        message: "Ошибка",
        type: "error",
      });
    }
  };

  const getData = async () => {
    try {
      let response = await getCompanyEvents(data);

      dispatch(
        setCompanyEvents({
          companyCalendar: response.data,
        })
      );
    } catch (error) {
      
    }
  };

  const calendar_events = useSelector(
    (state) => state.calendar.companyCalendar
  );

  useEffect(() => {
    setRender(false);
    getData();
  }, [render]);

  function formatDateToYYYYMMDD(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear(); // Используйте полный год
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  // Применяем функцию форматирования ко всем объектам в массиве
  const formattedArray = calendar_events.map((obj) => ({
    start: formatDateToYYYYMMDD(obj.start),
    end: formatDateToYYYYMMDD(obj.end),
    title: obj.title,
    color: obj.color,
    description: obj.description,
  }));

  function formatCalendarEvents(events) {
    return events.map((event) => ({
      ...event,
      start: new Date(event.start),
      end: new Date(event.end),
    }));
  }

  const formattedEvents = formatCalendarEvents(calendar_events);
  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const handleCloseDetails = () => {
    setSelectedEvent(null);
  };

  const handleColorChange = (event) => {
    setEventColor(event.target.value);
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: event.color,
      color: "#fff",
      borderRadius: "3px",
      border: "none",
      display: "block",
      padding: "6px",
      fontSize: "14px",
    };

    return {
      style,
    };
  };


  return (
    <Layout>
      <div className={styles["planner-wrapper"]}>
        <div className={styles["planner-heading"]}>
          <div className={styles.title}>Годовое планирование</div>
          <div style={{ display: "flex", gap: "15px" }}>
            {user.is_admin_of ? (
              <Button
                className={styles["add-event"]}
                onClick={() => setOpenModal2(true)}
              >
                {" "}
                Создать семестр{" "}
              </Button>
            ) : (
              ""
            )}
            {user.is_admin_of ? (
              <Button
                className={styles["add-event"]}
                onClick={() => setOpenModal(true)}
              >
                {" "}
                Создать событие{" "}
              </Button>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className={styles["flex"]}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "column",
            }}
          >
            <div>
              <UpcomingEvents
                all={all}
                semester={semester}
                edication={edication}
                up_next={formattedEvents ?? []}
              />
              <div className={styles.planner__buttons}>
                <button
                  className={styles.planner__btn}
                  onClick={() => {
                    setSemester(true);
                    setEducational(false);
                    setAll(false);
                  }}
                >
                  Семестры
                </button>
                <button
                  className={styles.planner__btn}
                  onClick={() => {
                    setEducational(true);
                    setSemester(false);
                    setAll(false);
                  }}
                >
                  Учебное
                </button>
                <button
                  className={styles.planner__btn}
                  onClick={() => {
                    setAll(true);
                    setEducational(false);
                    setSemester(false);
                  }}
                >
                  Мероприятия
                </button>
              </div>
            </div>
          </div>

          <div className={styles["planner-container"]}>
            <Calendar
              localizer={localizer}
              events={formattedEvents}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 500}}
              className={styles["planner-calendar"]}
              onSelectEvent={handleEventClick}
              eventPropGetter={eventStyleGetter}
              messages={{
                today: "Сегодня",
                previous: "Предыдущий",
                next: "Следующий",
                month: "Месяц",
                week: "Неделя",
                day: "День",
                agenda: "Расписание",
                allDay: "Весь день",
              }}
            />

            {selectedEvent && (
              <div className={styles["event-details"]}>
                <h2 className={styles["event-details-title"]}>
                  {selectedEvent.title}
                </h2>
                <h3 className={styles["event-details-title"]}>
                  {selectedEvent.employee_name}
                </h3>
                <h4 className={styles["event-details-description"]}>
                  {selectedEvent.description}
                </h4>
                <p className={styles["event-details-time"]}>
                  {moment(selectedEvent.start).format("LLL")} -{" "}
                  {moment(selectedEvent.end).format("LLL")}
                </p>
                <button
                  className={styles["event-details-close"]}
                  onClick={handleCloseDetails}
                >
                  Закрыть
                </button>
              </div>
            )}
          </div>
        </div>
        <AcademYears setRender={setRender} calendarEvents={formattedArray} />
      </div>
      <ModalWindow
        openModal={openModal}
        setOpenModal={setOpenModal}
        modalTitle={"Создать событие"}
      >
        {" "}
        <form onSubmit={handleFormSubmit}>
          <div className={styles.decline_form}>
            <div className={styles.item_flex1}>
              <div className={styles.input_type3}>
                {id !== "4" ? (
                  <Dropdown
                    setId={setId}
                    setType={setType}
                    title={"Выберите событие"}
                    data={request_type2 ?? []}
                  />
                ) : (
                  ""
                )}

                {id === "4" ? (
                  <input
                    type="text"
                    name="title"
                    required
                    className={styles["discription_input"]}
                    placeholder="Название события"
                  />
                ) : (
                  ""
                )}

                <textarea
                  name="description"
                  required
                  rows="3"
                  className={styles["discription_input"]}
                  placeholder="Описание"
                />
                <input
                  type="color"
                  id="color"
                  style={{ margin: "0 auto" }}
                  value={eventColor}
                  onChange={handleColorChange}
                  list="reds"
                />

                <datalist id="reds">
                  <option>#2BC760</option>
                  <option>#cc5f05</option>
                  <option>#DE3737</option>
                  <option>#37D4DE</option>
                  <option>#EABFFF</option>
                </datalist>

                <input
                  type="datetime-local"
                  name="start"
                  required
                  className={styles["discription_input"]}
                />
                <input
                  type="datetime-local"
                  name="end"
                  required
                  className={styles["discription_input"]}
                />
              </div>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              onClick={(e) => {
                e.preventDefault();
                setOpenModal(false);
                setType("");
                setId("");
              }}
              className={styles.btn_pin_close}
            >
              Закрыть
            </Button>

            <Button type="submit" className={styles.btn_pin}>
              Создать
            </Button>
          </div>
        </form>
      </ModalWindow>

      <ModalWindow
        openModal={openModal2}
        setOpenModal={setOpenModal2}
        modalTitle={"Создать семестр"}
      >
        <form onSubmit={handleFormSubmit}>
          <div className={styles.decline_form}>
            <div className={styles.item_flex1}>
              <div className={styles.input_type3}>
                <Dropdown
                  setId={setId}
                  setType={setType}
                  title={"Выберите семестр"}
                  data={request_type ?? []}
                />
                <textarea
                  name="description"
                  required
                  rows="3"
                  className={styles["discription_input"]}
                  placeholder="Описание"
                />
                <input
                  type="color"
                  id="color"
                  style={{ margin: "0 auto" }}
                  value={eventColor}
                  onChange={handleColorChange}
                  list="reds"
                />

                <datalist id="reds">
                  <option>#2BC760</option>
                  <option>#cc5f05</option>
                  <option>#DE3737</option>
                  <option>#37D4DE</option>
                  <option>#EABFFF</option>
                </datalist>

                <input
                  type="datetime-local"
                  name="start"
                  required
                  className={styles["discription_input"]}
                />
                <input
                  type="datetime-local"
                  name="end"
                  required
                  className={styles["discription_input"]}
                />
              </div>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              onClick={(e) => {
                e.preventDefault();
                setOpenModal2(false);
                setType("");
                setId("");
              }}
              className={styles.btn_pin_close}
            >
              Закрыть
            </Button>

            <Button type="submit" className={styles.btn_pin}>
              Создать
            </Button>
          </div>
        </form>
      </ModalWindow>
      <Notification notify={notify} setNotify={setNotify} />
    </Layout>
  );
};

export default CalendarPage;
