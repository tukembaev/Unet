import React, { useEffect, useState } from "react";
import styles from "./ChatForm.module.scss";
import Button from "../../Button/Button";
import { createChat, getEmployee } from "../../../service/ChatService";
import { setEmployees } from "./../../../store/slices/ChatSlice";
import { useDispatch, useSelector } from "react-redux";
import Notification from "../../../utils/Notifications";
import Select from "react-select";
import makeAnimated from "react-select/animated";
function ChatForm() {
  //UseState

  const [set_id, setResponsible] = useState([]);
  const employee_two = set_id.id;
  //Notifications
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const dispatch = useDispatch();
  const getData = async () => {
    try {
      let response = await getEmployee(data);

      dispatch(
        setEmployees({
          employee: response.data,
        })
      );
    } catch (error) {
      
    }
  };

  useEffect(() => {
    getData();
  }, []);
  //Dispatch

  //Functions
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (employee_two === undefined) {
      setNotify({
        isOpen: true,
        message: "Выберите сотрудника",
        type: "warning",     sound: 'warning'
      });
    } else {
      try {
        let response = await createChat(employee_two);

        setNotify({
          isOpen: true,
          message: "Чат успешно создан!",
           type: "success", sound : "success"
        });
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } catch (error) {
        
        setNotify({
          isOpen: true,
          message: "",
          type: "error",
        });
      }
    }
  };
  const employee = useSelector((state) => state.chat);

  const data = [employee.employee];

  const [isShown, setIsShown] = useState(false);

  const handleClick = (event) => {
    setIsShown((current) => !current);
  };
  const handleSelect = (data) => {
    setResponsible(data);
  };
  const animatedComponents = makeAnimated();

  return (
    <div className={styles.qr_wrapper}>
      <div className={styles.qr_body}>
        <div className={styles.qr_inputs}>
          <div className={styles.task_responsible}>
            <p onClick={handleClick}>Сотрудник (обязательное поле)</p>
            <Select
              closeMenuOnSelect={true}
              components={animatedComponents}
              options={data[0]}
              isMulti={false}
              onChange={handleSelect}
              autosize={true}
              isSearchable={true}
              placeholder="Выбрать сотрудника"
              required={true}
            />{" "}
          </div>
        </div>
        <div className={styles.qr_footer}>
          <Button className={styles.btn1} onClick={handleSubmit}>
            Создать
          </Button>
        </div>
      </div>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
}

export default ChatForm;
