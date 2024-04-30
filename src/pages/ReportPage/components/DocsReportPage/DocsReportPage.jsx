import React, { useEffect, useRef, useState } from "react";
import styles from "./DocsReportPage.module.scss";
import ModalWindow from "../../../../hooks/ModalWindow/ModalWindow";
import StatementReportTable from "../../../StatementPage/components/StatementTable/StatementReportTable";
import EmployeeSelectUserId from "../../../../hooks/EmployeeSelect/EmployeeSelectUserId";
import EmployeeRoleSelect from "../../../../hooks/EmployeeSelect/EmployeeRoleSelect";
import EmployeeTypeSelect from "../../../../hooks/EmployeeSelect/EmployeeTypeSelect";
import EmployeeStatusSelect from "../../../../hooks/EmployeeSelect/EmployeeStatusSelect";
import { useReactToPrint } from "react-to-print";
import userInfo from "../../../../utils/userInfo";
import { Button } from "../../../../components";
import { useNavigate } from "react-router-dom";
import { RequestReportStatement } from "../../../../service/StatementsService";
import { ScaleLoader } from "react-spinners";

const DocsReportPage = ({ setChoose }) => {
  const user = userInfo();
  const [selectedEmployee, setSelectedEmployee] = useState([user.userId]);
  const [selectedEmployeeLabel, setSelectedEmployeeLabel] = useState([]);
  const [selectedRole, setSelectedRole] = useState([]);

  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [responseInfo, setResponseInfo] = useState(null);
  const componentRef = useRef();
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const [startType, setStartType] = useState("text");
  const [endType, setEndType] = useState("text");

  const handleStartFocus = () => {
    setStartType("date");
  };
  const handleStartBlur = () => {
    setStartType("text");
  };
  const handleEndFocus = () => {
    setEndType("date");
  };
  const handleEndBlur = () => {
    setEndType("text");
  };
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Simpleraport",
  });
  const handleSubmitReport = async () => {
    try {
      setLoader(true);
      let response = await RequestReportStatement({
        employees: selectedEmployee,
        roles: selectedRole,
        type_doc: selectedType,
        statuses: selectedStatus.includes("Все") ? [] : selectedStatus,
        startDate: startDate,
        endDate: endDate,
      });

      setResponseInfo([...response.data.STATEMENT]);
    } catch (error) {
    } finally {
      setLoader(false);
    }
  };

  return (
    <>
      {responseInfo === null ? (
        <div>
          <Button onClick={() => setChoose(0)} style={{ marginBottom: "15px" }}>
            Назад
          </Button>
          <div className={styles.titile__wrapper}>
            <div className={styles.input_box}>
              {" "}
              {user.is_admin_of ? (
                <EmployeeSelectUserId
                  selectedEmployee={setSelectedEmployee}
                  setSelectedEmployeeLabel={setSelectedEmployeeLabel}
                  isMulti={true}
                />
              ) : (
                ""
              )}
            </div>
            <div className={styles.input_box}>
              <EmployeeRoleSelect
                isStatement={true}
                setSelectedRole={setSelectedRole}
                isMulti={false}
              />
            </div>
            <div className={styles.input_box}>
              {" "}
              <EmployeeTypeSelect
                setSelectedType={setSelectedType}
                isMulti={true}
              />
            </div>
            <div className={styles.input_box}>
              {" "}
              <EmployeeStatusSelect
                setSelectedStatus={setSelectedStatus}
                isMulti={true}
              />
            </div>
            <div className={styles.input_box}>
              <input
                type={startType}
                onFocus={handleStartFocus}
                onBlur={handleStartBlur}
                onChange={(e) => setStartDate(e.target.value)}
                name="start"
                required
                className={styles.discription_input}
                placeholder="Дата: c"
              />
            </div>

            <div className={styles.input_box}>
              {" "}
              <input
                type={endType}
                onFocus={handleEndFocus}
                onBlur={handleEndBlur}
                onChange={(e) => setEndDate(e.target.value)}
                name="end"
                required
                className={styles.discription_input}
                placeholder="Дата: по"
              />
            </div>
            {!loader ? (
              <Button className={styles.btn_pin} onClick={handleSubmitReport}>
                Создать
              </Button>
            ) : (
              <ScaleLoader color="black" size={30} />
            )}
          </div>{" "}
        </div>
      ) : (
        <div className={styles.wrapper}>
          <style>
            {`
@media print {
  /* Стили, применяемые при печати */
  body {
    background-color: white;
    font-size: 12pt;

  }
  /* Пример стилизации элементов при печати */
  .print-only {
    color: white;
  }
  /* Стилизация элемента h4 при печати */
  .print-only h4 {
    color: black !important;
  }
}
`}
          </style>
          <div className={styles.titile__wrapper}>
            <Button
              className="create__statement__btn"
              onClick={() => setChoose(0)}
              style={{ marginLeft: "15px", marginTop: "15px" }}
            >
              Назад
            </Button>
            <Button
              className="create__statement__btn"
              onClick={handlePrint}
              style={{ marginLeft: "15px", marginTop: "15px" }}
            >
              Распечатать
            </Button>
          </div>

          <div className="print-only" ref={componentRef}>
            <h3 style={{ color: "black", paddingLeft: "15px" }}>
              Отчет по документам
            </h3>
            {user.is_admin_of ? (
              <h4 style={{ color: "black", paddingLeft: "15px" }}>
                Выбранные сотрудники:{" "}
                {selectedEmployeeLabel &&
                  selectedEmployeeLabel.map((item) => (
                    <span style={{ paddingLeft: "4px" }}>{item}</span>
                  ))}
              </h4>
            ) : null}
            <h4 style={{ color: "black", paddingLeft: "15px" }}>
              Выбранная роль: {selectedRole}
            </h4>
            <h4 style={{ color: "black", paddingLeft: "15px" }}>
              Выбранный тип:{" "}
              {selectedType &&
                selectedType.map((item) => (
                  <span style={{ paddingLeft: "4px" }}>{item}</span>
                ))}
            </h4>

            <h4 style={{ color: "black", paddingLeft: "15px" }}>
              Выбранный статус: {selectedStatus}
            </h4>
            <h4 style={{ color: "black", paddingLeft: "15px" }}>
              Начало: {startDate}
            </h4>
            <h4
              style={{
                paddingBottom: "10px",
                color: "black",
                paddingLeft: "15px",
              }}
            >
              Конец: {endDate}
            </h4>

            <StatementReportTable data={responseInfo} />
          </div>
        </div>
      )}
    </>
  );
};

export default DocsReportPage;
