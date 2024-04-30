import React from "react";
import { Button, Layout } from "../../components";
import styles from "./OrderPage.module.scss";
import "react-sliding-pane/dist/react-sliding-pane.css";
import { useState, useEffect } from "react";
import OrderTable from "./components/OrderTable/OrderTable";
import OrderForm from "../../components/Forms/OrderForm/OrderForm";
import SlidingPaneUtil from "../../utils/SlidingPaneUtil";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  RequestReportOrder,
  getOrder,
  patchOrderFormData,
  registerOrder,
} from "../../service/OrderService";
import {
  registerNewOrder,
  setOrders,
  setPatchedOrder,
} from "../../store/slices/OrderSlice";
import ModalWindow from "../../hooks/ModalWindow/ModalWindow";
import Notification from "../../utils/Notifications";
import { AddWaterMark } from "../../hooks/PdfWaterMark/AddWaterMark";
import { ScaleLoader } from "react-spinners";
import EmployeeSelectUserId from "../../hooks/EmployeeSelect/EmployeeSelectUserId";
import EmployeeRoleSelect from "../../hooks/EmployeeSelect/EmployeeRoleSelect";
import EmployeeStatusSelect from "../../hooks/EmployeeSelect/EmployeeStatusSelect";
import userInfo from "../../utils/userInfo";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import OrderReportTable from "./components/OrderTable/OrderReportTable";
import BottomSheet from "../../components/BottomSheet/BottomSheet";

