import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./StatementWidget.module.scss";
import plus from "../../../assets/icons/plus.svg";
import { useParams } from "react-router-dom";
import "react-sliding-pane/dist/react-sliding-pane.css";
import SlidingPane from "react-sliding-pane";
import StatementForm from "../../Forms/StatementForm/StatementForm";
import TaskWidgetItem from "./../components/TaskWidgetItem";
import { getWidgetInfo } from "../../../service/AuthService";
import { setWidgetById } from "../../../store/slices/UserSlice";

function StatementWidget({ title, t }) {
  //UseState
  const [data, setData] = useState([]);
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
    } catch (error) {
      
    }
  };
  useEffect(() => {
    getData();
  }, []);

  //Const & Let
  const items = useSelector((state) => state.user.widgetId);
  let inner_item = [
    { title: "Выполняются", index: items.apps_doing },
    { title: "Ждут подтверждения ", index: items.apps_waiting },
    { title: "Завершенные / Отказанные", index: items.apps_completed },
  ];
  let item = inner_item.map((f, index) => (
    <TaskWidgetItem key={index} title={f.title} index={f.index} />
  ));

  return (
    <div className={styles.task_widget}>
      <div className={styles.widget_heading}>
        <h3>
          Мои {title}
          {t}
        </h3>
        <div className={styles.plus_wrapper}>
    
          <SlidingPane
            className={styles.some_custom_class2}
            overlayClassName={styles.some_custom_overlay_class2}
            isOpen={state.isPaneOpen}
            title="Новый рапорт"
            onRequestClose={() => {
              // triggered on "<" on left top click or on outside click
              setState({ isPaneOpen: false });
            }}
          >
            <StatementForm />
          </SlidingPane>
          <img src={plus} onClick={() => setState({ isPaneOpen: true })} />
        </div>
      </div>
      <div className={styles.widget_body}>
        <div className={styles.widget_body_items}>{item}</div>
      </div>
    </div>
  );
}

export default StatementWidget;
