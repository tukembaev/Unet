import React, { useState, useEffect } from "react";
import styles from "./FlowPageInfo.module.scss";
import { Button } from "./../../../components";
import right from "./../../../assets/icons/chevron_right.png";
import Notification from "./../../../utils/Notifications";
import userInfo from "./../../../utils/userInfo";
import AddShedule from "../../../components/Forms/FlowForm/components/AddShedule";
import SlidingPaneUtil from "../../../utils/SlidingPaneUtil";
import { getFlowsShedules } from "../../../service/FlowService";
import { useDispatch, useSelector } from "react-redux";
import { setFlowsShedules } from "../../../store/slices/FlowSlice";
import AddTeacher from "../../../components/Forms/FlowForm/components/AddTeacher";

const FlowPageInfo = ({ setId, sheduleId }) => {
  // states
  let data;
  const [render, setRender] = useState(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const dispatch = useDispatch();
  const user = userInfo();
  const [state, setState] = useState({
    isPaneOpen: false,
    isPaneOpenLeft: false,
  });
  const [state2, setState2] = useState({
    isPaneOpen: false,
    isPaneOpenLeft: false,
  });
  const daysOrder = {
    Понедельник: 1,
    Вторник: 2,
    Среда: 3,
    Четверг: 4,
    Пятница: 5,
    Суббота: 6,
  };

  // functions
  const getShedules = async () => {
    try {
      let response = await getFlowsShedules(sheduleId, data);
      dispatch(
        setFlowsShedules({
          flowShedules: response.data,
        })
      );
    } catch (error) {}
  };

  useEffect(() => {
    getShedules();
    setRender(false);
  }, [sheduleId, render]);

  const flowShedules = useSelector((state) => state.flow.flowShedules);

  let test = flowShedules?.schedules ?? [];
  let sortedTest = [...test];
  sortedTest.sort((a, b) => daysOrder[a.day] - daysOrder[b.day]);

  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [width]);

  return (
    <>
      <div className={styles.team__wrapper}>
        <div className={styles.team__header}>
          <div className={styles.title}>
            <span onClick={() => setId(null)} style={{ cursor: "pointer" }}>
              Потоки
            </span>
            <img
              src={right}
              alt=""
              style={{
                paddingLeft: "10px",
                paddingRight: "10px",
                verticalAlign: "middle",
              }}
            />

            <span style={{ color: "#090909" }}>Расписание</span>
            <img
              src={right}
              alt=""
              style={{
                paddingLeft: "10px",
                paddingRight: "10px",
                verticalAlign: "middle",
              }}
            />
          </div>
        </div>
        <div className={styles.member_add_header}>
          <div>
            <h3>
              {flowShedules?.subject_name} (cвободных мест{" "}
              {flowShedules?.number_free_places})
            </h3>
          </div>

          {user?.employeeId === flowShedules?.creator ? (
            <div className={styles.tem_add_shedule}>
              <button onClick={() => setState({ isPaneOpen: true })}>
                Составить расписание{" "}
              </button>
            </div>
          ) : null}
        </div>
        <div className={styles.teacher_parent}>
          <div className={styles.teacher_box}>
            {flowShedules?.lector ? (
              <p>Преподаватель по лекции: {flowShedules?.lector_name}</p>
            ) : (
              ""
            )}
            {flowShedules?.practice ? (
              <p>
                Преподаватель по лабораторной: {flowShedules?.practice_name}
              </p>
            ) : (
              ""
            )}
            {flowShedules?.laboratory ? (
              <p>Преподаватель по практике: {flowShedules?.laboratory_name}</p>
            ) : (
              ""
            )}
          </div>

          {user?.employeeId === flowShedules?.creator ? (
            <div className={styles.teacher_btn}>
              <button onClick={() => setState2({ isPaneOpen: true })}>
                Добавить преподавателя
              </button>
            </div>
          ) : null}
        </div>
        <div className={styles.team__body}>
          <table className={styles.table__wrapper}>
            <thead className={styles.table__head}>
              <tr className={styles.table__row}>
                <th className={styles.table__item}>
                  <span className={styles.table__title}>Преподаватель</span>
                </th>
                <th className={styles.table__item}>
                  <span className={styles.table__title}>Время</span>
                </th>
                <th className={styles.table__item}>
                  <span className={styles.table__title}>Вид</span>
                </th>
                <th className={styles.table__item}>
                  <span className={styles.table__title}>Аудитория</span>
                </th>
                <th className={styles.table__item}>
                  <span className={styles.table__title}>Неделя</span>
                </th>
              </tr>
            </thead>
            <tbody className={styles.table__body}>
              {sortedTest?.map((item, index) => (
                <>
                  {index === 0 || item.day !== sortedTest[index - 1].day ? (
                    <tr
                      className={styles.table__row}
                      key={`separator_${item.day}`}
                    >
                      <td colSpan="5" className={styles.table__item}>
                        <span className={styles.table__title}>{item.day}</span>
                      </td>
                    </tr>
                  ) : null}
                  <tr className={styles.table__row} key={`item_${item.id}/`}>
                    <td className={styles.table__item}>
                      <img
                        src={item?.image}
                        alt=""
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          verticalAlign: "middle",
                          marginRight: "15px",
                          objectFit: "cover",
                        }}
                      />
                      <span
                        className={styles.table__title}
                        style={{ fontWeight: "700" }}
                      >
                        {item?.teacher}
                      </span>
                    </td>
                    <td className={styles.table__item}>
                      <span className={styles.table__title}>{item?.time}</span>
                    </td>
                    <td className={styles.table__item}>
                      <span className={styles.table__title}>
                        {item?.lesson_type}
                      </span>
                    </td>
                    <td className={styles.table__item}>
                      <span className={styles.table__title}>
                        {item?.korpus_num}/{item?.auditorium_num}
                      </span>
                    </td>
                    <td className={styles.table__item}>
                      <span className={styles.table__title}>
                        {item?.week_type}
                      </span>
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {width > 1000 ? (
        <>
          <SlidingPaneUtil
            size="900px"
            title="Расписание"
            state={state}
            setState={setState}
            onRequestClose={() => {
              setState({ isPaneOpen: false });
            }}
          >
            {" "}
            <AddShedule
              setState={setState}
              setRender={setRender}
              setNotify={setNotify}
              data={flowShedules}
            />
          </SlidingPaneUtil>
        </>
      ) : (
        <>
          <SlidingPaneUtil
            size="100%"
            title="Расписание:"
            state={state}
            setState={setState}
            onRequestClose={() => {
              setState({ isPaneOpen: false });
            }}
          >
            {" "}
            <AddShedule
              setState={setState}
              setRender={setRender}
              setNotify={setNotify}
              data={flowShedules}
            />
          </SlidingPaneUtil>
        </>
      )}

      {width > 1000 ? (
        <>
          <SlidingPaneUtil
            size="900px"
            title="Расписание"
            state={state2}
            setState={setState2}
            onRequestClose={() => {
              setState2({ isPaneOpen: false });
            }}
          >
            {" "}
            <AddTeacher
              setState={setState2}
              setRender={setRender}
              setNotify={setNotify}
              data={flowShedules}
            />
          </SlidingPaneUtil>
        </>
      ) : (
        <>
          <SlidingPaneUtil
            size="100%"
            title="Расписание:"
            state={state2}
            setState={setState2}
            onRequestClose={() => {
              setState2({ isPaneOpen: false });
            }}
          >
            {" "}
            <AddTeacher
              setState={setState2}
              setRender={setRender}
              setNotify={setNotify}
              data={flowShedules}
            />
          </SlidingPaneUtil>
        </>
      )}
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
};

export default FlowPageInfo;
