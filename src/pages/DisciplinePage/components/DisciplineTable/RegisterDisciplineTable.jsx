import React, { useState, useEffect } from "react";
import styles from "./../../../FlowPage/components/FlowPageTable/FlowPageTable.module.scss";
import styles2 from "./RegisterDisciplineTable.module.scss";
import { Button } from "../../../../components";
import ModalWindow from "../../../../hooks/ModalWindow/ModalWindow";
import {
  getSyllabusOptional,
  registerToDiscipline,
} from "../../../../service/DisciplineService";
import Notification from "../../../../utils/Notifications";
import userInfo from "../../../../utils/userInfo";

const RegisterDisciplineTable = ({ data, setRender, setId }) => {
  const [selectedSubjects, setSelectedSubjects] = useState([]);

  let [copyData, setCopyData] = useState();

  const [openModal2, setOpenModal2] = useState({
    isOpen: false,
    subjectStreams: "",
  });
  const [renderOptional, setRenderOptional] = useState(false);
  const user = userInfo();
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const [registerData, setRegisterData] = useState({
    subject: null,
    stream: null,
  });

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [dataOptional, setDataOptional] = useState(null);

  const handleCourseSelection = (event) => {
    const courseId = event.target.value;
    const selectedCourse = dataOptional.semesters[0].subjects.find(
      (subject) => subject.id === parseInt(courseId)
    );
    setSelectedCourse(selectedCourse);
  };

  const getData = async () => {
    try {
      let response = await getSyllabusOptional(data);
      setDataOptional(response.data);
    } catch (error) {
      
    }
  };

  useEffect(() => {
    getData();
    setRenderOptional(false);
  }, [registerData, renderOptional]);

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [width]);

  const handleSubmit = async (subject, stream) => {
    try {
      let response = await registerToDiscipline(subject, stream);
      setNotify({
        isOpen: true,
        message: "Регистрация прошла успешно",
         type: "success", sound : "success"
      });

      setSelectedSubjects((prevSelectedSubjects) =>
        prevSelectedSubjects.filter((item) => item.subject !== subject)
      );
    } catch (error) {
      

      setNotify({
        isOpen: true,
        message: "Ошибка",
        type: "error",
      });
    }
  };

  useEffect(() => {
    if (data?.semesters && data.semesters[0]?.subjects) {
      setCopyData([...data.semesters[0].subjects]);
    }
  }, [data]);

  const handleSelect = async (subject, stream, numberStream) => {
    const existingSubjectIndex = selectedSubjects.findIndex(
      (item) => item.subject === openModal2.subjectStreams.id
    );

    if (existingSubjectIndex !== -1) {
      const updatedSelectedSubjects = [...selectedSubjects];
      updatedSelectedSubjects[existingSubjectIndex] = {
        ...updatedSelectedSubjects[existingSubjectIndex],
        streamNumber: numberStream,
        stream: stream,
      };

      setSelectedSubjects(updatedSelectedSubjects);
    } else {
      const newSelectedSubject = {
        id: openModal2.subjectStreams.id,
        name_subject: openModal2.subjectStreams.name_subject,
        course_type: openModal2.subjectStreams.course_type,
        credit: openModal2.subjectStreams.credit,
        streams: openModal2.subjectStreams.streams,
        streamNumber: numberStream,
        subject: subject,
        stream: stream,
      };
      const updatedCopyData = copyData.filter(
        (item) => item.id !== openModal2.subjectStreams.id
      );
      setCopyData(updatedCopyData);

      setSelectedSubjects((prevSelectedSubjects) => [
        ...prevSelectedSubjects,
        newSelectedSubject,
      ]);
    }

    setOpenModal2({ subjectStreams: "" });
  };

  return (
    <div>
      {data?.semesters[0]?.subjects.length === 0 &&
      dataOptional?.semesters[0]?.subjects.length === 0 ? (
        <div className={styles.title}>
          Вы успешно зарегистрированы на все предметы
        </div>
      ) : (
        <>
          <table className={styles.table__wrapper}>
            <thead className={styles.table__head}>
              <tr className={styles.table__row}>
                <th className={styles.table__item}>
                  <span className={styles.table__title}>Предмет</span>
                </th>
                <th className={styles.table__item}>
                  <span className={styles.table__title}>Вид</span>
                </th>
                <th className={styles.table__item}>
                  <span className={styles.table__title}>Кредит</span>
                </th>
                <th className={styles.table__item}>
                  <span className={styles.table__title}>Поток</span>
                </th>
                <th className={styles.table__item}>
                  <span className={styles.table__title}></span>
                </th>
              </tr>
            </thead>
            <tbody className={styles.table__body}>
              {selectedSubjects?.map((item) => (
                <tr
                  key={item.id}
                  className={styles.table__row}
                  onClick={() =>
                    setId({
                      subject_id: item.subject,
                      subject_name: item.name_subject,
                    })
                  }
                >
                  <td className={styles.table__item}>
                    <span className={styles.table__title}>
                      {item.name_subject}
                    </span>
                  </td>
                  <td className={styles.table__item}>
                    <span className={styles.table__title}>
                      {item.course_type}
                    </span>
                  </td>
                  <td className={styles.table__item}>
                    <span className={styles.table__title}>{item.credit}</span>
                  </td>
                  <td className={styles.table__item}>
                    <span className={styles.table__title}>
                      {item.streamNumber}
                    </span>
                  </td>

                  <td className={styles.table__item}>
                    <button
                      onClick={() =>
                        setOpenModal2({ isOpen: true, subjectStreams: item })
                      }
                      className={styles2.btn_pin}
                      style={{ marginRight: "15px" }}
                    >
                      Выбрать поток
                    </button>
                    <button
                      onClick={() => handleSubmit(item.subject, item.stream)}
                      className={styles2.btn_pin}
                    >
                      Зарегистрировать
                    </button>
                  </td>
                </tr>
              ))}
              {copyData?.map((item) => (
                <tr
                  key={item.id}
                  className={styles.table__row}
                  onClick={() =>
                    setId({
                      subject_id: item.subject,
                      subject_name: item.name_subject,
                    })
                  }
                >
                  <td className={styles.table__item}>
                    <span className={styles.table__title}>
                      {item.name_subject}
                    </span>
                  </td>
                  <td className={styles.table__item}>
                    <span className={styles.table__title}>
                      {item.course_type}
                    </span>
                  </td>
                  <td className={styles.table__item}>
                    <span className={styles.table__title}>{item.credit}</span>
                  </td>
                  <td className={styles.table__item}>
                    <span className={styles.table__title}>Поток не выбран</span>
                  </td>
                  <td className={styles.table__item}>
                    <button
                      onClick={() =>
                        setOpenModal2({ isOpen: true, subjectStreams: item })
                      }
                      className={styles2.btn_pin}
                    >
                      Выбрать поток
                    </button>
                  </td>
                </tr>
              ))}
              {dataOptional?.semesters[0]?.subjects.length !== 0 ? (
                <tr className={styles.table__row}>
                  <td className={styles.table__item}>
                    <td>
                      <select
                        className={styles2.select__dropdown}
                        onChange={handleCourseSelection}
                      >
                        <option value="">Выберите курс</option>
                        {dataOptional?.semesters[0]?.subjects?.map(
                          (subject) => (
                            <option key={subject.id} value={subject.id}>
                              {subject?.name_subject}
                            </option>
                          )
                        )}
                      </select>
                    </td>
                  </td>
                  <td className={styles.table__item}>
                    <span className={styles.table__title}>
                      {selectedCourse?.course_type}
                    </span>
                  </td>
                  <td className={styles.table__item}>
                    <span className={styles.table__title}>
                      {selectedCourse?.credit}
                    </span>
                  </td>
                  <td className={styles.table__item}>
                    <button
                      onClick={() =>
                        setOpenModal2({
                          isOpen: true,
                          subjectStreams: selectedCourse,
                        })
                      }
                      className={styles2.btn_pin}
                    >
                      Выбрать поток
                    </button>
                  </td>
                  <td className={styles.table__item}>
                    <span className={styles.table__title}>
                      {selectedCourse?.lecturer}
                    </span>
                  </td>
                </tr>
              ) : (
                ""
              )}
            </tbody>
          </table>
          <ModalWindow
            openModal={openModal2.isOpen}
            setOpenModal={setOpenModal2}
            modalTitle={"Выбор потока"}
          >
            {" "}
            <div className={styles2.modal_semester_wrapper}>
              {openModal2?.subjectStreams?.streams?.map((item) => (
                <div className={styles2.semesters_wrapper} key={item.number}>
                  <div className={styles2.modal_footer}>
                    <h3 style={{ textAlign: "left" }}>Поток: {item?.number}</h3>

                    {user.user_type === "S" ? (
                      <Button
                        className={styles2.btn_pin}
                        onClick={() =>
                          handleSelect(
                            openModal2.subjectStreams.id,
                            item.id,
                            item.number
                          )
                        }
                      >
                        Выбрать
                      </Button>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className={styles2.semesters_header}>
                    <p>
                      Осталось свободных мест на регистрацию:{" "}
                      {item?.number_free_places}
                    </p>
                  </div>
                  <div className={styles2.semesters_body}>
                    <table className={styles2.table__wrapper}>
                      <thead className={styles2.table__header}>
                        <tr className={styles2.table__row}>
                          <th className={styles2.table__item}>
                            <span className={styles2.table__title}>
                              Дни недели
                            </span>
                          </th>
                          <th className={styles2.table__item}>
                            <span className={styles2.table__title}>Время</span>
                          </th>
                          <th className={styles2.table__item}>
                            <span className={styles2.table__title}>
                              Аудитория
                            </span>
                          </th>
                          <th className={styles2.table__item}>
                            <span className={styles2.table__title}>Вид</span>
                          </th>
                          <th className={styles2.table__item}>
                            <span className={styles2.table__title}>
                              Преподаватель
                            </span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className={styles2.table__body}>
                        {item.schedules.map((schedule) => (
                          <tr key={schedule.id} className={styles2.table__row}>
                            <td className={styles2.table__item}>
                              <span className={styles2.table__title}>
                                {schedule.day}
                              </span>
                            </td>
                            <td className={styles2.table__item}>
                              <span className={styles2.table__title}>
                                {schedule.time}
                              </span>
                            </td>
                            <td className={styles2.table__item}>
                              <span className={styles2.table__title}>
                                {schedule.auditorium}
                              </span>
                            </td>
                            <td className={styles2.table__item}>
                              <span className={styles2.table__title}>
                                {schedule.lesson_type}
                              </span>
                            </td>
                            <td className={styles2.table__item}>
                              <span className={styles2.table__title}>
                                {schedule.lecturer_name}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles2.modal_footer}>
              <Button
                onClick={() => setOpenModal2({ isOpen: false })}
                className={styles2.btn_pin_close}
              >
                Закрыть
              </Button>
            </div>
          </ModalWindow>
          <Notification notify={notify} setNotify={setNotify} />{" "}
        </>
      )}
    </div>
  );
};

export default RegisterDisciplineTable;
