import React, { useEffect, useState } from "react";
import styles from "./FlowForm.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { TextareaAutosize } from "@material-ui/core";
import Button from "../../Button/Button";
import Notification from "../../../utils/Notifications";
import "react-datepicker/dist/react-datepicker.css";
import FlowDirectionSelect from "../../../hooks/FlowSelect/FlowDirectionSelect";
import FlowSemesterSelect from "../../../hooks/FlowSelect/FlowSemesterSelect";
import FlowSubjectSelect from "../../../hooks/FlowSelect/FlowSubjectSelect";
import makeAnimated from "react-select/animated";
import { getMyMembers } from "../../../service/CollectiveService";
import Select from "react-select";
import EmployeeSelectUserId from "../../../hooks/EmployeeSelect/EmployeeSelectEmpId";
import EmployeeSelectEmployeeld from "../../../hooks/EmployeeSelect/EmployeeSelectEmployeeld";


import { createFlow, getFlows } from "../../../service/FlowService";
import { ScaleLoader } from "react-spinners";

function FlowForm({ setState, setRender }) {
  //UseState

  const [loader, setLoader] = useState(false);
  const [number, setNumber] = useState("");
  const [direction, setDirection] = useState("");
  const [semester, setSemester] = useState("");
  const [subject, setSubject] = useState("");
  const [number_free_places, setNumber_free_places] = useState("");
  const [lectorTeacher, setLectorTeacher] = useState(null);
  const [practiceTeacher, setPracticeTeacher] = useState(null);
  const [labarotoryTeacher, setLabratoreTeacher] = useState(null);
  const [redBorder, setRedBorder] = useState(false);
  const [members, setMembers] = useState([]);
  const [isLoading, setLoading] = useState(true);

  // functions

  const handleNumberChange = (e) => {
    const input = e.target.value;

    const filteredInput = input.replace(/\D/g, "");
    setNumber(filteredInput);
  };
  const handleNumberFreePlaceChange = (e) => {
    const input = e.target.value;
    const filteredInput = input.replace(/\D/g, "");
    setNumber_free_places(filteredInput);
  };

  //Notification
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  //Dispatch
  const dispatch = useDispatch();
  //Const & Let

  const handleSubmit = async (event) => {
    event.preventDefault();

    const isValid =
      number.trim() !== "" &&
      direction !== "" &&
      semester !== "" &&
      subject !== "" &&
      number_free_places !== "" &&
      lectorTeacher !== null;
    if (!isValid) {
      setNotify({
        isOpen: true,
        message: "Заполните все поля!",
        type: "warning",
        sound: "warning",
      });
      setRedBorder(true);
      return;
    }else{
      const newFormValue = {
        number,
        syllabus: direction,
        subject,
        number_free_places,
        lector_teacher: lectorTeacher,
        practice_teacher: practiceTeacher,
        laboratory_teacher: labarotoryTeacher,
        schedules: [],
      };
      try {
        setLoader(true);
        let response = await createFlow(newFormValue);
        setNotify({
          isOpen: true,
          message: "Поток создан",
          type: "success",
          sound: "success",
        });
        setRender(true);
        setState({ isPaneOpen: false });
      } catch (error) {
        setNotify({
          isOpen: true,
          message: `${error.response.data}`,
          type: "error",
        });
      }
    }
  };
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      let response = await getFlows(data);

      setData(response.data);
    } catch (error) {
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    getData();
    setRender(false);
  }, []);

  return (
    <div>
      <div>
        {" "}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <p>Нумерация потока</p>
          <TextareaAutosize
            id="number"
            name="number"
            className={styles.type_input}
            value={number}
            onChange={handleNumberChange}
            placeholder="Нумерация потока:"
            style={{
              border: `3px solid ${
                redBorder && number === ""
                  ? "#d62121"
                  : "rgb(150 159 161 / 52%)"
              }`,
            }}
          />
          <p>Направление</p>
          <div
            style={{
              border: `3px solid ${
                redBorder && direction === ""
                  ? "#d62121"
                  : "rgb(150 159 161 / 52%)"
              }`,
            }}
            className={styles.type_input_size}
          >
            <FlowDirectionSelect setDirection={setDirection} />
          </div>
          <p>Семестр</p>
          <div
            style={{
              border: `3px solid ${
                redBorder && semester === ""
                  ? "#d62121"
                  : "rgb(150 159 161 / 52%)"
              }`,
            }}
            className={styles.type_input_size}
          >
            <FlowSemesterSelect id={direction} setSemester={setSemester} />
          </div>
          <p>Предмет</p>
          <div
            style={{
              border: `3px solid ${
                redBorder && subject === ""
                  ? "#d62121"
                  : "rgb(150 159 161 / 52%)"
              }`,
            }}
            className={styles.type_input_size}
          >
            <FlowSubjectSelect id={semester} setSubject={setSubject} />
          </div>
          <p>Кол-во студентов</p>
          <TextareaAutosize
            id="number"
            name="number"
            className={styles.type_input}
            value={number_free_places}
            onChange={handleNumberFreePlaceChange}
            placeholder="Кол-во студентов"
            style={{
              border: `3px solid ${
                redBorder && number_free_places === ""
                  ? "#d62121"
                  : "rgb(150 159 161 / 52%)"
              }`,
            }}
          />
          
          <p>Преподаватель по лекции</p>
          <div
            style={{
              border: `3px solid ${
                redBorder && lectorTeacher === null
                  ? "#d62121"
                  : "rgb(150 159 161 / 52%)"
              }`,
            }}
            className={styles.type_input_size}
          >
            <EmployeeSelectEmployeeld
            selectedEmployee={setLectorTeacher}
            isMulti={false}
            placeholder={"Выбрать преподавателя"}
          />
          </div>
          
          <p>Преаодаватель по практике</p>
          <EmployeeSelectEmployeeld
            selectedEmployee={setPracticeTeacher}
            isMulti={false}
            placeholder={"Выбрать преподавателя"}
          />

          <p>Преподаватель по лабораторному</p>

          <EmployeeSelectEmployeeld
            selectedEmployee={setLabratoreTeacher}
            isMulti={false}
            placeholder={"Выбрать преподавателя"}
          />
        </div>{" "}
        <div>
          <div className={styles.statement_footer}>
            {loader ? (
              <ScaleLoader color="white" size={30} />
            ) : (
              <Button className={styles.btn1} onClick={handleSubmit}>
                Создать поток
              </Button>
            )}
          </div>
        </div>{" "}
      </div>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
}

export default FlowForm;
