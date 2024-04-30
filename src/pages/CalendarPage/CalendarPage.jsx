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
  createEvent,
  createEventForAll,
  getCompanyEvents,
  getUserEvents,
} from "../../service/CalendarService";
import {
  postEvent,
  setCompanyEvents,
  setUserEvents,
} from "../../store/slices/CalendarSlice";
import "moment/locale/ru";
import userInfo from "../../utils/userInfo";
const CalendarPage = () => {
  const [data, setData] = useState();
  const [render, setRender] = useState();
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventColor, setEventColor] = useState("#1976d2");
  const [openModal, setOpenModal] = useState(false);
  const [privateCalendar, setPrivateCalendar] = useState(true);
  const user = userInfo();
  moment.locale("ru");
  const localizer = momentLocalizer(moment);
  const dispatch = useDispatch();
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const { title, start, end, description } = event.target.elements;
    const newEvent = {
      title: title.value,
      start: new Date(start.value),
      end: new Date(end.value),
      description: description.value,
      color: eventColor,
    };
    setEvents([...events, newEvent]);
    event.target.reset();
    if (privateCalendar) {
      try {
        let response = await createEvent(
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
      } catch (error) {
        

        setNotify({
          isOpen: true,
          message: "Ошибка",
          type: "error",
        });
      }
    } else {
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
      } catch (error) {
        

        setNotify({
          isOpen: true,
          message: "Ошибка",
          type: "error",
        });
      }
    }
  };

  const getData = async () => {
    if (privateCalendar) {
      try {
        let response = await getUserEvents(data);

        dispatch(
          setUserEvents({
            userCalendar: response.data,
          })
        );
      } catch (error) {
        
      }
    } else {
      try {
        let response = await getCompanyEvents(data);

        dispatch(
          setCompanyEvents({
            companyCalendar: response.data,
          })
        );
      } catch (error) {
        
      }
    }
  };

  useEffect(() => {
    setRender(false);
    getData();
  }, [render, privateCalendar]);

  const calendar_events = useSelector((state) =>
    privateCalendar
      ? state.calendar.userCalendar
      : state.calendar.companyCalendar
  );

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
      color: "black",
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
          <div className={styles.title}>Мой календарь</div>
          {privateCalendar ? (
            <Button
              className={styles["add-event"]}
              onClick={() => setOpenModal(true)}
            >
              {" "}
              Создать событие{" "}
            </Button>
          ) : user.is_admin_of ? (
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
        <div className={styles["flex"]}>
          <UpcomingEvents up_next={formattedEvents ?? []} />

          <div className={styles["planner-container"]}>
            <Calendar
              localizer={localizer}
              events={formattedEvents}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 500 }}
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
      </div>

      <ModalWindow
        openModal={openModal}
        setOpenModal={setOpenModal}
        modalTitle={"Введите комментарий"}
      >
        {" "}
        <form onSubmit={handleFormSubmit}>
          <div className={styles.decline_form}>
            <div className={styles.item_flex1}>
              <div className={styles.input_type3}>
                <input
                  type="text"
                  name="title"
                  required
                  className={styles["discription_input"]}
                  placeholder="Название события"
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
              onClick={() => setOpenModal(false)}
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
