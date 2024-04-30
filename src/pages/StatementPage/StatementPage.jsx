import React from "react";
import { Button, Layout } from "../../components";
import StatementTable from "./components/StatementTable/StatementTable";
import styles from "./StatementPage.module.scss";
import StatementForm from "../../components/Forms/StatementForm/StatementForm";
import "react-sliding-pane/dist/react-sliding-pane.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import userInfo from "../../utils/userInfo";
import SlidingPaneUtil from "../../utils/SlidingPaneUtil";
import ModalWindow from "../../hooks/ModalWindow/ModalWindow";
import EmployeeSelectUserId from "../../hooks/EmployeeSelect/EmployeeSelectUserId";
import EmployeeRoleSelect from "../../hooks/EmployeeSelect/EmployeeRoleSelect";
import EmployeeStatusSelect from "../../hooks/EmployeeSelect/EmployeeStatusSelect";
import { RequestReportStatement } from "../../service/StatementsService";
import EmployeeTypeSelect from "../../hooks/EmployeeSelect/EmployeeTypeSelect";
import StatementReportTable from "./components/StatementTable/StatementReportTable";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import BottomSheet from "../../components/BottomSheet/BottomSheet";
function StatementPage() {
  const [width, setWidth] = useState(window.innerWidth);
  const [filterChoose, setFilterChoose] = useState(4);

  const [render, setRender] = useState(false);
  const [SearchByTitle, setSearchByTitle] = useState();
  const [searchTerm, setSearchTerm] = useState();

  const [openModal, setOpenModal] = useState(false);
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
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Simpleraport",
  });
  const handleSubmitReport = async () => {
    try {
      let response = await RequestReportStatement({
        employees: selectedEmployee,
        roles: selectedRole,
        type_doc: selectedType,
        statuses: selectedStatus.includes("Все") ? [] : selectedStatus,
        startDate: startDate,
        endDate: endDate,
      });

      setResponseInfo([...response.data.STATEMENT]);
      setOpenModal(false);
    } catch (error) {
      setOpenModal(false);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  const [state, setState] = useState({
    isPaneOpen: false,
    isPaneOpenLeft: false,
  });

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

  const navigate = useNavigate();

  useEffect(() => {
    setRender(false);
  }, [render]);

  return (
    <Layout>
      {responseInfo === null ? (
        <div className={styles.wrapper}>
          <div className={styles.titile__wrapper}>
            <select
              className={styles.title}
              value={filterChoose}
              onChange={(e) => setFilterChoose(parseInt(e.target.value))}
            >
              <option value={4}>Мои обращения</option>
              <option value={6}>Входящие</option>
              <option value={5}>История</option>
            </select>
            <div style={{ display: "flex", marginLeft: "20px" }}>
              <Button
                className="create__statement__btn"
                onClick={() => setState({ isPaneOpen: true })}
              >
                Создать
              </Button>
              <Button
                className="create__statement__btn"
                onClick={() => setOpenModal(true)}
                style={{ marginLeft: "15px" }}
              >
                Создать отчет
              </Button>
            </div>
            <>
              {width > 1000 ? (
                <BottomSheet
                  title={"Новое обращение"}
                  isOpen={state.isPaneOpen}
                  onClose={setState}
                >
                  <StatementForm setRender={setRender} setState={setState} />
                </BottomSheet>
              ) : (
                // <SlidingPaneUtil
                //   size="50%"
                //   title="Новое обращение"
                //   state={state}
                //   setState={setState}
                // >
                //   <StatementForm setRender={setRender} setState={setState} />{" "}
                // </SlidingPaneUtil>
                <SlidingPaneUtil
                  size="100%"
                  title="Новый обращение"
                  state={state}
                  setState={setState}
                >
                  <StatementForm setRender={setRender} setState={setState} />{" "}
                </SlidingPaneUtil>
              )}
            </>
          </div>

          <StatementTable
            render={render}
            filterChoose={filterChoose}
            setFilterChoose={setFilterChoose}
            searchTerm={searchTerm}
            SearchByTitle={SearchByTitle}
          />
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
          padding: 15px;
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
              onClick={() => navigate(-1)}
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
            {user.is_admin_of ? (
              <h4 style={{ color: "black" }}>
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

      <ModalWindow
        openModal={openModal}
        setOpenModal={setOpenModal}
        modalTitle={"Создать отчет"}
      >
        <div
          className={styles.titile__wrapper}
          style={{ gap: "25px", flexDirection: "column" }}
        >
          {user.is_admin_of ? (
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
          <EmployeeTypeSelect
            setSelectedType={setSelectedType}
            isMulti={true}
          />
          <EmployeeStatusSelect
            setSelectedStatus={setSelectedStatus}
            isMulti={true}
          />
          <input
            type="date"
            onChange={(e) => setStartDate(e.target.value)}
            name="start"
            required
            className={styles.discription_input}
          />
          <input
            type="date"
            onChange={(e) => setEndDate(e.target.value)}
            name="end"
            required
            className={styles.discription_input}
          />
          <div style={{ display: "flex", gap: "25px" }}>
            <button
              className={styles.btn_pin_close}
              onClick={() => setOpenModal(false)}
            >
              Закрыть
            </button>
            <button className={styles.btn_pin} onClick={handleSubmitReport}>
              Создать
            </button>
          </div>
        </div>
      </ModalWindow>
    </Layout>
  );
}

export default StatementPage;
