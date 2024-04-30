import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ScaleLoader } from "react-spinners";
import { useReactToPrint } from "react-to-print";
import { Button } from "../../../../components";
import EmployeeRoleSelect from "../../../../hooks/EmployeeSelect/EmployeeRoleSelect";
import EmployeeSelectUserId from "../../../../hooks/EmployeeSelect/EmployeeSelectUserId";
import EmployeeStatusSelect from "../../../../hooks/EmployeeSelect/EmployeeStatusSelect";
import { RequestReportOrder } from "../../../../service/OrderService";
import userInfo from "../../../../utils/userInfo";
import OrderReportTable from "../../../OrderPage/components/OrderTable/OrderReportTable";
import styles from "./OrderReportPage.module.scss";

const OrderReportPage = ({ setChoose }) => {
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
      let response = await RequestReportOrder({
        employees: selectedEmployee,
        roles: selectedRole,
        statuses: selectedStatus.includes("Все") ? [] : selectedStatus,
        startDate: startDate,
        endDate: endDate,
      });

      setResponseInfo([...response.data.ORDER]);
    } catch (error) {}
  };

  return (
    <>
      {responseInfo === null ? (
        <div>
          <Button onClick={() => setChoose(0)} style={{ marginBottom: "15px" }}>
            Назад
          </Button>
          <div className={styles.titile__wrapper}>
            {user?.position?.includes("Ректор") ||
            user?.position?.includes("Проректор") ? (
              <EmployeeSelectUserId
                selectedEmployee={setSelectedEmployee}
                setSelectedEmployeeLabel={setSelectedEmployeeLabel}
                isMulti={true}
              />
            ) : (
              ""
            )}
            <EmployeeRoleSelect
              isStatement={true}
              setSelectedRole={setSelectedRole}
              isMulti={false}
            />
            <EmployeeStatusSelect
              setSelectedStatus={setSelectedStatus}
              isMulti={true}
            />
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
            <div style={{ display: "flex", gap: "25px" }}>
              {!loader ? (
                <Button className={styles.btn_pin} onClick={handleSubmitReport}>
                  Создать
                </Button>
              ) : (
                <ScaleLoader color="black" size={30} />
              )}
            </div>
          </div>
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
            <div style={{ paddingLeft: "15px", paddingTop: "15px" }}>
              {user?.position?.includes("Ректор") ||
              user?.position?.includes("Проректор") ? (
                <h4 style={{ color: "black" }}>
                  Выбранные сотрудники:{" "}
                  {selectedEmployeeLabel &&
                    selectedEmployeeLabel.map((item) => (
                      <span style={{ paddingLeft: "4px" }}>{item}</span>
                    ))}
                </h4>
              ) : null}

              <h4 style={{ color: "black" }}>Выбранная роль: {selectedRole}</h4>

              <h4 style={{ color: "black" }}>
                Выбранный статус: {selectedStatus}
              </h4>
              <h4 style={{ color: "black" }}>Начало: {startDate}</h4>
              <h4 style={{ paddingBottom: "10px", color: "black" }}>
                Конец: {endDate}
              </h4>
            </div>

            <OrderReportTable data={responseInfo} />
          </div>
        </div>
      )}
    </>
  );
};

export default OrderReportPage;
