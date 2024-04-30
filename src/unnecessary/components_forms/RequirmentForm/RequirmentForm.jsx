import React from "react";
import { useState } from "react";
import Button from "../../../../Button/Button";
import styles from "./RequirmentForm.module.scss";
import RequirmentRow from "./RequirmentRow/RequirmentRow";
import cx from "classnames";
import { Fragment } from "react";
import RequirmentEdit from "./RequirmentEdit/RequirmentEdit";
import { createRequirement } from "../../../../../service/StatementsService";
import { useDispatch } from "react-redux";
import { postRequirment } from "./../../../../../store/slices/StatementsSlice";
import { nanoid } from "@reduxjs/toolkit";
import Notification from "../../../../../utils/Notifications";
import LimitedReqEdit from "./EditableRequirtmentForm/LimitedRequirmentForm/LimitedReqEdit";
import todayDate from "../../../../../utils/todayDate";
import userInfo from "../../../../../utils/userInfo";
const RequirmentForm = ({ type , setRender , setState}) => {
  //UseState
  const [requirmentList, setRequirmentList] = useState([]);
  const [companyOrganization, setСompanyOrganization] = useState("KГТУ");
  const [viewsOperations, setViewsOperations] = useState("");
  const [warehouse, setWarehouse] = useState("");
  const [department, setDepartment] = useState("");
  const [requestedmen, setRequestmen] = useState("");
  const [uniqCodes, setUniqCodes] = useState("");
  const [editRequirmentId, setEditRequirmentId] = useState(null);
  //Complex UseState
  const [addFormData, setAddFormData] = useState({
    sub_account: "",
    analytical: "",
    name_grade_size_brand: "",
    nomenclature_number: "",
    code: "",
    name: "",
    requested: "",
    released: "",
    price: "",
    ordinal: "",
    number_record_warehouse_file: "",
  });
  const [editFormData, setEditFormData] = useState({
    sub_account: "",
    analytical: "",
    name_grade_size_brand: "",
    nomenclature_number: "",
    code: "",
    name: "",
    requested: "",
    released: "",
    price: "",
    ordinal: "",
    number_record_warehouse_file: "",
  });
  //Notification
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  //Dispatch
  const dispatch = useDispatch();
  //Const & Let
  const today = todayDate();
  const user = userInfo();
  const company_organization = companyOrganization;
  const views_operations = viewsOperations;
  const uniq_codes = uniqCodes;
  //Functions
  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleEditClick = (event, requirment) => {
    event.preventDefault();
    setEditRequirmentId(requirment.id);
    const formValues = {
      id: requirment.id,
      sub_account: requirment.sub_account,
      analytical: requirment.analytical,
      name_grade_size_brand: requirment.name_grade_size_brand,
      nomenclature_number: requirment.nomenclature_number,
      code: requirment.code,
      name: requirment.name,
      requested: requirment.requested,
      released: requirment.released,
      price: requirment.price,
      ordinal: requirment.ordinal,
      number_record_warehouse_file: requirment.number_record_warehouse_file,
    };
    setEditFormData(formValues);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();
    const editedRequirment = {
      ...editFormData,
    };
    const newList = [...requirmentList];
    const index = requirmentList.findIndex(
      (item) => item.id === editRequirmentId
    );

    newList[index] = editedRequirment;
    setRequirmentList(newList);
    setEditRequirmentId(null);
  };
  const handleAddFormClick = () => {
    setRequirmentList([...requirmentList, { id: nanoid(), ...addFormData }]);
  };
  const handleCancelClick = () => {
    setEditRequirmentId(null);
  };
  const handleDeleteClick = (id) => {
    const newList = [...requirmentList];

    const index = requirmentList.findIndex((item) => item.id === id);
    newList.splice(index, 1);
    setRequirmentList(newList);
  };

  const handleConfirmClick = () => {
    const requirData = {
      company_organization: companyOrganization,
      views_operations: viewsOperations,
      warehouse: warehouse,
      department: department,
      requestedmen: requestedmen,
      uniq_codes: uniqCodes,
      purchaselistproducts: requirmentList,
    };
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    requirmentList.map((item) => delete item.id);

    try {
      let response = await createRequirement({
        company_organization,
        views_operations,
        date_today: today,
        type,
        warehouse,
        department,
        requestedmen: user.division,
        uniq_codes,
        purchaselistproducts: requirmentList,
      });
      dispatch(
        postRequirment({
          company_organization: companyOrganization,
          views_operations: viewsOperations,
          date_today: today,
          type,
          warehouse: warehouse,
          department: department,
          requestedmen: user.division,
          uniq_codes: uniqCodes,
          purchaselistproducts: requirmentList,
        })
      );
      setNotify({
        isOpen: true,
        message: "Требование успешно отправлено!",
         type: "success", sound : "success"
      });
      setState(({ isPaneOpen: false } ))
      setRender(true)
    } catch (error) {
      
      setNotify({
        isOpen: true,
        message: "Ошибка",
        type: "error",
      });
    }
  };
  return (
    <div>
      <div className={styles.requirment__title}>Список на приобретание</div>
      <div>
        <div className={styles.m_20}>
          <div className={cx(styles.wrapper_between)}>
            <div>КГТУ им. И.Раззакова</div>
            <div>Типовая межуведомственная форма М-11</div>
          </div>
          <div className={styles.wrapper_between}>
            <div>Предприятие организации</div>
            <div>
              Код по ОКУД{" "}
              <input readOnly value="0303008" className={styles.okd} />
            </div>
          </div>
        </div>
        <div className={styles.wrapper_center}>
          <div className={styles.title__requir}>Требованиe № </div>
        </div>
        <div className={styles.wrapper_center}>
          <div>{today}</div>
        </div>
        <div className={styles.m_20}>
          <div className={styles.wrapper_end}>
            <table className={styles.sup__table}>
              <thead>
                <tr>
                  <th>Вид операции</th>
                  <th>Склад</th>
                  <th>Цех-отдел, обьект-получатель</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <input
                      onChange={(e) => setViewsOperations(e.target.value)}
                      className={styles.sup__table__input}
                    />
                  </td>
                  <td>
                    <input
                      onChange={(e) => setWarehouse(e.target.value)}
                      className={styles.sup__table__input}
                    />
                  </td>
                  <td>
                    <input
                      onChange={(e) => setDepartment(e.target.value)}
                      className={styles.sup__table__input}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className={styles.wrapper_center}>
          <div></div>
        </div>
        <div className={cx(styles.wrapper_between, styles.m_20)}>
          <div>Затребовал: {user.division}</div>
          <div>Разрешил:</div>
        </div>
      </div>
      <div>
        <table className={styles.requirment__table}>
          <thead>
            <tr>
              <th colSpan={2}>Корреспондирущий счет</th>
              <th colSpan={2}>Материальные ценности</th>
              <th colSpan={2}>Единица измерения</th>
              <th colSpan={2}>Количество</th>
              <th rowSpan={2}>Цена</th>
              <th rowSpan={2}>Сумма</th>
              <th rowSpan={2}>
                Порядковый номер записи по складской картотеке
              </th>
              <th className={styles.del} rowSpan={2} colSpan={2}></th>
            </tr>
            <tr>
              <th>Счет, суб-счет</th>
              <th>Код аналитического учета</th>
              <th>Наименование,сорт, размер, марка</th>
              <th>Код (номенклатурный номер)</th>
              <th>Код</th>
              <th>Наименование</th>
              <th>Затребовано</th>
              <th>Отпущено</th>
            </tr>
          </thead>
          <tbody>
            {requirmentList.map((item) => (
              <Fragment>
                {editRequirmentId === item.id ? (
                  <LimitedReqEdit
                    editFormData={editFormData}
                    setEditFormData={setEditFormData}
                    handleEditFormSubmit={handleEditFormSubmit}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <RequirmentRow
                    requirmentItem={item}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                    isDelete={true}
                   
                  />
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
        <div className={cx(styles.m_20, styles.add__wrapper)}>
          <Button className="add__requir" onClick={handleAddFormClick}>
            Добавить данные
          </Button>
        </div>
        <div className={styles.confirm__wrapper}>
          <Button className={styles.btn1} onClick={handleSubmit}>
            Отправить
          </Button>
        </div>
      </div>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
};
export default RequirmentForm;
