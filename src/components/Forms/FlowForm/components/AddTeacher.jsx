import React from "react";
import styles from "../FlowForm.module.scss";
import { useState } from "react";
import EmployeeSelectEmployeeld from "../../../../hooks/EmployeeSelect/EmployeeSelectEmployeeld";
import { patchTeachers } from "../../../../service/FlowService";
import { ScaleLoader } from "react-spinners";
import Button from "../../../Button/Button";

const AddTeacher = ({ setRender, setNotify, data, setState }) => {
  // states
  const [practiceTeacher, setPracticeTeacher] = useState(null);
  const [labarotoryTeacher, setLabratoreTeacher] = useState(null);
  const [lectorTeacher, setLectorTeacher] = useState(null);
  const [loader, setLoader] = useState(false);

  // functions

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoader(true);

      const newFormValue = {
        lector_teacher: lectorTeacher,
        practice_teacher: practiceTeacher,
        laboratory_teacher: labarotoryTeacher,
      };

      let response = await patchTeachers(data?.id, newFormValue);
      setNotify({
        isOpen: true,
        message: "Преподаватель добавлен",
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
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.teacher_forms}>
        <div>
          <p>Преаодаватель по практике</p>
          <EmployeeSelectEmployeeld
            selectedEmployee={setPracticeTeacher}
            isMulti={false}
            placeholder={"Выбрать преподавателя"}
          />
        </div>

        <div>
          <p>Преподаватель по лабораторному</p>

          <EmployeeSelectEmployeeld
            selectedEmployee={setLabratoreTeacher}
            isMulti={false}
            placeholder={"Выбрать преподавателя"}
          />
        </div>

        {loader ? (
        <ScaleLoader color="white" size={30} />
      ) : (
        <Button className={styles.btn3} onClick={handleSubmit}>
          Сохранить
        </Button>
      )}
      </div>

      
    </div>
  );
};

export default AddTeacher;