function OrderPage() {
  const [filterChoose, setFilterChoose] = useState(4);
  const [render, setRender] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const [order_date, setOrder_date] = useState("");
  const [order_number, setOrder_number] = useState("");
  const [file, setFile] = useState([]);

  const [width, setWidth] = useState(window.innerWidth);
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

  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const { id } = useParams();

  const getData = async () => {
    try {
      let response = await getOrder(data);

      dispatch(
        setOrders({
          orders: response.data,
        })
      );
      setLoading(false);
    } catch (error) {}
  };
  useEffect(() => {
    getData();
    setLoading(true);
    setRender(false);
  }, [render, filterChoose]);

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    if (order_date === "") {
      setNotify({
        isOpen: true,
        message: " Вы не указали дату",
        type: "warning",
        sound: "warning",
      });
    } else if (order_number === "") {
      setNotify({
        isOpen: true,
        message: " Вы не указали номер",
        type: "warning",
        sound: "warning",
      });
    } else if (file === "") {
      setNotify({
        isOpen: true,
        message: " Вы не указали файл",
        type: "warning",
        sound: "warning",
      });
    } else
      try {
        setLoading(true);
        let response = await registerOrder(
          user.userId,
          order_date,
          order_number,
          file
        );

        dispatch(
          registerNewOrder({
            order_date,
            order_number,
            file: file.toString(),
          })
        );

        const count_turn = 0;

        const new_file = response.data?.file;
        const name = "unet";
        const finalWaterMarks = true;

        const months = [
          "января",
          "февраля",
          "марта",
          "апреля",
          "мая",
          "июня",
          "июля",
          "августа",
          "сентября",
          "октября",
          "ноября",
          "декабря",
        ];

        const parts = order_date.split("-");
        const formattedDate = new Date(
          parseInt(parts[0]),
          parseInt(parts[1]) - 1,
          parseInt(parts[2])
        ).toLocaleDateString("ru-RU", {
          day: "numeric",
          month: "long",
          year: "numeric",
        });

        const result = formattedDate.replace(",", "");

        const modifedFile = await AddWaterMark({
          name,
          count_turn,
          file: new_file,
          finalWaterMarks,
          order_date: result,
          order_number,
        });

        let SignStatementFile = {
          addressee: response.data.addressee,
          status: "Зарегистрировано",
          file: modifedFile,
        };
        let response2 = await patchOrderFormData(
          response.data.id,
          SignStatementFile
        );

        dispatch(setPatchedOrder(response2.data));

        setFile([]);

        setNotify({
          isOpen: true,
          message: "Регистрация прошла успешно",
          type: "success",
          sound: "success",
        });

        setOpenModal(false);
        setRender(true);
      } catch (error) {
        setNotify({
          isOpen: true,
          message: "Ошибка",
          type: "error",
        });
      }
  };
  const allOrders = useSelector((state) => state.order.orders);

  const user = userInfo();

  const navigate = useNavigate();

  const [openModal2, setOpenModal2] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState([user.userId]);
  const [selectedEmployeeLabel, setSelectedEmployeeLabel] = useState([]);
  const [selectedRole, setSelectedRole] = useState([]);
  const [selectedRoleLabel, setSelectedRoleLabel] = useState("");
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
      let response = await RequestReportOrder({
        employees: selectedEmployee,
        roles: selectedRole,
        statuses: selectedStatus.includes("Все") ? [] : selectedStatus,
        startDate: startDate,
        endDate: endDate,
      });

      setResponseInfo([...response.data.ORDER]);
      setOpenModal2(false);
    } catch (error) {
      setOpenModal2(false);
    }
  };

  return (
    <Layout>
      {responseInfo === null ? (
        <div className={styles.wrapper}>
          <div className={styles.titile__wrapper}>
            <div className={styles.title}>Мои приказы</div>

            <div style={{ display: "flex", marginLeft: "20px" }}>
              {width > 1000 ? (
                // <SlidingPaneUtil
                //   size="50%"
                //   title="Новый приказ"
                //   state={state}
                //   setState={setState}
                // >
                //   <OrderForm setRender={setRender} setState={setState} />{" "}
                // </SlidingPaneUtil>
                <BottomSheet
                  title={"Новый приказ"}
                  isOpen={state.isPaneOpen}
                  onClose={setState}
                >
                  <OrderForm setRender={setRender} setState={setState} />{" "}
                </BottomSheet>
              ) : (
                <SlidingPaneUtil
                  size="100%"
                  title="Новый приказ"
                  state={state}
                  setState={setState}
                >
                  <OrderForm setRender={setRender} setState={setState} />{" "}
                </SlidingPaneUtil>
              )}
              <Button
                className="create__statement__btn"
                style={{ marginRight: "10px" }}
                onClick={() => setState({ isPaneOpen: true })}
              >
                Создать проект приказа
              </Button>

              <Button
                className="create__statement__btn"
                onClick={() => setOpenModal2(true)}
                style={{ marginRight: "10px" }}
              >
                Создать отчет
              </Button>

              <Button
                className="create__statement__btn"
                onClick={() => setOpenModal(true)}
              >
                Зарегистрировать приказ
              </Button>
            </div>
          </div>
          {loading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100px",
              }}
            >
              <ScaleLoader color="white" size={30} />{" "}
              {/* Используйте нужные вам свойства для настройки загрузочного индикатора */}
            </div>
          ) : (
            <OrderTable
              filterChoose={filterChoose}
              setFilterChoose={setFilterChoose}
              allOrders={allOrders}
            />
          )}
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
          <div>
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

      <ModalWindow
        openModal={openModal}
        setOpenModal={setOpenModal}
        modalTitle={"Регистрация нового приказа"}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <input
              type="date"
              placeholder="Дата приказа"
              className={styles.order_input}
              required
              value={order_date}
              onChange={(e) => setOrder_date(e.target.value)}
            />
            <input
              type="text"
              placeholder="Номер приказа"
              className={styles.order_input}
              required
              value={order_number}
              onChange={(e) => setOrder_number(e.target.value)}
            />
            <input
              type="file"
              placeholder="Файл"
              className={styles.order_input}
              required
              accept="application/pdf"
              onChange={onFileChange}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              onClick={() => setOpenModal(false)}
              className={styles.btn_pin_close}
            >
              Закрыть
            </Button>

            {loading ? (
              <div style={{ display: "flex" }}>
                {" "}
                <ScaleLoader color="grey" size={30} />{" "}
              </div>
            ) : (
              <Button onClick={handleSubmit} className={styles.btn_pin}>
                Зарегистрировать
              </Button>
            )}
          </div>
        </div>
      </ModalWindow>

      <ModalWindow
        openModal={openModal2}
        setOpenModal={setOpenModal2}
        modalTitle={"Создать отчет"}
      >
        <div
          className={styles.titile__wrapper}
          style={{ gap: "25px", flexDirection: "column" }}
        >
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
              onClick={() => setOpenModal2(false)}
            >
              Закрыть
            </button>
            <button className={styles.btn_pin} onClick={handleSubmitReport}>
              Создать
            </button>
          </div>
        </div>
      </ModalWindow>

      <Notification notify={notify} setNotify={setNotify} />
    </Layout>
  );
}

export default OrderPage;
