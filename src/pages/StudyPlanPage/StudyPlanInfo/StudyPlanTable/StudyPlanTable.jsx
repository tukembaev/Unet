import React, { useState, useEffect } from "react";
import styles from "./../StudyPlanInfo.module.scss";
import { Button } from "../../../../components";
import SlidingPaneUtil from "../../../../utils/SlidingPaneUtil";
import AddDiscipline from "../AddDecipline/AddDecipline";
import { getAllSubjects } from "../../../../service/StudyPlanService";
import { useDispatch, useSelector } from "react-redux";
import { setStudySubjects } from "../../../../store/slices/StudyPlanSlice";
import { array } from "prop-types";
import edit from "../../../../assets/icons/edit.png";
import done from "../../../../assets/icons/done .png";
import deletePng from "../../../../assets/icons//delete.png";
import { patchSubject } from "../../../../service/StudyPlanService";
import Notification from "../../../../utils/Notifications";
import StudyPlanTableBody from "./StudyPlanTableBody";
import { Tune } from "@material-ui/icons";
import { deleteSubject } from "../../../../service/StudyPlanService";
import accept from "../../../../assets/icons/accept.png";
import cancel from "../../../../assets/icons/no.png";
import plus from "../../../../assets/icons/plus.png";
import smallPlus from "../../../../assets/icons/small-plus .png";
import smallCancel from "../../../../assets/icons/smallCancel.png";
import { setStudyInfoData } from "../../../../store/slices/StudyPlanSlice";
import { getSemester } from "../../../../service/StudyPlanService";
import { setSemester } from "../../../../store/slices/StudyPlanSlice";
import ModalWindow from "../../../../hooks/ModalWindow/ModalWindow";
import PinCode from "../../../../hooks/PinCode/PinCode";
import userInfo from "../../../../utils/userInfo";
import { deleteSemester } from "../../../../service/StudyPlanService";

