import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./TaskWidget.module.scss";
import plus from "../../../assets/icons/plus.svg";
import TaskWidgetItem from "../components/TaskWidgetItem";
import "react-sliding-pane/dist/react-sliding-pane.css";
import SlidingPane from "react-sliding-pane";
import TaskForm from "../../Forms/TaskForm/TaskForm";
import { getWidgetInfo } from "../../../service/AuthService";
import { setWidgetById } from "../../../store/slices/UserSlice";
import { useParams } from "react-router-dom";
import SlidingPaneUtil from "../../../utils/SlidingPaneUtil";
function TaskWidget({ title, t }) {
  //UseState
  const [data, setData] = useState([]);
  const [openBottomSheet, setOpenBottomSheet] = useState(false);

  const [state, setState] = useState({
    isPaneOpen: false,
    isPaneOpenLeft: false,
  });
  //Dispatch && Params
  const dispatch = useDispatch();
  const { id } = useParams();
  //Functions
  const getData = async () => {
    try {
      let response = await getWidgetInfo(id, data);
      dispatch(
        setWidgetById({
          widgetId: response.data,
        })
      );
    } catch (error) {}
  };
  useEffect(() => {
    getData();
  }, []);
  //Const & Let
  const items = useSelector((state) => state.user.widgetId);
  let inner_item = [
    {
      title: "Делаю",
      index: items.tasks_doing,
      counter: items.tasks_doing_overdue,
    },
    {
      title: "Помогаю",
      index: items.tasks_helping,
      counter: items.tasks_helping_overdue,
    },
    {
      title: "Поручил",
      index: items.tasks_instructed,
      counter: items.tasks_instructed_overdue,
    },
    {
      title: "Наблюдаю",
      index: items.tasks_watching,
      counter: items.tasks_watching_overdue,
    },
    { title: "Завершенные", index: items.tasks_completed, counter: "" },
  ];
  let item = inner_item.map((f, index) => (
    <TaskWidgetItem
      key={index}
      title={f.title}
      index={f.index}
      counter={f.counter}
    />
  ));
  const [width, setWidth] = useState(window.innerWidth);
  const [render, setRender] = useState(false);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [width]);
  useEffect(() => {
    width < 600 && handleSideNavToggle();
  });

  function handleSideNavToggle() {
    console.log("toggle it");
  }

  return (
    <div className={styles.task_widget}>
      <div className={styles.widget_heading}>
        <h3>
          Мои {title}
          {t}
        </h3>
        <div className={styles.plus_wrapper}>
          {width > 1000 ? (
            <SlidingPaneUtil
              size="50%"
              title="Новая задача"
              state={state}
              setState={setState}
            >
              <TaskForm setRender={setRender} setState={setState} />{" "}
            </SlidingPaneUtil>
          ) : (
            <SlidingPaneUtil
              size="100%"
              title="Новая задача"
              state={state}
              setState={setState}
            >
              <TaskForm setRender={setRender} setState={setState} />{" "}
            </SlidingPaneUtil>
          )}

          <img src={plus} onClick={() => setState({ isPaneOpen: true })} />
        </div>
      </div>
      <div className={styles.widget_body}>
        <div className={styles.widget_body_items}>{item}</div>
      </div>
    </div>
  );
}

export default TaskWidget;