const StudyPlanTable = ({ data, setRender, condition }) => {
  const dispatch = useDispatch();
  const [isAdding, setIsAding] = useState({});
  const [isEditing, setIsEditing] = useState({});
  const [isEditingLimit, setLimitIsEditing] = useState(0);
  const maxLimit = 1;
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [openModal, setOpenModal] = useState({
    isOpen: false,
    value: null,
  });
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [confirm, setConfirm] = useState({
    isOpen: false,
    value: null,
  });
  const [openModalPatch, setOpenModalPatch] = useState({
    isOpen: false,
    value: null,
  });

  const [dicipline, setDicipline] = useState({
    name_subject: "",
    control_form: "",
    department: 0,
    departmentLabel: "",
    credit: 0,
    lecture_hours: 0,
    practice_hours: 0,
    lab_hours: 0,
    srs: 0,
    subject_hours: 0,
    amount_hours: 0,
  });

  // pin code
  const [state, setState] = useState({
    isPaneOpen: false,
    isPaneOpenLeft: false,
  });
  const [pinCode, setPinCode] = useState();
  const user = userInfo();
  // functions
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [width]);

  // Patch
  const handleEdit = (elem) => {
    setLimitIsEditing((prev) => prev + 1);
    const data = { ...dicipline };
    data.name_subject = elem?.name_subject;
    data.control_form = elem?.control_form;
    data.credit = elem?.credit;
    data.practice_hours = elem?.practice_hours;
    data.lecture_hours = elem?.lecture_hours;
    data.lab_hours = elem?.lab_hours;
    data.srs = elem?.srs;
    data.amount_hours = elem?.amount_hours;
    data.subject_hours = elem?.subject_hours;
    data.department = elem?.department;
    data.departmentLabel = elem?.dep;
    setIsEditing((prev) => ({
      ...prev,
      [elem?.id]: !prev[elem?.id],
    }));
    setDicipline(data);
  };

  const handleOpenPatchModal = (elem) => {
    if (
      dicipline.name_subject === elem?.name_subject &&
      dicipline.control_form === elem?.control_form &&
      dicipline.credit === elem?.credit &&
      dicipline.practice_hours === elem?.practice_hours &&
      dicipline.lecture_hours === elem?.lecture_hours &&
      dicipline.lab_hours === elem?.lab_hours &&
      dicipline.srs === elem?.srs &&
      dicipline.department === elem?.department
    ) {
      setNotify({
        isOpen: true,
        message: "Вы не изменили данные",
        type: "warning",
        sound: "warning",
      });
    } else {
      setOpenModalPatch({ isOpen: true, value: elem });
    }
  };

  const handlePatchAfter = (elem) => {
    if (String(pinCode).length === 4 && pinCode === user.pin) {
      setNotify({
        isOpen: true,
        message: "Верный Пин-Код!",
        type: "success",
      });
      handlePatch(elem);
      setOpenModalPatch({ isOpen: false, value: null });
    } else {
      setNotify({
        isOpen: true,
        message: "Неправильный Пин-Код",
        type: "error",
      });
    }
  };
  const handlePatch = async (elem) => {
    try {
      let response = await patchSubject(elem?.id, dicipline);
      setNotify({
        isOpen: true,
        message: "Ваши изменения успешно сохранились",
        type: "success",
        sound: "success",
      });
      setIsEditing((prev) => ({
        ...prev,
        [elem?.id]: !prev[elem?.id],
      }));
      setLimitIsEditing((prev) => prev - 1);
      setRender(true);
    } catch (err) {
      // console.log(err.response);
    }
  };

  // delete

  const handleDeleteAfter = (elemId) => {
    if (String(pinCode).length === 4 && pinCode === user.pin) {
      setNotify({
        isOpen: true,
        message: "Верный Пин-Код!",
        type: "success",
      });
      handleDelete(elemId);
      setOpenModal({ isOpen: false, value: null });
    } else {
      setNotify({
        isOpen: true,
        message: "Неправильный Пин-Код",
        type: "error",
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteSubject(id);
      setNotify({
        isOpen: true,
        message: "Предмет успешно удален",
        type: "success",
      });
      setRender(true);
    } catch (err) {
      // console.log(err.response);
    }
  };

  const handleConfirmSemester = () => {
    if (String(pinCode).length === 4 && pinCode === user.pin) {
      setNotify({
        isOpen: true,
        message: "Верный Пин-Код!",
        type: "success",
      });
      handleDeleteSemester();
      setOpenModalDelete(false);
      setConfirm({ value: null, isOpen: false });
    } else {
      setNotify({
        isOpen: true,
        message: "Неправильный Пин-Код",
        type: "error",
      });
    }
  };

  const handleDeleteSemester = async () => {
    try {
      let response = await deleteSemester(confirm?.value);
      setNotify({
        isOpen: true,
        message: "Семестр успешно удален",
        type: "success",
      });
      setRender(true);
    } catch (error) {}
  };

  // cancel

  const handleCancel = (elem) => {
    setLimitIsEditing((prev) => prev - 1);
    setIsEditing((prev) => ({
      ...prev,
      [elem?.id]: !prev[elem?.id],
    }));
  };

  // open
  const handleToggleGroup = (elem) => {
    setIsAding((prev) => ({
      ...prev,
      [elem?.group]: !prev[elem?.group],
    }));
  };

  const handleToggleSemester = (semester) => {
    setIsAding((prev) => ({
      ...prev,
      [semester?.id]: !prev[semester?.id],
    }));
  };

  // pin code
  const handleClosePin = () => {
    setOpenModal((prev) => ({
      ...prev,
      isOpen: false,
    }));
  };

  const handleClosePatch = () => {
    setOpenModalPatch((prev) => ({
      ...prev,
      isOpen: false,
    }));
  };

  return (
    <div className={styles.study_table}>
      <table className={styles.table__wrapper}>
        <thead className={styles.table__head}>
          <tr className={styles.table__row}>
            <th className={styles.table__item}>
              <span className={styles.table__title}>№</span>
            </th>
            <th className={styles.table__item}>
              <span className={styles.table__title}>Наименование предмета</span>
            </th>
            <th className={styles.table__item}>
              <span className={styles.table__title}>Кафедра</span>
            </th>
            <th className={styles.table__item}>
              <span className={styles.table__title}>Тип</span>
            </th>
            <th className={styles.table__item}>
              <span className={styles.table__title}>Форма контроля</span>
            </th>
            <th className={styles.table__item}>
              <span className={styles.table__title}>Кредит</span>
            </th>
            <th className={styles.table__item}>
              <span className={styles.table__title}>
                Общие академические часы
              </span>
            </th>
            <th className={styles.table__item}>
              <span className={styles.table__title}>На лекцию</span>
            </th>
            <th className={styles.table__item}>
              <span className={styles.table__title}>На практику</span>
            </th>
            <th className={styles.table__item}>
              <span className={styles.table__title}>На лаб.работы</span>
            </th>
            <th className={styles.table__item}>
              <span className={styles.table__title}>СРС</span>
            </th>
            <th className={styles.table__item} colSpan={2}>
              <span className={styles.table__title}>Всего</span>
            </th>
          </tr>
        </thead>
        <tbody className={styles.table__body}>
          {data?.semesters?.length !== 0 ? (
            <>
              {data?.semesters?.map((semester) => (
                <>
                  <tr className={styles.table__row}>
                    <td className={styles.table__item_semester} colSpan={13}>
                      <span className={styles.table__title}>
                        {semester?.name_semester} - семестр
                      </span>
                    </td>
                  </tr>
                  {semester?.courses?.length !== 0 ||
                  semester?.elective_course?.length !== 0 ? (
                    <>
                      {semester?.courses?.map((item, index) => (
                        <tr key={item?.id} className={styles.table__row}>
                          <td className={styles.table__item}>
                            <span className={styles.table__title}>
                              {index + 1}
                            </span>
                          </td>
                          <td className={styles.table__item}>
                            {isEditing[item?.id] ? (
                              <div className={styles.edit_box}>
                                <input
                                  type="text"
                                  value={dicipline?.name_subject}
                                  className={styles.edit_input}
                                  onChange={(e) =>
                                    setDicipline((prev) => ({
                                      ...prev,
                                      name_subject: e.target.value,
                                    }))
                                  }
                                />
                              </div>
                            ) : (
                              <span className={styles.table__title}>
                                {item?.name_subject}
                              </span>
                            )}
                          </td>
                          <StudyPlanTableBody
                            item={item}
                            setDicipline={setDicipline}
                            dicipline={dicipline}
                            isEditing={isEditing}
                          />
                          {condition && (
                            <td className={styles.table__item}>
                              <div className={styles.control_btns}>
                                {isEditing[item?.id] ? (
                                  <div className={styles.control_btns}>
                                    <button onClick={(e) => handleCancel(item)}>
                                      <img src={cancel} alt="" />
                                    </button>
                                    <button
                                      onClick={() => handleOpenPatchModal(item)}
                                    >
                                      <img src={accept} alt="" />
                                    </button>
                                  </div>
                                ) : (
                                  <button
                                    onClick={() =>
                                      isEditingLimit < maxLimit &&
                                      handleEdit(item)
                                    }
                                  >
                                    <img src={edit} alt="" />
                                  </button>
                                )}
                                <button
                                  onClick={() =>
                                    setOpenModal({
                                      isOpen: true,
                                      value: item?.id,
                                    })
                                  }
                                  title="Удалить предмет"
                                >
                                  <img src={deletePng} alt="" />
                                </button>
                              </div>
                            </td>
                          )}
                        </tr>
                      ))}

                      {semester?.elective_course?.map((course, index) => {
                        return course?.map((group, groupIndex, array) => {
                          const lastIndex = array
                            .map((_, index, arr) =>
                              index === arr.length - 1 ? index : undefined
                            )
                            .indexOf(array.length - 1);
                          const rowspanValue = course.length;
                          return (
                            <>
                              <tr key={group?.id} className={styles.table__row}>
                                {groupIndex === 0 && (
                                  <td
                                    rowspan={rowspanValue}
                                    className={styles.table__item}
                                  >
                                    <span className={styles.table__title}>
                                      {index + (semester?.courses?.length + 1)}
                                    </span>
                                  </td>
                                )}
                                <td className={styles.table__item}>
                                  {isEditing[group?.id] ? (
                                    <div className={styles.edit_box}>
                                      <input
                                        type="text"
                                        value={dicipline?.name_subject}
                                        className={styles.edit_input}
                                        onChange={(e) =>
                                          setDicipline((prev) => ({
                                            ...prev,
                                            name_subject: e.target.value,
                                          }))
                                        }
                                      />
                                    </div>
                                  ) : (
                                    <>
                                      <span className={styles.table__title}>
                                        {group?.name_subject}
                                      </span>
                                      {groupIndex === lastIndex &&
                                        condition && (
                                          <div className={styles.add_box2}>
                                            {!isAdding[group?.group] ? (
                                              <button
                                                onClick={() =>
                                                  handleToggleGroup(group)
                                                }
                                                title="Добавить предмет по выбору"
                                              >
                                                <img src={smallPlus} alt="" />
                                              </button>
                                            ) : (
                                              <button
                                                onClick={() =>
                                                  handleToggleGroup(group)
                                                }
                                              >
                                                <img src={smallCancel} alt="" />
                                              </button>
                                            )}
                                          </div>
                                        )}
                                    </>
                                  )}
                                </td>
                                <StudyPlanTableBody
                                  item={group}
                                  setDicipline={setDicipline}
                                  dicipline={dicipline}
                                  isEditing={isEditing}
                                />
                                {condition && (
                                  <td className={styles.table__item}>
                                    <div className={styles.control_btns}>
                                      {isEditing[group?.id] ? (
                                        <div className={styles.control_btns}>
                                          <button
                                            onClick={(e) => handleCancel(group)}
                                          >
                                            <img src={cancel} alt="" />
                                          </button>
                                          <button
                                            onClick={() =>
                                              handleOpenPatchModal(group)
                                            }
                                          >
                                            <img src={accept} alt="" />
                                          </button>
                                        </div>
                                      ) : (
                                        <button
                                          onClick={() =>
                                            isEditingLimit < maxLimit &&
                                            handleEdit(group)
                                          }
                                        >
                                          <img src={edit} alt="" />
                                        </button>
                                      )}
                                      <button
                                        onClick={() =>
                                          setOpenModal({
                                            isOpen: true,
                                            value: group?.id,
                                          })
                                        }
                                        title="Удалить предмет"
                                      >
                                        <img src={deletePng} alt="" />
                                      </button>
                                    </div>
                                  </td>
                                )}
                              </tr>
                              {groupIndex === lastIndex && (
                                <>
                                  {isAdding[group?.group] ? (
                                    <AddDiscipline
                                      semesterId={semester?.id}
                                      groupItem={group}
                                      setIsAding={setIsAding}
                                      setRender={setRender}
                                      title="Наименование КПВ:"
                                      setNotify={setNotify}
                                    />
                                  ) : null}
                                </>
                              )}
                            </>
                          );
                        });
                      })}
                    </>
                  ) : (
                    <tr className={styles.table__row}>
                      <td className={styles.table__item} colSpan={13}>
                        <span className={styles.table__title}>
                          Список дисциплин пуст
                        </span>
                      </td>
                    </tr>
                  )}

                  {isAdding[semester?.id] ? (
                    <AddDiscipline
                      semesterId={semester?.id}
                      groupItem={null}
                      setIsAding={setIsAding}
                      setRender={setRender}
                      title="Наименование:"
                      setNotify={setNotify}
                    />
                  ) : null}
                  {condition && (
                    <tr className={styles.table__row}>
                      <td className={styles.table__item}>
                        <div className={styles.semester_btns}>
                          {!isAdding[semester?.id] ? (
                            <button
                              onClick={() => handleToggleSemester(semester)}
                              title="Добавить предмет"
                            >
                              <img src={plus} alt="" />
                            </button>
                          ) : (
                            <button
                              onClick={() => handleToggleSemester(semester)}
                            >
                              <img src={cancel} alt="" />
                            </button>
                          )}
                          <button
                            title="Удалить семестр"
                            onClick={() =>
                              setConfirm({
                                isOpen: true,
                                value: semester?.id,
                              })
                            }
                          >
                            <img src={deletePng} alt="" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )}
                  <tr className={styles.table__row}>
                    <td className={styles.table__item} colSpan={5}>
                      <span className={styles.table__title} style={{fontWeight:"500" , fontSize:"14px"}}>
                        Отчет по семестру
                      </span>
                    </td>
                    <td className={styles.table__item}>
                      <span className={styles.table__title}>
                         {semester?.count_credit}
                      </span>
                    </td>
                    <td className={styles.table__item}>
                      <span className={styles.table__title}>
                            {semester?.amount_hours}
                      </span>
                    </td>
                    <td className={styles.table__item}>
                      <span className={styles.table__title}>
                        {semester?.lecture_hours}
                      </span>
                    </td>
                    <td className={styles.table__item}>
                      <span className={styles.table__title}>
                        {semester?.practice_hours}
                      </span>
                    </td>
                    <td className={styles.table__item}>
                      <span className={styles.table__title}>
                         {semester?.lab_hours}
                      </span>
                    </td>
                    <td className={styles.table__item}>
                      <span className={styles.table__title}>
                        {semester?.srs}
                      </span>
                    </td>
                    <td className={styles.table__item} colSpan={2}>
                      <span className={styles.table__title}>
                        {semester?.subject_hours}
                      </span>
                    </td>
                  </tr>
                </>
              ))}
            </>
          ) : (
            <tr className={styles.table__row}>
              <td className={styles.table__item}>
                <span className={styles.table__title}>
                  Список семестров пуст
                </span>
              </td>
            </tr>
          )}
        </tbody>
        <tfoot className={styles.table__foot}>
          <tr className={styles.table__row}>
            <td className={styles.table__item} colSpan={5}>
              <span className={styles.table__title}>Общий отчет</span>
            </td>
            <td className={styles.table__item}>
              <span className={styles.table__title}>{data?.all_credits}</span>
            </td>
            <td className={styles.table__item}>
              <span className={styles.table__title}>
                {data?.all_amount_hours}
              </span>
            </td>
            <td className={styles.table__item}>
              <span className={styles.table__title}>
                {data?.all_lecture_hours}
              </span>
            </td>
            <td className={styles.table__item}>
              <span className={styles.table__title}>
                {data?.all_practice_hours}
              </span>
            </td>
            <td className={styles.table__item}>
              <span className={styles.table__title}>{data?.all_lab_hours}</span>
            </td>
            <td className={styles.table__item}>
              <span className={styles.table__title}>{data?.all_srs}</span>
            </td>
            <td className={styles.table__item} colSpan={2}>
              <span className={styles.table__title}>
                {data?.all_subject_hours}
              </span>
            </td>
          </tr>
        </tfoot>
      </table>

      <Notification notify={notify} setNotify={setNotify} />
      <ModalWindow openModal={openModal.isOpen} modalText={"Введите ПИН-код"}>
        <>
          <PinCode setPinCode={setPinCode} passwordVisible={false} />

          <Button onClick={handleClosePin} className={styles.btn_pin_close}>
            {" "}
            Закрыть
          </Button>
          <Button
            onClick={() => handleDeleteAfter(openModal.value)}
            className={styles.btn_pin}
          >
            Подтвердить
          </Button>
        </>
      </ModalWindow>
      <ModalWindow
        openModal={openModalPatch.isOpen}
        modalText={"Введите ПИН-код"}
      >
        <>
          <PinCode setPinCode={setPinCode} passwordVisible={false} />
          <Button onClick={handleClosePatch} className={styles.btn_pin_close}>
            {" "}
            Закрыть
          </Button>
          <Button
            onClick={() => handlePatchAfter(openModalPatch.value)}
            className={styles.btn_pin}
          >
            Подтвердить
          </Button>
        </>
      </ModalWindow>
      {/* delete Semester */}
      <ModalWindow openModal={confirm.isOpen}>
        <>
          <h3 className={styles.confirm_title}>
            Вы действительно хотите удалить семестр
          </h3>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Button
              onClick={() => setConfirm({ value: null, isOpen: false })}
              className={styles.btn_pin_close2}
            >
              {" "}
              Закрыть
            </Button>
            <Button
              onClick={() => setOpenModalDelete(true)}
              className={styles.btn_pin2}
            >
              Подтвердить
            </Button>
          </div>
        </>
      </ModalWindow>
      <ModalWindow openModal={openModalDelete} modalText={"Введите ПИН-код"}>
        <>
          <PinCode setPinCode={setPinCode} passwordVisible={false} />

          <Button
            onClick={() => setOpenModalDelete(false)}
            className={styles.btn_pin_close}
          >
            {" "}
            Закрыть
          </Button>
          <Button
            onClick={() => handleConfirmSemester()}
            className={styles.btn_pin}
          >
            Подтвердить
          </Button>
        </>
      </ModalWindow>
    </div>
  );
};

export default StudyPlanTable;
